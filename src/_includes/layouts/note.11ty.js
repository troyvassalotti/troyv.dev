/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.html",
		bundle: {
			css: html`
				<style>
					.self-link {
						color: currentColor;

						&:not(:focus-visible, :hover) {
							text-decoration: none;
						}
					}

					.c-postNavigation {
						align-items: start;
						display: flex;
						flex-wrap: wrap;
						gap: var(--space-m-l);
						margin-block-start: var(--space-l-xl);
					}
				</style>
			`,
			js: html`
				<script type="module">
					import WebMentions from "web-mentions";
					WebMentions.register();
				</script>
			`,
		},
	};
}

export function render(data) {
	let {
		content,
		page,
		collections: {note},
	} = data;

	let {date} = page;

	let nextPost = this.getNextCollectionItem(note, page);
	let previousPost = this.getPreviousCollectionItem(note, page);

	return html`
		<main id="main">
			<div class="u-wrapper">
				<article class="h-entry u-flow">
					<header class="masthead masthead--small masthead--no-contain u-flow">
						<!-- Published / Permalink -->
						<h1 class="permalink u-step-0 u-font--code u-text--regular">
							<a
								class="u-url u-uid self-link"
								href="">
								<time
									class="dt-published"
									datetime="${date.toISOString()}"
									>${this.localizedDateString(date)}</time
								>
							</a>
						</h1>
						<!-- Content -->
						<div class="e-content u-flow u-truncate u-step-2">${content}</div>
					</header>

					<!-- Syndication -->
					<a
						rel="syndication noreferrer"
						class="u-syndication"
						href="https://brid.gy/publish/mastodon"></a>

					<!-- Webmentions -->
					<web-mentions
						domain="https://www.troyv.dev"
						loadstyles
						showtitle></web-mentions>
				</article>

				<!-- Post Navigation -->
				${nextPost || previousPost
					? html`
							<nav
								aria-label="pagination"
								class="c-postNavigation">
								${nextPost
									? html`
											<a href="${this.url(nextPost.url)}">&lt; Next Note</a>
										`
									: ""}
								${previousPost
									? html`
											<a href="${this.url(previousPost.url)}"
												>Previous Note &gt;</a
											>
										`
									: ""}
							</nav>
						`
					: html``}
			</div>
		</main>
	`;
}
