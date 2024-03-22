/** @format */

module.exports = {
	layout: "post",
	tags: ["post"],
	permalink: function (data) {
		return `${this.yyyymmdd(data.page.date)}/${this.slugify(data.title)}/`;
	},
};
