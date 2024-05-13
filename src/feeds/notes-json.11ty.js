/** @format */

import data from "./feeds.11tydata.js";

export default class NotesAtom {
	data() {
		return {
			layout: "json.njk",
			permalink: "notes.json",
			...data.feeds.notes,
		};
	}
}
