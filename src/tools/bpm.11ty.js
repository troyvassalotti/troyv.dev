/** @format */

import {html} from "common-tags";

export function data() {
	return {
		title: "BPM Finder",
		glitch: true,
		permalink: "/bpm/",
		layout: "base",
	};
}

export const bundle = {
	css: html`
		<style>
			beats-per {
				display: block;
			}
		</style>
	`,
	js: html`
		<script type="module">
			import BeatsPer from "beats-per";
		</script>
	`,
};

export function render() {
	return html`
		<beats-per class="flow">
			<p>BPM: <output data-bp-bpm></output></p>
			<p>Count: <output data-bp-count></output></p>
			<button data-bp-button>Tap BPM</button>
		</beats-per>
	`;
}
