const { runEleventyFetch } = require("../../utils/helpers");
const { MUSICBRAINZ_ENDPOINT } = require("../../utils/globals");

const MBIDS = {
	owned: "86a0ed72-c50b-4dad-a29c-a891aed64296",
	wishlist: "e388e735-bffa-4fd3-876a-6dfcf7b9cb7b",
};

const API_QUERIES = "?fmt=json&inc=artist-credits+releases";

function getReleaseInformation(data) {
	return {
		releases: data.releases,
		get numberOfReleases() {
			return this.releases.length;
		},
	};
}

function getArtistCredit(release) {
	return release["artist-credit"][0].name;
}

async function getCollectionInformation(collectionId) {
	try {
		let apiEndpoint = `${MUSICBRAINZ_ENDPOINT}collection/${collectionId}/releases${API_QUERIES}`;

		let allReleases = [];
		let offset = 0;

		const data = await runEleventyFetch(
			apiEndpoint,
		);

		const releaseCount = data["release-count"];
		const releaseInformation = getReleaseInformation(data);
		const { releases, numberOfReleases } = releaseInformation;

		allReleases.push(releases);
		offset = numberOfReleases;

		while (offset < releaseCount) {
			const data = await runEleventyFetch(
				`${apiEndpoint}&offset=${offset}`,
			);

			const releaseInformation = getReleaseInformation(data);
			const { releases, numberOfReleases } = releaseInformation;

			allReleases.push(releases);
			offset += numberOfReleases;
		}

		return allReleases.flat().map((release) => {
			const { title } = release;
			const artist = getArtistCredit(release);
			return { title, artist };
		});
	} catch (error) {
		return false;
	}
}

module.exports = async function() {
	const ownedVinyl = await getCollectionInformation(MBIDS.owned);
	const vinylWishlist = await getCollectionInformation(MBIDS.wishlist);

	return {
		ownedVinyl,
		vinylWishlist,
	};
};
