/**
 * @format
 * @file Custom site collections.
 */

/**
 * Some pre-generated tags are unnecessary or make templating complicated
 */
function filterTagList(tags) {
	return (tags || []).filter(
		(tag) => ["all", "post", "posts"].indexOf(tag) === -1,
	);
}

/**
 * Used on the /tags/ page
 */
function allTagsList(collection) {
	const tagSet = new Set();
	collection.getAll().forEach((item) => {
		(item.data.tags || []).forEach((tag) => tagSet.add(tag));
	});

	return filterTagList([...tagSet]);
}

module.exports = {allTagsList};
