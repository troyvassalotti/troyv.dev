/** @format */

import Fetch from "@11ty/eleventy-fetch";

export function createCacheOptions(customOptions = {}) {
	return Object.assign(
		{
			...{
				type: "json",
				directory: "_cache",
				fetchOptions: {
					headers: {
						"user-agent": "troyv.dev/2.0.0 (https://www.troyv.dev/contact/)",
					},
				},
			},
		},
		customOptions,
	);
}

// EleventyFetch with default options
export default async function runEleventyFetch(
	url,
	options = createCacheOptions(),
) {
	return await Fetch(url, options);
}
