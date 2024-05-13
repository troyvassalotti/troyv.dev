/** @format */

export default {
	eleventyExcludeFromCollections: true,
	feeds: {
		blog: {
			title: "Troy Vassalotti :: Blog",
			subtitle: "Troy writes about web development and being a person.",
			items: "post",
			alternate: "archive/",
		},
		notes: {
			title: "Troy Vassalotti :: Notes",
			subtitle: "Bite-sized notes from Troy.",
			items: "note",
			alternate: "notes/",
		},
	},
};
