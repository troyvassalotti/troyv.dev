/** @format */

import EleventyFetch from "@11ty/eleventy-fetch";

function createCacheOptions(customOptions = {}) {
	return Object.assign(
		{
			type: "json",
			directory: "_cache",
		},
		customOptions,
	);
}

// EleventyFetch with default options
async function runEleventyFetch(url, options = createCacheOptions()) {
	return await EleventyFetch(url, options);
}

export {runEleventyFetch as default, createCacheOptions};
