/**
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions");
const configWebmentions = require("./configWebmentions.js");
const {
  EleventyServerlessBundlerPlugin,
  EleventyRenderPlugin,
  EleventyEdgePlugin,
} = require("@11ty/eleventy");

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
  teapot: {
    name: EleventyServerlessBundlerPlugin,
    options: {
      name: "teapot",
      functionsDir: "./netlify/functions/",
      copy: [{ from: "_cache", to: "_cache" }],
    },
  },
  dynamic: {
    name: EleventyServerlessBundlerPlugin,
    options: {
      name: "dynamic",
      functionsDir: "./netlify/functions/",
      copy: [{ from: "_cache", to: "_cache" }],
    },
  },
  onDemandBuilders: {
    name: EleventyServerlessBundlerPlugin,
    options: {
      name: "ondemand",
      functionsDir: "./netlify/functions/",
      redirects: "netlify-toml-builders",
      copy: [{ from: "_cache", to: "_cache" }],
    },
  },
  render: {
    name: EleventyRenderPlugin,
  },
  edge: {
    name: EleventyEdgePlugin,
  },
};
