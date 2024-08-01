/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.11ty.js",
		title: "Welcome",
		description: "Watch as Troy Vassalotti learns his way around a computer.",
		bundle: {
			css: html`
				<style>
					h1 {
						font-size: inherit;
					}
				</style>
			`,
			js: html`
				<script type="module">
					import TypeWriter from "typewriter";
					import NowPlaying from "now-playing";
					import TagLine from "tag-line";

					NowPlaying.register();
					TagLine.register();
				</script>
			`,
		},
	};
}

export function render(data) {
	let {collections} = data;

	return html`
		<main id="main">
			<div class="wrapper flow">
				<section class="container--about u-step-4 masthead flow">
					<div class="animate__animated animate__fadeInDown">
						<h1 class="u-inline">
							<glitch-text>Hey, I'm Troy.</glitch-text>
						</h1>
						<span
							>I'm a Baltimore-based <a href="/music/">musician</a>, software
							engineer, and
							<tag-line
								taglines="insert your favorite descriptors here | hopeless romantic | rotten tomato | apple butter cheesecake | musician, engineer, and musician, engineer, and musician engineer... | I don't know anymore | pumpkin spice latte | you | somebody you used to know | never gonna give you up | full of peanut butter | wishing you were here | daydreamer"
								>loading...</tag-line
							>.</span
						>
					</div>
					<p class="u-step-0">
						I'm currently listening to
						<now-playing service="https://api.troyv.dev/now-playing"
							>elevator music</now-playing
						>.
					</p>
				</section>
				<section class="container--posts flow">
					<type-writer data-undefined="visibility">
						<h2 class="u-step-3">Reading Materials</h2>
					</type-writer>
					<ol
						role="list"
						class="recentPosts flow">
						${collections.post
							.slice(collections.post.length - 5, collections.post.length)
							.toReversed()
							.map(
								(post) => html`
									<li class="h-entry flow recentPost">
										<h3 class="p-summary u-step-1 recentPost__title">
											${post.data.description}
										</h3>
										<p class="u-step--1 recentPost__description">
											<span aria-hidden="true">&mdash;</span> From
											<a
												class="u-url p-name u-text--italic"
												href="${post.url}"
												>${post.data.title}</a
											>, published
											<time
												class="dt-published"
												datetime="${this.yyyymmdd(post.date, "-")}"
												>${this.dateString(post.date)}</time
											>.
										</p>
									</li>
								`,
							)
							.join("")}
					</ol>
					<p class="cta-archive">
						<a href="/archive/">View the archive</a>
					</p>
				</section>
			</div>
		</main>
	`;
}
