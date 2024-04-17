/** @format */

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

module.exports = {
	DEFAULT_CACHE_OPTIONS,
	MUSICBRAINZ_ENDPOINT,
	LISTENBRAINZ_ENDPOINT,
	LISTENBRAINZ_AUTH,
	COVERT_ART_ENDPOINT,
};
