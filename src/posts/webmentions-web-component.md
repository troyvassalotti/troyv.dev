---
title: "Webmentions Web Component"
description: "I got overwhelmed by build steps and decided to fetch my webmentions through a web component."
date: 2024-03-22
tags:
  - indie web
  - javascript
  - web components
syndication:
  - mastodon
---

<!-- @format -->

I've been giving my site a fresh look recently. It mostly involved stylesheet updates with a touch of dependency management and site simplification, but I got overwhelmed by the unknowns in how my existing webmention system worked[^This isn't surprising considering webmentions as a whole are not a straightforward system.] and wanted to do something that felt more comfortable.

[Chris Burnell's](https://chrisburnell.com/eleventy-cache-webmentions/) `eleventy-cache-webmentions` has been my plugin-of-choice for handling webmentions up to this point because it gave me exactly what I needed with little configuration necessary (thanks Chris!). But I wanted to try something different; something that I can build myself.

I also need to thank [Max Böck](https://mxb.dev/) for inspiration as well from his own webmention setup.

As a full-time Web Component Maker, overhauling my webmention setup felt like a good time to make a new component; a component that other people can use on sites that _aren't_ [Eleventy](https://11ty.dev). Plus, it helps that a one-time Google search came up with no results for a Webmentions Web Component.

Converting a build-time process into a run-time process does have its downsides:

- I now maintain a new web component.
- The API call for webmentions happens on the client. I haven't tried this yet, but it seems like a good use for the [Eleventy `is-land` component](https://www.11ty.dev/docs/plugins/is-land/).

Though the upsides felt worth it:

- I get to create a new web component and learn something in the process.
- Anyone can take this web component and put it on their site.

The catch to all this is that I use [webmention.io](https://webmention.io), so the code involved in my component is tightly coupled in some ways (more on that later).

The way it works is it makes an API call to the webmention.io API for the current URL, grabs any and all mentions, and renders them in-place in two possible variants: a **feed** or a **facepile**.

```html
<web-mentions variant="feed (default) || facepile"></web-mentions>
```

There are other options too:

- While the component by default has no styles and _doesn't use shadow DOM_, giving it the `loadstyles` attribute will adopt some starter styles to your document: `<web-mentions loadstyles></web-mentions>`.
- Both the domain and page path are configurable so you can show webmentions of a fully different site. I used the `domain` property myself for local development since otherwise it attempts to fetch mentions on `localhost`: `<web-mentions domain="https://example.com" path="some/path.html"></web-mentions>`.
- You can filter by the type of mentions you want to show, which means you can mix and match showing some types as a facepile and others in a feed:

```html
<web-mentions
	variant="facepile"
	filters="likes"></web-mentions>
<web-mentions
	variant="feed"
	filters="bookmarks, replies, reposts, mentions"></web-mentions>
```

The component is not on `npm` yet, but you can take a look at it for yourself by [viewing the source](/assets/js/web-mentions.js). I consider this like a beta-of-sorts and if enough people find this useful then I'll expedite the process of publishing it as a package.

As I said, I use webmention.io so support for any other services is completely a mystery to me since I don't know them. I planned ahead somewhat by making the API service it's own attribute/property, but that doesn't change the actual object key's the component looks for in the data which are coupled to webmention.io.

At the time of publishing this post, it will have no webmentions, so [look at this other post of mine](/2022/07/28/redesign-2022/) to see it in action.

What do you think? Love it? Hate it? Let me know!
