/** @format */

import {html} from "common-tags";
import {generateCollectionList} from "../_includes/lib/generateCollectionList.js";
import {generateVinylGridItem} from "../_includes/lib/generateVinylGridItem.js";

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
			<div class="wrapper flow">
				<header
					class="masthead masthead--small masthead--no-contain u-truncate flow">
					<h1><glitch-text>${title}</glitch-text></h1>
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
					class="vinyl flow prose u-truncate">
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
