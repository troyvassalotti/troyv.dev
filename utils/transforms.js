/**
 * @file Site transforms
 */

const htmlmin = require("html-minifier-terser");

module.exports = {
	htmlmin: function(content, outputPath) {
		if (process.env.ELEVENTY_ENV === "production") {
			if (this.outputPath && this.outputPath.endsWith(".html")) {
				return htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: false,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
				});
			}
			return content; // Returns content if file doesn't end in .html
		} else {
			return content; // Return content if ELEVENTY_ENV isn't in "production"
		}
	},
};
