/** @format */

const {html} = require("common-tags");
const {escapeHTML} = require("../../utils/helpers.js");

class BlogMaker {
	data() {
		return {
			layout: "base",
			title: "Blog Maker",
			permalink: "/blog-maker/",
		};
	}

	render({collections, title}) {
		const wordBank = collections.post
			.map(({content}) => {
				return content.replace(/<[^>]*>?/gm, "");
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

			<h1>${title}</h1>
			<p>
				Write your own extremely unpredictable and often incoherent blog post
				using a slightly-thorough list of every word I've written. It
				<em>will definitely</em> output HTML characters and template language
				syntax.
			</p>
			<word-salad
				class="flow"
				bank="${escapeHTML(wordBank)}"
				separator=" "></word-salad>
		`;
	}
}

module.exports = BlogMaker;
