/** @format */

import EleventyFetch from "@11ty/eleventy-fetch";
import metadata from "../src/_data/metadata.js";

// This is supposed to return an updated robots.txt but fails consistently.
// The only way it works is going to https://httpie.io/app and returning the response there.
// fetch("https://api.darkvisitors.com/robots-txts", {
// 	method: "POST",
// 	headers: {
// 		Authorization: "Bearer " + process.env.DARK_VISITORS_TOKEN,
// 		"Content-Type": "application/json",
// 	},
// 	body: '{"agent_types":["AI Data Scraper","AI Search Crawler","AI Assistant"],"disallow":"/"}',
// })
// 	.then((response) => response.json())
// 	.then((response) => console.log(response))
// 	.catch((err) => console.error(err));

const coverArtArchiveEndpoint = "https://coverartarchive.org/release/";

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
export async function runEleventyFetch(url, options = createCacheOptions()) {
	return await EleventyFetch(url, options);
}

export async function getAlbumArtwork(mbid, thumb = false) {
	try {
		if (thumb) {
			const data = await runEleventyFetch(`${coverArtArchiveEndpoint}${mbid}`);

			const {images} = data;
			const front = images.find((image) => image.front);

			const {thumbnails} = front;

			return `${metadata.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${thumbnails["500"]}`;
		}

		return `${metadata.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${coverArtArchiveEndpoint}${mbid}/front`;
	} catch (error) {
		console.error(error);
		return false;
	}
}
