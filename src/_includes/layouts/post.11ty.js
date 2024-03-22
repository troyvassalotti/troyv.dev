/** @format */

const {html} = require("common-tags");
const Base = require("./base.11ty.js");
const {Icon} = require("../partials/index.js");

class Post extends Base {
	#defaultImg = Icon("user");

	style() {
		return (
			super.style() +
			html`<style>
				.post pre[class*="language-"] {
					margin-block: var(--space-s-m);
					max-inline-size: 60em;
				}

				.postSummary {
					font-style: italic;
				}

				.postHeader {
					border-block-end: 2px solid var(--accent, currentColor);
					max-inline-size: 75ch;
					padding-block: var(--space-m);
				}

				:is(h1, h2, h3, h4, h5, h6) > a:hover::after {
					content: "🔗";
					margin-inline-start: 0.5ch;
					position: absolute;
				}

				/* Post Navigation */
				.c-postNavigation {
					margin-block: var(--space-l-xl);
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
			</style>`
		);
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

	generateWebmentionCountSection(webmention) {
		return html`<a
			class="h-card u-url link-u-exempt"
			href="${webmention.url}"
			id="webmention-${webmention["wm-id"]}"
			target="_blank"
			rel="noopener noreferrer">
			<img
				width="48"
				height="48"
				src="${webmention.author.photo
					? webmention.author.photo
					: this.#defaultImg}"
				alt="${webmention.author.name}"
				class="webmentions__face"
				loading="lazy"
				decoding="async" />
		</a>`;
	}

	generateSingleWebmention(webmention) {
		return html`<article
			class="webmention h-cite"
			id="webmention-${webmention["wm-id"]}">
			<div class="webmention__meta">
				${
					webmention.author
						? html`<a
								class="webmention__author p-author h-card u-url"
								href="${webmention.url}"
								target="_blank"
								rel="noopener noreferrer">
								${webmention.author.photo
									? html`<img
											width="48"
											height="48"
											class="webmention__author__photo u-photo"
											src="${webmention.author.photo}"
											alt="${webmention.author.name}"
											decoding="async"
											loading="lazy" />`
									: html`<img
											width="48"
											height="48"
											class="webmention__author__photo"
											src="${this.#defaultImg}"
											alt=""
											decoding="async"
											loading="lazy" />`}
							</a>`
						: html`<span class="webmention__author">
								<img
									width="48"
									height="48"
									class="webmention__author__photo"
									src="${this.#defaultImg}"
									alt=""
									decoding="async"
									loading="lazy" />
								<strong>Anonymous</strong>
							</span>`
				}
					  ${
							webmention.published
								? html`<time
										class="webmention__pubdate dt-published"
										datetime="${webmention.published}">
										${webmention.published}
									</time>`
								: ""
						}
				  ${
						webmention.content
							? html`<div class="webmention__content p-content">
									${webmention.content}
								</div>`
							: ""
					}
		</article>`;
	}

	content(data) {
		let {
			content,
			syndication,
			page,
			title,
			description,
			webmentions,
			collections: {post},
		} = data;

		let {date} = page;

		let nextPost = this.getNextCollectionItem(post, page);
		let previousPost = this.getPreviousCollectionItem(post, page);

		return html`
			<main id="main">
				<div class="wrapper">
					<article class="h-entry flow prose">
						<header class="flow postHeader">
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

					<web-mentions domain="https://www.troyv.dev"></web-mentions>

					<web-mentions
						domain="https://www.troyv.dev"
						variant="facepile"
						loadstyles></web-mentions>
				</div>
			</main>

			<!-- Post Navigation -->
			${nextPost || previousPost
				? html`<div class="wrapper">
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
					</div>`
				: ""}
		`;
	}

	script() {
		return (
			super.script() +
			html`
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
			`
		);
	}
}

module.exports = Post;
