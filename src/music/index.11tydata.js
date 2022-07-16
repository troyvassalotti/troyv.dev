const EleventyFetch = require("@11ty/eleventy-fetch");

/**
 * Gets the currently playing song from ListenBrainz
 * @param api
 * @param auth
 * @returns {Promise<{song: *, artist: *, release: *}|boolean>}
 */
async function getNowPlaying(api, auth) {
  try {
    let options = {
      duration: "3m",
      type: "json",
      fetchOptions: {
        headers: auth,
      },
    };

    if (process.env.ELEVENTY_SERVERLESS) {
      options.duration = "10m";
      options.directory = "_cache";
    }

    const data = await EleventyFetch(`${api}/user/actionhamilton/playing-now`, options);

    const { payload } = data;
    const metadata = payload.listens[0].track_metadata;
    const { artist_name: artist, track_name: song, release_name: release } = metadata;

    return { artist, song, release };
  } catch (error) {
    return false;
  }
}

/**
 * Gets my most recent listens (default: 30) from ListenBrainz
 * @param api
 * @param auth
 * @param count
 * @returns {Promise<boolean|*>}
 */
async function getMostRecentListens(api, auth, count = 30) {
  try {
    let options = {
      duration: "10m",
      type: "json",
      fetchOptions: {
        headers: auth,
      },
    };

    if (process.env.ELEVENTY_SERVERLESS) {
      options.duration = "30m";
      options.directory = "_cache";
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

  const nowPlaying = await getNowPlaying(listenBrainzEndpoint, headers);
  const mostRecentListens = await getMostRecentListens(listenBrainzEndpoint, headers);

  return {
    title: "Music",
    description: "Music is one of my passions. Check out all my musical projects here.",
    permalink: {
      music: "/music/",
    },
    frontRoyal: {
      meta: {
        "Instruments": "Guitar, backing vocals",
        "Years Active": "2014 - present",
      },
      social: [
        {
          href: "https://frontroyalmd.bandcamp.com/",
          img: "bandcamp.svg",
          alt: "Bandcamp",
        },
      ],
    },
    troyalllowercase: {
      meta: {
        "Instruments": "Guitar, drums, bass, vocals",
        "Years Active": "2016 - present",
      },
      social: [
        {
          href: "https://justtroy.bandcamp.com/",
          img: "bandcamp.svg",
          alt: "Bandcamp",
        },
      ],
    },
    nowPlaying,
    mostRecentListens,
  };
};
