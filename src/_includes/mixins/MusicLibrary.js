/** @format */

const {html} = require("common-tags");

const MusicLibrary = function (Base) {
	return class extends Base {
		/**
		 * Concat a set of HTML list items from a collection.
		 * @param {any[]} collection Set of objects in a collection.
		 * @param {Function} callback Callback function for the collection item.
		 * @returns {string} HTML list content.
		 */
		generateCollectionList(collection, callback) {
			return collection?.map((item) => callback(item)).join("");
		}

		generateVinylGridItem({artwork, title, artist, listens}) {
			return html`<li>
				<div class="release">
					${artwork
						? html`<img
								class="releaseArt"
								width="300"
								height="300"
								src="${artwork}"
								alt=""
								loading="lazy"
								decoding="async" />`
						: html`<div class="releaseArt"></div>`}
					<p class="releaseName">${title}</p>
					<p class="releaseArtist">${artist}</p>
					${listens
						? html`<p class="releaseListens">${listens} Listens</p>`
						: ""}
				</div>
			</li> `;
		}
	};
};

module.exports = MusicLibrary;
