---
title: Plvylist is Now a Web Component
description: Web components are cool, Plvylist is cool, and they're the perfect match.
date: 2021-04-13
tags: ["web components"]
featuredImage: ""
shortname: Plvylist
website: "https://codepen.io/troyvassalotti/full/ExyOgGV"
---

It was only a few months ago that I [created Plvylist](../plvylist) as a plugin-of-sorts. The functionality was all there, but it required too many pieces for such a simple idea: singular script that loads an audio player wherever you wish to put it. The bloat of this came from needing to manage a CSS file (or SASS if you're compiling it) _and_ a JavaScript file _and_ make sure you have an empty `div` with the right class on your page.

It wasn't super flexible unless you, as the user of it, went in and did a lot of customization, and even then you had to know where to look. Since publishing it, I learned more about [web components](https://www.webcomponents.org/), realizing that _this_ was the right path forward for [Plvylist](https://github.com/troyvassalotti/plvylist).

## Why a Web Component Made More Sense

As a web component, I get all the functionality I was looking for with the added flexibility of customization, and a clearer vision of what pieces affect other pieces.

-   Everything is contained in a single file, `plvylist-player.js` - including the CSS, global variables, scripts/functions, and HTML (through the use of template literals).
-   It's a single `<plvylist-player></plvylist-player>` on your HTML with some values passed in as attributes, so the component knows where to look for audio files, images, and artist or album names.
    -   For example, `<plvylist-player audio-location="path/to/tracks/">` tells Plvylist that your songs are located in `path/to/tracks/` and will use said path when populating the audio source.

> You can view the [new and improved demo]({{ website }}) if you want.

While it's in a much better position than before, there is still room to grow. There are a handful of assumptions required to make this work:

-   You are hosting the files locally in the project _or_ you are able to manually input the **names** of the tracks and their files.
-   You are hosting the cover art locally _or_ can directly link to their locations.
-   You already know the name of the album or artist, _or_ you can manually input them for each track you provide.
-   You are at least _a little_ familiar with Web Components.

## Future Improvements

I want to be able to use it to fetch files from a remote location and dynamically gather artist of album names. If it was a Node application then I think I have an idea of how I'd achieve such a thing, but that's not what this is right now.

It would also be cool to be able to use ES modules as an import method for the tracks instead of needing to declare the array of objects in the component script directly; I tried a few things but realized it needs refactoring for that.

Another cool thing for the benefit of being more readable as a developer would be to move all the function declarations to their own levels like the `connectedCallback()` function is.

```js
class Plvylist extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.tracks = [
            {
                file: this.getAttribute("audio-location") + "name_of_your_file.mp3" || "",
                title: "Your Track Title" || "",
                artist: this.getAttribute("artist-name") || "",
                album: this.getAttribute("album-name") || "",
                artwork: this.getAttribute("cover-art") || this.getAttribute("placeholder-image"),
            },
        ]

        /* a bunch of other omitted variables */
    }

    connectedCallback() {
        /* omitted code */
    }

    loadTrackList() {} /* like this */
}
```

Visually, it'd help to know where things are. I tried doing this as well - and got pretty close with functions like the play and pause methods - but it also required _a lot_ of working with `this` and again, the whole thing would need refactored to make it work.

## In Conclusion

Web components are really super cool, and you should try them out. Also, give Plvylist a try and hopefully it solves someone else's problem instead of only mine (after all, _open source_).
