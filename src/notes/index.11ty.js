/** @format */

import {html} from "common-tags";
import Icons from "../_includes/partials/icons.js";

export function data() {
	return {
		"override:layout": "base.html",
		"override:tags": [],
		"override:permalink": "/notes/",
		title: "Notes",
		description: "Shortform notes I make.",
		bundle: {
			css: html`
				<style>
					.rss {
						align-items: center;
						display: flex;
						gap: 1ch;

						svg {
							inline-size: 1em;
						}
					}

					.noteList > li + li {
						margin-block-start: var(--space-l);
					}
				</style>
			`,
			js: undefined,
		},
	};
}

export function render(data) {
	let {
		title,
		collections: {note},
	} = data;

	return html`
		<main id="main">
			<div class="wrapper flow">
				<header class="flow masthead masthead--small">
					<h1><glitch-text>${title}</glitch-text></h1>
					<div class="rss u-invertSvg--onDark">
						<span>${Icons("rss")}</span>
						<span>Subscribe to the <a href="/notes.xml">RSS feed</a>.</span>
					</div>
				</header>
				<section class="notes">
					<ol
						class="noteList"
						role="list">
						${note.toReversed().map(({date, url, content}) => {
							return html`
								<li>
									<article class="h-entry note flow">
										<time
											class="dt-published u-step--1"
											datetime="${date.toISOString()}"
											>${this.localizedDateString(date)}</time
										>
										<div class="e-content u-truncate flow">${content}</div>
										<div class="permalink">
											<a
												class="u-url u-uid u-step--1"
												href="${url}"
												>Permalink</a
											>
										</div>
									</article>
								</li>
							`;
						})}
					</ol>
				</section>
			</div>
		</main>
	`;
}
