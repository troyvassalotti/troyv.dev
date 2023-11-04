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

/**
 * Theme Selector web component.
 * @deprecated
 * @since 2023-11-04
 */
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

	static get properties() {
		return {
			baseHue: { type: String },
			baseSaturation: { type: String },
			primaryLightness: { type: String },
			accentHueModifier: { type: String },
			accentLightness: { type: String },
		};
	}

	constructor() {
		super();
		this.baseHue = "205";
		this.baseSaturation = "46%";
		this.primaryLightness = "40%";
		this.accentHueModifier = "180";
		this.accentLightness = "50%";
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

	buildThemeStyles() {
		let style = document.createElement("style");
		let customProperties = `
		html {
			--base-hue: ${this.baseHue};
			--base-sat: ${this.baseSaturation};

			/* full color palette, from dark to light */
			--clr-10: hsl(var(--base-hue), var(--base-sat), 10%);
			--clr-20: hsl(var(--base-hue), var(--base-sat), 20%);
			--clr-30: hsl(var(--base-hue), var(--base-sat), 30%);
			--clr-40: hsl(var(--base-hue), var(--base-sat), 40%);
			--clr-50: hsl(var(--base-hue), var(--base-sat), 50%);
			--clr-60: hsl(var(--base-hue), var(--base-sat), 60%);
			--clr-70: hsl(var(--base-hue), var(--base-sat), 70%);
			--clr-80: hsl(var(--base-hue), var(--base-sat), 80%);
			--clr-90: hsl(var(--base-hue), var(--base-sat), 90%);
			--clr-95: hsl(var(--base-hue), var(--base-sat), 95%);

			--primary-lightness: ${this.primaryLightness};

			/* primary color in varying opacity levels */
			--primary: hsl(var(--base-hue), var(--base-sat), var(--primary-lightness));
			--primary-75: hsla(var(--base-hue), var(--base-sat), var(--primary-lightness), 75%);
			--primary-50: hsla(var(--base-hue), var(--base-sat), var(--primary-lightness), 50%);
			--primary-25: hsla(var(--base-hue), var(--base-sat), var(--primary-lightness), 25%);
			--primary-15: hsla(var(--base-hue), var(--base-sat), var(--primary-lightness), 15%);
			--primary-10: hsla(var(--base-hue), var(--base-sat), var(--primary-lightness), 10%);

			--accent-hue: calc(var(--base-hue) + ${this.accentHueModifier});
			--accent-lightness: ${this.accentLightness};

			/* accent color in varying opacity levels */
			--accent: hsl(var(--accent-hue), var(--base-sat), var(--accent-lightness));
			--accent-75: hsla(var(--accent-hue), var(--base-sat), var(--accent-lightness), 75%);
			--accent-25: hsla(var(--accent-hue), var(--base-sat), var(--accent-lightness), 25%);
			--accent-15: hsla(var(--accent-hue), var(--base-sat), var(--accent-lightness), 15%);
			--accent-10: hsla(var(--accent-hue), var(--base-sat), var(--accent-lightness), 10%);
		}`;

		style.textContent = customProperties;
		style.id = "theme-modifier-styles";
		
		if (!document.querySelector("#theme-modifier-styles")) {
			document.head.append(style);
		}
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
		this.buildThemeStyles();

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
