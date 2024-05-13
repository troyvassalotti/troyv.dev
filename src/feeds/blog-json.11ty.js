/** @format */

import data from "./feeds.11tydata.js";

export default class BlogAtom {
	data() {
		return {
			layout: "json.njk",
			permalink: "feed.json",
			...data.feeds.blog,
		};
	}
}
