/** @format */

import {html} from "lit";
import BoringButBig from "./boring-but-big.js";
import {PUSH_PULL, LEG_CORE} from "./workout-log.js";
import {templateContent} from "lit/directives/template-content.js";

export default class ThreeDay extends BoringButBig {
	// prettier-ignore
	tableBody() {
    return html`
      <tbody>
        ${this.dayDivider(1)}
        ${this.squatRows()}
        ${this.overheadPressRows()}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
        ${this.dayDivider(2)}
        ${this.benchRows()}
        ${this.highRepLowWeight(this.overheadPress, 0.6)}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
        ${this.dayDivider(3)}
        ${this.deadliftRows()}
        ${this.highRepLowWeight(this.bench, 0.6)}
        ${templateContent(PUSH_PULL)}
        ${templateContent(LEG_CORE)}
      </tbody>
    `;
  }
}

window.customElements.define("bbb-three-day", ThreeDay);
