/**
 * @file Site plugins
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const timeToRead = require("eleventy-plugin-time-to-read");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions");
const addWebComponentDefinitions = require("eleventy-plugin-add-web-component-definitions");
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
  readingTime: {
    name: timeToRead,
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
  siteMap: {
    name: sitemap,
    options: {
      sitemap: {
        hostname: "https://www.troyv.dev",
      },
    },
  },
  webmentions: {
    name: pluginWebmentions,
    options: {
      domain: "https://www.troyv.dev",
    },
  },
  serverless: {
    name: EleventyServerlessBundlerPlugin,
    options: {
      name: "brew",
      functionsDir: "./netlify/functions/"
    }
  },
  render: {
    name: EleventyRenderPlugin,
  },
};
