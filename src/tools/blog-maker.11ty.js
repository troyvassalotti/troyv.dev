/** @format */

const {html, safeHtml} = require("common-tags");

class BlogMaker {
	data() {
		return {
			layout: "base.11ty.js",
			title: "Blog Maker",
			description:
				"Write your own extremely unpredictable and often incoherent blog post using a slightly-thorough list of every word I've written.",
			glitch: true,
			truncate: true,
			noHeaderContainment: true,
			permalink: "/blog-maker/",
		};
	}

	generateWordBank(posts) {
		return posts.map(({content}) => content.replace(/<[^>]*>?/gm, "")).join("");
	}

	render({collections, description}) {
		return html`
			<script type="module">
				import WordSalad from "word-salad";
			</script>

			<style>
				::part(selection-field),
				::part(number-field) {
					margin-block: var(--space-s);
				}

				::part(submit) {
					background-color: transparent;
					border: 1px solid var(--links);
					color: var(--links);
					cursor: pointer;
					font-size: var(--step--1);
					font-weight: bold;
					margin-block-end: var(--space-s);
					padding: var(--space-2xs);
				}
			</style>

			<p>${description}</p>
			<p>
				It <em>will definitely</em> output HTML characters and template language
				syntax.
			</p>
			<word-salad
				bank="${safeHtml`${this.generateWordBank(collections.post)}`}"
				separator=" ">
			</word-salad>
		`;
	}
}

module.exports = BlogMaker;
