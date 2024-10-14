/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "page.11ty.js",
		description: "Sites I read or follow regularly.",
		glitch: true,
		truncate: true,
		title: "Blogroll",
	};
}

export function render({blogroll, page}) {
	return html`
		<p>
			I generate this manually by exporting my feeds from Inoreader and running
			it through ${blogroll.head.generator}. It's not a perfect system and some
			of the feed data might be messy if their XML has weird formatting.
		</p>
		<p>Last updated ${this.localizedDateString(page.date)}</p>
		<ul>
			${blogroll.body.subs
				.map(
					(feed) => html`
						<li>
							<a href="${feed.htmlUrl}">${feed.title}</a>:
							<a href="${feed.xmlUrl}"
								>(subscribe<span class="u-visually-hidden">
									to ${feed.title}</span
								>)</a
							>
						</li>
					`,
				)
				.join("")}
		</ul>
	`;
}
