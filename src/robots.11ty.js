/** @format */

export function data() {
	return {
		permalink: "robots.txt",
		eleventyExcludeFromCollections: true,
		/** @link https://darkvisitors.com */
		dataScrapers: [
			"Amazonbot",
			"anthropic-ai",
			"Applebot",
			"Bytespider",
			"CCBot",
			"ChatGPT-User",
			"cohere-ai",
			"Diffbot",
			"FacebookBot",
			"Google-Extended",
			"GPTBot",
			"omgili",
			"PerplexityBot",
			"YouBot",
		],
	};
}

export function render({dataScrapers}) {
	return `User-agent: *
Disallow: /404.html
Disallow: /success.html    
    ${dataScrapers
			.map(
				(scraper) => `
User-agent: ${scraper}
Disallow: /`,
			)
			.join("\n")}`;
}
