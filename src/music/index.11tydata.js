const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const listenBrainzEndpoint = "https://api.listenbrainz.org/1/user/actionhamilton";
  const apiHeaders = {
    Authorization: `Token ${process.env.LISTENBRAINZ_TOKEN}`,
  };

  async function getNowPlaying() {
    const response = await EleventyFetch(`${listenBrainzEndpoint}/playing-now`, {
      duration: "1m",
      type: "json",
      fetchOptions: {
        headers: apiHeaders,
      },
    });

    const { payload } = response;
    const metadata = payload.listens[0].track_metadata;
    const { artist_name: artist, track_name: song, release_name: release } = metadata;

    return { artist, song, release };
  }

  async function getMostRecentListens(count = 30) {
    const response = await EleventyFetch(`${listenBrainzEndpoint}/listens?count=${count}`, {
      duration: "10m",
      type: "json",
      fetchOptions: {
        headers: apiHeaders,
      },
    });

    const { payload } = response;
    const { listens } = payload;
    const metadata = listens.map((track) => track.track_metadata);

    return metadata.map((track) => {
      const { artist_name: artist, track_name: song, release_name: release } = track;
      return { artist, song, release };
    });
  }

  return {
    title: "Music",
    description: "Music is one of my passions. Check out all my musical projects here.",
    frontRoyalSocial: [
      {
        href: "https://frontroyalmd.bandcamp.com/",
        img: "bandcamp.svg",
        alt: "Bandcamp",
      },
    ],
    troySocial: [
      {
        href: "https://justtroy.bandcamp.com/",
        img: "bandcamp.svg",
        alt: "Bandcamp",
      },
    ],
    nowPlaying: await getNowPlaying(),
    recentListens: await getMostRecentListens(),
  };
};
