import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

const token = Deno.env.get("LISTENBRAINZ_TOKEN");

const listenBrainzEndpoint = "https://api.listenbrainz.org/1";
const headers = new Headers();
headers.append("Authorization", "Token " + token);

async function getNowPlaying() {
  try {
    const response = await fetch(`${listenBrainzEndpoint}/user/actionhamilton/playing-now`, {
      headers,
    });

    const { payload } = response;
    const metadata = payload.listens[0].track_metadata;
    const { artist_name: artist, track_name: song, release_name: release } = metadata;

    return { artist, song, release };
  } catch (error) {
    return false;
  }
}

export default async (request, context) => {
  try {
    const nowPlaying = await getNowPlaying();

    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData("nowPlaying", nowPlaying);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
