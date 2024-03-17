/** @format */

const {html} = require("common-tags");

class BPM {
	data() {
		return {
			layout: "base",
			title: "BPM Finder",
			permalink: "/bpm/",
		};
	}

	render({title}) {
		return html`
			<script type="module">
				import BeatsPer from "beats-per";
			</script>

			<style>
				beats-per {
					display: block;
				}
			</style>

			<h1>${title}</h1>
			<beats-per class="flow">
				<p>BPM: <output data-bp-bpm></output></p>
				<p>Count: <output data-bp-count></output></p>
				<button data-bp-button>Tap BPM</button>
			</beats-per>
		`;
	}
}

module.exports = BPM;
