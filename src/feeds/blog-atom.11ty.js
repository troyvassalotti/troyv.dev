/** @format */

import data from "./feeds.11tydata.js";

export default class BlogAtom {
	data() {
		return {
			layout: "atom.njk",
			permalink: "feed.xml",
			...data.feeds.blog,
		};
	}
}
