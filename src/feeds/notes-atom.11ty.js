/** @format */

import data from "./feeds.11tydata.js";

export default class NotesAtom {
	data() {
		return {
			layout: "atom.njk",
			permalink: "notes.xml",
			...data.feeds.notes,
		};
	}
}
