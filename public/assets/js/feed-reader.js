/** @format */

import {css, html, LitElement} from "lit";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {unsafeSVG} from "lit/directives/unsafe-svg.js";
import {Task} from "@lit/task";
import {parseFeed} from "@rowanmanning/feed-parser";

/**
 * @link https://blog.metabrainz.org/2024/12/03/new-syndication-feeds-in-listenbrainz/
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

	static styles = css`
		:host {
			display: block;
		}

		/* fixes bugs in feed gen */
		:is(p):not(:has(*)) {
			display: none;
		}
	`;

	static properties = {
		atom: {type: String},
		contentType: {type: String},
	};

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

	render() {
		return this.#fetchFeed.render({
			pending: () => html`<p>Loading feed...</p>`,
			complete: (content) => this.renderByContentType(content),
			error: (e) => html`<p>Error: ${e}</p>`,
		});
	}
}
