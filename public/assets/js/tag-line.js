/** @format */

export default class Tagline extends HTMLElement {
	constructor() {
		super();
		this.tagLines = [];
		this.separator = "|";
	}

	static tagName = "tag-line";

	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	static get observedAttributes() {
		return ["taglines", "separator"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "separator") {
			if (newValue) {
				this.separator = newValue;
			}
		}

		if (name === "taglines") {
			if (newValue) {
				this.tagLines = newValue
					.split(this.separator)
					.map((item) => item.trim());
			}
		}
	}

	randomNumberGenerator(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	render() {
		const randomNumber = this.randomNumberGenerator(0, this.tagLines.length);

		this.innerText = this.tagLines[randomNumber];
	}

	connectedCallback() {
		this.render();
	}
}
