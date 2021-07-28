const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");
const {minify} = require("terser");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const timeToRead = require('eleventy-plugin-time-to-read');
const embedYouTube = require("eleventy-plugin-youtube-embed");
const fs = require("fs");
const inputDir = "./src";
const env = require(`${inputDir}/_data/site`);

const componentsDir = `${inputDir}/_includes/components`;
const CaptionOverlay = require(`${componentsDir}/CaptionOverlay`);
const ImageShortcode = require(`${componentsDir}/ImageShortcode`);
const ImageShortcodeSync = require(`${componentsDir}/ImageShortcodeSync`);

// Do all the 11ty stuff
module.exports = function (eleventyConfig) {
    // add RSS feed
    eleventyConfig.addPlugin(pluginRss);

    // add the syntax highlighting plugin
    eleventyConfig.addPlugin(syntaxHighlight);

    // add time to read plugin
    eleventyConfig.addPlugin(timeToRead);

    // add youtube embed plugin
    eleventyConfig.addPlugin(embedYouTube);

    // add a css minifier filter from clean-css
    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({level: 2}).minify(code).styles;
    });

    // add filter to transform a date to only mm-yyyy
    eleventyConfig.addFilter("mmyyyy", (date) => {
        let d = new Date(date);
        return `${d.getMonth() + 1}/${d.getUTCFullYear()}`;
    });

    // add a sitemap plugin
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://www.troyv.dev",
        },
    });

    // add javascript minifier
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
        try {
            const minified = await minify(code);
            callback(null, minified.code);
        } catch (err) {
            console.error("Terser error: ", err);
            // Fail gracefully.
            callback(null, code);
        }
    });

    // Passthroughs
    eleventyConfig.addPassthroughCopy(`${inputDir}/assets`);
    eleventyConfig.addPassthroughCopy(`${inputDir}/robots.txt`);
    eleventyConfig.addPassthroughCopy(`${inputDir}/humans.txt`);
    eleventyConfig.addPassthroughCopy(`${inputDir}/favicon.ico`);
    eleventyConfig.addPassthroughCopy(`${inputDir}/manifest.webmanifest`);

    // A reusable block, so it helps to have it maintainable in one place
    eleventyConfig.addNunjucksAsyncShortcode("image", ImageShortcode);
    eleventyConfig.addNunjucksShortcode("imageSync", ImageShortcodeSync);
    eleventyConfig.addPairedShortcode("captionOverlay", CaptionOverlay);

    markdownTemplateEngine: "njk";

    eleventyConfig.addCollection('posts', collection => {
        if (process.env.ELEVENTY_ENV !== 'production')
            return [...collection.getFilteredByGlob('./src/posts/*.md')];
        else
            return [...collection.getFilteredByGlob('./src/posts/*.md')].filter((post) => !post.data.draft);
    });

    // Change the location for 11ty to enter
    return {
        dir: {
            input: "src",
            layouts: "_includes/layouts"
        }
    }
};
