/** @format */

const {html} = require("common-tags");

class Collection {
	data() {
		return {
			layout: "base",
			title: "Music Collection",
			description: "A place to keep track of my physical music collection.",
		};
	}

	generateVinylGrid(library) {
		return library.map((item) => this.generateVinylGridItem(item)).join("");
	}

	generateVinylGridItem({artwork, title, artist}) {
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
			</div>
		</li> `;
	}

	generateSimpleList(library) {
		return library.map((item) => this.generateSimpleListItem(item)).join("");
	}

	generateSimpleListItem({artist, title}) {
		return html`<li>
			<b>${artist}</b>:
			<i>${title}</i>
		</li>`;
	}

	render({title, musicLibrary: {ownedVinyl, vinylWishList}}) {
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
						${this.generateVinylGrid(ownedVinyl)}
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
						${this.generateSimpleList(vinylWishList)}
					</ul>
				</section>
			</article>`;
	}
}

module.exports = Collection;
