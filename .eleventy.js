const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const {minify} = require("terser");

const inputDir = "src";

const componentsDir = `${inputDir}/_includes/components`;
const ContactForm = require(`./${componentsDir}/ContactForm`);
const Figure = require(`./${componentsDir}/Figure`);
const Button = require(`./${componentsDir}/Button`);
const CaptionOverlay = require(`./${componentsDir}/CaptionOverlay`);
const ProjectFeature = require(`./${componentsDir}/ProjectFeature`);
const ImageShortcode = require(`./${componentsDir}/ImageShortcode`);
const ImageShortcodeSync = require(`./${componentsDir}/ImageShortcodeSync`);

// Do all the 11ty stuff
module.exports = function (eleventyConfig) {
  // add the syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // add a css minifier filter from clean-css
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
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

  // Add aliases for layouts in the includes folder
  eleventyConfig.addLayoutAlias("primary", "layouts/primary.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("responsecode", "layouts/responsecode.njk");

  // Passthroughs
  eleventyConfig.addPassthroughCopy(`${inputDir}/assets`);
  eleventyConfig.addPassthroughCopy(`${inputDir}/robots.txt`);
  eleventyConfig.addPassthroughCopy(`${inputDir}/about/resume.pdf`);
  eleventyConfig.addPassthroughCopy(`${inputDir}/favicon.ico`);

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addNunjucksAsyncShortcode("image", ImageShortcode);
  eleventyConfig.addNunjucksShortcode("imageSync", ImageShortcodeSync);
  eleventyConfig.addShortcode("contactForm", ContactForm);
  eleventyConfig.addShortcode("figure", Figure);
  eleventyConfig.addShortcode("button", Button);
  eleventyConfig.addPairedShortcode("captionOverlay", CaptionOverlay);
  eleventyConfig.addPairedShortcode("projectFeature", ProjectFeature);

  // Change the location for 11ty to enter
  return {
    dir: {
      input: "src"
    }
  }
};
