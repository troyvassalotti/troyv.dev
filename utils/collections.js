/**
 * @file Custom site collections
 */

/**
 * Some pre-generated tags are unnecessary or make templating complicated
 * @param tags
 * @returns {*[]}
 */
function filterTagList(tags) {
	return (tags || []).filter((tag) => ["all", "post", "posts"].indexOf(tag) === -1);
}

module.exports = {
	/**
	 * Used on the /tags/ page
	 * @param collection
	 * @returns {*[]}
	 */
	allTagsList: function(collection) {
		const tagSet = new Set();
		collection.getAll().forEach((item) => {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		});

		return filterTagList([...tagSet]);
	},
};
