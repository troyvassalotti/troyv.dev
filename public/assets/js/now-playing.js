/**
 * Retrieve my now playing song from Listenbrainz.
 *
 * Adapted from Andy Bell's `<last-fm>` component.
 *
 * @format
 * @link https://andy-bell.co.uk/
 */

export default class NowPlaying extends HTMLElement {
	constructor() {
		super();
		this.track = null;
		this.isSilent = false;
		this.service = "";
	}

	static tagName = "now-playing";

	static register() {
		if (!window.customElements.get(this.tagName)) {
			window.customElements.define(this.tagName, this);
		}
	}

	static get observedAttributes() {
		return ["service"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "service") {
			console.info(`Now Playing service changed from ${oldValue}.`);
			this.service = newValue;
			this.load();
		}
	}

	async load() {
		try {
			const res = await fetch(this.service);
			const data = await res.json();

			// Expect only errors or empty tracks return a message property from the API
			if (data.message) {
				this.isSilent = true;
			} else {
				this.track = data;
			}

			this.render();
		} catch (error) {
			console.error(error);
			this.isSilent = true;
		}
	}

	render() {
		const template = this.isSilent
			? "silence"
			: `"${this.track.track_name}"${
					this.track.artist_name ? ` by <b>${this.track.artist_name}</b>` : ""
				}${
					this.track.release_name
						? ` from <i>${this.track.release_name}</i>`
						: ""
				}`;

		this.innerHTML = template;
	}

	connectedCallback() {
		this.load();
	}
}
