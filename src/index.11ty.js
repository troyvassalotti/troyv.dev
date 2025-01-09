/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.html",
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
			<div class="u-wrapper u-flow">
				<section class="container--about u-step-4 masthead u-flow">
					<div>
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
						I'm currently
						<tag-line
							taglines="crying | raving | throwing an absolute fit | starting the pit | yearning"
							>listening</tag-line
						>
						to
						<now-playing service="https://api.troyv.dev/now-playing"
							>elevator music</now-playing
						>.
					</p>
				</section>
				<div class="container--reading-materials u-flow">
					<div
						style="--grid-item--min-width: 320px;"
						class="u-grid"
						data-grid-columns="2">
						<section class="container--posts u-flow">
							<h3 class="u-step-3">Posts</h3>
							<ol
								role="list"
								class="recentPosts u-flow">
								<style>
									.recentPosts {
										--flow-space: var(--space-m);

										max-inline-size: 70rem;

										.recentPost > * {
											--flow-space: var(--space-xs);
										}

										.recentPost__title {
											&::before {
												content: "\\201C";
											}

											&::after {
												content: "\\201D";
											}
										}
									}

									@scope {
										:scope {
											--flow-space: var(--space-m);

											max-inline-size: 70rem;

											.recentPost > * {
												--flow-space: var(--space-xs);
											}

											.recentPost__title {
												&::before {
													content: "\\201C";
												}

												&::after {
													content: "\\201D";
												}
											}
										}
									}
								</style>
								${collections.post
									.slice(collections.post.length - 5, collections.post.length)
									.toReversed()
									.map(
										(post) => html`
											<li class="h-entry u-flow recentPost">
												<h4 class="p-summary u-step-1 recentPost__title">
													${post.data.description}
												</h4>
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
							<p style="--flow-space: var(--space-m);">
								<a href="/archive/">View the archive</a>
							</p>
						</section>
						<section class="container--notes u-flow">
							<h3 class="u-step-3">Notes</h3>
							<ol
								role="list"
								class="recentNotes u-flow">
								${collections.note
									.slice(collections.note.length - 5, collections.note.length)
									.toReversed()
									.map(
										(note) => html`
											<li class="h-entry u-flow recentNote">
												<div class="e-content u-step--1 recentNote__title">
													${note.content}
												</div>
												<p class="u-step--1 recentNote__description">
													<span aria-hidden="true">&mdash;</span>
													Posted
													<a
														href="${note.url}"
														class="u-url">
														<time
															class="dt-published"
															datetime="${this.yyyymmdd(note.date, "-")}"
															>${this.dateString(note.date)}</time
														></a
													>.
												</p>
											</li>
										`,
									)
									.join("")}
							</ol>
							<p style="--flow-space: var(--space-m);">
								<a href="/notes/">View all notes</a>
							</p>
						</section>
					</div>
				</div>
			</div>
		</main>
	`;
}
