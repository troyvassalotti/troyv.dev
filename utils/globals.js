// Load .env variables with dotenv
require("dotenv").config();

const DEFAULT_CACHE_OPTIONS = {
	type: "json",
	directory: "_cache",
};

const DEFAULT_SERVERLESS_CACHE_OPTIONS = {
	type: "json",
	directory: "/tmp/.cache/",
	duration: "30m",
};

const MUSICBRAINZ_ENDPOINT = "https://musicbrainz.org/ws/2/";
const LISTENBRAINZ_ENDPOINT = "https://api.listenbrainz.org/1/";
const LISTENBRAINZ_AUTH = { Authorization: "Token " + process.env.LISTENBRAINZ_TOKEN };
const COVERT_ART_ENDPOINT = "https://coverartarchive.org/release/";

module.exports = {
	DEFAULT_CACHE_OPTIONS,
	MUSICBRAINZ_ENDPOINT,
	DEFAULT_SERVERLESS_CACHE_OPTIONS,
	LISTENBRAINZ_ENDPOINT,
	LISTENBRAINZ_AUTH,
	COVERT_ART_ENDPOINT,
};
