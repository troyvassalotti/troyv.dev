/** @format */

import {html} from "common-tags";
import Icons from "../_includes/partials/icons.js";

export function data() {
	return {
		"override:layout": "base.html",
		"override:tags": [],
		"override:permalink": "/archive/",
		title: "Posts Archive",
		description: "I occasionally write about things.",
		bundle: {
			css: html`
				<style>
					.rss {
						align-items: center;
						display: flex;
						gap: 1ch;

						svg {
							inline-size: 1em;
						}
					}

					.tagCloud {
						inset-block-start: 0;
						position: sticky;

						.tagCloud__title {
							font-family: var(--headings);
							font-size: var(--step-1);
							font-weight: bold;
							margin-block-end: revert;
						}

						.tagCloud__list {
							display: flex;
							flex-wrap: wrap;
							gap: var(--space-2xs-xs);
						}

						.tagCloud__tag {
							border: 1px solid currentColor;
							border-radius: 4px;
							display: inline-block;
							padding-block: 4px;
							padding-inline: 8px;
							text-decoration: none;
						}

						.tagCloud__tag::before {
							content: "#";
						}
					}

					.posts {
						display: grid;
						gap: var(--space-l-xl);
					}

					@container (width > 60rem) {
						.posts {
							grid-template-columns: 33% auto;
						}
					}
				</style>
			`,
			js: undefined,
		},
	};
}

export function render(data) {
	let {
		title,
		collections: {taggedPosts, post},
	} = data;

	return html`
		<main id="main">
			<div class="u-wrapper u-flow">
				<header class="u-flow masthead masthead--small">
					<h1><glitch-text>${title}</glitch-text></h1>
					<div class="rss u-invertSvg--onDark">
						<span>${Icons("rss")}</span>
						<span>Subscribe to the <a href="/feed.xml">RSS feed</a>.</span>
					</div>
				</header>
				<section class="posts">
					<div class="stickyContainer">
						<nav
							aria-label="tags"
							class="tagCloud u-step--1">
							<p class="tagCloud__title">Tags (${taggedPosts.length}):</p>
							<ul
								class="tagCloud__list"
								role="list">
								${taggedPosts.sort().map((tag) => {
									return html`<li>
										<a
											href="/tags/${this.slugify(tag)}/"
											class="tagCloud__tag">
											<span class="u-visually-hidden">Posts tagged</span>
											${tag}
										</a>
									</li>`;
								})}
							</ul>
						</nav>
					</div>
					${this.generatePostList(post, true)}
				</section>
			</div>
		</main>
	`;
}
