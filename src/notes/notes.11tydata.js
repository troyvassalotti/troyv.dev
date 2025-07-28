/** @format */

export default {
	layout: "note.11ty.js",
	tags: ["note"],
	permalink(data) {
		return `/notes/${data.page.date.getTime()}/`;
	},
	eleventyComputed: {
		title(data) {
			// @since 2025-07-25: Prior to Sveltia CMS, titles weren't in front matter
			return data.title
				? `Note: ${data.title}`
				: `Note: ${data.page.date.getTime()}`;
		},
	},
	syndication: ["mastodon"],
};
