const EleventyFetch = require("@11ty/eleventy-fetch");
const { DEFAULT_CACHE_OPTIONS, DEFAULT_SERVERLESS_CACHE_OPTIONS } = require("./globals");

function createCacheOptions(isServerless, customOptions = {}) {
	let options = isServerless ? DEFAULT_SERVERLESS_CACHE_OPTIONS : DEFAULT_CACHE_OPTIONS;

	return Object.assign(options, customOptions);
}

async function runEleventyFetch(url, options = createCacheOptions()) {
	return await EleventyFetch(
		url,
		options,
	);
}

module.exports = {
	runEleventyFetch,
	createCacheOptions,
};
