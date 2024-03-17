/** @format */

const {
	runEleventyFetch,
	createCacheOptions,
	getAlbumArtwork,
} = require("../../utils/helpers.js");
const {
	LISTENBRAINZ_ENDPOINT,
	LISTENBRAINZ_AUTH,
} = require("../../utils/globals.js");
const Mixin = require("../_includes/mixins/mixin.js");
const MusicLibrary = require("../_includes/mixins/MusicLibrary.js");
const {html, safeHtml} = require("common-tags");
const Base = require("../_includes/layouts/base.11ty.js");

const FETCH_HEADERS = {
	fetchOptions: {
		headers: LISTENBRAINZ_AUTH,
	},
};

const CACHE_OPTIONS = createCacheOptions(FETCH_HEADERS);

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

class Stats extends Mixin([MusicLibrary], Base) {
	async data() {
		const topArtistsThisMonth = await getTopArtists();
		const mostRecentListens = await getMostRecentListens();
		const lastMonthsTopReleases = await getLastMonthsTopReleases();

		return {
			title: "Music Stats",
			description: "Aggregated data from my ListenBrainz profile.",
			topArtistsThisMonth,
			mostRecentListens,
			lastMonthsTopReleases,
		};
	}

	style() {
		return (
			super.style() +
			html`
				<style>
					.tables {
						align-items: start;
						display: flex;
						flex-wrap: wrap;
						gap: var(--space-m);
						justify-content: space-between;
					}
				</style>
			`
		);
	}

	content(data) {
		let {title, lastMonthsTopReleases, mostRecentListens, topArtistsThisMonth} =
			data;

		return html`
			<main id="main">
				<div class="wrapper flow">
					<header class="flow masthead masthead--small">
						<h1><glitch-text>${title}</glitch-text></h1>
						<p>
							I keep track of my listening habits in ListenBrainz because I'm a
							<strong>nerd</strong>. All that data is public on
							<a href="https://listenbrainz.org/user/actionhamilton/"
								>my ListenBrainz profile</a
							>, but I've chosen to display a few specific metrics here. Cool,
							right?
						</p>
					</header>
					<div class="flow">
						<h2>Top Releases Last Month</h2>
						<ul
							class="u-grid"
							data-grid-columns="5"
							role="list">
							${this.generateCollectionList(
								lastMonthsTopReleases,
								this.generateVinylGridItem,
							)}
						</ul>
					</div>
					<div class="tables">
						<stats-table
							caption="Last 30 Plays"
							headers="Number Artist Track Release"
							data="${safeHtml`${JSON.stringify(mostRecentListens)}`}">
						</stats-table>
						<stats-table
							caption="Top Artists This Month"
							headers="Number Artist Listens"
							data="${safeHtml`${JSON.stringify(topArtistsThisMonth)}`}">
						</stats-table>
					</div>
				</div>
			</main>
		`;
	}

	script() {
		return (
			super.script() +
			html`<script type="module">
				import "/assets/js/stats-table.js";
			</script>`
		);
	}
}

module.exports = Stats;
