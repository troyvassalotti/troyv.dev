/** @format */

/**
 * Concat a set of HTML list items from a collection.
 * @param {any[]} collection Set of objects in a collection.
 * @param {Function} callback Callback function for the collection item.
 * @returns {string} HTML list content.
 */
export function generateCollectionList(collection, callback) {
	return collection?.map((item) => callback(item)).join("");
}
