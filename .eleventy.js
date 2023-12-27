/**
 * @format
 * @file Site configuration Most site features are configured in /utils/
 */

const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

const utilsDir = `${process.cwd()}/utils`;
const jsDir = "/assets/js";

const filters = require(`${utilsDir}/filters`);
const collections = require(`${utilsDir}/collections`);
const transforms = require(`${utilsDir}/transforms`);
const plugins = require(`${utilsDir}/plugins`);
const templates = require(`${utilsDir}/templateFormats`);

module.exports = function (config) {
	// Passthroughs
	config
		.addPassthroughCopy({public: "/"})
		.addPassthroughCopy({
			"./node_modules/es-module-shims/dist/es-module-shims.js": `${jsDir}/es-module-shims.js`,
		})
		.addPassthroughCopy({
			"./node_modules/@troyv/cheatcodes/dist/cheatcodes.js": `${jsDir}/cheatcodes.js`,
		})
		.addPassthroughCopy({
			"./node_modules/@troyv/cloudysky/dist/cloudysky.js": `${jsDir}/cloudysky.js`,
		})
		.addPassthroughCopy({
			"./node_modules/@troyv/detune/dist/detune.js": `${jsDir}/detune.js`,
		})
		.addPassthroughCopy({
			"./node_modules/@troyv/typewriter/dist/typewriter.js": `${jsDir}/typewriter.js`,
		})
		.addPassthroughCopy({
			"./node_modules/plvylist/dist/plvylist.js": `${jsDir}/plvylist.js`,
		})
		.addPassthroughCopy({
			"./node_modules/@troyv/beats-per/dist/beats-per.js": `${jsDir}/beats-per.js`,
		})
		.addPassthroughCopy({
			"./node_modules/@troyv/word-salad/dist/word-salad.js": `${jsDir}/word-salad.js`,
		});

	// Plugins
	Object.keys(plugins).forEach((plugin) => {
		config.addPlugin(plugins[plugin].name, plugins[plugin]?.options);
	});

	// Filters
	Object.keys(filters).forEach((filterName) => {
		config.addFilter(filterName, filters[filterName]);
	});

	// Collections
	Object.keys(collections).forEach((collectionName) => {
		config.addCollection(collectionName, collections[collectionName]);
	});

	// Transforms
	Object.keys(transforms).forEach((transformName) => {
		config.addTransform(transformName, transforms[transformName]);
	});

	// Custom Templates
	Object.keys(templates).forEach((templateName) => {
		config.addTemplateFormats(templateName);
		config.addExtension(templateName, templates[templateName]);
	});

	// Add excerpt support
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
		excerpt_alias: "excerpt",
	});

	/**
	 * Amend Markdown settings
	 * @since 2.0.0
	 * @link https://www.11ty.dev/docs/languages/markdown/#optional-amend-the-library-instance
	 */
	config.amendLibrary("md", (mdLib) =>
		mdLib
			.use(markdownItAnchor, {
				permalink: markdownItAnchor.permalink.headerLink(),
				level: 2,
			})
			.use(markdownItFootnote),
	);

	return {
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		dir: {
			input: "src",
			layouts: "_includes/layouts",
		},
	};
};
