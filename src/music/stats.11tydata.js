const EleventyFetch = require("@11ty/eleventy-fetch");

/**
 * Return my top (default: 10) artists in the given timeframe (default: this month)
 * @param api
 * @param auth
 * @param fetchDir
 * @param count
 * @param range
 * @returns {Promise<boolean|*>}
 */
async function getTopArtists(api, auth, fetchDir, count = 10, range = "this_month") {
  try {
    let options = {
      type: "json",
      fetchOptions: {
        headers: auth,
      },
      directory: fetchDir,
    };

    if (process.env.ELEVENTY_SERVERLESS) {
      options.duration = "30m";
      options.directory = "/tmp/.cache/";
    }

    const data = await EleventyFetch(
      `${api}/stats/user/actionhamilton/artists?count=${count}&range=${range}`,
      options
    );

    const { payload } = data;
    const { artists } = payload;

    return artists.map((artist) => {
      const { artist_name: name, listen_count: listens } = artist;
      return { name, listens };
    });
  } catch (error) {
    return false;
  }
}

/**
 * Gets my most recent listens (default: 30) from ListenBrainz
 * @param api
 * @param auth
 * @param fetchDir
 * @param count
 * @returns {Promise<boolean|*>}
 */
async function getMostRecentListens(api, auth, fetchDir, count = 30) {
  try {
    let options = {
      type: "json",
      fetchOptions: {
        headers: auth,
      },
      directory: fetchDir,
    };

    if (process.env.ELEVENTY_SERVERLESS) {
      options.duration = "30m";
      options.directory = "/tmp/.cache/";
    }

    const data = await EleventyFetch(`${api}/user/actionhamilton/listens?count=${count}`, options);

    const { payload } = data;
    const { listens } = payload;
    const metadata = listens.map((track) => track.track_metadata);

    return metadata.map((track) => {
      const { artist_name: artist, track_name: song, release_name: release } = track;
      return { artist, song, release };
    });
  } catch (error) {
    return false;
  }
}

module.exports = async function () {
  const listenBrainzEndpoint = "https://api.listenbrainz.org/1";
  const headers = { Authorization: "Token " + process.env.LISTENBRAINZ_TOKEN };
  const directory = "_cache";

  const topArtistsThisMonth = await getTopArtists(listenBrainzEndpoint, headers, directory);
  const mostRecentListens = await getMostRecentListens(listenBrainzEndpoint, headers, directory);

  return {
    title: "Music Stats",
    description: "Aggregated data from my ListenBrainz profile.",
    permalink: {
      ondemand: "/music/stats/",
    },
    topArtistsThisMonth,
    mostRecentListens,
  };
};
