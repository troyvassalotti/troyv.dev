/** @format */

import {html} from "common-tags";

/**
 * An SVG icon available in the site.
 * @typedef {"github" | "instagram" | "mastodon" | "settings" | "twitter" | "user" | "youtube" | "bandcamp" | "codepen" | "rss" | "music" | "facebook"} Icon
 */

const ICONS = new Map([
	[
		"github",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="GitHub"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				fill="#1B1817" />
			<path
				fill="#fff"
				d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z" />
		</svg>`,
	],
	[
		"instagram",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-label="Instagram"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				id="b"
				fill="#000" />
			<g
				fill="none"
				stroke="#fff"
				stroke-width="30">
				<rect
					width="308"
					height="308"
					x="102"
					y="102"
					rx="81" />
				<circle
					cx="256"
					cy="256"
					r="72" />
				<circle
					cx="347"
					cy="165"
					r="6" />
			</g>
		</svg>`,
	],
	[
		"mastodon",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Mastodon"
			role="img"
			viewBox="0 0 512 512"
			fill="#000">
			<rect
				width="512"
				height="512"
				rx="15%" />
			<path
				d="m409 290c-5 24-43 50-85 56-86 11-137-6-137-6 3 13-4 54 70 52 31 0 58-7 58-7l2 27c-51 24-107 15-140 6-67-17-79-90-81-162v-59c0-74 49-96 49-96 50-24 180-22 222 0 0 0 49 22 49 96 0 0 1 55-7 93"
				fill="#fff" />
			<path
				d="m358 202v91h-35v-88c0-18-8-27-23-27-18 0-27 11-27 33v47h-34v-47c0-22-9-33-27-33-15 0-23 9-23 27v88h-35v-91c0-18 5-60 52-60 39 0 50 37 50 37s10-37 50-37c45 0 52 42 52 60" />
		</svg>`,
	],
	[
		"settings",
		html`<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke="var(--foreground)"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M2 8H13M22 8H19"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"></path>
			<path
				d="M22 16H11M2 16H5"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"></path>
			<circle
				cx="16"
				cy="8"
				r="3"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"></circle>
			<circle
				r="3"
				transform="matrix(-1 0 0 1 8 16)"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"></circle>
		</svg>`,
	],
	[
		"twitter",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Twitter"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				fill="#000" />
			<path
				fill="#fff"
				d="M437 152a72 72 0 01-40 12a72 72 0 0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 69a72 72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 29a200 200 0 00309-179a200 200 0 0035-37" />
		</svg>`,
	],
	[
		"user",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round">
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle
				cx="12"
				cy="7"
				r="4" />
		</svg>`,
	],
	[
		"youtube",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="YouTube"
			role="img"
			viewBox="0 0 512 512"
			fill="#000">
			<rect
				width="512"
				height="512"
				rx="15%" />
			<path
				d="m427 169c-4-15-17-27-32-31-34-9-239-10-278 0-15 4-28 16-32 31-9 38-10 135 0 174 4 15 17 27 32 31 36 10 241 10 278 0 15-4 28-16 32-31 9-36 9-137 0-174"
				fill="#fff" />
			<path d="m220 203v106l93-53" />
		</svg>`,
	],
	[
		"rss",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="RSS"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				fill="#000" />
			<circle
				cx="145"
				cy="367"
				r="35"
				fill="#fff" />
			<path
				fill="none"
				stroke="#fff"
				stroke-width="60"
				d="M109 241c89 0 162 73 162 162m114 0c0-152-124-276-276-276" />
		</svg>`,
	],
	[
		"music",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-music">
			<path d="M9 18V5l12-2v13"></path>
			<circle
				cx="6"
				cy="18"
				r="3"></circle>
			<circle
				cx="18"
				cy="16"
				r="3"></circle>
		</svg>`,
	],
	[
		"facebook",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Facebook"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				fill="000" />
			<path
				d="M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z"
				fill="#fff" />
		</svg>`,
	],
	[
		"bandcamp",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Bandcamp"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				fill="#000" />
			<path
				fill="#fff"
				d="M99 349h215l99-186H198" />
		</svg>`,
	],
	[
		"codepen",
		html`<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="CodePen"
			role="img"
			viewBox="0 0 512 512">
			<rect
				width="512"
				height="512"
				rx="15%"
				fill="#111" />
			<g
				fill="none"
				stroke="#e6e6e6"
				stroke-width="33"
				stroke-linejoin="round">
				<path d="M81 198v116l175 117 175-117V198L256 81z" />
				<path d="M81 198l175 116 175-116M256 81v117" />
				<path d="M81 314l175-116 175 116M256 431V314" />
			</g>
		</svg>`,
	],
]);

/**
 * Accepts an icon parameter and returns the SVG for that icon.
 * @param {Icon} icon Name of the icon to reneder.
 * @returns {string} SVG code for the icon.
 */
export default function generateIcon(icon) {
	return ICONS.get(icon) ?? "";
}
