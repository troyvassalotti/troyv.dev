/** @format */

import {html} from "common-tags";

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
	let {frontRoyal, troyalllowercase} = data;

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
					<plvy-list
						class="plvylist"
						file="/assets/js/plvylist.json">
					</plvy-list>
				</section>
			</div>
		</main>
	`;
}
