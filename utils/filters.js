/**
 * @format
 * @file Custom template filters
 */

/**
 * Date string used in header data on posts
 */
function dateString(date) {
	return date.toUTCString().replace(/\s00:00:00\sGMT/g, "");
}

/**
 * Slash-separated dates
 */
function yyyymmdd(date) {
	const d = new Date(date);
	let year = d.getUTCFullYear();
	let month = d.getUTCMonth() + 1;
	let day = d.getUTCDate();

	if (month < 10) {
		month = "0" + month;
	}

	if (day < 10) {
		day = "0" + day;
	}

	return `${year}/${month}/${day}`;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	dateString,
	yyyymmdd,
	capitalize,
};
