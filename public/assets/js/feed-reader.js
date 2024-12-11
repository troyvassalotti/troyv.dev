/** @format */

import {html, LitElement} from "lit";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {unsafeSVG} from "lit/directives/unsafe-svg.js";
import {Task} from "@lit/task";
import {parseFeed} from "@rowanmanning/feed-parser";

/**
 * @link https://blog.metabrainz.org/2024/12/03/new-syndication-feeds-in-listenbrainz/
 * @todo Bug in top artists, not rendering UL element
 * @todo Album art grid uses relative paths for each release
 */
export default class FeedReader extends LitElement {
	/** @type {string} */
	static tagName = "feed-reader";

	/** @returns {void} */
	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	static properties = {
		atom: {type: String},
		contentType: {type: String},
	};

	constructor() {
		super();
		this.contentType = "html";
	}

	static addStyles(rootNode) {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`
      ${this.tagName} {
        display: block;

        /* Addresses rendering issue */
        :is(p):not(:has(*)) {
          display: none;
        }
      }
    `);

		const existingAdoptedStyleSheets = rootNode.adoptedStyleSheets;
		const hasStylesAlready = existingAdoptedStyleSheets.find(
			(sheet) => sheet.cssRules[0].selectorText === this.tagName,
		);

		if (!hasStylesAlready) {
			rootNode.adoptedStyleSheets.push(sheet);
		}
	}

	createRenderRoot() {
		FeedReader.addStyles(this.getRootNode());
		return this;
	}

	cleanAnchorLinks() {
		const allAnchors = this.querySelectorAll("a[href]");
		for (const anchor of allAnchors) {
			if (!anchor.origin) {
				anchor.setAttribute(
					"href",
					"https://listenbrainz.org" + anchor.href.baseVal,
				);
			}
		}
	}

	#fetchFeed = new Task(this, {
		args: () => [this.atom],
		task: async ([atom], {signal}) => {
			const response = await fetch(atom, {signal});
			if (!response.ok) {
				throw new Error(response.status);
			}
			const xml = await response.text();

			if (this.contentType === "svg") {
				const parser = new DOMParser();
				const parsedXML = parser.parseFromString(xml, "text/xml");
				const entries = [
					...parsedXML.documentElement.querySelectorAll("entry"),
				];
				const content = entries
					.map((entry) => entry.querySelector("content"))
					.map((node) => node.innerHTML)
					.join("");
				return content;
			}

			const parsedFeed = parseFeed(xml);
			const {items} = parsedFeed;
			const content = items.map((item) => item.content);
			return content.join("");
		},
	});

	renderByContentType(content) {
		switch (this.contentType) {
			case "svg":
				return unsafeSVG(content);
			case "html":
			default:
				return unsafeHTML(content);
		}
	}

	updated() {
		this.cleanAnchorLinks();
	}

	render() {
		return this.#fetchFeed.render({
			pending: () => html`<p>Loading feed...</p>`,
			complete: (content) => this.renderByContentType(content),
			error: (e) => html`<p>Error: ${e}</p>`,
		});
	}
}
