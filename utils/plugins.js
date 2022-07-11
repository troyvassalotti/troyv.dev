/**
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions");
const addWebComponentDefinitions = require("eleventy-plugin-add-web-component-definitions");
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
  webComponents: {
    name: addWebComponentDefinitions,
    options: {
      path: (tag) => `/assets/js/components/${tag}.js`,
    },
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
    },
  },
  // serverlessMusic: {
  //   name: EleventyServerlessBundlerPlugin,
  //   options: {
  //     name: "music",
  //     functionsDir: "./netlify/functions/",
  //     copy: [{ from: ".cache", to: "_cache" }],
  //   },
  // },
  render: {
    name: EleventyRenderPlugin,
  },
  edge: {
    name: EleventyEdgePlugin,
  },
};
