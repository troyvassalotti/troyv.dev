/**
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions");
const { EleventyServerlessBundlerPlugin, EleventyRenderPlugin } = require("@11ty/eleventy");

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
    options: {
      domain: "https://www.troyv.dev",
    },
  },
  serverlessBrew: {
    name: EleventyServerlessBundlerPlugin,
    options: {
      name: "brew",
      functionsDir: "./netlify/functions/",
      // redirects: "netlify-toml-builders",
    },
  },
  serverlessMusic: {
    name: EleventyServerlessBundlerPlugin,
    options: {
      name: "music",
      functionsDir: "./netlify/functions/",
      copy: [{ from: ".cache", to: "_cache" }],
      // redirects: "netlify-toml-builders",
    },
  },
  render: {
    name: EleventyRenderPlugin,
  },
  /*edge: {
    name: EleventyEdgePlugin,
  },*/
};
