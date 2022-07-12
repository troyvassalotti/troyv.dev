const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const listenBrainzEndpoint = "https://api.listenbrainz.org/1";
  const apiHeaders = {
    Authorization: `Token ${process.env.LISTENBRAINZ_TOKEN}`,
  };

  async function getNowPlaying() {
    try {
      let options = {
        duration: "3m",
        type: "json",
        fetchOptions: {
          headers: apiHeaders,
        },
      };

      if (process.env.ELEVENTY_SERVERLESS) {
        options.duration = "10m";
        options.directory = "_cache";
      }

      const response = await EleventyFetch(
        `${listenBrainzEndpoint}/user/actionhamilton/playing-now`,
        options
      );

      const { payload } = response;
      const metadata = payload.listens[0].track_metadata;
      const { artist_name: artist, track_name: song, release_name: release } = metadata;

      return { artist, song, release };
    } catch (error) {
      return false;
    }
  }

  async function getMostRecentListens(count = 30) {
    try {
      let options = {
        duration: "30m",
        type: "json",
        fetchOptions: {
          headers: apiHeaders,
        },
      };

      if (process.env.ELEVENTY_SERVERLESS) {
        options.duration = "1d";
        options.directory = "_cache";
      }

      const response = await EleventyFetch(
        `${listenBrainzEndpoint}/user/actionhamilton/listens?count=${count}`,
        options
      );

      const { payload } = response;
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

  async function getTopArtists(count = 10, range = "this_month") {
    try {
      let options = {
        duration: "1d",
        type: "json",
        fetchOptions: {
          headers: apiHeaders,
        },
      };

      if (process.env.ELEVENTY_SERVERLESS) {
        options.duration = "1d";
        options.directory = "_cache";
      }

      const response = await EleventyFetch(
        `${listenBrainzEndpoint}/stats/user/actionhamilton/artists?count=${count}&range=${range}`,
        options
      );

      const { payload } = response;
      const { artists } = payload;

      return artists.map((artist) => {
        const { artist_name: name, listen_count: listens } = artist;
        return { name, listens };
      });
    } catch (error) {
      return false;
    }
  }

  return {
    title: "Music",
    description: "Music is one of my passions. Check out all my musical projects here.",
    // permalink: {
    //   music: "/music/",
    // },
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
    // nowPlaying: await getNowPlaying(),
    // recentListens: await getMostRecentListens(),
    // topArtistsThisMonth: await getTopArtists(),
  };
};
