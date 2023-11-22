/** @format */

const {html} = require("common-tags");
const Mixin = require("../_includes/mixins/mixin");
const RendersPosts = require("../_includes/mixins/RendersPosts.js");

class Tag extends Mixin([RendersPosts]) {
	data() {
		return {
			layout: "base",
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

	render({tag, collections}) {
		return html`
			<style>
				.posts {
					margin-block: var(--space-m-l);
				}
			</style>

			<main id="main">
				<div class="wrapper constrain--more flow">
					<header class="u-text--center">
						<h1>Posts about “${this.capitalize(tag)}”</h1>
					</header>
					<section class="posts">
						${this.generatePostList(collections[tag], true)}
					</section>
				</div>
			</main>
		`;
	}
}

module.exports = Tag;
