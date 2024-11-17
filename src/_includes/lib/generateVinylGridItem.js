/** @format */

import {html} from "common-tags";

export function generateVinylGridItem({artwork, release, artist, listens}) {
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
