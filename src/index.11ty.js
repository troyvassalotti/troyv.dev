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
			html`<style>
				.leadingType {
					--kb-count-cursor: 10;

					font-size: var(--step-4);
				}

				.portrait {
					inline-size: fit-content;
					margin-inline: auto;
				}

				.portrait__caption {
					font-style: italic;
					text-align: end;
				}

				.portrait__caption::after,
				.portrait__caption::before {
					content: " ↑ ";
					font-size: 1.25em;
				}

				.gradient-mask {
					mask-image: linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000);
					mask-size: 19% 70%;
					mask-position:
						0 75%,
						25% 25%,
						50% 50%,
						75% 0,
						100% 100%;
					mask-repeat: no-repeat;

					-webkit-mask-image: linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000),
						linear-gradient(to bottom, #000, #000);
					-webkit-mask-size: 19% 70%;
					-webkit-mask-position:
						0 75%,
						25% 25%,
						50% 50%,
						75% 0,
						100% 100%;
					-webkit-mask-repeat: no-repeat;
					max-inline-size: max-content;
				}

				:is(.container--about, .container--read, .container--play) {
					margin-block-end: var(--space-2xl);
				}

				:is(.typing--read, .typing--play, .typing--listen) {
					--kb-duration-typing: 0.75s;
					font-size: var(--step-6);
				}

				.typing--read {
					--kb-steps-typing: 15;
				}

				.typing--play {
					--kb-steps-typing: 15;
				}

				.typing--listen {
					--kb-steps-typing: 15;
				}

				.list.play {
					--fluid-col-size: 20ch;
				}

				.play__item-content {
					border-radius: var(--space-3xs);
					box-shadow: 1px 2px 1px 2px var(--foreground);
					padding-block: var(--space-s);
					padding-inline: var(--space-xs);
				}

				.plvylist {
					color-scheme: light dark;
					font-size: var(--step--1);
					max-inline-size: 70rem;
				}

				::part(hillside) {
					fill: #2b9348;
				}

				@media (prefers-color-scheme: light) {
					cloudy-sky {
						--cloud-filter: hue-rotate(222deg);
					}
				}
			</style>`
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
				<cloudy-sky hillside>
					<div class="wrapper flow constrain--some">
						<div class="container--about flow">
							<figure class="portrait">
								<div class="gradient-mask">
									<img
										src="${cloudinary}/c_scale,f_auto,q_auto:eco,w_1100/v1646349104/blog/DSC00048-positive-2_iflhof.webp"
										alt="Me holding my guitar on stage"
										decoding="async"
										width="968"
										height="626"
										id="me" />
								</div>
								<!-- htmlmin:ignore -->
								<figcaption class="portrait__caption">
									<a href="/music/">Musician</a>, engineer, and
									<tag-line
										taglines="insert your favorite descriptors here | hopeless romantic | rotten tomato | apple butter cheesecake | musician, engineer, and musician, engineer, and musician engineer... | I don't know anymore | pumpkin spice latte | you | somebody you used to know | never gonna give you up | full of peanut butter | wishing you were here | daydreamer"
										>loading...</tag-line
									>.
								</figcaption>
								<!-- htmlmin:ignore -->
							</figure>
							<section class="aboutMe flow u-truncate">
								<type-writer>
									<h1 class="leadingType">Hey, I'm Troy...</h1>
								</type-writer>
								<p>
									I'm glad you could make it, please peruse my
									wares<sup>*</sup>. I'm a developer and musician based in
									Baltimore who is interested in privacy,
									<abbr title="Open Source Software">OSS</abbr>, and making the
									web a more accessible place. Oh, and a community organizer for
									<a href="https://charmcityjs.org/">charmCityJs</a>, a
									<a href="https://www.meetup.com/charmcityjs/"
										>JavaScript meetup</a
									>. I also like long walks on the beach, but can't stand
									getting sand everywhere.
								</p>
								<!-- htmlmin:ignore -->
								<p>
									I'm currently listening to
									<now-playing service="https://api.troyv.dev/now-playing"
										><span>elevator music</span></now-playing
									>.
								</p>
								<!-- htmlmin:ignore -->
								<p>
									You may
									<a href="https://resume.troyv.dev/">view my résumé</a> if
									you'd like. It's updated about as often as anyone else's
									<abbr title="Your mileage may vary">(YMMV)</abbr>, but it
									looks nice and prints well. You can also
									<a href="/contact/">contact me directly</a>.
								</p>
								<p>
									See what I'm doing on
									<a href="https://github.com/troyvassalotti">GitHub</a> or
									follow me on
									<a href="https://fosstodon.org/@rest">Mastodon</a>.
								</p>
								<p>
									This website is made with
									<a href="https://www.11ty.dev/">Eleventy</a> and I
									<a
										href="https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/"
										title="See: this blog by Ethan Marcotte"
										>change it often</a
									>.
								</p>
								<p class="u-step--2">
									*I only accept bottle caps as currency, sorry... (I'm kidding)
								</p>
							</section>
						</div>
						<div class="container--read flow">
							<type-writer class="typewriter--read">
								<h2
									id="read"
									class="typing--read">
									Read
								</h2>
							</type-writer>
							<ol
								role="list"
								class="c-postList flow">
								${collections.post
									.slice(collections.post.length - 5, collections.post.length)
									.toReversed()
									.map(
										(post) =>
											html`<p class="u-step-2 u-text--bold">
													${post.data.description}
												</p>
												<p class="u-step--1">
													From the post
													<a
														class="u-text--italic"
														href="${post.url}"
														>${post.data.title}</a
													>, published ${this.dateString(post.date)}.
												</p>`,
									)
									.join("")}
							</ol>
						</div>
						<div class="container--play flow">
							<type-writer>
								<h2
									id="play"
									class="typing--play">
									Play
								</h2>
							</type-writer>
							<ol
								role="list"
								class="list play u-grid"
								data-grid-columns="fluid">
								${projects
									.map((project) => {
										if (project.tags && project.tags.includes("play")) {
											return html`<li class="play__item">
												<article class="flow play__item-content">
													<p class="play__item-title u-step-2 u-text--bold">
														<a href="${project.url}">${project.name}</a>
													</p>
													<p class="play__item-description">
														${project.description}
													</p>
												</article>
											</li>`;
										}
									})
									.join("")}
							</ol>
						</div>
						<div class="container--listen flow">
							<type-writer>
								<h2
									id="listen"
									class="typing--listen">
									Listen
								</h2>
							</type-writer>
							<plvy-list
								class="plvylist"
								file="/assets/js/plvylist.json">
							</plvy-list>
							<p class="u-text--italic u-step--1">
								Psst... I made
								<a href="https://plvylist.troyv.dev">this music player</a>.
							</p>
						</div>
					</div>
				</cloudy-sky>
			</main>
		`;
	}

	script() {
		return (
			super.script() +
			html`<script type="module">
				import {CloudySky} from "cloudysky";
				import {Typewriter} from "typewriter";
				import "/assets/js/now-playing.js";
				import "/assets/js/tag-line.js";
				import Plvylist from "plvylist";
			</script>`
		);
	}
}

module.exports = Home;
