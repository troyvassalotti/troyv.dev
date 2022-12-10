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
    this.isSilent = false;
  }

  async load() {
    try {
      const res = await fetch("https://api.troyv.dev/now-playing");
      const data = await res.json();

      // Only errors or empty tracks return a message property
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
    const template = this.isSilent ? `<p class="u-font--code u-revertMargin--start">Silence.</p>` : `<dl class="c-dataList u-font--code">
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

    this.innerHTML = template;
  }

  connectedCallback() {
    this.load();
  }
}

customElements.define("now-playing", NowPlaying);
