/** @format */

class Plvylist {
	data() {
		return {
			permalink: "assets/js/plvylist.json",
		};
	}

	render({metadata, plvylistTracks}) {
		const {LP1, LP2} = plvylistTracks;

		const LP1_TRACKS = LP1.tracks.map((track) => {
			return {
				file: `${metadata.cloudinaryVideo}/${track.file}`,
				title: `${track.title}`,
				artist: `${LP1.artist}`,
				artistUrl: `${LP1.artistUrl}`,
				album: `${LP1.title}`,
				albumUrl: `${LP1.albumUrl}`,
				artwork: `${metadata.cloudinary}/${LP1.artwork}`,
			};
		});

		const LP2_TRACKS = LP2.tracks.map((track) => {
			return {
				file: `${metadata.cloudinaryVideo}/${track.file}`,
				title: `${track.title}`,
				artist: `${LP2.artist}`,
				artistUrl: `${LP2.artistUrl}`,
				album: `${LP2.title}`,
				albumUrl: `${LP2.albumUrl}`,
				artwork: `${metadata.cloudinary}/${LP2.artwork}`,
			};
		});

		return JSON.stringify({
			tracks: [...LP2_TRACKS, ...LP1_TRACKS],
		});
	}
}

module.exports = Plvylist;
