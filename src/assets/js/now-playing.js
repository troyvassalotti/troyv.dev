/**
 * Retrieve my now playing song from Listenbrainz.
 * 
 * Adapted from Andy Bell's `<last-fm>` component.
 * @link https://andy-bell.co.uk/
 */
class NowPlaying extends HTMLElement {
	constructor() {
	  super();
	  this.track = null;
	  this.isEmpty = false;
	}
  
	async load() {
	  try {
		const res = await fetch('https://api.troyv.dev/now-playing');
		const data = await res.json();
  
		if (data === {}) {
		  this.isEmpty = true;
		  return;
		}

		this.track = data;
		this.render();
	  } catch (error) {
		console.error(error);
		this.isEmpty = true;
	  }
	}
  
	render() {
		const template = this.isEmpty ? "<p>Silence.</p>" : `<dl class="c-dataList u-font--code">
			<div class="c-dataList__item">
				<dt>Artist</dt>
				<dd>${this.track.artist_name}</dd>
			</div>
			<div class="c-dataList__item">
				<dt>Track</dt>
				<dd>${this.track.track_name}</dd>
			</div>
			<div class="c-dataList__item">
				<dt>Release</dt>
				<dd>${this.track.release_name}</dd>
			</div>
		</dl>`;

	  this.innerHTML = `
	  <slot></slot>
	  ${template}`;
	}
  
	connectedCallback() {
	  this.load();
	}
  }
  
  customElements.define('now-playing', NowPlaying);
  