/** @format */

import {LitElement, html} from "lit";
import {map} from "lit/directives/map.js";
import {percentify} from "./workout-log.js";
import CoolTable from "/assets/js/cool-table.js";

CoolTable.register();

export default class TrainingWeights extends LitElement {
	static properties = {
		percentages: {type: Array},
		weights: {type: Object},
	};

	render() {
		return html`
			<cool-table unfixed>
				<table>
					<caption>
						Training Weights
					</caption>
					<thead>
						<tr>
							<th>Lift</th>
							<th>1RM</th>
							<th>TM</th>
							${this.percentages.map(
								(percent) => html`<th>${Math.floor(percent * 100)}%</th>`,
							)}
						</tr>
					</thead>
					<tbody>
						${map(
							this.weights,
							(lift) => html`
								<tr>
									<th>${lift.name}</th>
									<td>${lift.orm}</td>
									<td>${lift.tm}</td>
									${this.percentages.map(
										(percent) => html`<td>${percentify(lift.tm, percent)}</td>`,
									)}
								</tr>
							`,
						)}
					</tbody>
				</table>
			</cool-table>
		`;
	}
}

window.customElements.define("training-weights", TrainingWeights);
