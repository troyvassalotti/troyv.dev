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

/**
 * Some pre-generated tags are unnecessary or make templating complicated
 */
function filterTagList(tags) {
	return (tags || []).filter(
		(tag) => ["all", "post", "posts"].indexOf(tag) === -1,
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

	return {
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		dir: {
			input: "src",
			layouts: "_includes/layouts",
		},
	};
}
