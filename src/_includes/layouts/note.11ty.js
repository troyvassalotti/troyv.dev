/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.html",
		bundle: {
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
		page: {date},
	} = data;

	return html`
		<main id="main">
			<div class="u-wrapper">
				<article class="h-entry u-flow">
					<!-- Published -->
					<time
						class="dt-published u-step--1"
						datetime="${date.toISOString()}"
						>${this.localizedDateString(date)}</time
					>

					<!-- Content -->
					<div class="e-content u-flow u-truncate">${content}</div>

					<!-- Permalink -->
					<div class="permalink">
						<a
							class="u-url u-uid u-step--1"
							href=""
							>Permalink</a
						>
					</div>

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
			</div>
		</main>
	`;
}
