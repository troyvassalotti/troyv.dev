/** @format */

const {html} = require("common-tags");
const Base = require("./base.11ty.js");
const {Icon} = require("../partials/index.js");

class Post extends Base {
	#defaultImg = Icon("user");

	style() {
		super.style();

		return html`<style>
			.post pre[class*="language-"] {
				margin-block: var(--space-s-m);
				max-inline-size: 60em;
			}

			.post :is(h2, h3, h4, h5, h6) {
				margin-block-start: var(--space-xl-2xl);
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

			.post p {
				hyphens: initial;
			}

			/* Webmention Section */
			.webmentions {
				margin-block: var(--space-s-l);
				max-inline-size: 70rem;
				padding-block: var(--space-2xs);
			}

			.webmentions h2 {
				font-size: var(--step-1);
				font-variant: small-caps;
			}

			.webmentions h3 {
				font-size: var(--step-0);
				margin-block: 1ch;
			}

			.webmentions__facepile {
				align-items: center;
				display: flex;
				flex-wrap: wrap;
			}

			.webmentions__face {
				block-size: 2rem;
				border-radius: 50%;
				flex: none;
				inline-size: 2rem;
				margin: revert;
				object-fit: cover;
			}

			.webmentions__item:not(:first-of-type) {
				margin-block-start: 2rem;
			}

			/* Single Webmention */
			.webmention__meta,
			.webmention__author {
				align-items: center;
				display: flex;
				flex-wrap: wrap;
			}

			.webmention__meta {
				margin-block-end: 1rem;
			}

			.webmention__author {
				margin-inline-end: 0.5rem;
			}

			.webmention__author__photo {
				block-size: 3rem;
				border-radius: 50%;
				inline-size: 3rem;
				margin-inline-end: 0.5rem;
				object-fit: cover;
			}

			.webmention__pubdate {
				font-style: italic;
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
		</style>`;
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
					: this.#defaultImg}}"
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
								href="{{ webmention.url }}"
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
											loading="lazy" />`}
						  </a>`
						: html`<span class="webmention__author">
								<img
									width="48"
									height="48"
									class="webmention__author__photo"
									src="{{ defaultImg }}"
									alt=""
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

		let reposts = this.filterWebmentions(webmentions, "repost-of");
		let likes = this.filterWebmentions(webmentions, "like-of");
		let bookmarks = this.filterWebmentions(webmentions, "bookmark-of");
		let replies = this.filterWebmentions(webmentions, "in-reply-to");
		let mentions = this.filterWebmentions(webmentions, "mention-of");

		let nextPost = this.getNextCollectionItem(post, page);
		let previousPost = this.getPreviousCollectionItem(post, page);

		return html`
			<div class="wrapper constrain--some">
				<main id="main">
					<article class="h-entry flow">
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

					<!-- Webmentions -->
					<hr class="u-rule" />
					<section
						class="webmentions"
						id="webmentions">
						<h2>Webmentions</h2>
						${webmentions.length
							? html`
									${reposts.length
										? html`
												<div class="webmentions__repost">
													<h3>Reposts: ${reposts.length}</h3>
													<div class="webmentions__facepile">
														${reposts
															.toReversed()
															.map((webmention) =>
																this.generateWebmentionCountSection(webmention),
															)
															.join("")}
													</div>
												</div>
										  `
										: ""}
									${likes.length
										? html`
												<div class="webmentions__like">
													<h3>Likes: ${likes.length}</h3>
													<div class="webmentions__facepile">
														${likes
															.toReversed()
															.map((webmention) =>
																this.generateWebmentionCountSection(webmention),
															)
															.join("")}
													</div>
												</div>
										  `
										: ""}
									${replies.length
										? html`<div class="webmentions__reply">
												<h3>Replies: ${replies.length}</h3>
												<ol
													class="webmentions__list"
													role="list">
													${replies
														.toReversed()
														.map(
															(webmention) =>
																html`<li class="webmentions__item">
																	${this.generateSingleWebmention(webmention)}
																</li>`,
														)
														.join("")}
												</ol>
										  </div>`
										: ""}
									${mentions.length
										? html`<div class="webmentions__mention">
												<h3>Mentions: ${mentions.length}</h3>
												<ol
													class="webmentions__list"
													role="list">
													${mentions
														.toReversed()
														.map(
															(webmention) =>
																html`<li class="webmentions__item">
																	${this.generateSingleWebmention(webmention)}
																</li>`,
														)
														.join("")}
												</ol>
										  </div>`
										: ""}
									${bookmarks.length
										? html`<div class="webmentions__bookmark">
												<h3>Bookmarks: ${bookmarks.length}</h3>
												<ol
													class="webmentions__list"
													role="list">
													${bookmarks
														.toReversed()
														.map(
															(webmention) =>
																html`<li class="webmentions__item">
																	${this.generateSingleWebmention(webmention)}
																</li>`,
														)
														.join("")}
												</ol>
										  </div>`
										: ""}
							  `
							: html`<p>No mentions yet ¯_(ツ)_/¯</p>`}
					</section>
					<hr class="u-rule" />
				</main>
			</div>

			<!-- Post Navigation -->
			${nextPost || previousPost
				? html`<div class="wrapper constrain--some">
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
		super.script();

		return html`<script>
			for (const block of document.querySelectorAll(
				"pre[class*='language-']",
			)) {
				if (block instanceof HTMLElement) {
					block.tabIndex = 0;
				}
			}
		</script>`;
	}
}

module.exports = Post;
