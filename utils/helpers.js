/** @format */

import EleventyFetch from "@11ty/eleventy-fetch";
import metadata from "../src/_data/metadata.js";

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
	const coverArtArchiveEndpoint = "https://coverartarchive.org/release/";

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
