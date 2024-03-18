/** @format */

import {css, html, LitElement} from "lit";
import base from "./components.styles.js";

class ModalMenu extends LitElement {
	static get styles() {
		return [
			base,
			css`
				:host {
					display: block;
				}

				dialog {
					background-color: var(--background);
					color: var(--foreground);
				}

				.title {
					font-size: var(--step-2);
					font-weight: bold;
				}

				.actions {
					display: flex;
					justify-content: end;
				}
			`,
		];
	}

	static get properties() {
		return {
			shortcut: {type: String},
		};
	}

	constructor() {
		super();
		this.shortcut = "";
	}

	closeModal() {
		this.dialogElement.close();
	}

	openModal() {
		this.dialogElement.showModal();
	}

	/**
	 * @returns {HTMLDialogElement}
	 */
	get dialogElement() {
		return this.renderRoot.getElementById("modal");
	}

	get shortcutKeys() {
		return this.shortcut.split("+").map((key) => key.trim());
	}

	handleKeydown(e) {
		if (this.shortcutKeys.includes("shift")) {
			if (e.shiftKey && e.key === this.shortcutKeys[1]) {
				this.dialogElement.open ? this.closeModal() : this.openModal();
			}
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.handleKeydown = this.handleKeydown.bind(this);

		if (this.shortcut && this.shortcutKeys) {
			document.addEventListener("keydown", this.handleKeydown);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener("keydown", this.handleKeydown);
	}

	render() {
		return html`
			<slot
				@click=${this.openModal}
				name="trigger"></slot>
			<dialog id="modal">
				<slot
					name="title"
					class="title"></slot>
				<slot></slot>
				<div class="actions">
					<slot name="custom-actions"></slot>
					<slot
						name="dismiss"
						@click=${this.closeModal}></slot>
				</div>
			</dialog>
		`;
	}
}

window.customElements.define("modal-menu", ModalMenu);
