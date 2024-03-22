/**
 * @format
 * @file web-mentions web component.
 * @typedef {"reposts" | "likes" | "bookmarks" | "replies" | "mentions"} Filter
 * @typedef {"repost-of" | "like-of" | "bookmark-of" | "in-reply-to" | "mention-of"} WebmentionType
 * @typedef {"feed" | "facepile"} Variant
 */

import {html, css, LitElement} from "lit";

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
 * @property {Filter} filters - Space-separated list of filters for the type of webmention to show. Possible options are: likes, reposts, replies, mentions, or bookmarks.
 * @property {Variant} variant - Type of visual style to display. Best paired with individual filters.
 * @property {boolean} loadStyles - Optionally adopt minimal default styles.
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
		variant: {type: String, reflect: true},
		loadStyles: {type: Boolean},
	};

	constructor() {
		super();
		this.domain = window.location.origin;
		this.path = window.location.pathname;
		this.feed = "https://webmention.io/api/mentions.jf2?target";
		this.key = "children";
		this.filters = undefined;
		this.variant = "feed";
		this.loadStyles = false;
	}

	static styles = css`
		web-mentions {
			display: block;

			[role="list"] {
				list-style: none;
				padding: 0;
			}

			.webmentions--facepile {
				align-items: center;
				display: flex;
				flex-wrap: wrap;
				row-gap: 1rem;

				.webmention {
					display: inline-flex;
				}

				.webmention:not(:first-of-type) {
					margin-inline-start: -1ch;
				}
			}

			.webmention__author {
				display: inline-block;
				border: 2px solid transparent;
				border-radius: 50%;

				&:hover,
				&:focus-visible {
					border-color: currentColor;
				}

				img {
					aspect-ratio: 1;
					border-radius: 50%;
					object-fit: cover;
				}
			}
		}
	`;

	static loadStyles() {
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(WebMentions.styles);
		document.adoptedStyleSheets.push(sheet);
	}

	/**
	 * Mapping of user-input filters to their Webmention property name.
	 * @type {Map<Filter, WebmentionType>}
	 */
	static filterMap = new Map([
		["reposts", "repost-of"],
		["likes", "like-of"],
		["bookmarks", "bookmark-of"],
		["replies", "in-reply-to"],
		["mentions", "mention-of"],
	]);

	reposts = [];

	likes = [];

	bookmarks = [];

	replies = [];

	mentions = [];

	/** URL path of requested page. Defaults to using current window values but can be user-configured. */
	get currentPath() {
		return this.domain + this.path;
	}

	/** Validated webmention type filters supplied by the user. */
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

	filterMentions() {
		if (!this.activeFilters) {
			return this.webmentions;
		}

		return this.activeFilters
			.map((filter) => this[getMapKey(WebMentions.filterMap, filter)])
			.flat(Infinity);
	}

	/**
	 * @assumes webmention.io : wm-property
	 */
	static #filterMentionsByType(webmentions, filterProperty) {
		return webmentions.filter(
			(mention) =>
				mention["wm-property"] === this.filterMap.get(filterProperty),
		);
	}

	/**
	 * @assumes webmention.io : wm-id
	 */
	static renderAuthorProfile(webmention, useAuthorUrl = false) {
		let {
			author: {photo, name},
		} = webmention;
		let url = !useAuthorUrl ? webmention.url : webmention.author.url;

		let avatar = photo
			? html`
					<img
						class="u-photo"
						loading="lazy"
						decoding="async"
						width="48"
						height="48"
						src="${photo}" />
				`
			: html`<span class="face--empty">${name.charAt(0) || "WM"}</span>`;

		return html`
			<a
				class="webmention__author h-card u-url link-u-exempt"
				href="${url}"
				id="${webmention["wm-id"]}"
				target="_blank"
				rel="noopener noreferrer">
				${avatar}
			</a>
		`;
	}

	static renderAuthorMeta(webmention) {
		let name = webmention.author.name || "Anonymous";
		let url = webmention.url;
		let date = webmention.published || webmention["wm-received"];
		let dateObject = new Date(date);

		return html`
			<div class="webmention__meta">
				<a
					href="${url}"
					class="u-url link-u-exempt p-name"
					>${name}</a
				>
				<time
					class="dt-published"
					datetime="${date}"
					>${dateObject.toLocaleString()}</time
				>
			</div>
		`;
	}

	static renderFeed(webmentions) {
		return html`
			${webmentions.map(
				(mention) => html`
					<div class="webmention">
						<div class="webmention__header">
							${WebMentions.renderAuthorProfile(mention, true)}
							${WebMentions.renderAuthorMeta(mention)}
						</div>
					</div>
				`,
			)}
		`;
	}

	static renderFacepile(webmentions) {
		return html`
			<ol
				class="webmentions--facepile"
				role="list">
				${webmentions.map(
					(mention) => html`
						<li class="webmention">${this.renderAuthorProfile(mention)}</li>
					`,
				)}
			</ol>
		`;
	}

	static renderLoadingContent() {
		return html`<span>Loading webmentions...</span>`;
	}

	static renderEmptyContent() {
		return html`<span>No webmentions to display.</span>`;
	}

	createRenderRoot() {
		return this;
	}

	async connectedCallback() {
		super.connectedCallback();

		this.webmentions = await this.getWebmentions();
		this.reposts = WebMentions.#filterMentionsByType(
			this.webmentions,
			"reposts",
		);
		this.likes = WebMentions.#filterMentionsByType(this.webmentions, "likes");
		this.bookmarks = WebMentions.#filterMentionsByType(
			this.webmentions,
			"bookmarks",
		);
		this.replies = WebMentions.#filterMentionsByType(
			this.webmentions,
			"replies",
		);
		this.mentions = WebMentions.#filterMentionsByType(
			this.webmentions,
			"mentions",
		);
		this.filteredWebmentions = this.filterMentions();

		if (this.loadStyles) {
			WebMentions.loadStyles();
		}
	}

	render() {
		if (!this.webmentions) {
			return WebMentions.renderLoadingContent();
		}

		if (this.webmentions.length < 1) {
			return WebMentions.renderEmptyContent();
		}

		switch (this.variant) {
			case "facepile":
				return WebMentions.renderFacepile(this.filteredWebmentions);
			case "feed":
			default:
				return WebMentions.renderFeed(this.filteredWebmentions);
		}
	}
}

window.customElements.define("web-mentions", WebMentions);
