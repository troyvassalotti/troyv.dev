/** @format */

import {html} from "common-tags";

export function data() {
	return {
		glitch: true,
		title: "Tuner",
		permalink: "/tuner/",
		layout: "page.11ty.js",
		bundle: {
			css: html`
				<style>
					de-tune {
						--input-gap: 1em;
						--input-size: 4em;

						&::part(notes) {
							display: flex;
							flex-wrap: wrap;
							gap: var(--input-gap);
						}

						&::part(note) {
							border: 0;
							font: inherit;
							font-weight: bold;
						}

						&::part(play-all-container) {
							margin-block-start: var(--space-s);
						}
					}
				</style>
			`,
			js: html`
				<script type="module">
					import Detune from "detune";
				</script>
			`,
		},
	};
}

export function render() {
	return html`
		<div
			class="tunings u-grid"
			data-grid-columns="3">
			<div class="detune u-flow">
				<h2 class="u-step-1">Standard</h2>
				<de-tune notes="E2 A2 D3 G3 B3 E4"></de-tune>
			</div>
			<div class="detune u-flow">
				<h2 class="u-step-1">Half Step Down</h2>
				<de-tune notes="Eb2 Ab2 Db3 Gb3 Bb3 Eb4"></de-tune>
			</div>
			<div class="detune u-flow">
				<h2 class="u-step-1">Drop D</h2>
				<de-tune notes="D2 A2 D3 G3 B3 E4"></de-tune>
			</div>
			<div class="detune u-flow">
				<h2 class="u-step-1">D Standard</h2>
				<de-tune notes="D2 G2 C3 F3 A3 D4"></de-tune>
			</div>
			<div class="detune u-flow">
				<h2 class="u-step-1">C# Standard</h2>
				<de-tune notes="C#2 F#2 B2 E3 G#3 C#4"></de-tune>
			</div>
		</div>
	`;
}
