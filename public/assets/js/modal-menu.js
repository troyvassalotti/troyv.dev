import { css, html, LitElement } from "lit";

class ModalMenu extends LitElement {
	static get styles() {
		return css`
      :host {
        box-sizing: border-box;
      }

      *,
      *::after,
      *::before {
        box-sizing: inherit;
      }

      dialog {
        background-color: var(--background);
        color: var(--foreground);
      }

      .dismiss {
        appearance: none;
        background-color: transparent;
        border: 0;
        color: var(--links);
        cursor: pointer;
        display: block;
        font-size: var(--step--1);
        margin-inline-start: auto;
        text-decoration: underline;
      }

      .flow > * + * {
        margin-block-start: var(--flow-space, 1em);
      }

      .title {
        font-size: var(--step-2);
        font-weight: bold;
      }
    `;
	}

	static get properties() {
		return {
			titleText: { type: String },
			shortcut: { type: String },
		};
	}

	constructor() {
		super();
		this.titleText = "";
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

	get trigger() {
		return this.renderRoot.querySelector("slot[name='trigger']").assignedElements()[0];
	}

	get shortcutKeys() {
		return this.shortcut.split("+").map((key) => key.trim());
	}

	firstUpdated() {
		if (this.trigger) {
			this.trigger.addEventListener("click", () => {
				this.openModal();
			});
		}

		if (this.shortcut && this.shortcutKeys) {
			document.addEventListener("keydown", (e) => {
				if (this.shortcutKeys.includes("shift")) {
					if (e.shiftKey & e.key === this.shortcutKeys[1]) {
						this.dialogElement.open ? this.closeModal() : this.openModal();
					}
				}
			});
		}
	}

	render() {
		return html`<slot name="trigger"></slot>
    <dialog id="modal" class="flow">
      <slot name="title" class="title">
        <div>${this.titleText}</div>
      </slot>
      <slot></slot>
      <div class="actions">
        <slot name="custom-actions"></slot>
        <button @click=${this.closeModal} id="dismiss" class="dismiss">Dismiss</button>
      </div>
    </dialog>`;
	}
}

customElements.define("modal-menu", ModalMenu);
