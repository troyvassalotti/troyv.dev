/** @format */

const {html} = require("common-tags");
const Mixin = require("../_includes/mixins/mixin");
const RendersPosts = require("../_includes/mixins/RendersPosts.js");
const Base = require("../_includes/layouts/base.11ty.js");

class Tag extends Mixin([RendersPosts], Base) {
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

	style() {
		return (
			super.style() +
			html`<style>
				.posts {
					margin-block: var(--space-m-l);
				}
			</style>`
		);
	}

	content(data) {
		let {tag, collections} = data;

		return html`
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
