/**
 * @format
 * @file Site configuration Most site features are configured in /utils/
 */

const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

const utilsDir = `${process.cwd()}/utils`;

const filters = require(`${utilsDir}/filters`);
const collections = require(`${utilsDir}/collections`);
const plugins = require(`${utilsDir}/plugins`);

module.exports = function (config) {
	// Passthroughs
	config.addPassthroughCopy({public: "/"});

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

	// Add excerpt support
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
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
