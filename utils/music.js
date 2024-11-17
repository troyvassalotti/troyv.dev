/** @format */

import metadata from "../src/_data/metadata.js";
import runEleventyFetch from "./eleventyFetch.js";

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
