/**
 * @file Site configuration
 * Most site features are configured in /utils/
 */
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const utilsDir = "./utils";
const jsDir = "/assets/js";

const filters = require(`${utilsDir}/filters`);
const collections = require(`${utilsDir}/collections`);
const transforms = require(`${utilsDir}/transforms`);
const shortcodes = require(`${utilsDir}/shortcodes`);
const plugins = require(`${utilsDir}/plugins`);

module.exports = function(eleventyConfig) {
  // Passthroughs
  eleventyConfig.addPassthroughCopy({ "./public": "/" });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/plvylist/dist/plvylist.es.js": `${jsDir}/components/plvylist-player.js`,
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@troyv/web-components/dist/**/*.js": `${jsDir}/components/`,
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/es-module-shims/dist/es-module-shims.js": `${jsDir}/es-module-shims.js`
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
  eleventyConfig.setLibrary(
    'md',
    markdownIt().use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink()
    })
  )

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      layouts: "_includes/layouts",
    },
  };
};
