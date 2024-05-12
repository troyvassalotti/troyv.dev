/** @format */

import {html} from "common-tags";
import Base from "./base.11ty.js";

export default class Note extends Base {
	script() {
		return html`<script type="module">
			import "/assets/js/web-mentions.js";
		</script>`;
	}

	content(data) {
		let {
			content,
			page: {date},
		} = data;

		return html`
			<main id="main">
				<div class="wrapper">
					<article class="h-entry">
						<!-- Published -->
						<time
							class="dt-published"
							datetime="${this.yyyymmdd(date, "-")}"
							>${this.dateString(date)}</time
						>

						<!-- Content -->
						<div class="e-content">${content}</div>

						<!-- Permalink -->
						<a
							class="u-url u-uid"
							href=""
							>Permalink</a
						>

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
}
