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

			<h1>${title}</h1>
			<beats-per class="flow"></beats-per>
		`;
	}
}

module.exports = BPM;