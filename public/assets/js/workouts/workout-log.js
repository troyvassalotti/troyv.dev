/** @format */

import {LitElement, html, css} from "lit";
import "./training-weights.js";
import "./bbb-three-day.js";
import "./bbb-four-day.js";

export const BBB_TABLE_HEAD = document.querySelector("template#bbb-thead");
export const PUSH_PULL = document.querySelector("template#push-pull");
export const LEG_CORE = document.querySelector("template#leg-core");

export function percentify(value, percent) {
	return Math.round(value * percent);
}

export default class WorkoutLog extends LitElement {
	static styles = css`
		:host > * + * {
			margin-block-start: 4rem;
		}

		summary {
			cursor: pointer;
			font-size: 2rem;
			font-weight: bold;
			inline-size: fit-content;
			margin-block-end: 1em;
		}
	`;

	static properties = {
		bench: {type: Number, reflect: true},
		overheadPress: {type: Number, reflect: true},
		squat: {type: Number, reflect: true},
		deadlift: {type: Number, reflect: true},
	};

	static percentages = [
		0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95,
	];

	static trainingMaxPercentage = 0.9;

	static createLiftDataObject(name, lift) {
		return {
			name,
			orm: lift,
			tm: percentify(lift, this.trainingMaxPercentage),
		};
	}

	connectedCallback() {
		super.connectedCallback();

		this.benchData = WorkoutLog.createLiftDataObject("Bench", this.bench);

		this.overheadPressData = WorkoutLog.createLiftDataObject(
			"Overhead Press",
			this.overheadPress,
		);

		this.squatData = WorkoutLog.createLiftDataObject("Squat", this.squat);

		this.deadliftData = WorkoutLog.createLiftDataObject(
			"Deadlift",
			this.deadlift,
		);

		this.trainingWeights = [
			this.benchData,
			this.overheadPressData,
			this.squatData,
			this.deadliftData,
		];
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<div class="u-flow">
				<training-weights
					.percentages=${WorkoutLog.percentages}
					.weights=${this.trainingWeights}></training-weights>
				<details>
					<summary>Boring But Big: 3 Day</summary>
					<bbb-three-day
						.percentages=${WorkoutLog.percentages}
						.bench=${this.benchData}
						.overheadPress=${this.overheadPressData}
						.squat=${this.squatData}
						.deadlift=${this.deadliftData}></bbb-three-day>
				</details>
				<details>
					<summary>Boring But Big: 4 Day</summary>
					<bbb-four-day
						.percentages=${WorkoutLog.percentages}
						.bench=${this.benchData}
						.overheadPress=${this.overheadPressData}
						.squat=${this.squatData}
						.deadlift=${this.deadliftData}></bbb-four-day>
				</details>
			</div>
		`;
	}
}

window.customElements.define("workout-log", WorkoutLog);
