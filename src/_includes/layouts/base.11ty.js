/** @format */

const {html, safeHtml} = require("common-tags");

class Base {
	style() {
		return html``;
	}

	content(data) {
		let {content} = data;

		return html`
			<div class="wrapper constrain--more defaultContentBlock">
				<main
					id="main"
					class="flow default">
					${content}
				</main>
			</div>
		`;
	}

	script() {
		return html`
			<script type="module">
				import "/assets/js/modal-menu.js";
				import CheatCodes from "cheatcodes";
				new CheatCodes().listen();
				new CheatCodes("7 1 7 0 7 2 7 3 6", "gamepad").listen();

				if (!document.getElementById("main")) {
					console.error(
						"No element with ID of 'main' found. Add that in or the skip link won't work.",
					);
				}
			</script>
		`;
	}

	render(data) {
		let {
			title,
			description,
			excerpt,
			page: {fileSlug, url},
			metadata,
			eleventy,
			nav: {header},
		} = data;

		let pageTitle = title ? safeHtml`${title}` : this.capitalize(fileSlug);
		let pageDescription = description
			? safeHtml`${description}`
			: excerpt
				? safeHtml`${excerpt}`
				: safeHtml`${pageTitle} :: a page on ${metadata.domain}`;

		return html`
			<!-- base.11ty.js -->
			<!doctype html>
			<html
				lang="en-US"
				dir="ltr">
				<head>
					<meta charset="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1" />
					<meta
						name="theme-color"
						content="#2380e7" />
					<title>${pageTitle} :: troyv.dev</title>
					<link
						rel="preconnect"
						href="https://d33wubrfki0l68.cloudfront.net"
						crossorigin />
					<link
						rel="preconnect"
						href="https://res.cloudinary.com/" />
					<link
						rel="dns-prefetch"
						href="https://d33wubrfki0l68.cloudfront.net" />
					<link
						rel="dns-prefetch"
						href="https://esm.sh/" />
					<link
						rel="dns-prefetch"
						href="https://res.cloudinary.com/" />
					<!-- Import Maps polyfill -->
					<script
						async
						src="https://esm.sh/es-module-shims"></script>
					<script type="importmap">
						{
							"imports": {
								"lit": "https://esm.sh/lit",
								"d3": "https://esm.sh/d3@7.6",
								"tone": "https://esm.sh/tone@14.7.77",
								"cheatcodes": "https://esm.sh/@troyv/cheatcodes",
								"plvylist": "https://esm.sh/plvylist",
								"cloudysky": "https://esm.sh/@troyv/cloudysky@2.0.1",
								"typewriter": "https://esm.sh/@troyv/typewriter@3.0.0",
								"detune": "https://esm.sh/@troyv/detune",
								"beats-per": "https://esm.sh/@troyv/beats-per",
								"word-salad": "https://esm.sh/@troyv/word-salad"
							}
						}
					</script>
					<script>
						document.documentElement.classList.add("js");
					</script>

					<link
						rel="stylesheet"
						href="/assets/css/style.css" />

					<!-- Custom Styles -->
					${this.style()}

					<!-- SEO -->
					<meta
						name="description"
						content="${pageDescription}" />
					<meta
						name="og:locale"
						content="en_US" />
					<meta
						name="og:type"
						content="article" />
					<meta
						name="og:title"
						content="${pageTitle}" />
					<meta
						name="og:description"
						content="${pageDescription}" />
					<meta
						name="og:site_name"
						content="${metadata.domain}" />
					<link
						rel="canonical"
						href="${metadata.url}${url}" />

					<!-- Other Head Stuff -->
					<meta
						name="generator"
						content="${eleventy.generator}" />
					<link
						rel="author"
						href="/humans.txt" />
					<link
						rel="alternate"
						type="application/rss+xml"
						href="/feed.xml"
						title="RSS Feed" />

					<!-- Webmentions -->
					<link
						rel="webmention"
						href="https://webmention.io/www.troyv.dev/webmention" />
					<link
						rel="pingback"
						href="https://webmention.io/www.troyv.dev/xmlrpc" />

					<!-- Verification Links -->
					${metadata.socials
						.map(
							(social) =>
								html`<link
									rel="me"
									href="${social.url}" />`,
						)
						.join("\n")}

					<!-- Icons / PWA -->
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicons/apple-touch-icon.png" />
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicons/favicon-32x32.png" />
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicons/favicon-16x16.png" />
					<link
						rel="manifest"
						href="/manifest.webmanifest" />
				</head>
				<body class="page--${fileSlug ?? "home"}">
					<!-- Main Navigation -->
					<div class="header__container">
						<nav
							class="c-mainNavigation"
							id="mainNavigation"
							aria-label="main">
							<a
								class="skipLink"
								href="#main"
								>Skip to main content</a
							>
							<ul role="list">
								${header.map(
									({name, url: linkUrl}, index) =>
										html`<li>
											<a
												href="${linkUrl}"
												class="c-animatedLink"
												${linkUrl === url ? 'aria-current="page"' : ""}
												id="link__${name}"
												>${index === 0 ? "~/" : "::"}${name}</a
											>
										</li>`,
								)}
							</ul>
						</nav>
					</div>

					<!-- Content -->
					${this.content(data)}

					<!-- Keyboard Shortcuts -->
					<modal-menu
						id="shortcuts"
						shortcut="shift + ?"
						class="flow">
						<p slot="title">Keyboard Shortcuts</p>
						<div class="shortcuts__list flow">
							<div class="shortcutItem">
								<span class="shortcutItem__name secret">Secret</span>
								<span class="shortcutItem__command">Konami Code</span>
							</div>
							<div class="shortcutItem">
								<span class="shortcutItem__name secret">Secret</span>
								<span class="shortcutItem__command"
									>Green, Red, Green, Yellow, Green, Blue, Green, Orange,
									Tilt</span
								>
							</div>
						</div>
						<p class="shortcutsDisclaimer u-step--2">
							<em>Bet you weren't expecting these to exist, huh?</em>
						</p>
						<button
							class="button"
							slot="dismiss">
							Dismiss
						</button>
					</modal-menu>

					<!-- Scripts -->
					${this.script()}
				</body>
			</html>
		`;
	}
}

module.exports = Base;
