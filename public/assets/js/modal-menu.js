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
    `;
	}

	/**
	 * @returns {HTMLDialogElement}
	 */
	get dialogElement() {
		return this.renderRoot.getElementById("modal");
	}

	closeModal() {
		this.dialogElement.close();
	}

	render() {
		return html`<dialog id="modal" class="flow">
      <slot name="title"></slot>
      <slot></slot>
      <div class="actions">
        <slot name="custom-actions"></slot>
        <button @click=${this.closeModal} id="dismiss" class="dismiss">Dismiss</button>
      </div>
    </dialog>`;
	}
}

customElements.define("modal-menu", ModalMenu);
