/** @format */

import metadata from "../_data/metadata.js";

export function data() {
	return {
		layout: "atom.njk",
		permalink: "notes.xml",
		...metadata.rss.feeds.notes,
	};
}
