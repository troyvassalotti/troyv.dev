/** @format */

class Plvylist {
	data() {
		return {
			permalink: "assets/js/plvylist.json",
		};
	}

	generateTrackData(dataset, globalData) {
		const {cloudinary, cloudinaryVideo} = globalData;
		const {artist, artistUrl, title, albumUrl, artwork, tracks} = dataset;

		return tracks.map((track) => {
			return {
				file: `${cloudinaryVideo}/${track.file}`,
				title: `${track.title}`,
				artist: `${artist}`,
				artistUrl: `${artistUrl}`,
				album: `${title}`,
				albumUrl: `${albumUrl}`,
				artwork: `${cloudinary}/${artwork}`,
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

module.exports = Plvylist;
