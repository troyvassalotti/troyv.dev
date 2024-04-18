/** @format */

import {html} from "common-tags";
import {mix} from "../_includes/mixins/mixin.js";
import RendersPosts from "../_includes/mixins/RendersPosts.js";
import Base from "../_includes/layouts/base.11ty.js";

export default class Tag extends mix(Base).with(RendersPosts) {
	data() {
		return {
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

	content(data) {
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
}
