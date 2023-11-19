/** @format */

const EleventyFetch = require("@11ty/eleventy-fetch");
const {
	DEFAULT_CACHE_OPTIONS,
	DEFAULT_SERVERLESS_CACHE_OPTIONS,
	COVERT_ART_ENDPOINT,
} = require("./globals");
const METADATA = require("../src/_data/metadata.json");

function createCacheOptions(isServerless, customOptions = {}) {
	let options = isServerless
		? DEFAULT_SERVERLESS_CACHE_OPTIONS
		: DEFAULT_CACHE_OPTIONS;

	return Object.assign(options, customOptions);
}

async function runEleventyFetch(url, options = createCacheOptions()) {
	return await EleventyFetch(url, options);
}

async function getAlbumArtwork(mbid, thumb = false) {
	try {
		if (thumb) {
			const data = await runEleventyFetch(`${COVERT_ART_ENDPOINT}${mbid}`);

			const {images} = data;
			const front = images.find((image) => image.front);

			const {thumbnails} = front;

			return `${METADATA.cloudinaryFetch}/c_scale,f_auto,q_auto:eco,w_500/${thumbnails["500"]}`;
		}

		return `${METADATA.cloudinaryFetch}/c_scale,f_auto,q_auto:eco,w_500/${COVERT_ART_ENDPOINT}${mbid}/front`;
	} catch (error) {
		return false;
	}
}

module.exports = {
	runEleventyFetch,
	createCacheOptions,
	getAlbumArtwork,
};
