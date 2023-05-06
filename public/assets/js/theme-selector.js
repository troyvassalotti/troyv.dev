import { css, html, LitElement } from "lit";

const HUE_PROPERTY = "--base-hue";
const SATURATION_PROPERTY = "--base-sat";
const HUE_STORAGE = "theme-base-hue";
const SATURATION_STORAGE = "theme-base-saturation";

class ThemeSelector extends LitElement {
	static get styles() {
		return css`
      .theme__field {
        display: flex;
        flex-direction: column;
      }

      .theme__field label {
        font-weight: bold;
      }

	  .resetThemeButton {
		appearance: none;
		background-color: transparent;
		border: 0;
		color: var(--links);
		cursor: pointer;
		font-size: var(--step--1);
		text-decoration: underline;
	  }
    `;
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

	initTheme() {
		if (this.storedValues.hue) {
			this.updateDocumentProperties(HUE_PROPERTY, this.storedValues.hue);
			this.hueSlider.value = this.storedValues.hue;
		}

		if (this.storedValues.saturation) {
			this.updateDocumentProperties(SATURATION_PROPERTY, this.storedValues.saturation + "%");
			this.saturationSlider.value = this.storedValues.saturation;
		}
	}

	firstUpdated() {
		this.initTheme();
	}

	render() {
		return html`<div class="theme__field">
        <label for="theme-hue">Theme color.</label>
        <input @input=${this.updateHue} type="range" name="theme-hue" id="theme-hue" min="0" max="360" />
      </div>
      <div class="theme__field">
        <label for="theme-saturation">Theme saturation.</label>
        <input @input=${this.updateSaturation} type="range" name="theme-saturation" id="theme-saturation" min="0" max="100" />
      </div>
      <button @click=${this.resetTheme} class="resetThemeButton">Reset Theme</button>`;
	}
}

customElements.define("theme-selector", ThemeSelector);
