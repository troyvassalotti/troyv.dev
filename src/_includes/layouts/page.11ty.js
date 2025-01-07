/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.html",
	};
}

export function render(data) {
	// Possible front matter options
	let {
		containment,
		title,
		truncate,
		glitch,
		outputDescription,
		description,
		noHeaderContainment,
		content,
	} = data;

	return html`
		<main id="main">
			<div
				class="u-wrapper constrain--${containment ||
				"base"} u-flow u-prose ${truncate ? "u-truncate" : ""}">
				<header
					class="u-flow masthead masthead--small ${noHeaderContainment
						? "masthead--no-contain"
						: ""}">
					<h1 class="u-font--styled-heading">
						${glitch
							? html`<glitch-text>${title}</glitch-text>`
							: html`${title}`}
					</h1>
					${outputDescription ? html`<p>${description}</p>` : ""}
				</header>
				${content}
			</div>
		</main>
	`;
}
