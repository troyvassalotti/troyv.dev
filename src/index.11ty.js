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
				</style>
			`
		);
	}

	content(data) {
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
										<li class="flow recentPost">
											<h3 class="u-step-1 recentPost__title">
												${post.data.description}
											</h3>
											<p class="u-step--1 recentPost__description">
												<span aria-hidden="true">&mdash;</span> From
												<a
													class="u-text--italic"
													href="${post.url}"
													>${post.data.title}</a
												>, published ${this.dateString(post.date)}.
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

	script() {
		return (
			super.script() +
			html`
				<script type="module">
					import TypeWriter from "typewriter";
					import "/assets/js/now-playing.js";
					import "/assets/js/tag-line.js";
				</script>
			`
		);
	}
}

module.exports = Home;
