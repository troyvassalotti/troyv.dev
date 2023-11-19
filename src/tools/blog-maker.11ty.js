/** @format */

const {html} = require("common-tags");

class BlogMaker {
	data() {
		return {
			layout: "base",
			title: "Blog Maker",
			permalink: "/blog-maker/",
		};
	}

	escapeHTML(unsafe) {
		return unsafe.replace(/[&<"']/g, function (m) {
			switch (m) {
				case "&":
					return "&amp;";
				case "<":
					return "&lt;";
				case '"':
					return "&quot;";
				default:
					return "&#039;";
			}
		});
	}

	render(data) {
		const wordBank = data.collections.post
			.map((post) => {
				return post.content.replace(/<[^>]*>?/gm, "");
			})
			.join(",");

		return html`
			<script type="module">
				import WordSalad from "word-salad";
			</script>

			<style>
				word-salad {
					display: block;
				}

				word-salad .field {
					margin-block: var(--space-2xs);
				}

				word-salad button {
					border: 1px solid var(--links);
					color: var(--links);
					font-family: var(--code);
					font-size: var(--step--1);
					font-weight: bold;
					padding: var(--space-2xs);
				}
			</style>

			<h1>${data.title}</h1>
			<p>
				Write your own extremely unpredictable and often incoherent blog post
				using a slightly-thorough list of every word I've written. It
				<em>will definitely</em> output HTML characters and template language
				syntax.
			</p>
			<word-salad
				class="flow"
				bank="${this.escapeHTML(wordBank)}"
				separator=" "></word-salad>
		`;
	}
}

module.exports = BlogMaker;
