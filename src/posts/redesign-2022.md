---
title: Redesign 2022
description: I took some much-needed time to redesign my site for the year 2022.
date: 2022-07-28
tags: ["eleventy", "web components", "design"]
---

Websites are hard.

_Roll credits_.

I started this site in... (checks git history) I don't know, a few years ago.[^1] It's nice to think back on the initial designs and see how far I've come. The CSS, the performance, the **fonts**! Oh, the decisions a young, aspiring developer makes.

In 2020, I landed on the previous iteration of the site: a dark, straightforward blog focused heavily on optimized code. It suffered from a lack of clear vision or goal, and over time complexity got the better of it. That complexity wasn't so much seen from a viewer's perspective; however, I was feeling the quirks as the maintainer.

My skills grew exponentially[^2] since then, what with me diving deeper into [Eleventy's](https://www.11ty.dev) features, building a few web components, and broadening my knowledge of how Node even works. It's only natural that I take those learnings and apply them to this site.

## The Move Towards Simplicity

### Bloated Code

When I learned how collections work in 11ty, I decided to make some non-post layouts and templates revolving around tags, such as "work" or "projects." I was able to create some cool features with that, but it also meant I was adding more levels of management to the code. It also meant I was trying to shoehorn content into categories they had no right to be in.

### Nunjucks

A while back I realized I could make my own attempt at [single file components](/2021/11/13/single-file-components-in-nunjucks/) in Nunjucks. Well, I shortly afterwards realized I was making a built-in feature more complicated than it needed to be in the name of _performance optimization_. I rolled back that idea and decided to use Nunjucks' `extends` and `block` as they were (more correctly) intended.

### Excess Domains

I also had a few one-off Netlify sites lying around that didn't need to be alone, so I consolidated them onto this domain[^3].

### Simplicity By Abstraction

My `.eleventy.js` config file was getting bulky, so I moved my collections, filters, plugins, shortcodes, and transforms into their own files[^5] under a `utils` directory. It looks something like this when utilized:

```js
// Plugins
Object.keys(plugins).forEach((plugin) => {
  eleventyConfig.addPlugin(plugins[plugin].name, plugins[plugin]?.options);
});

// Filters
Object.keys(filters).forEach((filterName) => {
  eleventyConfig.addFilter(filterName, filters[filterName]);
});

// Collections
Object.keys(collections).forEach((collectionName) => {
  eleventyConfig.addCollection(collectionName, collections[collectionName]);
});

// Transforms
Object.keys(transforms).forEach((transformName) => {
  eleventyConfig.addTransform(transformName, transforms[transformName]);
});
```

## Web Components

Web components are rad as heck, so I'm using them all over the place. Inspect this site's code and see how many you can find!

I was initially worried about adding too many web components since this is a static site after all, but convinced myself (with the help of [ShopTalk Show](https://shoptalkshow.com/511/#t=07:48)) the enjoyment/benefit in making/using them outweighs the potential client-side/back end overhead. I'm a developer and part of this site's purpose is to show what I can do, so why restrict myself from using JavaScript (when applicable) on my own website?

## Focus on Posts

[Cool URIs don't change](https://www.w3.org/Provider/Style/URI.html), so I changed some URIs in an attempt to make them cool. Posts were previously at the route `posts/title-of-post` but now they live at `year/month/day/title-of-post`. Pretty cool, right?

Writing is great, and I believe in the power of learning in public, so I wanted this _blog_ to look more like a _blog_. I now generate tag pages[^4] and altered the design to bring posts to the forefront a bit more.

## Serverless and Edge Functions

I'm aware of the irony in writing an entire section on simplicity while also embracing serverless and edge functions. I couldn't help myself from trying something new! Besides, I feel as though my use cases for each are worth it.

### See What's Playing Now

If you check out my [music pages](/music/), you'll notice a few things:

1. A web component that plays my music (unrelated to serverless or edge, but worth a callout)
2. A block of text above the H1 that tells you what I'm currently listening to, if anything.
3. A [series of data](/music/stats/) from my [ListenBrainz](https://listenbrainz.org/user/actionhamilton/) account where I scrobble all my listening habits to.

To see my now playing, I make a request to ListenBrainz _on the edge_ to check if it's receiving anything[^6]. If you happen to visit that page while I'm in the middle of a song or podcast, you'll know what it is!

Edge functions aren't the simplest of things coming from someone who's never done anything like it, but the [11ty edge](https://www.11ty.dev/docs/plugins/edge/) plugin helped me get there.

A call to the ListenBrainz API returns a JSON payload of track data. The `now playing` data is slightly different from other track and artist data, so it needs a specific function for parsing:

```js
// netlify/edge-functions/now-playing.js
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
```

Data fetched like this needs to be added to the data cascade, so I had to remember the following lines in the `export default` function:

```js
const nowPlaying = await getNowPlaying(listenBrainzEndpoint, headers);
edge.config((eleventyConfig) => {
  eleventyConfig.addGlobalData("nowPlaying", nowPlaying);
});
```

In the template, that data can be accessed in Nunjucks as normal data.

```twig
{% raw %}
{% edge "njk" %}
    {% if nowPlaying %}
      <dl class="c-dataList u-font--code">
        <div class="c-dataList__item">
          <dt>Artist</dt>
          <dd>{{ nowPlaying.artist }}</dd>
        </div>
        <div class="c-dataList__item">
          <dt>Track</dt>
          <dd>{{ nowPlaying.song }}</dd>
        </div>
        <div class="c-dataList__item">
          <dt>Release</dt>
          <dd>{{ nowPlaying.release }}</dd>
        </div>
      </dl>
    {% else %}
      <p class="u-font--code">Silence (nothing)</p>
    {% endif %}
{% endedge %}
{% endraw %}
```

### See My Listening Habits

My listening habits are retrieved with a [serverless function](https://www.11ty.dev/docs/plugins/serverless/). Instead of putting this data in the serverless function itself, the API calls are in my `stats.11tydata.js` file. The way it works is that data gets [fetched](https://www.11ty.dev/docs/plugins/fetch/) on the initial load, Netlify caches that build for a set amount of time, then after that time is reached it will fetch new data on page load.

```js
// stats.11tydata.js

// Example function for getting my top artists for the month
async function getTopArtists(api, auth, fetchDir, count = 10, range = "this_month") {
  try {
    let options = {
      type: "json",
      fetchOptions: {
        headers: auth,
      },
      directory: fetchDir,
    };

    // I don't know if these options are actually doing anything, but it looks like it works (mostly)
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
```

I didn't do any major editing of the auto-generated serverless functions from the 11ty Serverless plugin aside from setting it up for Netlify's On-Demand builder.

## The Bugs Encountered

A major redesign isn't without its bugs.

- It turns out changing URIs means you lose webmentions since they were pointing to the old URIs... oops.
- If you minify your HTML output like I do, be sure to disable comment removal because Eleventy Edge relies on an HTML comment to inject content.
- In order for the serverless functions to work, I had to change some constants in my `.eleventy.js` config:

```js
const utilsDir = `${process.cwd()}/utils`;
const srcDir = `./src`;
```

I might've missed a bug or two, but thanks for reading!

[^1]: If you know a simple way to find the first commit of a repo, please hit me up.
[^2]: Source needed.
[^3]: Check out [my projects](/projects/).
[^4]: Find them on [the archive](/archive/).
[^5]: Inspiration from [Max Böck's](https://mxb.dev/) website.
[^6]: I won't go into detail about all the methods I'm using to scrobble my music, but send me a message if you're interested.
