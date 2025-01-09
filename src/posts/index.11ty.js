/** @format */

import {html} from "common-tags";

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
					summary {
						border-block-end: 1px solid var(--primary);
						cursor: pointer;
						font-family: var(--styled-headings);
						font-weight: bold;
						inline-size: fit-content;
						margin-block-end: 0.5em;
						padding-block-end: 0.5em;
					}

					.tagCloud {
						inset-block-start: 0;
						position: sticky;

						.tagCloud__list {
							display: flex;
							flex-wrap: wrap;
							gap: var(--space-2xs-xs);

							@media (hover) {
								& > li {
									transition: opacity 0.2s ease-in;
								}

								&:hover > li:not(:hover) {
									opacity: 0.25;
								}
							}
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
					<h1>
						<glitch-text>${title}</glitch-text>
					</h1>
				</header>
				<section class="posts">
					<div class="stickyContainer">
						<nav
							aria-label="tags"
							class="tagCloud u-step--1 u-flow">
							<h2
								class="tagCloud__title u-font--styled-headings u-step-1 dlig onum">
								Tags (${taggedPosts.length}):
							</h2>
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
					<div class="postLists u-flow">
						<details
							name="posts"
							open>
							<summary class="dlig">Last Published</summary>
							${this.generatePostList(post, true)}
						</details>
						<details name="posts">
							<summary class="dlig">Last Updated</summary>
							${this.generatePostList(post, true, "updated")}
						</details>
					</div>
				</section>
			</div>
		</main>
	`;
}
