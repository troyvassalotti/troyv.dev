import { css, html, LitElement } from "lit";
import base from "./components.styles.js";

const HUE_PROPERTY = "--base-hue";
const SATURATION_PROPERTY = "--base-sat";
const ACCENT_PROPERTY = "--accent-lightness";
const PRIMARY_PROPERTY = "--primary-lightness";
const HUE_STORAGE = "theme-base-hue";
const SATURATION_STORAGE = "theme-base-saturation";
const ACCENT_STORAGE = "theme-base-accent";
const PRIMARY_STORAGE = "theme-base-primary";

class ThemeSelector extends LitElement {
	static get styles() {
		return [
			base,
			css`
        :host {
          display: block;
        }

        .theme__field {
          display: flex;
          flex-direction: column;
		  gap: .25em;
		  margin-block-end: .75em;
        }

        .theme__field label {
          font-weight: bold;
        }
      `,
		];
	}

	get hueSlider() {
		return this.renderRoot.getElementById("theme-hue");
	}

	get saturationSlider() {
		return this.renderRoot.getElementById("theme-saturation");
	}

	get primarySlider() {
		return this.renderRoot.getElementById("primary-lightness");
	}

	get accentSlider() {
		return this.renderRoot.getElementById("accent-lightness");
	}

	get storedValues() {
		return {
			hue: localStorage.getItem(HUE_STORAGE),
			saturation: localStorage.getItem(SATURATION_STORAGE),
			accentLightness: localStorage.getItem(ACCENT_STORAGE),
			primaryLightness: localStorage.getItem(PRIMARY_STORAGE),
		};
	}

	updateDocumentProperties(name, value) {
		document.documentElement.style.setProperty(name, value);
	}

	removeDocumentProperties(name) {
		document.documentElement.style.removeProperty(name);
	}

	setValues(e, styleProp, storageProp, usePercentage = false) {
		const VALUE = e.target.value;
		let styleValue = "";

		if (usePercentage) {
			styleValue = `${VALUE}%`;
		} else {
			styleValue = VALUE;
		}

		this.updateDocumentProperties(styleProp, styleValue);
		localStorage.setItem(storageProp, VALUE);
	}

	updateHue(e) {
		this.setValues(e, HUE_PROPERTY, HUE_STORAGE);
	}

	updateSaturation(e) {
		this.setValues(e, SATURATION_PROPERTY, SATURATION_STORAGE, true);
	}

	updateAccent(e) {
		this.setValues(e, ACCENT_PROPERTY, ACCENT_STORAGE, true);
	}

	updatePrimary(e) {
		this.setValues(e, PRIMARY_PROPERTY, PRIMARY_STORAGE, true);
	}

	resetTheme() {
		this.removeDocumentProperties(HUE_PROPERTY);
		this.removeDocumentProperties(SATURATION_PROPERTY);
		this.removeDocumentProperties(PRIMARY_PROPERTY);
		this.removeDocumentProperties(ACCENT_PROPERTY);

		localStorage.removeItem(HUE_STORAGE);
		localStorage.removeItem(SATURATION_STORAGE);
		localStorage.removeItem(PRIMARY_STORAGE);
		localStorage.removeItem(ACCENT_STORAGE);

		this.hueSlider.value = undefined;
		this.saturationSlider.value = undefined;
		this.primarySlider.value = undefined;
		this.accentSlider.value = undefined;
	}

	initTheme() {
		if (this.storedValues.hue) {
			this.updateDocumentProperties(HUE_PROPERTY, this.storedValues.hue);
			this.hueSlider.value = this.storedValues.hue;
		}

		if (this.storedValues.saturation) {
			this.updateDocumentProperties(SATURATION_PROPERTY, this.storedValues.saturation + "%");
			this.saturationSlider.value = this.storedValues.saturation;
		}

		if (this.storedValues.primaryLightness) {
			this.updateDocumentProperties(PRIMARY_PROPERTY, this.storedValues.primaryLightness + "%");
			this.primarySlider.value = this.storedValues.primaryLightness;
		}

		if (this.storedValues.accentLightness) {
			this.updateDocumentProperties(ACCENT_PROPERTY, this.storedValues.accentLightness + "%");
			this.accentSlider.value = this.storedValues.accentLightness;
		}
	}

	firstUpdated() {
		this.initTheme();
	}

	render() {
		return html`<div class="theme__field">
        <label for="theme-hue">Theme Color</label>
        <input @input=${this.updateHue} type="range" name="theme-hue" id="theme-hue" min="0" max="360" />
      </div>
      <div class="theme__field">
        <label for="theme-saturation">Theme Saturation</label>
        <input @input=${this.updateSaturation} type="range" name="theme-saturation" id="theme-saturation" min="0" max="100" />
      </div>
	  <div class="theme__field">
		<label for="primary-lightness">Primary Color Lightness</label>
		<input @input=${this.updatePrimary} type="range" name="primary-lightness" id="primary-lightness" min="0" max="100" />
	  </div>
	  <div class="theme__field">
		<label for="accent-lightness">Accent Color Lightness</label>
		<input @input=${this.updateAccent} type="range" name="accent-lightness" id="accent-lightness" min="0" max="100" />	
	  </div>
	  <slot @click=${this.resetTheme} name="reset"></slot>`;
	}
}

customElements.define("theme-selector", ThemeSelector);
