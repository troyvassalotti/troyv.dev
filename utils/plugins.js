/**
 * @format
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions");
const configWebmentions = require("./configWebmentions.js");
const {EleventyRenderPlugin} = require("@11ty/eleventy");

// Load .env variables with dotenv
require("dotenv").config();

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
	},
	webmentions: {
		name: pluginWebmentions,
		options: configWebmentions,
	},
	render: {
		name: EleventyRenderPlugin,
	},
};
