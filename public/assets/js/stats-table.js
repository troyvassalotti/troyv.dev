/** @format */

import {css, html, LitElement, nothing} from "lit";

class StatsTable extends LitElement {
	static get styles() {
		return [
			css`
				:host {
					box-sizing: border-box;
					display: block;
					overflow: auto;
				}

				* {
					box-sizing: border-box;
					margin: 0;
				}

				*::after,
				*::before {
					box-sizing: inherit;
				}

				table {
					border: 1px solid var(--foreground);
					border-collapse: collapse;
					font-family: var(--code);
					font-size: var(--step--1);
					inline-size: max-content;
					table-layout: fixed;
				}

				caption {
					font-weight: bold;
					inline-size: fit-content;
					inset-inline-start: 0;
					margin-block-end: var(--space-3xs);
					position: sticky;
					text-align: start;
					text-transform: uppercase;
				}

				th {
					text-align: start;
				}

				:is(th, td) {
					max-inline-size: var(--colWidth, auto);
					padding-block: var(--space-3xs);
					padding-inline: var(--space-xs);
				}

				th:nth-of-type(1),
				tr th {
					--colWidth: 10ch;
				}

				th:nth-of-type(2),
				tr td:nth-of-type(1) {
					--colWidth: 30ch;
				}

				th:nth-of-type(3),
				tr td:nth-of-type(2) {
					--colWidth: 45ch;
				}

				th:nth-of-type(4),
				tr td:nth-of-type(3) {
					--colWidth: 40ch;
				}
			`,
		];
	}

	static get properties() {
		return {
			caption: {type: String},
			headers: {type: String},
		};
	}

	constructor() {
		super();
		this.caption = "";
		this.headers = "";
	}

	get data() {
		return this.getAttribute("data");
	}

	render() {
		const parsedData = JSON.parse(this.data) ?? null;
		const headersList = this.headers.split(" ");

		return parsedData
			? html`
					<table>
						${this.caption
							? html` <caption>
									${this.caption}
							  </caption>`
							: nothing}
						<colgroup>
							${headersList.map(
								(header) => html`<col class="col--${header.toLowerCase()}" />`,
							)}
						</colgroup>
						<thead>
							<tr>
								${headersList.map(
									(header) =>
										html`<th
											id="${header.toLowerCase()}"
											scope="col">
											${header}
										</th>`,
								)}
							</tr>
						</thead>
						<tbody>
							${parsedData.map(
								(track, index) => html`
									<tr>
										<th
											id="order-${headersList[0].toLowerCase()}"
											headers="${headersList[0].toLowerCase()}"
											scope="row">
											${index + 1}
										</th>
										${Object.keys(track).map(
											(item, index) => html`
												<td
													headers="order-${headersList[0].toLowerCase()} ${headersList[
														index
													].toLowerCase()}">
													${track[item]}
												</td>
											`,
										)}
									</tr>
								`,
							)}
						</tbody>
					</table>
			  `
			: html`<p>Data not found.</p>`;
	}
}
customElements.define("stats-table", StatsTable);
