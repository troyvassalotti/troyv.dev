/** @format */

import {html} from "common-tags";
import Base from "../_includes/layouts/base.11ty.js";

export default class Notes extends Base {
	data() {
		return {
			title: "Notes",
			description: "Shortform notes I make.",
			"override:layout": null,
			"override:tags": [],
			"override:permalink": "/notes/",
		};
	}

	content(data) {
		let {
			title,
			collections: {note},
		} = data;

		return html`
			<main id="main">
				<div class="wrapper flow">
					<header class="masthead masthead--small">
						<h1><glitch-text>${title}</glitch-text></h1>
					</header>
					<section class="notes">
						<ol
							class="noteList flow"
							role="list">
							${note.toReversed().map(({date, url, content}) => {
								return html`
									<li>
										<article class="h-entry note">
											<time
												class="dt-published u-step--1"
												datetime="${date.toISOString()}"
												>${this.localizedDateString(date)}</time
											>
											<div class="e-content">${content}</div>
											<a
												class="u-url u-uid u-step--1"
												href="${url}"
												>Permalink</a
											>
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
}
