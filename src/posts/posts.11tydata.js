/** @format */

const configWebmentions = require("../../utils/configWebmentions");
const {getWebmentions} = require("@chrisburnell/eleventy-cache-webmentions")();

module.exports = {
	layout: "post",
	tags: ["post"],
	permalink: function (data) {
		return `${this.yyyymmdd(data.page.date)}/${this.slugify(data.title)}/`;
	},
	eleventyComputed: {
		webmentions: (data) => {
			return getWebmentions(
				configWebmentions,
				configWebmentions.domain + data.page.url,
			);
		},
	},
};
