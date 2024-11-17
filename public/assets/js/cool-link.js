/** @format */

import {css, html, LitElement} from "lit";

export default class CoolLink extends LitElement {
	/** @type {string} */
	static tagName = "cool-link";

	/** @returns {void} */
	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	static styles = css`
		::slotted(a) {
			--linkStateRest: scaleX(1);
			--linkStartRest: left;
			--linkStateHover: scaleX(0);
			--linkStartHover: right;

			text-decoration: none;
		}

		@media (prefers-reduced-motion: no-preference) {
			::slotted(a) {
				position: relative;
				text-decoration: none;
			}

			::slotted(a)::before {
				background-color: currentColor;
				block-size: 0.06em;
				content: "";
				inline-size: 100%;
				inset-block-end: -0.5ch;
				inset-inline-start: 0;
				position: absolute;
				transform: var(--linkStateRest);
				transform-origin: var(--linkStartRest);
				transition: transform 400ms ease-out;
			}

			::slotted(a:is(:hover, :focus-visible))::before {
				transform: var(--linkStateHover);
				transform-origin: var(--linkStartHover);
			}
		}
	`;

	render() {
		return html`<slot></slot>`;
	}

	firstUpdated() {
		this.querySelector("a").dataset.coolLink = "true";
	}
}
