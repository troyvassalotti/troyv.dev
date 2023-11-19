/** @format */

const {
	runEleventyFetch,
	createCacheOptions,
	getAlbumArtwork,
} = require("../../utils/helpers");
const {
	LISTENBRAINZ_ENDPOINT,
	LISTENBRAINZ_AUTH,
} = require("../../utils/globals");

const FETCH_HEADERS = {
	fetchOptions: {
		headers: LISTENBRAINZ_AUTH,
	},
};

const CACHE_OPTIONS = process.env.ELEVENTY_SERVERLESS
	? createCacheOptions(true, FETCH_HEADERS)
	: createCacheOptions(false, FETCH_HEADERS);

/**
 * Return my top (default: 10) artists in the given timeframe (default: this month)
 * @param api
 * @param auth
 * @param fetchDir
 * @param count
 * @param range
 * @returns {Promise<boolean|*>}
 */
async function getTopArtists(count = 10, range = "this_month") {
	try {
		const data = await runEleventyFetch(
			`${LISTENBRAINZ_ENDPOINT}stats/user/actionhamilton/artists?count=${count}&range=${range}`,
			CACHE_OPTIONS,
		);

		const {payload} = data;
		const {artists} = payload;

		return artists.map((artist) => {
			const {artist_name: name, listen_count: listens} = artist;
			return {name, listens};
		});
	} catch (error) {
		return false;
	}
}

/**
 * Gets my most recent listens (default: 30) from ListenBrainz
 * @param api
 * @param auth
 * @param fetchDir
 * @param count
 * @returns {Promise<boolean|*>}
 */
async function getMostRecentListens(count = 30) {
	try {
		const data = await runEleventyFetch(
			`${LISTENBRAINZ_ENDPOINT}user/actionhamilton/listens?count=${count}`,
			CACHE_OPTIONS,
		);

		const {payload} = data;
		const {listens} = payload;
		const metadata = listens.map((track) => track.track_metadata);

		return metadata.map((track) => {
			const {
				artist_name: artist,
				track_name: song,
				release_name: release,
			} = track;
			return {artist, song, release};
		});
	} catch (error) {
		return false;
	}
}

/**
 * Get my top releases (default: 10) from ListenBrainz
 * @param api
 * @param auth
 * @param fetchDir
 * @param count
 * @param range
 * @returns {Promise<boolean>}
 */
async function getLastMonthsTopReleases(count = 10, range = "month") {
	try {
		const data = await runEleventyFetch(
			`${LISTENBRAINZ_ENDPOINT}stats/user/actionhamilton/releases?count=${count}&range=${range}`,
			CACHE_OPTIONS,
		);

		const {payload} = data;
		const {releases} = payload;

		const releaseData = await Promise.all(
			releases.map(async (eachRelease) => {
				const {
					artist_name: artist,
					release_name: release,
					listen_count: listens,
					release_mbid: mbid,
				} = eachRelease;

				let artwork = await getAlbumArtwork(mbid);

				return {artist, release, listens, artwork};
			}),
		);

		return releaseData;
	} catch (error) {
		return false;
	}
}

module.exports = async function () {
	const topArtistsThisMonth = await getTopArtists();
	const mostRecentListens = await getMostRecentListens();
	const lastMonthsTopReleases = await getLastMonthsTopReleases();

	return {
		title: "Music Stats",
		description: "Aggregated data from my ListenBrainz profile.",
		permalink: {
			ondemand: "/music/stats/",
		},
		topArtistsThisMonth,
		mostRecentListens,
		lastMonthsTopReleases,
	};
};
