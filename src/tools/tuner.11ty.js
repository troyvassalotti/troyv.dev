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
					<de-tune>
						<button>E2</button>
						<button>A2</button>
						<button>D3</button>
						<button>G3</button>
						<button>B3</button>
						<button>E4</button>
					</de-tune>
				</div>
				<div class="detune">
					<h2>Half Step Down</h2>
					<de-tune>
						<button>Eb2</button>
						<button>Ab2</button>
						<button>Db3</button>
						<button>Gb3</button>
						<button>Bb3</button>
						<button>Eb4</button>
					</de-tune>
				</div>
				<div class="detune">
					<h2>Drop D</h2>
					<de-tune>
						<button>D2</button>
						<button>A2</button>
						<button>D3</button>
						<button>G3</button>
						<button>B3</button>
						<button>E4</button>
					</de-tune>
				</div>
				<div class="detune">
					<h2>D Standard</h2>
					<de-tune>
						<button>D2</button>
						<button>G2</button>
						<button>C3</button>
						<button>F3</button>
						<button>A3</button>
						<button>D4</button>
					</de-tune>
				</div>
				<div class="detune">
					<h2>C# Standard</h2>
					<de-tune>
						<button>C#2</button>
						<button>F#2</button>
						<button>B3</button>
						<button>E3</button>
						<button>G#3</button>
						<button>C#3</button>
					</de-tune>
				</div>
			</div>
		`;
	}
}

module.exports = Tuner;
