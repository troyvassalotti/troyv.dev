/** @format */

const {html} = require("common-tags");
const {Icon} = require("../_includes/partials/index.js");

class Music {
	data() {
		return {
			title: "Music",
			description:
				"Music is one of my passions. Check out all my musical projects here.",
			layout: "base",
			frontRoyal: {
				meta: {
					Instruments: "Guitar, backing vocals",
					"Years Active": "2014 - present",
				},
				social: [
					{
						href: "https://frontroyalmd.bandcamp.com/",
						img: "bandcamp",
						alt: "Bandcamp",
					},
				],
			},
			troyalllowercase: {
				meta: {
					Instruments: "Guitar, drums, bass, vocals",
					"Years Active": "2016 - present",
				},
				social: [
					{
						href: "https://troyalllowercase.bandcamp.com/",
						img: "bandcamp",
						alt: "Bandcamp",
					},
				],
			},
		};
	}

	generateSocialLink({href, img}) {
		return html`<a
			class="c-svg-link"
			href="${href}"
			>${Icon(img)}</a
		>`;
	}

	generateSocialList({social}) {
		return social?.map((item) => this.generateSocialLink(item)).join("");
	}

	render({frontRoyal, troyalllowercase}) {
		return html`
			<header class="flow header u-truncate">
				<h1>I make music.</h1>
				<p>
					When I'm not coding, I'm probably writing, playing, recording, or
					listening to music. Check out my projects below, take a deep dive into
					my
					<a href="/music/stats/">listening habits</a>, or view my
					<a href="/music/collection">music collection</a>.
				</p>
			</header>
			<section
				class="u-grid"
				data-grid-columns="auto-fit">
				<div class="band u-invertSvg--onDark flow">
					<h2>Front Royal</h2>
					${this.generateSocialList(frontRoyal)}
					<iframe
						class="bandcampEmbed"
						src="https://bandcamp.com/EmbeddedPlayer/album=282570022/size=large/bgcol=333333/linkcol=e99708/transparent=true/"
						seamless
						loading="lazy"
						><a href="https://frontroyalmd.bandcamp.com/album/long-story-short"
							>Long Story Short by Front Royal</a
						></iframe
					>
				</div>
				<div class="band u-invertSvg--onDark flow">
					<h2>troyalllowercase</h2>
					${this.generateSocialList(troyalllowercase)}
					<iframe
						class="bandcampEmbed"
						src="https://bandcamp.com/EmbeddedPlayer/album=2678313189/size=large/bgcol=333333/linkcol=0f91ff/transparent=true/"
						seamless
						loading="lazy"
						><a
							href="https://troyalllowercase.bandcamp.com/album/lets-try-this-again"
							>Let's try this again by troyalllowercase</a
						></iframe
					>
				</div>
			</section>
		`;
	}
}

module.exports = Music;
