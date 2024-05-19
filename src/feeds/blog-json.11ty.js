/** @format */

import metadata from "../_data/metadata.js";

export function data() {
	return {
		layout: "json.njk",
		permalink: "feed.json",
		...metadata.rss.feeds.blog,
	};
}
