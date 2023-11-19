/** @format */

const {html} = require("common-tags");

class Tuner {
	data() {
		return {
			layout: "base",
			title: "Tuner",
			permalink: "/tuner/",
		};
	}

	render({title}) {
		return html`
			<script type="module">
				import {Detune} from "detune";
			</script>

			<h1>${title}</h1>
			<div class="u-grid">
				<div class="detune">
					<h2>Standard</h2>
					<de-tune notes="E2 A2 D3 G3 B3 E4"></de-tune>
				</div>
				<div class="detune">
					<h2>Half Step Down</h2>
					<de-tune notes="Eb2 Ab2 Db3 Gb3 Bb3 Eb4"></de-tune>
				</div>
				<div class="detune">
					<h2>Drop D</h2>
					<de-tune notes="D2 A2 D3 G3 B3 E4"></de-tune>
				</div>
				<div class="detune">
					<h2>D Standard</h2>
					<de-tune notes="D2 G2 C3 F3 A3 D4"></de-tune>
				</div>
				<div class="detune">
					<h2>C# Standard</h2>
					<de-tune notes="C#2 F#2 B3 E3 G#3 C#4"></de-tune>
				</div>
			</div>
		`;
	}
}

module.exports = Tuner;
