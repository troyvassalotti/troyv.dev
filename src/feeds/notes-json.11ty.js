/** @format */

import metadata from "../_data/metadata.js";

export function data() {
	return {
		layout: "json.njk",
		permalink: "notes.json",
		...metadata.rss.feeds.notes,
	};
}
