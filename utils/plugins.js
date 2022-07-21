/**
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions");
const {
  EleventyServerlessBundlerPlugin,
  EleventyRenderPlugin,
  EleventyEdgePlugin,
} = require("@11ty/eleventy");

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
      feed: `https://webmention.io/api/mentions.jf2?domain=www.troyv.dev&per-page=9001&token=${process.env.WEBMENTION_IO_TOKEN}`,
      key: "children",
    },
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
