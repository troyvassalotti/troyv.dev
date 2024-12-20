/** @format */

import {html} from "common-tags";
import Icons from "../_includes/partials/icons.js";

export function data() {
	return {
		layout: "page.11ty.js",
		glitch: true,
		outputDescription: true,
		noHeaderContainment: true,
		title: "Projects",
		description:
			"A non-exhaustive list of things I've made ranging from little tools to bonafide apps.",
		bundle: {
			css: html`
				<style>
					.c-link--icon svg {
						display: inline-block;
						margin-inline-end: var(--space-2xs);
						max-inline-size: 1.5em;
						vertical-align: middle;
					}
				</style>
			`,
		},
	};
}

export function render({projects}) {
	return html`
		<ul
			role="list"
			class="u-flow">
			${projects
				.toReversed()
				.map(({url, description, name, repository}) => {
					return html`
						<li>
							<p class="u-font--headings u-step-2 u-text--bold">
								${url ? html`<a href="${url}">${name}</a>` : html`${name}`}
							</p>
							<p>${description}</p>
							${repository
								? html`<p>
										<a
											class="c-link--icon"
											href="${repository}"
											>${Icons("github")}${repository.replace(
												"https://github.com/",
												"",
											)}</a
										>
									</p>`
								: ""}
						</li>
					`;
				})
				.join("")}
		</ul>
	`;
}
