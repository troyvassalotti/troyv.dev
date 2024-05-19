/**
 * @format
 * @file Site configuration Most site features are configured in /utils/
 */

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import embedYouTube from "eleventy-plugin-youtube-embed";
import inclusiveLangPlugin from "@11ty/eleventy-plugin-inclusive-language";
import {default as markdownItAnchor} from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import {html} from "common-tags";

/**
 * Some pre-generated tags are unnecessary or make templating complicated
 */
function filterTagList(tags) {
	return (tags || []).filter(
		(tag) => ["all", "post", "posts", "note"].indexOf(tag) === -1,
	);
}

export default function (config) {
	config.addPassthroughCopy({public: "/"});

	config.addPlugin(syntaxHighlight);
	config.addPlugin(pluginRss);
	config.addPlugin(inclusiveLangPlugin);
	config.addPlugin(embedYouTube, {
		lite: true,
	});

	/**
	 * Date string used in header data on posts
	 */
	config.addFilter("dateString", function (date) {
		return date.toUTCString().replace(/\s\d+:\d+:\d+\sGMT/g, "");
	});

	config.addFilter("dateStringMinusOne", function (date) {
		let dateToUse = date;
		dateToUse.setDate(date.getDate() - 1);

		return dateToUse.toUTCString().replace(/\s\d+:\d+:\d+\sGMT/g, "");
	});

	// For when the time is know, i.e. dates as "git Created" or "git Last Modified"
	config.addFilter("localizedDateString", function (date) {
		return date.toLocaleString("en-US", {
			timeZone: "America/New_York",
			timeZoneName: "longGeneric",
		});
	});

	/**
	 * Slash-separated dates
	 */
	config.addFilter("yyyymmdd", function (date, sep = "/") {
		const d = new Date(date);
		let year = d.getUTCFullYear();
		let month = d.getUTCMonth() + 1;
		let day = d.getUTCDate();

		if (month < 10) {
			month = "0" + month;
		}

		if (day < 10) {
			day = "0" + day;
		}

		return `${year}${sep}${month}${sep}${day}`;
	});

	config.addFilter("capitalize", function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	});

	config.addShortcode("generatePostListItems", function (posts) {
		let sortedPosts = posts.toReversed();
		let listHtml = sortedPosts.map(({date, data: {title}, url}) => {
			/**
			 * @todo properly support excerpts
			 * Right now they render as markdown strings, and many posts don't have one assigned.
			 */
			return html`
				<li>
					<article class="h-entry postListItem">
						<time
							class="dt-published postListItem__date u-step--1"
							datetime="${this.yyyymmdd(date, "-")}">
							${this.dateString(date)}
						</time>
						<h2 class="p-name postListItem__title u-step-2">
							<a
								class="u-url"
								href="${url}"
								>${title}</a
							>
						</h2>
					</article>
				</li>
			`;
		});

		return listHtml;
	});

	config.addShortcode("generatePostList", function (posts, ordered = false) {
		let listType = ordered ? "ol" : "ul";

		return html`
				<${listType} class="postList flow" role="list">
					${this.generatePostListItems(posts)}
				</${listType}>
			`;
	});

	/**
	 * Used on the /tags/ page
	 */
	config.addCollection("allTagsList", function (collection) {
		const tagSet = new Set();
		collection.getAll().forEach((item) => {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		});

		return filterTagList([...tagSet]);
	});

	// Add excerpt support
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
	});

	/**
	 * Amend Markdown settings
	 * @since 2.0.0
	 * @link https://www.11ty.dev/docs/languages/markdown/#optional-amend-the-library-instance
	 */
	config.amendLibrary("md", (mdLib) =>
		mdLib
			.use(markdownItAnchor, {
				permalink: markdownItAnchor.permalink.headerLink(),
				level: 2,
			})
			.use(markdownItFootnote),
	);
}

export const config = {
	htmlTemplateEngine: "njk",
	markdownTemplateEngine: "njk",
	dir: {
		input: "src",
		layouts: "_includes/layouts",
	},
};
