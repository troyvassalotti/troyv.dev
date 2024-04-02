/** @format */

const {runEleventyFetch, getAlbumArtwork} = require("../../utils/helpers");
const {MUSICBRAINZ_ENDPOINT} = require("../../utils/globals");

class MusicLibrary {
	static mbids = {
		owned: "86a0ed72-c50b-4dad-a29c-a891aed64296",
		wishlist: "e388e735-bffa-4fd3-876a-6dfcf7b9cb7b",
	};

	static apiQueries = "?fmt=json&inc=artist-credits+releases";

	static getReleaseInformation(data) {
		return {
			releases: data.releases,
			get numberOfReleases() {
				return this.releases.length;
			},
		};
	}

	static getArtistCredit(release) {
		return release["artist-credit"][0].name;
	}

	static async getCollectionInformation(collectionId) {
		try {
			let apiEndpoint = `${MUSICBRAINZ_ENDPOINT}collection/${collectionId}/releases${MusicLibrary.apiQueries}`;

			let allReleases = [];
			let offset = 0;

			const data = await runEleventyFetch(apiEndpoint);

			const releaseCount = data["release-count"];
			const releaseInformation = this.getReleaseInformation(data);
			const {releases, numberOfReleases} = releaseInformation;

			allReleases.push(releases);
			offset = numberOfReleases;

			while (offset < releaseCount) {
				const data = await runEleventyFetch(`${apiEndpoint}&offset=${offset}`);

				const releaseInformation = this.getReleaseInformation(data);
				const {releases, numberOfReleases} = releaseInformation;

				allReleases.push(releases);
				offset += numberOfReleases;
			}

			const flattened = allReleases.flat();
			const releaseData = await Promise.all(
				flattened.map(async (release) => {
					const {title, id} = release;
					const artist = this.getArtistCredit(release);
					const artwork = await getAlbumArtwork(id, false);

					return {title, artist, artwork};
				}),
			);

			return releaseData.sort((a, b) => {
				if (a.artist < b.artist) {
					return -1;
				}
				if (a.artist > b.artist) {
					return 1;
				}
				return 0;
			});
		} catch (error) {
			return false;
		}
	}
}

module.exports = async function () {
	const ownedVinyl = await MusicLibrary.getCollectionInformation(
		MusicLibrary.mbids.owned,
	);
	const vinylWishlist = await MusicLibrary.getCollectionInformation(
		MusicLibrary.mbids.wishlist,
	);

	return {
		ownedVinyl,
		vinylWishlist,
	};
};
