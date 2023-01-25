/**
 * @file Site configuration
 * Most site features are configured in /utils/
 */
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

const utilsDir = `${process.cwd()}/utils`;
const srcDir = `./src`;
const jsDir = "/assets/js";

const filters = require(`${utilsDir}/filters`);
const collections = require(`${utilsDir}/collections`);
const transforms = require(`${utilsDir}/transforms`);
const shortcodes = require(`${utilsDir}/shortcodes`);
const plugins = require(`${utilsDir}/plugins`);

module.exports = function(eleventyConfig) {
  // Passthroughs
  eleventyConfig
    .addPassthroughCopy(`${srcDir}/favicon.ico`)
    .addPassthroughCopy(`${srcDir}/humans.txt`)
    .addPassthroughCopy(`${srcDir}/manifest.webmanifest`)
    .addPassthroughCopy(`${srcDir}/robots.txt`)
    .addPassthroughCopy(`${srcDir}/assets`)
    .addPassthroughCopy(`${srcDir}/favicons`)
    .addPassthroughCopy({
      "./node_modules/es-module-shims/dist/es-module-shims.js": `${jsDir}/es-module-shims.js`,
    })
    .addPassthroughCopy({
      "./node_modules/@troyv/cheatcodes/dist/cheatcodes.js": `${jsDir}/cheatcodes.js`
    })
    .addPassthroughCopy({
      "./node_modules/@troyv/cloudysky/dist/cloudysky.js": `${jsDir}/cloudysky.js`
    })
    .addPassthroughCopy({
      "./node_modules/@troyv/detune/dist/detune.js": `${jsDir}/detune.js`
    })
    .addPassthroughCopy({
      "./node_modules/@troyv/typewriter/dist/typewriter.js": `${jsDir}/typewriter.js`
    })
    .addPassthroughCopy({
      "./node_modules/plvylist/dist/plvylist.js": `${jsDir}/plvylist.js`
    })
    .addPassthroughCopy({
      "./node_modules/petite-vue/dist/petite-vue.es.js": `${jsDir}/petite-vue.js`
    })

  // Plugins
  Object.keys(plugins).forEach((plugin) => {
    eleventyConfig.addPlugin(plugins[plugin].name, plugins[plugin]?.options);
  });

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  eleventyConfig.addShortcode("cloudinaryImage", shortcodes.cloudinaryImage);

  // Add excerpt support
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: "excerpt",
  });

  /**
   * Amend Markdown settings
   * @since 2.0.0
   * @link https://www.11ty.dev/docs/languages/markdown/#optional-amend-the-library-instance
   */
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib
      .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink(),
      })
      .use(markdownItFootnote));

  /**
   * Data filters for Serverless
   * @since 1.0.0
   * @link https://www.11ty.dev/docs/config/#data-filter-selectors
   */
  eleventyConfig.dataFilterSelectors.add("page");

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      layouts: "_includes/layouts",
    },
  };
};
