import { css, html, LitElement } from "lit";

const HUE_PROPERTY = "--base-hue";
const SATURATION_PROPERTY = "--base-sat";
const HUE_STORAGE = "theme-base-hue";
const SATURATION_STORAGE = "theme-base-saturation";

class ThemeSelector extends LitElement {
	updateDocumentProperties(name, value) {
		document.documentElement.style.setProperty(name, value);
	}

	removeDocumentProperties(name) {
		document.documentElement.style.removeProperty(name);
	}

	updateHue(e) {
		const VALUE = e.target.value;
		this.updateDocumentProperties(HUE_PROPERTY, VALUE);
		localStorage.setItem(HUE_STORAGE, VALUE);
	}

	updateSaturation(e) {
		const VALUE = e.target.value;
		this.updateDocumentProperties(SATURATION_PROPERTY, `${VALUE}%`);
		localStorage.setItem(SATURATION_STORAGE, VALUE);
	}

	resetTheme() {
		this.removeDocumentProperties(HUE_PROPERTY);
		this.removeDocumentProperties(SATURATION_PROPERTY);
		localStorage.removeItem(HUE_STORAGE);
		localStorage.removeItem(SATURATION_STORAGE);
		this.hueSlider.value = undefined;
		this.saturationSlider.value = undefined;
	}

	get hueSlider() {
		return this.renderRoot.getElementById("theme-hue");
	}

	get saturationSlider() {
		return this.renderRoot.getElementById("theme-saturation");
	}

	get storedValues() {
		return {
			hue: localStorage.getItem(HUE_STORAGE),
			saturation: localStorage.getItem(SATURATION_STORAGE),
		};
	}

	initTheme() {
	}

	render() {
		return html`<div class="theme__field">
        <label for="theme-hue">Change the base theme color.</label>
        <input @input=${this.updateHue} type="range" name="theme-hue" id="theme-hue" min="0" max="360" />
      </div>
      <div class="theme__field">
        <label for="theme-saturation">Change the base theme saturation.</label>
        <input @input=${this.updateSaturation} type="range" name="theme-saturation" id="theme-saturation" min="0" max="100" />
      </div>`;
	}
}

customElements.define("theme-selector", ThemeSelector);
