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

	static properties = {
		atom: {type: String},
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
			return content.join("");
		},
	});

	render() {
		return this.#fetchFeed.render({
			pending: () => html`<p>Loading feed...</p>`,
			complete: (feed) => html`${unsafeHTML(feed)}`,
			error: (e) => html`<p>Error: ${e}</p>`,
		});
	}
}
