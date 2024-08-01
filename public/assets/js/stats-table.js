/** @format */

import {css, html, LitElement, nothing} from "lit";

export default class StatsTable extends LitElement {
	static get styles() {
		return [
			css`
				:host {
					box-sizing: border-box;
					display: block;
				}

				* {
					box-sizing: border-box;
					margin: 0;
				}

				*::after,
				*::before {
					box-sizing: inherit;
				}

				caption {
					font-weight: bold;
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

	static tagName = "stats-table";

	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	get data() {
		return this.getAttribute("data");
	}

	render() {
		const parsedData = JSON.parse(this.data) ?? null;
		const headersList = this.headers.split(" ");

		return parsedData
			? html`
					<cool-table>
						<table>
							${this.caption
								? html` <caption>
										${this.caption}
									</caption>`
								: nothing}
							<colgroup>
								${headersList.map(
									(header) =>
										html`<col class="col--${header.toLowerCase()}" />`,
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
					</cool-table>
				`
			: html`<p>Data not found.</p>`;
	}
}
