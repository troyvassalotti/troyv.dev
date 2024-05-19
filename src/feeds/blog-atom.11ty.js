/** @format */

import metadata from "../_data/metadata.js";

export function data() {
	return {
		layout: "atom.njk",
		permalink: "feed.xml",
		...metadata.rss.feeds.blog,
	};
}
