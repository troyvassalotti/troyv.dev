/** @format */

import {html} from "common-tags";

export function data() {
	return {
		title: "Music",
		layout: "base.11ty.js",
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
			<div class="wrapper flow">
				<header
					class="flow header u-truncate masthead masthead--small masthead--no-contain">
					<h1>I make <glitch-text>music</glitch-text>.</h1>
					<p>
						Check out my projects below, take a deep dive into my
						<a href="/music/stats/">listening habits</a>, or view my
						<a href="/music/collection">music collection</a>.
					</p>
				</header>
				<section class="flow prose u-truncate">
					<h2>Front Royal</h2>
					<p>
						A punk/alternative/indie/punkternatindie band. If that sounds like
						your thing, check out our
						<a href="${frontRoyal.bandcamp}">Bandcamp</a> or visit our
						<a href="${frontRoyal.website}">website</a>.
					</p>
					<h2>troyalllowercase</h2>
					<p>
						My solo project where I do whatever I want. It's got punk, it's got
						emo, it's sometimes instrumental. If you like Front Royal, you'll
						also like this. Check out
						<a href="${troyalllowercase.bandcamp}">my Bandcamp</a> or find me on
						your streaming service of choice.
					</p>
					<p>
						I'll even let you listen to a preview of this project using
						<a href="https://plvylist.troyv.dev">Plvylist</a>, a media player
						web component I made.
					</p>
					<plvy-list
						class="plvylist"
						file="/assets/js/plvylist.json">
					</plvy-list>
				</section>
			</div>
		</main>
	`;
}
