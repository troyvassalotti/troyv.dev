/** @format */

import {html} from "common-tags";

/**
 * Concat a set of HTML list items from a collection.
 * @param {any[]} collection Set of objects in a collection.
 * @param {Function} callback Callback function for the collection item.
 * @returns {string} HTML list content.
 */
function generateCollectionList(collection, callback) {
	return collection?.map((item) => callback(item)).join("");
}

function generateVinylGridItem({artwork, title: release, artist, listens}) {
	return html`
		<li>
			<div class="release">
				<style>
					.release {
						display: flex;
						flex-direction: column;
						justify-content: end;
					}

					.releaseName {
						font-weight: bold;
					}

					.releaseArt {
						aspect-ratio: 1 / 1;
						background: radial-gradient(var(--background), var(--foreground));
						margin-block-end: var(--space-xs);
					}
				</style>
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
				<p class="releaseName u-step--1">${release}</p>
				<p class="u-step--2">${artist}</p>
				${listens ? html`<p class="u-step--2">${listens} Listens</p>` : ""}
			</div>
		</li>
	`;
}

export function data() {
	return {
		title: "Music Collection",
		description: "A place to keep track of my physical music collection.",
		layout: "base.html",
	};
}

export function render(data) {
	let {
		title,
		musicLibrary: {ownedVinyl, vinylWishlist},
	} = data;

	return html`
		<main id="main">
			<div class="u-wrapper u-flow">
				<header
					class="masthead masthead--small masthead--no-contain u-truncate u-flow">
					<h1>
						<glitch-text>${title}</glitch-text>
					</h1>
					<p>
						I use
						<a href="https://musicbrainz.org/user/actionhamilton"
							>MusicBrainz</a
						>
						for tracking my music collection. It isn't a perfect system, but it
						gets the job done. Lists are in no particular order.
					</p>
				</header>
				<article
					id="vinyl"
					class="vinyl u-flow u-prose u-truncate">
					<h2>Vinyl</h2>
					<ul
						role="list"
						class="u-grid"
						data-grid-columns="5">
						${generateCollectionList(ownedVinyl, generateVinylGridItem)}
					</ul>
					<h3>The Wishlist</h3>
					<p>
						I <em>could</em> order these online but the point of this list is
						that I find them out in the wild. I don't even know if all of these
						have been pressed before, but I'm holding out hope.
					</p>
					<ul>
						${generateCollectionList(vinylWishlist, generateSimpleListItem)}
					</ul>
				</article>
			</div>
		</main>
	`;
}

function generateSimpleListItem({artist, title}) {
	return html`
		<li>
			<b>${artist}</b>:
			<i>${title}</i>
		</li>
	`;
}
