/** @format */

import metadata from "./metadata.js";
import runEleventyFetch from "../../utils/eleventyFetch.js";

const MUSICBRAINZ_ENDPOINT = "https://musicbrainz.org/ws/2/";
const COVER_ART_ARCHIVE_ENDPOINT = "https://coverartarchive.org/release/";

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

	// TODO: artist-credit is an empty array???
	static getArtistCredit(release) {
		return release["artist-credit"][0]?.name;
	}

	static async getAlbumArtwork(mbid, thumb = false) {
		try {
			if (thumb) {
				const data = await runEleventyFetch(
					`${COVER_ART_ARCHIVE_ENDPOINT}${mbid}`,
				);
				const {images} = data;
				const front = images.find((image) => image.front);
				const {thumbnails} = front;

				return `${metadata.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${thumbnails["500"]}`;
			}

			return `${metadata.cloudinary.fetch}/c_scale,f_auto,q_auto:eco,w_500/${COVER_ART_ARCHIVE_ENDPOINT}${mbid}/front`;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async getCollectionInformation(collectionId) {
		try {
			let apiEndpoint = `${MUSICBRAINZ_ENDPOINT}collection/${collectionId}/releases${this.apiQueries}`;

			let allReleases = [];
			let offset = 0;

			const data = await runEleventyFetch(apiEndpoint);

			const releaseCount = data["release-count"];
			const releaseInformation = this.getReleaseInformation(data);
			const {releases, numberOfReleases} = releaseInformation;

			allReleases.push(releases);
			offset = numberOfReleases;

			// MusicBrainz only returns a subset of responses and there's no way to increase that number at this time.
			// To get around it, I fetch more data with an offset based on what is remaining.
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
					const artwork = await this.getAlbumArtwork(id, false);

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
			console.error(error);
			return false;
		}
	}
}

export default async function () {
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
}
