/** @format */

import {html, LitElement} from "lit";

function getMapKey(map, value) {
	return [...map].find(([key, val]) => val == value)[0];
}

/**
 * @element web-mentions
 * @summary A web component to display web mentions of the current URL.
 *
 * @property {string} domain - Domain of the page to get web mentions of. Useful for overriding localhost servers.
 * @property {string} path - URL path excluding domain to find mentions of. Defaults to the current location.
 * @property {string} feed - Webmention service feed to fetch data from. Defaults to using webmention.io.
 * @property {string} key - JSON object key whose value is the array of mentions. Defaults to "children" per webmention.io.
 * @property {string} filters - Space-separated list of filters for the type of webmention to show. Possible options are: likes, reposts, replies, mentions, or bookmarks.
 * @property {"feed" | "facepile"} variant - Type of visual style to display. Best paired with individual filters.
 *
 * @todo
 * it should:
 * - be able to get all the webmentions of the current url.
 * - default to webmention.io which doesn't need an api key for mentions on a single URL
 * - it won't support other services for now since I don't use them, but open to submissions
 */
export default class WebMentions extends LitElement {
	static properties = {
		webmentions: {type: Array, state: true},
		filteredWebmentions: {type: Array, state: true},
		domain: {type: String},
		path: {type: String},
		feed: {type: String},
		key: {type: String},
		filters: {type: String},
		variant: {type: String},
	};

	constructor() {
		super();

		this.domain = window.location.origin;
		this.path = window.location.pathname;
		this.feed = "https://webmention.io/api/mentions.jf2?target";
		this.key = "children";
		this.filters = undefined;
		this.variant = "feed";

		this.webmentions;
		this.filteredWebmentions;
		this.reposts = [];
		this.likes = [];
		this.bookmarks = [];
		this.replies = [];
		this.mentions = [];
	}

	static filterMap = new Map([
		["reposts", "repost-of"],
		["likes", "like-of"],
		["bookmarks", "bookmark-of"],
		["replies", "in-reply-to"],
		["mentions", "mention-of"],
	]);

	get currentPath() {
		return this.domain + this.path;
	}

	get activeFilters() {
		if (typeof this.filters !== "string") {
			return;
		}

		let requestedFilters = this.filters.split(" ");
		let parsedFilters = requestedFilters
			.map((filter) => WebMentions.filterMap.get(filter))
			.filter((value) => value);

		return parsedFilters;
	}

	async fetchWebmentions() {
		try {
			let response = await fetch(`${this.feed}=${this.currentPath}`);
			let json = await response.json();

			return json;
		} catch (error) {
			console.error(error);
		}
	}

	async getWebmentions() {
		try {
			let mentions = await this.fetchWebmentions();
			return mentions[this.key];
		} catch (error) {
			console.error(error);
		}
	}

	#filterMentionsByType(filterProperty) {
		return this.webmentions.filter(
			(mention) =>
				mention["wm-property"] === WebMentions.filterMap.get(filterProperty),
		);
	}

	filterMentions() {
		if (!this.activeFilters) {
			return this.webmentions;
		}

		return this.activeFilters
			.map((filter) => this[getMapKey(WebMentions.filterMap, filter)])
			.flat(Infinity);
	}

	renderAuthorProfile(webmention, useAuthorUrl = false) {
		let {
			author: {photo, name},
		} = webmention;
		let url = !useAuthorUrl ? webmention.url : webmention.author.url;

		let avatar = photo
			? html`
					<img
						class="webmention__author__photo u-photo"
						part="face-img"
						loading="lazy"
						decoding="async"
						width="48"
						height="48"
						src="${photo}" />
				`
			: html`
					<span
						part="face-img"
						class="face--empty">
						${name.charAt(0) || "WM"}
					</span>
				`;

		return html`
			<a
				class="webmention__author h-card u-url link-u-exempt"
				part="face"
				href="${url}"
				id="${webmention["wm-id"]}"
				target="_blank"
				rel="noopener noreferrer">
				${avatar}
			</a>
		`;
	}

	renderAuthorMeta(webmention) {
		let name = webmention.author.name || "Anonymous";
		let url = webmention.url;
		let date = webmention.published || webmention["wm-received"];
		let dateObject = new Date(date);

		return html`
			<div
				class="webmention__meta"
				part="meta">
				<span
					class="p-name"
					part="author-name">
					<a
						part="author-name-link"
						href="${url}"
						class="u-url link-u-exempt"
						>${name}</a
					>
				</span>
				<time
					part="published"
					class="dt-published"
					datetime="${date}"
					>${dateObject.toLocaleString()}</time
				>
			</div>
		`;
	}

	renderFeed() {
		return html`
			<div
				class="webmention__feed"
				part="feed">
				${this.filteredWebmentions.map(
					(mention) => html`
						<div
							class="webmention"
							part="webmention">
							<div
								class="webmention__header"
								part="webmention-header">
								${this.renderAuthorProfile(mention, true)}
								${this.renderAuthorMeta(mention)}
							</div>
						</div>
					`,
				)}
			</div>
		`;
	}

	renderFacepile() {
		return html`
			<div
				class="webmention__facepile"
				part="facepile">
				${this.filteredWebmentions.map(
					(mention) => html`
						<div
							class="webmention"
							part="webmention">
							${this.renderAuthorProfile(mention)}
						</div>
					`,
				)}
			</div>
		`;
	}

	async connectedCallback() {
		super.connectedCallback();

		this.webmentions = await this.getWebmentions();
		this.reposts = this.#filterMentionsByType("reposts");
		this.likes = this.#filterMentionsByType("likes");
		this.bookmarks = this.#filterMentionsByType("bookmarks");
		this.replies = this.#filterMentionsByType("replies");
		this.mentions = this.#filterMentionsByType("mentions");
		this.filteredWebmentions = this.filterMentions();
	}

	render() {
		if (!this.webmentions) {
			return html`<span part="loading">Loading webmentions...</span>`;
		}

		if (this.webmentions.length < 1) {
			return html`<span part="no-mentions">No webmentions to display.</span>`;
		}

		switch (this.variant) {
			case "facepile":
				return this.renderFacepile();
			case "feed":
			default:
				return this.renderFeed();
		}
	}
}

window.customElements.define("web-mentions", WebMentions);
