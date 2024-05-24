/** @format */

import fs from "node:fs";
import opml from "opml";

let blogroll;

let opmlText = fs.readFileSync("./src/blogroll/opml.xml", (_err, data) => data);

opml.parse(opmlText, (_err, theOutline) => {
	if (_err) console.log(_err);

	// I don't understand why I can't just set the data value to the return of opml.parse
	// ...unless maybe it doesn't return anything...
	blogroll = theOutline;
});

export default {
	blogroll: blogroll.opml,
};
