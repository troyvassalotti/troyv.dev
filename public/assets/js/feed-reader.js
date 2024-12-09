/** @format */

import {css, html, LitElement} from "lit";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {Task} from "@lit/task";
import {parseFeed} from "@rowanmanning/feed-parser";

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

		:is(p):not(:has(*)) {
			display: none;
		}
	`;

	static properties = {
		atom: {type: String},
		content: {type: String, state: true},
	};

	#fetchFeed = new Task(this, {
		args: () => [this.atom],
		task: async ([atom], {signal}) => {
			const response = await fetch(atom, {signal});
			if (!response.ok) {
				throw new Error(response.status);
			}
			const xml = await response.text();
			const parsedFeed = parseFeed(xml);
			const {items} = parsedFeed;
			const content = items.map((item) => item.content);
			this.content = content.join("");
		},
	});

	get firstAnchorLinks() {
		return Array.from(this.renderRoot.querySelectorAll("a:first-of-type"));
	}

	fireFeedEvent() {
		this.dispatchEvent(new Event("feed-content-set"));
	}

	handleFeedContentSet(_event) {
		console.log(_event, this, this.firstAnchorLinks);
		// TODO: need to poll for when firstAnchorLinks gets set
		this.firstAnchorLinks.forEach((link) => {
			console.log(link);
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener("feed-content-set", (event) => {
			this.handleFeedContentSet(event);
		});
	}

	updated(changedProperties) {
		if (changedProperties.has("content") && this.content) {
			this.fireFeedEvent();
		}
	}

	render() {
		return this.#fetchFeed.render({
			pending: () => html`<p>Loading feed...</p>`,
			complete: () => html`${unsafeHTML(this.content)}`,
			error: (e) => html`<p>Error: ${e}</p>`,
		});
	}
}
