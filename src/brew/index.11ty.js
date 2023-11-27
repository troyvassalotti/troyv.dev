/** @format */

const {html} = require("common-tags");

class Brew {
	data() {
		return {
			title: "Brew",
			layout: "base",
			permalink: {
				teapot: "/brew/",
			},
		};
	}

	render({metadata: {cloudinary}}) {
		return html`
			<h1>Sorry, I'm a teapot</h1>
			<img
				src="${cloudinary}/c_scale,f_auto,q_auto:eco,w_600/v1646349104/blog/eduardo-froza-x6IpGJ9mOwA-unsplash_1_gcgmol.webp"
				alt="A black metal teapot"
				decoding="async"
				width="600"
				height="837"
				id="teapot"
				style="max-block-size: 50vh; object-fit: cover" />
			<p class="u-step--1">
				<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418"
					>Learn more...</a
				>
			</p>
		`;
	}
}

module.exports = Brew;
