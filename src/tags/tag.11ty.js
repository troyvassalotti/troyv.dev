/** @format */

const {html} = require("common-tags");
const {mix} = require("../_includes/mixins/mixin");
const RendersPosts = require("../_includes/mixins/RendersPosts.js");
const Base = require("../_includes/layouts/base.11ty.js");

class Tag extends mix(Base).with(RendersPosts) {
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

module.exports = Tag;
