/** @format */

export default {
	layout: "note.11ty.js",
	tags: ["note"],
	date: "git Created",
	permalink(data) {
		return `/notes/${data.page.date.getTime()}/`;
	},
	syndication: ["mastodon"],
};
