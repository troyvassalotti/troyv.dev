/** @format */

import {LitElement, html} from "lit";
import {percentify, BBB_TABLE_HEAD} from "./workout-log.js";
import {map} from "lit/directives/map.js";
import {templateContent} from "lit/directives/template-content.js";
import CoolTable from "/assets/js/cool-table.js";

CoolTable.register();

export default class BoringButBig extends LitElement {
	static properties = {
		percentages: {type: Array},
		squat: {type: Object},
		bench: {type: Object},
		overheadPress: {type: Object},
		deadlift: {type: Object},
	};

	dayDivider(dayNumber = 1, span = 5) {
		return html`
			<tr>
				<th
					colspan="${span}"
					class="day-divider">
					Day ${dayNumber}
				</th>
			</tr>
		`;
	}

	/**
	 * @abstract Unique per type of BBB.
	 */
	tableBody() {
		return html``;
	}

	weightTableCells(start, end, set, deload = 0) {
		if (!start || !end || !set) {
			return html``;
		}

		return html`
			${map(
				this.percentages.slice(start, end),
				(percent) => html` <td>${percentify(set.tm, percent)}</td> `,
			)}
			<td>${percentify(set.tm, this.percentages[deload])}</td>
		`;
	}

	liftSet(lift) {
		return html`
			<tr>
				<th rowspan="3">${lift.name}</th>
				${this.weightTableCells(5, 8, lift)}
			</tr>
			<tr>
				${this.weightTableCells(7, 10, lift, 2)}
			</tr>
			<tr>
				${this.weightTableCells(9, 12, lift, 4)}
			</tr>
		`;
	}

	squatRows() {
		return this.liftSet(this.squat);
	}

	benchRows() {
		return this.liftSet(this.bench);
	}

	overheadPressRows() {
		return this.liftSet(this.overheadPress);
	}

	deadliftRows() {
		return this.liftSet(this.deadlift);
	}

	highRepLowWeight(lift, percent = 0.5) {
		let arr = [percent, percent, percent, percent];

		let cells = arr.map(
			(percent) => html`<td>5x10 @ ${percentify(lift.tm, percent)}</td>`,
		);

		return html`
			<tr>
				<th>${lift.name}</th>
				${cells}
			</tr>
		`;
	}

	// prettier-ignore
	render() {
    return html`
<cool-table>
      <table>
        ${templateContent(BBB_TABLE_HEAD)}
        ${this.tableBody()}
      </table>
</cool-table>
    `;
  }
}
