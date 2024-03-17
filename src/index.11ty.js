/** @format */

const {html} = require("common-tags");
const Base = require("./_includes/layouts/base.11ty.js");

class Home extends Base {
	data() {
		return {
			title: "Welcome",
			description: "Watch as Troy Vassalotti learns his way around a computer.",
		};
	}

	style() {
		return (
			super.style() +
			html`
				<style>
					h1 {
						font-size: inherit;
					}

					.container--about {
						max-inline-size: 40ch;
						padding-block: var(--space-2xl-3xl);
					}
				</style>
			`
		);
	}

	content(data) {
		let {
			metadata: {cloudinary},
			collections,
			projects,
		} = data;

		return html`
			<main id="main">
				<div class="wrapper flow">
					<section
						class="container--about u-step-4 animate__animated animate__fadeInDown">
						<h1 class="u-inline">
							<glitch-text>Hey, I'm Troy.</glitch-text>
						</h1>
						<span
							>I'm a Baltimore-based <a href="/music/">musician</a>, software
							engineer, and
							<tag-line
								taglines="insert your favorite descriptors here | hopeless romantic | rotten tomato | apple butter cheesecake | musician, engineer, and musician, engineer, and musician engineer... | I don't know anymore | pumpkin spice latte | you | somebody you used to know | never gonna give you up | full of peanut butter | wishing you were here | daydreamer"
								>loading...</tag-line
							>. I'm currently listening to
							<now-playing service="https://api.troyv.dev/now-playing"
								>elevator music</now-playing
							>.</span
						>
					</section>
					<section class="container--posts flow">
						<type-writer data-undefined="visibility">
							<h2 class="u-step-3">Reading Materials</h2>
						</type-writer>
						<ol
							role="list"
							class="c-postList flow">
							${collections.post
								.slice(collections.post.length - 7, collections.post.length)
								.toReversed()
								.map(
									(post) => html`
										<h3 class="u-step-1 u-text--bold">
											${post.data.description}
										</h3>
										<p class="u-step--1">
											From the post
											<a
												class="u-text--italic"
												href="${post.url}"
												>${post.data.title}</a
											>, published ${this.dateString(post.date)}.
										</p>
									`,
								)
								.join("")}
						</ol>
					</section>
				</div>
			</main>
		`;
	}

	script() {
		return (
			super.script() +
			html`<script type="module">
				import CloudySky from "cloudysky";
				import TypeWriter from "typewriter";
				import GlitchText from "glitch-text";
				import "/assets/js/now-playing.js";
				import "/assets/js/tag-line.js";
			</script>`
		);
	}
}

module.exports = Home;
