/** @format */

import {html, safeHtml} from "common-tags";
import Base from "../_includes/layouts/base.11ty.js";

export default class BlogMaker extends Base {
	data() {
		return {
			title: "Blog Maker",
			description:
				"Write your own extremely unpredictable and often incoherent blog post using a slightly-thorough list of every word I've written.",
			glitch: true,
			truncate: true,
			noHeaderContainment: true,
			permalink: "/blog-maker/",
		};
	}

	style() {
		return html`
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
		`;
	}

	script() {
		return html`
			<script type="module">
				import WordSalad from "word-salad";
			</script>
		`;
	}

	content(data) {
		let {collections, description} = data;

		let page = html`
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

		return this.defaultTemplate(data, page);
	}

	generateWordBank(posts) {
		return posts.map(({content}) => content.replace(/<[^>]*>?/gm, "")).join("");
	}
}
