/**
 * @format
 * @file Site configuration Most site features are configured in /utils/
 */

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import inclusiveLangPlugin from "@11ty/eleventy-plugin-inclusive-language";
import markdownItFootnote from "markdown-it-footnote";
import {IdAttributePlugin} from "@11ty/eleventy";
import {html} from "common-tags";
import {parse} from "node-html-parser";

/**
 * @param {import("@11ty/eleventy").UserConfig} config
 */
export default function (config) {
	config.addPassthroughCopy({public: "/"});

	config.addPlugin(syntaxHighlight);
	config.addPlugin(pluginRss);
	config.addPlugin(inclusiveLangPlugin);
	config.addPlugin(IdAttributePlugin);

	/** Date string used in header data on posts */
	config.addFilter("dateString", (date) =>
		date.toUTCString().replace(/\s\d+:\d+:\d+\sGMT/g, ""),
	);

	/* Date string for when the time is known, i.e. dates as "git Created" or "git Last Modified" */
	config.addFilter("localizedDateString", (date) =>
		date.toLocaleString("en-US", {
			timeZone: "America/New_York",
			timeZoneName: "longGeneric",
		}),
	);

	/** YYYYMMDD dates separated with a delimeter */
	config.addFilter("yyyymmdd", (date, sep = "/") => {
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

	config.addFilter(
		"capitalize",
		(string) => string.charAt(0).toUpperCase() + string.slice(1),
	);

	config.addShortcode("generatePostListItems", function (posts, type) {
		let sortedPosts =
			type === "published"
				? posts.toReversed()
				: posts.toSorted((a, b) => {
						const aUpdated = a.data?.updated ?? a.date;
						const bUpdated = b.data?.updated ?? b.date;

						return new Date(bUpdated).getTime() - new Date(aUpdated).getTime();
					});

		let listHtml = sortedPosts.map(({date, data: {title, updated}, url}) => {
			let dateToUse =
				type === "published" ? date : updated ? new Date(updated) : date;
			return html`
				<li>
					<article class="h-entry postListItem">
						<time
							class="dt-published postListItem__date u-step--1"
							datetime="${this.yyyymmdd(dateToUse, "-")}">
							${this.dateString(dateToUse)}
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

	config.addShortcode(
		"generatePostList",
		function (posts, ordered = false, type = "published") {
			let listType = ordered ? "ol" : "ul";

			return html`
				<${listType} class="u-flow" style="--flow-space: var(--space-l);" role="list">
					${this.generatePostListItems(posts, type)}
				</${listType}>
			`;
		},
	);

	/**
	 * Used for collecting posts with tags that have content tags as opposed to hierarchy tags
	 */
	config.addCollection("taggedPosts", (collection) => {
		const excludedTags = ["post", "note"];
		const tagSet = new Set();

		collection.getAll().forEach((item) => {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		});

		return [...tagSet].filter((tag) => excludedTags.indexOf(tag) === -1);
	});

	/**
	 * Amend Markdown settings
	 * @since 2.0.0
	 * @link https://www.11ty.dev/docs/languages/markdown/#optional-amend-the-library-instance
	 */
	config.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));

	// lets me dynamically insert the styles for lite-youtube based on usage
	config.addTransform("insert-lite-youtube-styles", function (content) {
		let insertLiteYouTubeStyles = "";

		const root = parse(content);
		const hasLiteYouTube = root.querySelector("lite-youtube");

		if (hasLiteYouTube && (this.page.outputPath || "").endsWith(".html")) {
			insertLiteYouTubeStyles = html`
				<link
					rel="stylesheet"
					href="https://esm.sh/lite-youtube-embed@0.3.2/src/lite-yt-embed.css" />
			`;
		}

		const transformed = content.replace(
			"<!-- lite-youtube-styles -->",
			insertLiteYouTubeStyles,
		);

		return transformed;
	});

	config.addTransform("remove-prettier-comments", (content) =>
		content
			.replaceAll("<!-- prettier-ignore -->", "")
			.replaceAll("<!-- @format -->", ""),
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
