/** @format */

export default {
	layout: "note",
	tags: ["note"],
	date: "git Created",
	permalink(data) {
		return `/notes/${data.page.date.getTime()}/`;
	},
	syndication: ["mastodon"],
};
