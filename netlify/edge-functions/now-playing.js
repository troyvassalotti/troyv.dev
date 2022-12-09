import { EleventyEdge, precompiledAppData } from "./_generated/eleventy-edge-app.js";

async function getNowPlaying(api, auth) {
  try {
    const response = await fetch(`${api}/user/actionhamilton/playing-now`, {
      headers: auth,
    });

    const data = await response.json();

    const { payload } = data;
    const metadata = payload.listens[0].track_metadata;
    const { artist_name: artist, track_name: song, release_name: release } = metadata;

    return { artist, song, release };
  } catch (error) {
    return false;
  }
}

export default async (request, context) => {
  try {
    const listenBrainzEndpoint = "https://api.listenbrainz.org/1";
    const headers = new Headers();
    headers.append("Authorization", "Token " + Deno.env.get("LISTENBRAINZ_TOKEN"));

    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    const nowPlaying = await getNowPlaying(listenBrainzEndpoint, headers);

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData("nowPlaying", nowPlaying);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
