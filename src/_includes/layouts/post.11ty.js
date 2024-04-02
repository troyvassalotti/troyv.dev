/** @format */

const {html} = require("common-tags");
const Base = require("./base.11ty.js");

class Post extends Base {
	style() {
		return html`
			<style>
				pre[class*="language-"] {
					margin-block: var(--space-s);
					max-inline-size: 60em;
				}

				code[class*="language-"],
				pre[class*="language-"] {
					white-space: pre-line; /* bandaid while I eventually address spacing issues with tabs */
				}

				.footnotes-sep {
					max-inline-size: 70ch;
				}

				.footnote-backref:not(:hover, :focus-visible) {
					text-decoration: none;
				}

				.postSummary {
					font-style: italic;
				}

				:is(h1, h2, h3, h4, h5, h6) > a {
					color: currentColor;
				}

				:is(h1, h2, h3, h4, h5, h6) > a:not(:hover, :focus-visible) {
					text-decoration: none;
				}

				:is(h1, h2, h3, h4, h5, h6) > a:hover::after {
					content: "🔗";
					margin-inline-start: 0.5ch;
					position: absolute;
				}

				/* Post Navigation */
				.c-postNavigation {
					margin-block-start: var(--space-l-xl);
				}

				.c-postNavigation dl {
					align-items: start;
					display: flex;
					flex-wrap: wrap;
					gap: var(--space-m-l);
					justify-content: space-between;
				}

				.c-postNavigation dt {
					font-family: var(--headings);
					font-weight: bold;
				}
			</style>
		`;
	}

	generateSyndicationLinks(syndication) {
		return syndication
			.map((location) => {
				if (location === "mastodon") {
					return html`<a
						rel="syndication noreferrer"
						class="u-syndication"
						href="https://brid.gy/publish/mastodon"></a>`;
				}
			})
			.join("");
	}

	content(data) {
		let {
			content,
			syndication,
			page,
			title,
			description,
			collections: {post},
		} = data;

		let {date} = page;

		let nextPost = this.getNextCollectionItem(post, page);
		let previousPost = this.getPreviousCollectionItem(post, page);

		return html`
			<main id="main">
				<div class="wrapper">
					<article class="h-entry flow prose">
						<header class="flow masthead masthead--small masthead--no-contain">
							<h1 class="postTitle p-name">${title}</h1>
							<p class="postSummary p-summary u-step--1">${description}</p>
							<p class="postMeta u-step--1">
								<span class="dt-published">${this.dateString(date)}</span>
							</p>
						</header>
						<div class="post flow u-truncate e-content">
							${content}

							<!-- Syndication -->
							${syndication ? this.generateSyndicationLinks(syndication) : ""}
						</div>
					</article>

					<web-mentions
						domain="https://www.troyv.dev"
						loadstyles
						showtitle></web-mentions>

					<!-- Post Navigation -->
					${nextPost || previousPost
						? html`
								<nav
									aria-label="pagination"
									class="c-postNavigation">
									<dl>
										${nextPost
											? html`<div>
													<dt class="u-step-1">Next Post:</dt>
													<dd>
														<a href="${this.url(nextPost.url)}"
															>${nextPost.data.title}</a
														>
													</dd>
												</div>`
											: ""}
										${previousPost
											? html`<div>
													<dt class="u-step-1">Previous Post:</dt>
													<dd>
														<a href="${this.url(previousPost.url)}"
															>${previousPost.data.title}</a
														>
													</dd>
												</div>`
											: ""}
									</dl>
								</nav>
							`
						: html``}
				</div>
			</main>
		`;
	}

	script() {
		return html`
			<script>
				for (const block of document.querySelectorAll(
					"pre[class*='language-']",
				)) {
					if (block instanceof HTMLElement) {
						block.tabIndex = 0;
					}
				}
			</script>
			<script type="module">
				import "/assets/js/web-mentions.js";
			</script>
		`;
	}
}

module.exports = Post;
