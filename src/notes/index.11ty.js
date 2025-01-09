/** @format */

import {html} from "common-tags";

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
					.noteList > li + li {
						margin-block-start: var(--space-l);
					}

					.e-content {
						margin-inline-start: 1em;
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
			<div class="u-wrapper u-flow">
				<header class="u-flow masthead masthead--small">
					<h1>
						<glitch-text>${title}</glitch-text>
					</h1>
				</header>
				<section class="notes">
					<ol
						class="noteList"
						role="list">
						${note.toReversed().map(({date, url, content}) => {
							return html`
								<li>
									<article class="h-entry note u-flow">
										<div class="permalink u-font--code u-underline-offset">
											<a
												class="u-url u-uid u-step--1"
												href="${url}">
												<time
													class="dt-published"
													datetime="${date.toISOString()}"
													>${this.localizedDateString(date)}</time
												>
											</a>
										</div>
										<div class="e-content u-truncate u-flow">${content}</div>
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
