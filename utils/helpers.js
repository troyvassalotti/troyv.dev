/** @format */

const EleventyFetch = require("@11ty/eleventy-fetch");
const {DEFAULT_CACHE_OPTIONS, COVERT_ART_ENDPOINT} = require("./globals");
const METADATA = require("../src/_data/metadata");

function createCacheOptions(customOptions = {}) {
	return Object.assign(DEFAULT_CACHE_OPTIONS, customOptions);
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

			return `${METADATA.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${thumbnails["500"]}`;
		}

		return `${METADATA.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${COVERT_ART_ENDPOINT}${mbid}/front`;
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
function escapeHTML(unsafe) {
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

module.exports = {
	runEleventyFetch,
	createCacheOptions,
	getAlbumArtwork,
	escapeHTML,
};
