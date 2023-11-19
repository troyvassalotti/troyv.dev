/**
 * @format
 * @file Custom Template Formats
 */

const sass = require("sass");
const path = require("node:path");

module.exports = {
	scss: {
		outputFileExtension: "css", // optional, default: "html"

		// can be an async function
		compile: function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			let scssInIncludes = `${this.config.dir.input}/${this.config.dir.includes}/css`;

			let result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || ".", scssInIncludes],
			});

			return () => {
				return result.css;
			};
		},
	},
};
