const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const sitemap = require("@quasibit/eleventy-plugin-sitemap")
const timeToRead = require("eleventy-plugin-time-to-read")
const embedYouTube = require("eleventy-plugin-youtube-embed")
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language")
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")
const addWebComponentDefinitions = require('eleventy-plugin-add-web-component-definitions')
const htmlmin = require("html-minifier-terser")
const utilsDir = `./utils`
const filters = require(`${utilsDir}/filters`)
const shortcodes = require(`${utilsDir}/shortcodes`)

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(inclusiveLangPlugin)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(timeToRead)
  eleventyConfig.addPlugin(embedYouTube)
  eleventyConfig.addPlugin(addWebComponentDefinitions, {
    path: tag => `/js/components/${tag}.js`
  })
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://www.troyv.dev",
    },
  })
  eleventyConfig.addPlugin(pluginWebmentions, {
    domain: "https://www.troyv.dev",
  })

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Transforms
  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (this.outputPath && this.outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        })
        return minified
      }
      return content
    })
  }

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", shortcodes.Image)
  eleventyConfig.addNunjucksShortcode("imageSync", shortcodes.ImageSync)

  // Passthroughs
  eleventyConfig.addPassthroughCopy({ "./public": "/" })

  eleventyConfig.addCollection("post", (collection) => {
    if (process.env.ELEVENTY_ENV !== "production")
      return [...collection.getFilteredByGlob("./src/posts/*.md")]
    else
      return [...collection.getFilteredByGlob("./src/posts/*.md")].filter(
        (post) => !post.data.draft
      )
  })

  // Add excerpt support
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: "excerpt",
  })

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      layouts: "_includes/layouts",
    },
  }
}
