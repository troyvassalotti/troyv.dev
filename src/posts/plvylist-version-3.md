---
title: Plvylist Version 3
description: I recently updated Plvylist (again). It's less opinionated and handles your tracks better.
date: 2021-08-21
tags: ["web components", "projects"]
---

The last [update on Plvylist](/2021/04/13/plvylist-is-now-a-web-component/) was when I turned it into a web component. That's great and all, but something wasn't sitting right with me. It felt like it involved _too much code_ to do what it's doing. A lot of CSS was integrated in the component and the initialization was a hassle. Version 2 expected the user to jump through too many hoops and that's not how it's supposed to be. For example, why would I require the user to declare their tracks in the component itself??

## How to use Plvylist Version 3

If you've got a JSON file with the following fields, then you can use Plvylist!

1. file: a relative or absolute path to an song,
2. title: the name of the track,
3. artist: the name of the artist,
4. album: the name of the album,
5. artwork: a relative or absolute path to an image of the track's artwork.

When adding `<plvylist-player>` to your site, give it an attribute of `tracks="path/to/tracks.json"` and it'll be fetched in the loading process. For best results, you'd also give it a placeholder image with the attribute `placeholder="path/to/placeholder.jpg"` but I'll look into providing a better default in case this isn't declared. The same options for setting a starting volume and time are in place.

The CSS has been trimmed significantly to remove most of the opinionated styles. It's hard to style a simple slider across browsers, but I decided it wasn't needed anymore. The recent update adding support for `accent-color` in CSS is the reason I revisited this component in the first place.

There were explicit widths and heights and other various styles set that were frankly annoying to try and keep up to date. The best result was to strip it all down to the essentials.

## Is it on npm?

Not yet, but I'd like it to be. I was reading a few docs while writing this post and it looked like it'd take more time than I have right now.

## Where can I find it again?

Check it out [on GitHub](https://github.com/troyvassalotti/plvylist)! The directions are all in the readme.
