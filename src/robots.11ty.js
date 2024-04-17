/** @format */

const {DARK_VISITORS_AUTH} = require("../utils/globals.js");

class RobotsTXT {
	async data() {
		const robots = await fetch(
			"https://api.darkvisitors.com/robots-txts",
			DARK_VISITORS_AUTH,
		);

		return {
			permalink: "dark-visitors.txt",
			robots,
		};
	}

	render({robots}) {
		return JSON.stringify(robots.body);
	}
}

module.exports = RobotsTXT;
