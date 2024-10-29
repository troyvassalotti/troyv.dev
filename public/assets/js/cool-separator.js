/** @format */

import {css, LitElement} from "lit";

export default class CoolSeparator extends LitElement {
	/** @type {string} */
	static tagName = "cool-separator";

	/** @returns {void} */
	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	static styles = css`
		:host {
			background-color: var(--primary);
			block-size: 2px;
			display: block;
			inline-size: var(--cool-separator-size, 100%);
			margin-block: var(--space-xs) !important;
		}

		:host([space="start"]) {
			margin-block-end: 0 !important;
		}

		:host([space="end"]) {
			margin-block-start: 0 !important;
		}

		:host([size="small"]) {
			--cool-separator-size: 25%;
		}

		:host([size="medium"]) {
			--cool-separator-size: 50%;
		}

		:host([size="large"]) {
			--cool-separator-size: 75%;
		}
	`;
}
