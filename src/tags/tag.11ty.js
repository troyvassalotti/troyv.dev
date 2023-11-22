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
						<ol
							role="list"
							class="c-postList flow">
							${collections[tag]
								.toReversed()
								.map(({date, data: {title}, url, excerpt}) => {
									return html`<article class="c-postListItem flow">
										<p class="c-postListItem__date">${this.dateString(date)}</p>
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
