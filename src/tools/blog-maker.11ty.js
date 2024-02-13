/** @format */

const {html, safeHtml} = require("common-tags");

class BlogMaker {
	data() {
		return {
			layout: "base",
			title: "Blog Maker",
			permalink: "/blog-maker/",
		};
	}

	generateWordBank(posts) {
		return posts.map(({content}) => content.replace(/<[^>]*>?/gm, "")).join("");
	}

	render({collections, title}) {
		return html`
			<script type="module">
				import WordSalad from "word-salad";
			</script>

			<style>
				::part(selection-field),
				::part(number-field) {
					margin-block: var(--space-2xs);
				}

				::part(submit) {
					background-color: transparent;
					border: 1px solid var(--links);
					color: var(--links);
					font-family: var(--code);
					font-size: var(--step--1);
					font-weight: bold;
					margin-block-end: var(--space-2xs);
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
				bank="${safeHtml`${this.generateWordBank(collections.post)}`}"
				separator=" ">
			</word-salad>
		`;
	}
}

module.exports = BlogMaker;
