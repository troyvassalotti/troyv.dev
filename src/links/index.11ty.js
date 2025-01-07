/** @format */

import {html} from "common-tags";

export function data() {
	return {
		title: "Links",
		description: "Think of this like a linktree, but on my own website.",
		layout: "base.html",
		bundle: {
			css: html`
				<style>
					body {
						display: grid;
						grid-template-rows: auto 1fr auto;
					}

					.linktree {
						inline-size: 100%;
						margin-inline: auto;
						max-inline-size: 40ch;
						place-self: center;

						.header {
							text-align: center;
						}

						.links a {
							background-color: var(--foreground);
							border-color: var(--foreground);
							border-radius: var(--space-xs);
							color: var(--background);
							display: block;
							padding: 1em;
							text-align: center;

							&:not(:hover, :focus) {
								text-decoration: none;
							}

							@media (prefers-reduced-motion: no-preference) {
								transition: transform 0.2s ease;

								&:is(:hover, :focus) {
									transform: scale(1.05);
								}
							}
						}
					}
				</style>
			`,
		},
	};
}

export function render(data) {
	return html`
		<main class="linktree">
			<div class="u-wrapper u-flow">
				<div class="header">
					<h1 class="u-font--styled-heading">
						<glitch-text>Links</glitch-text>
					</h1>
					<p>${data.description}</p>
				</div>
				<ul
					role="list"
					class="links u-flow">
					<li><a href="https://www.frontroyalband.com">Front Royal</a></li>
					<li>
						<a href="https://troyalllowercase.bandcamp.com">troyalllowercase</a>
					</li>
					<li><a href="https://stateparks.troyv.dev">State Park travels</a></li>
					<li><a href="/running/">Running playlists</a></li>
				</ul>
			</div>
		</main>
	`;
}
