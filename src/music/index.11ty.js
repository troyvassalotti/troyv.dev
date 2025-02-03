/** @format */

import {html} from "common-tags";

/**
 * Create a set of Plvylist tracks.
 * @param {PlvylistAlbumMeta} dataset Prepared data to convert to Plvylist values.
 * @param {*} globalData Sitewide metadata.
 * @returns {PlvylistTrack[]} Full set of tracks from the album.
 */
function generateTrackData(dataset, globalData) {
	const {cloudinary} = globalData;
	const {artist, artistUrl, title, albumUrl, artwork, tracks} = dataset;

	return tracks.map((track) => {
		return {
			file: `${cloudinary.video}/${track.file}`,
			title: `${track.title}`,
			artist: `${artist}`,
			artistUrl: `${artistUrl}`,
			album: `${title}`,
			albumUrl: `${albumUrl}`,
			artwork: `${cloudinary.image}/${artwork}`,
		};
	});
}

export function data() {
	return {
		title: "Music",
		layout: "base.html",
		description:
			"Music is one of my passions. Check out all my musical projects here.",
		frontRoyal: {
			bandcamp: "https://frontroyalmd.bandcamp.com/",
			website: "https://www.frontroyalband.com/",
		},
		troyalllowercase: {
			bandcamp: "https://troyalllowercase.bandcamp.com/",
		},
		bundle: {
			css: html`
				<style>
					plvy-list {
						color-scheme: light dark;
						font-size: var(--step--1);
						margin-block-start: var(--space-xl);
						max-inline-size: 70rem;

						.no-js-grid {
							margin-block-start: var(--space-l);
						}

						plvy-list-track-title {
							font-weight: bold;
						}

						audio {
							max-inline-size: 100%;
						}
					}
				</style>
			`,
			js: html`
				<script type="module">
					import Plvylist from "plvylist";
				</script>
			`,
		},
	};
}

export function render(data) {
	let {
		frontRoyal,
		troyalllowercase,
		metadata,
		plvylistTracks: {LP1, LP2},
	} = data;
	let lp1Tracks = generateTrackData(LP1, metadata);
	let lp2Tracks = generateTrackData(LP2, metadata);
	let allPlvylistTracks = [...lp1Tracks, ...lp2Tracks];

	return html`
		<main id="main">
			<div class="u-wrapper u-flow">
				<header
					class="u-flow header u-truncate masthead masthead--small masthead--no-contain">
					<h1>I make <glitch-text>music</glitch-text>.</h1>
					<p>
						Check out my bands below, take a deep dive into my
						<a href="/music/stats/">listening habits</a>, or view my
						<a href="/music/collection">music collection</a>.
					</p>
				</header>
				<section class="u-flow u-prose u-truncate">
					<div
						id="front-royal"
						data-truncate>
						<h2 class="u-inline u-step-0 u-font--styled-headings dlig">
							Front Royal:
						</h2>
						<p class="u-inline">
							A punk/alternative/indie/punkternatindie band. If that sounds like
							your thing, check out our
							<a href="${frontRoyal.bandcamp}">Bandcamp</a> or visit our
							<a href="${frontRoyal.website}">website</a>.
						</p>
					</div>
					<div
						id="troyalllowercase"
						data-truncate>
						<h2 class="u-inline u-step-0 u-font--styled-headings dlig">
							troyalllowercase:
						</h2>
						<p class="u-inline">
							My solo project where I do whatever I want. It's got punk, it's
							got emo, it's sometimes instrumental. If you like Front Royal,
							you'll also like this. Check out
							<a href="${troyalllowercase.bandcamp}">my Bandcamp</a> or find me
							on your streaming service of choice. I'll even let you listen to a
							preview of this project using
							<a href="https://plvylist.troyv.dev">Plvylist</a>, a media player
							web component I made.
						</p>
					</div>
					<plvy-list>
						<div
							class="no-js-grid u-grid"
							data-grid-columns="5">
							${allPlvylistTracks
								.map(
									(track) => html`
										<plvy-list-track class="u-flow">
											<plvy-list-track-artwork
												><img
													decoding="async"
													loading="lazy"
													src="${track.artwork}"
													alt="${track.album} artwork"
											/></plvy-list-track-artwork>
											<p>
												<plvy-list-track-title
													>${track.title}</plvy-list-track-title
												>
												by
												<plvy-list-track-artist
													><a href="${track.artistUrl}"
														>${track.artist}</a
													></plvy-list-track-artist
												>
												from the album
												<plvy-list-track-album
													><a href="${track.albumUrl}"
														>${track.album}</a
													></plvy-list-track-album
												>
											</p>
											<audio
												controls
												src="${track.file}"></audio>
										</plvy-list-track>
									`,
								)
								.join("")}
						</div>
					</plvy-list>
				</section>
			</div>
		</main>
	`;
}
