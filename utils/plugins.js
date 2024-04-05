/**
 * @format
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = {
	highlighting: {
		name: syntaxHighlight,
	},
	rss: {
		name: pluginRss,
	},
	inclusiveLanguage: {
		name: inclusiveLangPlugin,
	},
	youTubeEmbeds: {
		name: embedYouTube,
		options: {lite: true},
	},
};
