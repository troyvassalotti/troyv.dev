/** @format */

import {html} from "common-tags";
import Base from "../_includes/layouts/base.11ty.js";

export default class BPM extends Base {
	data() {
		return {
			title: "BPM Finder",
			glitch: true,
			permalink: "/bpm/",
		};
	}

	style() {
		return html`
			<style>
				beats-per {
					display: block;
				}
			</style>
		`;
	}

	script() {
		return html`
			<script type="module">
				import BeatsPer from "beats-per";
			</script>
		`;
	}

	content(data) {
		let page = html`
			<beats-per class="flow">
				<p>BPM: <output data-bp-bpm></output></p>
				<p>Count: <output data-bp-count></output></p>
				<button data-bp-button>Tap BPM</button>
			</beats-per>
		`;

		return this.defaultTemplate(data, page);
	}
}
