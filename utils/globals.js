/** @format */

// Load .env variables with dotenv
require("dotenv").config();

const DEFAULT_CACHE_OPTIONS = {
	type: "json",
	directory: "_cache",
};

const MUSICBRAINZ_ENDPOINT = "https://musicbrainz.org/ws/2/";
const LISTENBRAINZ_ENDPOINT = "https://api.listenbrainz.org/1/";
const LISTENBRAINZ_AUTH = {
	Authorization: "Token " + process.env.LISTENBRAINZ_TOKEN,
};
const COVERT_ART_ENDPOINT = "https://coverartarchive.org/release/";

module.exports = {
	DEFAULT_CACHE_OPTIONS,
	MUSICBRAINZ_ENDPOINT,
	LISTENBRAINZ_ENDPOINT,
	LISTENBRAINZ_AUTH,
	COVERT_ART_ENDPOINT,
};
