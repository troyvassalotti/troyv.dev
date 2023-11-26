/** @format */

const {html} = require("common-tags");
const Icons = require("../_includes/partials/icons.js");
const Mixin = require("../_includes/mixins/mixin.js");
const RendersPosts = require("../_includes/mixins/RendersPosts.js");
const Base = require("../_includes/layouts/base.11ty.js");

class Posts extends Mixin([RendersPosts], Base) {
	data() {
		return {
			title: "Posts Archive",
			description: "I occasionally write about things.",
			"override:layout": null,
			"override:tags": [],
			"override:permalink": "/archive/",
		};
	}

	style() {
		super.style();

		return html`<style>
			.c-tagCloud {
				margin-block: var(--space-l-xl);
			}

			.posts {
				margin-block: var(--space-m-l);
			}

			.c-postList {
				--flow-space: var(--space-s-m);
			}

			.rss {
				align-items: center;
				display: flex;
				gap: 1ch;
				justify-content: center;
			}

			.rss svg {
				max-inline-size: 1em;
			}

			.c-tagCloud__title {
				font-family: var(--headings);
				font-size: var(--step-1);
				font-weight: bold;
				margin-block-end: revert;
			}

			.c-tagCloud__list {
				display: flex;
				flex-wrap: wrap;
				gap: var(--space-2xs-xs);
			}

			.c-tagCloud__tag {
				background-color: var(--foreground);
				border-radius: 4px;
				color: var(--background);
				display: inline-block;
				font-size: var(--step--1);
				padding-inline: 8px;
			}

			.c-tagCloud__tag::before {
				content: "#";
			}
		</style>`;
	}

	content(data) {
		let {
			title,
			collections: {allTagsList, post},
		} = data;

		return html`
			<div class="wrapper constrain--more">
				<main id="main">
					<section>
						<header class="u-text--center">
							<h1>${title}</h1>
							<div class="rss u-invertSvg--onDark">
								<span>${Icons("rss")}</span>
								<span>Subscribe to the <a href="/feed.xml">RSS feed</a>.</span>
							</div>
						</header>
						<nav
							aria-label="tags"
							class="c-tagCloud">
							<p class="c-tagCloud__title">Tags (${allTagsList.length}):</p>
							<ul
								class="c-tagCloud__list"
								role="list">
								${allTagsList.sort().map((tag) => {
									return html`<li>
										<a
											href="/tags/${this.slugify(tag)}/"
											class="c-tagCloud__tag">
											<span class="visually-hidden">Posts tagged</span> ${tag}
										</a>
									</li>`;
								})}
							</ul>
						</nav>
					</section>
					<section class="posts">${this.generatePostList(post, true)}</section>
				</main>
			</div>
		`;
	}
}

module.exports = Posts;
