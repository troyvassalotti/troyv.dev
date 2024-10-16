/** @format */

import {html, safeHtml} from "common-tags";

export function render(data) {
	const {
		title,
		description,
		page: {fileSlug, url, excerpt},
		metadata,
		eleventy,
		navigation,
		bundle,
		content,
	} = data;

	const pageTitle = title ? safeHtml`${title}` : this.capitalize(fileSlug);
	const pageDescription = description
		? safeHtml`${description}`
		: excerpt
			? safeHtml`${excerpt}`
			: safeHtml`${pageTitle} :: a page on ${metadata.domain}`;

	return html`
		<!doctype html>
		<!-- base.11ty.js -->
		<html
			lang="en-US"
			dir="ltr"
			class="no-js">
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
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet" />

				<script type="importmap">
					{
						"imports": {
							"lit": "https://esm.sh/lit@3.1.2",
							"d3": "https://esm.sh/d3@7.6",
							"tone": "https://esm.sh/tone@14.7.77",
							"cheatcode": "https://esm.sh/@troyv/cheatcode-component@1.0.0",
							"plvylist": "https://esm.sh/plvylist@4.0.0",
							"cloudysky": "https://esm.sh/@troyv/cloudysky@2.0.1",
							"typewriter": "https://esm.sh/@troyv/typewriter@3.0.0",
							"detune": "https://esm.sh/@troyv/detune@2.0.0",
							"beats-per": "https://esm.sh/@troyv/beats-per@3.0.0",
							"word-salad": "https://esm.sh/@troyv/word-salad@2.0.0",
							"glitch-text": "https://esm.sh/@troyv/glitch-text@1.0.0",
							"inapp-spy": "https://esm.sh/inapp-spy@3.0.0",
							"the-club": "https://esm.sh/@troyv/the-club@1.1.0-alpha.0",
							"modal-menu": "/assets/js/modal-menu.js",
							"cool-table": "/assets/js/cool-table.js",
							"now-playing": "/assets/js/now-playing.js",
							"tag-line": "/assets/js/tag-line.js",
							"web-mentions": "/assets/js/web-mentions.js",
							"stats-table": "/assets/js/stats-table.js",
							"heading-anchors": "https://esm.sh/@daviddarnes/heading-anchors@2.0.0",
							"lite-youtube": "https://esm.sh/lite-youtube-embed@0.3.2"
						}
					}
				</script>

				<script type="speculationrules">
					{
						"prerender": [
							{
								"where": {
									"href_matches": "/*"
								},
								"eagerness": "moderate"
							}
						]
					}
				</script>

				<script
					type="module"
					src="/assets/js/main.js"></script>
				<script
					type="module"
					src="/assets/js/inapp.js"></script>

				<!-- Custom Scripts -->
				${bundle?.js}

				<link
					rel="stylesheet"
					href="/assets/css/style.css" />

				<!-- lite-youtube-styles -->

				<!-- Custom Styles -->
				${bundle?.css}

				<!-- SEO Garbage -->
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

				<!-- Feeds -->
				<link
					rel="alternate"
					type="application/atom+xml"
					href="/feed.xml"
					title="Posts RSS" />
				<link
					rel="alternate"
					type="application/json"
					href="/feed.json"
					title="Posts JSON Feed" />
				<link
					rel="alternate"
					type="application/atom+xml"
					href="/notes.xml"
					title="Notes RSS" />
				<link
					rel="alternate"
					type="application/json"
					href="/notes.json"
					title="Notes JSON Feed" />

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
						(social) => html`
							<link
								rel="me"
								href="${social.url}" />
						`,
					)
					.join("\n")}

				<!-- Fediverse Creator -->
				<meta
					name="fediverse:creator"
					content="@rest@fosstodon.org" />

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
			<body class="page--${fileSlug || "home"}">
				<!-- Main Navigation -->
				<header class="siteHeader wrapper">
					<nav
						class="mainNavigation"
						id="mainNavigation">
						<a
							class="skipLink"
							href="#main"
							>Skip to main content</a
						>
						<ul role="list">
							${navigation.map(
								({name, url: linkUrl}, index) => html`
									<li>
										<a
											href="${linkUrl}"
											class="animatedLink"
											${linkUrl === url ? 'aria-current="page"' : ""}
											id="link__${name}"
											>${index === 0 ? "~/" : "~/"}${name}</a
										>
									</li>
								`,
							)}
						</ul>
					</nav>
				</header>

				<!-- Content -->
				${content}

				<!-- Footer -->
				<footer class="siteFooter wrapper">
					<cool-separator
						size="small"
						space="end"></cool-separator>
					<div
						class="u-flex u-step--1"
						data-wrap>
						<nav id="socials">
							<p
								class="u-text--bold"
								id="socialNavTitle">
								Social Media
							</p>
							<ul
								role="list"
								aria-describedby="socialNavTitle">
								<li>
									<a href="${metadata.follow.mastodon}">Mastodon</a>
								</li>
							</ul>
						</nav>
						<nav id="feeds">
							<p
								class="u-text--bold"
								id="rssFeedsTitle">
								RSS Feeds
							</p>
							<ul
								class="u-flex"
								data-wrap
								role="list"
								aria-describedby="rssFeedsTitle">
								<li>
									<a href="/notes.xml">Notes (Atom)</a>
								</li>
								<li>
									<a href="/notes.json">Notes (JSON)</a>
								</li>
								<li>
									<a href="/feed.xml">Blog (Atom)</a>
								</li>
								<li>
									<a href="/feed.json">Blog (JSON)</a>
								</li>
							</ul>
						</nav>
					</div>
				</footer>

				<!-- Keyboard Shortcuts -->
				<modal-menu
					id="shortcuts"
					class="flow"
					data-undefined="display">
					<h2 class="u-step-2 u-text--bold">Keyboard Shortcuts</h2>
					<p class="u-step--2 u-text--italic">
						Bet you weren't expecting these to exist, huh?
					</p>
					<cool-table headless-body>
						<table>
							<thead>
								<tr>
									<th scope="col">Effect</th>
									<th scope="col">Command</th>
									<th scope="col">Hint</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="u-text--italic">Secret</td>
									<td>Konami Code</td>
									<td>It's <kbd>spacebar</kbd>, not <kbd>enter</kbd>.</td>
								</tr>
								<tr>
									<td class="u-text--italic">Secret</td>
									<td>
										Green, Red, Green, Yellow, Green, Blue, Green, Orange, Tilt
									</td>
									<td>Grab your Guitar Hero controller.</td>
								</tr>
							</tbody>
						</table>
					</cool-table>
					<h3 class="u-step-1">Bonus Features</h3>
					<p>Upload an audio file and watch this website turn into The Club.</p>
					<p class="u-step--1">
						WARNING: this feature is still in alpha. Do not use if you are
						sensitive to flashing lights or colors.
					</p>
					<div
						class="u-flex"
						data-align="center">
						<the-club
							fftsize="256"
							id="club"></the-club>
						<button
							class="button u-step--1"
							onclick="window.club.src='https://res.cloudinary.com/dpmchqezv/video/upload/v1684975533/troy/lets-try-this-again/02_-_In_awe_of_you_cld3he.mp3'">
							Use Sample Track
						</button>
					</div>
					<button
						class="button"
						slot="dismiss">
						Dismiss
					</button>
				</modal-menu>

				<!-- Cheat Codes -->
				<cheat-code></cheat-code>
				<cheat-code pattern="starpower"></cheat-code>
			</body>
		</html>
	`;
}
