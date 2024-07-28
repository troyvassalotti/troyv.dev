/** @format */

import {css, html, LitElement} from "lit";

class ModalMenu extends LitElement {
	static get styles() {
		return [
			css`
				:host {
					box-sizing: border-box;
				}

				*,
				*::after,
				*::before {
					box-sizing: inherit;
				}

				*:not(dialog) {
					margin: 0;
				}

				dialog {
					background-color: var(--background);
					color: var(--foreground);
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

	static shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	constructor() {
		super();
		this.shortcut = "shift + ?";
	}

	closeModal() {
		this.dialogElement.close();
	}

	openModal() {
		this.dialogElement.showModal();
	}

	get dialogElement() {
		return this.renderRoot.getElementById("modal");
	}

	get shortcutKeys() {
		return this.shortcut.split("+").map((key) => key.trim());
	}

	handleEvent(event) {
		if (event.type === "keydown") {
			this.handleKeydown(event);
		}
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

		if (this.shortcut && this.shortcutKeys) {
			document.addEventListener("keydown", this);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener("keydown", this);
	}

	render() {
		return html`
			<slot
				@click=${this.openModal}
				name="trigger"></slot>
			<dialog id="modal">
				<slot></slot>
				<div class="actions">
					<slot name="action"></slot>
					<slot
						name="dismiss"
						@click=${this.closeModal}></slot>
				</div>
			</dialog>
		`;
	}
}

window.customElements.define("modal-menu", ModalMenu);
