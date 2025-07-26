/** @format */

export default {
	layout: "note.11ty.js",
	tags: ["note"],
	permalink(data) {
		return `/notes/${data.page.date.getTime()}/`;
	},
	eleventyComputed: {
		title(data) {
			return data.title
				? `Note: ${data.title}`
				: `Note: ${data.page.date.getTime()}`;
		},
	},
	syndication: ["mastodon"],
};
