import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

const token = Deno.env.get("LISTENBRAINZ_TOKEN");

const listenBrainzEndpoint = "https://api.listenbrainz.org/1";
const headers = new Headers();
headers.append("Authorization", "Token " + token);

async function getMostRecentListens(count = 30) {
  try {
    const response = await fetch(
      `${listenBrainzEndpoint}/user/actionhamilton/listens?count=${count}`,
      {
        headers,
      }
    );

    const data = await response.json();

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

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    const recentListens = await getMostRecentListens();

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData("recentListens", recentListens);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
