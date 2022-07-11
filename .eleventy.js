/**
 * @file Site configuration
 * Most site features are configured in /utils/
 */
const markdownItAnchor = require("markdown-it-anchor");

const utilsDir = `${process.cwd()}/utils`;
const srcDir = `./src`;
let jsDir = "/assets/js";

const filters = require(`${utilsDir}/filters`);
const collections = require(`${utilsDir}/collections`);
const transforms = require(`${utilsDir}/transforms`);
const shortcodes = require(`${utilsDir}/shortcodes`);
const plugins = require(`${utilsDir}/plugins`);

module.exports = function (eleventyConfig) {
  /**
   * Default is "passthrough"
   * @version 2.0.0
   * @link https://www.11ty.dev/docs/copy/#passthrough-during-serve
   */
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  // Passthroughs
  eleventyConfig
    .addPassthroughCopy(`${srcDir}/favicon.ico`)
    .addPassthroughCopy(`${srcDir}/humans.txt`)
    .addPassthroughCopy(`${srcDir}/manifest.webmanifest`)
    .addPassthroughCopy(`${srcDir}/robots.txt`)
    .addPassthroughCopy(`${srcDir}/assets`)
    .addPassthroughCopy(`${srcDir}/favicons`)
    .addPassthroughCopy({
      "./node_modules/plvylist/dist/plvylist.es.js": `${jsDir}/components/plvylist-player.js`,
    })
    .addPassthroughCopy({
      "./node_modules/@troyv/web-components/dist/**/*.js": `${jsDir}/components/`,
    })
    .addPassthroughCopy({
      "./node_modules/es-module-shims/dist/es-module-shims.js": `${jsDir}/es-module-shims.js`,
    });

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
  eleventyConfig.addNunjucksAsyncShortcode("image", shortcodes.Image);
  eleventyConfig.addNunjucksShortcode("imageSync", shortcodes.ImageSync);

  // Add excerpt support
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: "excerpt",
  });

  // Markdown
  /**
   * @version 2.0.0
   * @link https://www.11ty.dev/docs/languages/markdown/#optional-amend-the-library-instance
   */
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    })
  );

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
