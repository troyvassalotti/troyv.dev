/** @format */

export default class Plvylist {
	data() {
		return {
			permalink: "assets/js/plvylist.json",
		};
	}

	/**
	 * Create a set of Plvylist tracks.
	 * @param {PlvylistAlbumMeta} dataset Prepared data to convert to Plvylist values.
	 * @param {*} globalData Sitewide metadata.
	 * @returns {PlvylistTrack[]} Full set of tracks from the album.
	 */
	generateTrackData(dataset, globalData) {
		const {cloudinary} = globalData;
		const {artist, artistUrl, title, albumUrl, artwork, tracks} = dataset;

		return tracks.map((track) => {
			return {
				file: `${cloudinary.video}/${track.file}`,
				title: `${track.title}`,
				artist: `${artist}`,
				artistUrl: `${artistUrl}`,
				album: `${title}`,
				albumUrl: `${albumUrl}`,
				artwork: `${cloudinary.image}/${artwork}`,
			};
		});
	}

	render({metadata, plvylistTracks}) {
		const {LP1, LP2} = plvylistTracks;
		const LP1_TRACKS = this.generateTrackData(LP1, metadata);
		const LP2_TRACKS = this.generateTrackData(LP2, metadata);

		return JSON.stringify({
			tracks: [...LP2_TRACKS, ...LP1_TRACKS],
		});
	}
}
