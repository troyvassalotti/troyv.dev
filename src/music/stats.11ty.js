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
	const topArtistsThisMonth = await getTopArtists();
	const mostRecentListens = await getMostRecentListens();
	const lastMonthsTopReleases = await getLastMonthsTopReleases();

	return {
		layout: "base.html",
		title: "Music Stats",
		description: "Aggregated data from my ListenBrainz profile.",
		topArtistsThisMonth,
		mostRecentListens,
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
		},
	};
}

export function render(data) {
	let {
		title,
		page: {date},
		lastMonthsTopReleases,
		mostRecentListens,
		topArtistsThisMonth,
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
				<div class="tables">
					<cool-table
						headless-body
						unfixed>
						<table>
							<caption>
								Last 30 Plays
							</caption>
							<colgroup>
								<col class="col--artist" />
								<col class="col--track" />
								<col class="col--release" />
							</colgroup>
							<thead>
								<tr>
									<th
										id="last-30-artist"
										scope="col">
										Artist
									</th>
									<th
										id="last-30-track"
										scope="col">
										Track
									</th>
									<th
										id="last-30-release"
										scope="col">
										Release
									</th>
								</tr>
							</thead>
							<tbody>
								${mostRecentListens
									.map(
										(listen) => html`
											<tr>
												<td headers="last-30-artist">${listen.artist}</td>
												<td headers="last-30-track">${listen.song}</td>
												<td headers="last-30-release">${listen.release}</td>
											</tr>
										`,
									)
									.join("")}
							</tbody>
						</table>
					</cool-table>
					<cool-table
						headless-body
						unfixed>
						<table>
							<caption>
								Top Artists This Month
							</caption>
							<colgroup>
								<col class="col--artist" />
								<col class="col--listens" />
							</colgroup>
							<thead>
								<tr>
									<th id="top-artists-artist">Artist</th>
									<th id="top-artists-listens">Listens</th>
								</tr>
							</thead>
							<tbody>
								${topArtistsThisMonth
									.map(
										(artist) => html`
											<tr>
												<td headers="top-artists-artist">${artist.name}</td>
												<td headers="top-artists-listens">${artist.listens}</td>
											</tr>
										`,
									)
									.join("")}
							</tbody>
						</table>
					</cool-table>
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		return false;
	}
}
