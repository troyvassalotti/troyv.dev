/** @format */

const {html} = require("common-tags");
const {DARK_VISITORS_AUTH} = require("../utils/globals.js");

class RobotsTXT {
	async data() {
		const robots = await fetch(
			"https://api.darkvisitors.com/robots-txts",
			DARK_VISITORS_AUTH,
		);

		return {
			permalink: "robots.txt",
			robots,
		};
	}

	render({robots}) {
		return html`${robots}`;
	}
}

module.exports = RobotsTXT;
