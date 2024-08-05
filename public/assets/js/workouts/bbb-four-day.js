/** @format */

import {html} from "lit";
import BoringButBig from "./boring-but-big.js";
import {PUSH_PULL, LEG_CORE} from "./workout-log.js";
import {templateContent} from "lit/directives/template-content.js";

export default class FourDay extends BoringButBig {
	// prettier-ignore
	tableBody() {
    return html`
      <tbody>
        ${this.dayDivider(1)}
        ${this.benchRows()}
        ${this.highRepLowWeight(this.overheadPress, 0.6)}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
        ${this.dayDivider(2)}
        ${this.squatRows()}
        ${this.highRepLowWeight(this.deadlift)}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
        ${this.dayDivider(3)}
        ${this.overheadPressRows()}
        ${this.highRepLowWeight(this.bench, 0.6)}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
        ${this.dayDivider(4)}
        ${this.deadliftRows()}
        ${this.highRepLowWeight(this.squat)}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
      </tbody>
    `;
  }
}

window.customElements.define("bbb-four-day", FourDay);
