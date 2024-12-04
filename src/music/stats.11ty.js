/** @format */

import runEleventyFetch, {
	createCacheOptions,
} from "../../utils/eleventyFetch.js";
import {getAlbumArtwork} from "../../utils/music.js";
import {html} from "common-tags";
import "dotenv/config";
import {generateVinylGridItem} from "../_includes/lib/generateVinylGridItem.js";
import {generateCollectionList} from "../_includes/lib/generateCollectionList.js";

export async function data() {
	const lastMonthsTopReleases = await getLastMonthsTopReleases();

	return {
		layout: "base.html",
		title: "Music Stats",
		description: "Aggregated data from my ListenBrainz profile.",
		lastMonthsTopReleases,
		bundle: {
			css: html`
				<style>
					.tables {
						align-items: start;
						display: flex;
						flex-wrap: wrap;
						gap: var(--space-m);
						justify-content: space-between;
					}
				</style>
			`,
			js: html`
				<script type="module">
					import FeedReader from "feed-reader";
					FeedReader.register();
				</script>
			`,
		},
	};
}

export function render(data) {
	let {
		title,
		page: {date},
		lastMonthsTopReleases,
	} = data;

	return html`
		<main id="main">
			<div class="u-wrapper u-flow">
				<header class="u-flow masthead masthead--small">
					<h1><glitch-text>${title}</glitch-text></h1>
					<p class="u-step--1 u-text--italic">
						Last updated: ${this.localizedDateString(date)}
					</p>
					<p>
						I keep track of my listening habits in ListenBrainz because I'm a
						<strong>nerd</strong>. All that data is public on
						<a href="https://listenbrainz.org/user/actionhamilton/"
							>my ListenBrainz profile</a
						>, but I've chosen to display a few specific metrics here. Cool,
						right?
					</p>
				</header>
				<div class="u-flow">
					<h2>Top Releases Last Month</h2>
					<ul
						class="u-grid"
						data-grid-columns="5"
						role="list">
						${generateCollectionList(
							lastMonthsTopReleases,
							generateVinylGridItem,
						)}
					</ul>
				</div>
				<cool-separator></cool-separator>
				<blockquote>
					<p>EVERYTHING BELOW THIS POINT IS A WORK IN PROGRESS</p>
					<p>
						ListenBrainz now has Atom feeds and I'm excited to start using those
						instead of my old system.
					</p>
				</blockquote>
				<cool-separator></cool-separator>
				<div class="u-flow">
					<h2>Top Releases This Month</h2>
					<feed-reader
						atom="https://listenbrainz.org/syndication-feed/user/actionhamilton/stats/top-albums?range=this_month&count=10"></feed-reader>
				</div>
				<div class="tables">
					<div id="most-recent-listens">
						<h2>Most Recent Listens (8 Hours)</h2>
						<feed-reader
							atom="https://listenbrainz.org/syndication-feed/user/actionhamilton/listens?minutes=480"></feed-reader>
					</div>
					<div id="top-artists-this-month">
						<h2>Top Artists This Month</h2>
						<feed-reader
							atom="https://listenbrainz.org/syndication-feed/user/actionhamilton/stats/top-artists?range=this_month&count=10"></feed-reader>
					</div>
				</div>
			</div>
		</main>
	`;
}

const LISTENBRAINZ_ENDPOINT = "https://api.listenbrainz.org/1/";
const CACHE_OPTIONS = createCacheOptions({
	fetchOptions: {
		headers: {
			Authorization: "Token " + process.env.LISTENBRAINZ_TOKEN,
		},
	},
});

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
		console.error(error);
		return false;
	}
}
