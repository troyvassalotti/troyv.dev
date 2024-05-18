/** @format */

import {html, safeHtml} from "common-tags";

export function data() {
	return {
		title: "Blog Maker",
		description:
			"Write your own extremely unpredictable and often incoherent blog post using a slightly-thorough list of every word I've written.",
		glitch: true,
		truncate: true,
		layout: "base.11ty.js",
		noHeaderContainment: true,
		permalink: "/blog-maker/",
		bundle: {
			css: html`
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
			`,
			js: html`
				<script type="module">
					import WordSalad from "word-salad";
				</script>
			`,
		},
	};
}

export function render(data) {
	let {
		collections: {post},
		description,
	} = data;

	return html`
		<p>${description}</p>
		<p>
			It <em>will definitely</em> output HTML characters and template language
			syntax.
		</p>
		<word-salad
			bank="${safeHtml`${post
				.map(({content}) => content.replace(/<[^>]*>?/gm, ""))
				.join("")}`}"
			separator=" ">
		</word-salad>
	`;
}
