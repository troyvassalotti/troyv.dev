/** @format */

import EleventyFetch from "@11ty/eleventy-fetch";

export function createCacheOptions(customOptions = {}) {
	return Object.assign(
		{
			type: "json",
			directory: "_cache",
		},
		customOptions,
	);
}

// EleventyFetch with default options
export default async function runEleventyFetch(
	url,
	options = createCacheOptions(),
) {
	return await EleventyFetch(url, options);
}
