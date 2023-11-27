/** @format */

const Mixin = require("../_includes/mixins/mixin.js");
const MusicLibrary = require("../_includes/mixins/MusicLibrary.js");
const {html} = require("common-tags");

class Collection extends Mixin([MusicLibrary]) {
	data() {
		return {
			layout: "base",
			title: "Music Collection",
			description: "A place to keep track of my physical music collection.",
		};
	}

	generateSimpleListItem({artist, title}) {
		return html`<li>
			<b>${artist}</b>:
			<i>${title}</i>
		</li>`;
	}

	render({title, musicLibrary: {ownedVinyl, vinylWishlist}}) {
		return html` <h1>${title}</h1>
			<p>
				I use
				<a href="https://musicbrainz.org/user/actionhamilton">MusicBrainz</a>
				for tracking my music collection. It isn't a perfect system, but it gets
				the job done. Lists are in no particular order.
			</p>
			<article
				id="vinyl"
				class="vinyl flow">
				<section class="ownedVinyl flow">
					<h2>Vinyl</h2>
					<ul
						role="list"
						class="releaseGrid">
						${this.generateCollectionList(
							ownedVinyl,
							this.generateVinylGridItem,
						)}
					</ul>
				</section>
				<section class="wishlist flow">
					<h2>The Wishlist</h2>
					<p>
						I <em>could</em> order these online but the point of this list is
						that I find them out in the wild. I don't even know if all of these
						have been pressed before, but I'm holding out hope.
					</p>
					<ul>
						${this.generateCollectionList(
							vinylWishlist,
							this.generateSimpleListItem,
						)}
					</ul>
				</section>
			</article>`;
	}
}

module.exports = Collection;
