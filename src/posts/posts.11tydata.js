/** @format */

export default {
	layout: "post",
	tags: ["post"],
	permalink(data) {
		return `${this.yyyymmdd(data.page.date)}/${this.slugify(data.title)}/`;
	},
};
