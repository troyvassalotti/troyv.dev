/** @format */

import {css, html, LitElement} from "lit";

export default class CoolTable extends LitElement {
	static tagName = "cool-table";

	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	static styles = css`
		:host {
			box-sizing: border-box;
			display: block;
		}

		.wrapper {
			box-sizing: inherit;
			overflow: auto;
		}
	`;

	createStylesheet() {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`
      cool-table {
        box-sizing: border-box;

        * {
          box-sizing: border-box;
        }

        table {
          border-collapse: collapse;
          inline-size: max(60rem, 100%);
          table-layout: fixed;
        }

        th,
        caption {
          text-align: start;
        }

        caption {
          margin-block: 0.75rem;
        }

        thead th:not(:first-child),
        &:not([headless-body]) td,
        &[headless-body] td:not(:first-child) {
          text-align: end;
        }

        thead {
          background: color-mix(in srgb, var(--accent) 70%, var(--light));
          border-block-end: 2px solid;
        }

        tfoot {
          background: color-mix(in srgb, var(--accent) 70%, var(--light));
          border-block: 2px solid;
        }

        th,
        td {
          border: 1px solid lightgrey;
          padding-block: 0.25rem;
          padding-inline: 0.75rem;
          vertical-align: baseline;
        }

        &:not([headless-body]) th:first-child,
        &[headless-body] :is(thead th:first-child, tbody td:first-child) {
          border-inline-end: none;
          inset-inline-start: 0;
          position: sticky;
        }

        tbody th,
        &[headless-body] tbody td:first-child {
          background: var(--background);
        }

        thead th,
        tfoot th {
          background: color-mix(in srgb, var(--accent) 70%, var(--light));
        }

        thead th {
          vertical-align: bottom;
        }

        &:not([headless-body]) :is(td:first-of-type, :where(thead, tfoot) th:nth-child(2)),
        &[headless-body] :is(td:nth-of-type(2), :where(thead, tfoot) th:nth-child(2)) {
          border-inline-start: none;
        }

        th:first-of-type {
          width: 10rem;
        }

        th:first-child::after,
        &[headless-body] tbody td:first-child::after {
          background: lightgrey;
          block-size: 100%;
          content: '';
          inset-block-start: 0;
          inset-inline-end: 0;
          inline-size: 1px;
          position: absolute;
        }
      }
    `);

		if (!this.getRootNode().adoptedStyleSheets.includes(sheet)) {
			this.getRootNode().adoptedStyleSheets.push(sheet);
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.createStylesheet();
	}

	render() {
		return html`
			<div class="wrapper">
				<slot></slot>
			</div>
		`;
	}
}
