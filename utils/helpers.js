/** @format */

import EleventyFetch from "@11ty/eleventy-fetch";
import METADATA from "../src/_data/metadata.js";

// This is supposed to return an updated robots.txt but fails consistently.
// The only way it works is going to https://httpie.io/app and returning the response there.
// const options = {
//   method: 'POST',
//   headers: {
//     Authorization: 'Bearer ' + process.env.DARK_VISITORS_TOKEN,
//     'Content-Type': 'application/json'
//   },
//   body: '{"agent_types":["AI Data Scraper","AI Search Crawler","AI Assistant"],"disallow":"/"}'
// };
//
// fetch('https://api.darkvisitors.com/robots-txts', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

export const DEFAULT_CACHE_OPTIONS = {
	type: "json",
	directory: "_cache",
};

const COVER_ART_ENDPOINT = "https://coverartarchive.org/release/";

export function createCacheOptions(customOptions = {}) {
	return Object.assign(DEFAULT_CACHE_OPTIONS, customOptions);
}

export async function runEleventyFetch(url, options = createCacheOptions()) {
	return await EleventyFetch(url, options);
}

export async function getAlbumArtwork(mbid, thumb = false) {
	try {
		if (thumb) {
			const data = await runEleventyFetch(`${COVER_ART_ENDPOINT}${mbid}`);

			const {images} = data;
			const front = images.find((image) => image.front);

			const {thumbnails} = front;

			return `${METADATA.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${thumbnails["500"]}`;
		}

		return `${METADATA.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${COVER_ART_ENDPOINT}${mbid}/front`;
	} catch (error) {
		return false;
	}
}

/**
 * Escapes HTML content.
 *
 * @param {string} unsafe HTML content that needs escaping.
 * @returns {string} Escaped HTML.
 */
export function escapeHTML(unsafe) {
	return unsafe.replace(/[&<"']/g, function (m) {
		switch (m) {
			case "&":
				return "&amp;";
			case "<":
				return "&lt;";
			case '"':
				return "&quot;";
			default:
				return "&#039;";
		}
	});
}
