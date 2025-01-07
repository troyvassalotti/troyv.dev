/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.html",
		title: "Music Stats",
		description: "Aggregated data from my ListenBrainz profile.",
		bundle: {
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
	} = data;

	return html`
		<main id="main">
			<div class="u-wrapper u-flow">
				<header class="u-flow masthead masthead--small">
					<h1 class="u-font--styled-heading">
						<glitch-text>${title}</glitch-text>
					</h1>
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
				<div
					class="u-flow"
					id="top-releases-this-month">
					<h2>Top Releases This Month</h2>
					<feed-reader
						atom="https://beta.listenbrainz.org/syndication-feed/user/actionhamilton/stats/art/grid?dimension=3&layout=0&range=this_month"
						contenttype="svg"></feed-reader>
				</div>
				<div
					class="u-flow"
					id="most-recent-listens">
					<h2>Most Recent Listens (8 Hours)</h2>
					<feed-reader
						atom="https://listenbrainz.org/syndication-feed/user/actionhamilton/listens?minutes=480"></feed-reader>
				</div>
				<div
					class="u-flow"
					id="top-artists-this-month">
					<h2>Top Artists This Month</h2>
					<feed-reader
						atom="https://listenbrainz.org/syndication-feed/user/actionhamilton/stats/top-artists?range=this_month&count=10"></feed-reader>
				</div>
			</div>
		</main>
	`;
}
