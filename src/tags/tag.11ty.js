/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.11ty.js",
		pagination: {
			data: "collections",
			size: 1,
			alias: "tag",
			filter: ["all", "post", "allTagsList"],
		},
		eleventyComputed: {
			title: ({tag}) => `Tagged "${tag}"`,
			permalink: function ({tag}) {
				return `/tags/${this.slugify(tag)}/`;
			},
		},
	};
}

export function render(data) {
	let {tag, collections} = data;

	return html`
		<main id="main">
			<div class="wrapper flow">
				<header class="masthead masthead--small masthead--no-contain">
					<h1>
						Posts about
						<em>${this.capitalize(tag)}</em>
					</h1>
				</header>
				<section class="posts">
					${this.generatePostList(collections[tag], true)}
				</section>
			</div>
		</main>
	`;
}
