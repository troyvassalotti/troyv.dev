/** @format */

import {html} from "common-tags";

export function generateVinylGridItem({artwork, title, artist, listens}) {
	return html`
		<li>
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
				${listens ? html`<p class="releaseListens">${listens} Listens</p>` : ""}
			</div>
		</li>
	`;
}
