import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

const token = Deno.env.get("LISTENBRAINZ_TOKEN");

const listenBrainzEndpoint = "https://api.listenbrainz.org/1";
const headers = new Headers();
headers.append("Authorization", "Token " + token);

async function getTopArtists(count = 10, range = "this_month") {
  try {
    const response = await fetch(
      `${listenBrainzEndpoint}/stats/user/actionhamilton/artists?count=${count}&range=${range}`,
      {
        headers,
      }
    );

    const data = await response.json();

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

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    const topArtistsThisMonth = await getTopArtists();

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData("topArtistsThisMonth", topArtistsThisMonth);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
