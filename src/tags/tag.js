/** @format */

const {html} = require("common-tags");

class Tag {
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
				title: function ({tag}) {
					return `Tagged "${tag}"`;
				},
				permalink: function ({tag}) {
					return `/tags/${this.slugify(tag)}/`;
				},
			},
		};
	}

	render({tag, capitalize, collections, dateString}) {
		return html`
			<style>
				.posts {
					margin-block: var(--space-m-l);
				}
			</style>

			<main id="main">
				<div class="wrapper constrain--more flow">
					<header class="u-text--center">
						<h1>Posts about “${capitalize(tag)}”</h1>
					</header>
					<section class="posts">
						<ol
							role="list"
							class="c-postList flow">
							{% set taglist = collections[tag] %} {% for post in taglist |
							reverse %}{{ postItem(post.date, post.data.title, post.url) }}{%
							endfor %}
							${collections.tag
								.toReversed()
								.map(({date, title, url, excerpt}) => {
									html`<article class="c-postListItem flow">
										<p class="c-postListItem__date">${dateString(date)}</p>
										<h2 class="c-postListItem__title">
											<a href="${url}">${title}</a>
										</h2>
										${excerpt
											? html`<p class="c-postListItem__excerpt">${excerpt}</p>`
											: ""}
									</article>`;
								})}
						</ol>
					</section>
				</div>
			</main>
		`;
	}
}

module.exports = Tag;
