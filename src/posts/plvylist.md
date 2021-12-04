---
title: 'Plvylist: Using Media Element API'
description: I wanted to learn web audio, specifically the Media Element API. At first, it was daunting and made no sense, but I realized it wasn't so bad after all.
layout: post
date: 2020-11-20
tags: ['web components']
---
At work, I'm surrounded by different web audio components. They're integral to the business, but they're also integral to so many businesses, and I barely understood how they get made.

The basics made sense. Putting an `<audio>` or `<video>` element on a page with the proper attributes gives you a native song or movie with built-in controls, got it. Beyond that? No clue. So, I got to work learning and created [Plvylist - my own component for web audio](https://github.com/troyvassalotti/plvylist).

## Complicated, But Documented
It took weeks to figure this stuff out completely. Honestly, I almost gave up some of the functionality for Plvylist because I thought they were lost causes. The documentation was thorough for sure, but it was also fragmented in ways that didn't quite make sense to me. It was as if I had to read docs for unrelated topics to find all the answers I was looking for.

This project went through many iterations as well. What started as a project on Glitch turned into [a CodePen](https://codepen.io/troyvassalotti/full/ExyOgGV) which became a GitHub repo that is now a component I use in production on [two](https://validcharacters.netlify.app/) [different](/music/) projects.

Overall, Plvylist can be broken down into three pieces:
- HTML
- CSS/SASS
- JS

## HTML
The HTML wasn't too bad. When building the demo, it was mostly HTML with JS sprinkled in, but now all the elements are generated using `plvylist.js` and all you need in your document to latch on to is a simple `<div class="plvylist"></div>`.

Since I wanted to use Plvylist to stream my music on projects, I wanted particular aspects to be visible:
- Album artwork,
- Track list with selectable elements,
- Artist, song, and album details,
- Controls to repeat, shuffle, seek, and change volume.

You know, all basic stuff.

## CSS/SASS
SASS is great and I use it a lot, so I decided this would be the route to go with Plvylist. This was confirmed for me when I learned **how insanely hard** it is to style a `<input type="range">` across browsers. Every valid CodePen example I found used SASS to accomplish this and I was not going to be messing with that.

```css
@mixin track($fill: 0) {
  box-sizing: border-box;
  max-width: $plvyTrack-w;
  height: $plvyTrack-h;
  background: $plvyTrack-c;
  border-radius: 6px;
}

@mixin fill() {
  height: $plvyTrack-h;
  background: $plvyFill-c;
  border-radius: 6px;
}

@mixin thumb() {
  box-sizing: border-box;
  background: $plvyThumb-c;
  width: $plvyThumb-d;
  height: $plvyThumb-d;
  border-radius: 50%;
}

.plvylist input[type="range"] {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(0.5 * #{$plvyThumb-d} + var(--ratio) * (100% - #{$plvyThumb-d}));
  max-width: $plvyTrack-w;
  height: $plvyTrack-h;

  &::-webkit-slider-runnable-track {
    @include track(1);
  }
  &::-moz-range-track {
    @include track;
    padding-top: 1.5px;
    padding-bottom: 1.5px;
  }
  &::-ms-track {
    @include track;
  }

  &::-moz-range-progress {
    @include fill;
  }

  &::-webkit-slider-thumb {
    margin-top: -9px;
    @include thumb;
  }
  &::-moz-range-thumb {
    border: none;
    @include thumb;
  }
}
```

But then I evaluated how many personal projects I have, the anxiety I feel to open up an old one due to outdated dependencies and needing to adjust configs, and decided I want to be less reliant on npm and other packages in favor of the built in technologies the web has to offer us. In the end, I think we can all agree that CSS has evolved _a lot_ over the years. I was really only using SASS for a few things:
- Nesting,
- Very limited mixins,
- Imports for minor uses,
- Globals that I later replaced with CSS variables anyway.

So, I changed the SASS stylesheet to a modern CSS stylesheet and it wasn't that hard because I used the power of SASS to do so!

### How To Turn SASS Into CSS Easily
Compile it.

Kidding. I use Atom, and I have a package to compile SASS in Atom regardless of project; it only requires a global installation of node-sass. It's convenient, but installing it has caused weird issues at times that I want to avoid forever in the future when I need to update things, so I used the power of SASS to quickly convert my SASS stylesheets into a usable CSS stylesheet without much fuss.

The package has different output styles (minified, expanded, etc...) and you can tell it where to drop those files when compiled. I chose to compile expanded so it would look like a normal stylesheet but in CSS - no minification because Netlify would do that for me, and I have another package that can minify if I want to.

I wasn't going to go manually replacing all the `$globals` with CSS variables though, so I had a thought: what if I set each global variable to their respective CSS variable name?

> `$plvyMainFont: var(--plvyMainFont)`

This way, when the SASS gets compiled, instead of being replaced with static values they get replaced with variable names. Perfect! Then, all I had to do was also copy the globals block, keep their values, and change all the dollar signs to double-dashes in a `:root{}` set, and compile. All mixins and imports could stay the same because their global values would be filled in as necessary.

It was so simple once I sat down and thought about it.

I keep the SASS version up-to-date so anyone else can use it if they want to (thanks!), but we should all probably use the CSS version.

## JS
This is where all the magic happens. Without this, nothing works. Well, you need to also have some audio files somewhere, but the JavaScript is where you declare those files anyway.

There's a lot going in the script to be frank, but I have some favorites. For one, I learned how to create an object and iterate over that object to set attributes on an HTML element.

```js
const artwork = document.createElement("img");
const artworkAttributes = {
  src: "",
  width: "300",
  height: "300",
  alt: "album artwork",
  id: "artwork"
};
const artworkAttributesKeys = Object.keys(artworkAttributes);
artworkAttributesKeys.forEach((key, index) => {
  artwork.setAttribute(`${key}`, `${artworkAttributes[key]}`);
});
```

I also found a neat way to build the track list in HTML in a performant way - that is, all at once and without appending elements to each other multiple times until each track is iterated over. Instead of using a loop to create a new element for each song in the songs array and appending the list items to each other, a variable - called `list` - is being created as a string of HTML, and it doesn't get completed until each track has been accounted for.

Once the `forEach` loop is done, `list` is done being generated, and then `list` is plopped into the HTML for `songs` variable. After that, event listeners are added to each list item to allow for playing when clicking on the track name.

```js
function loadTrackList() {
  let list = "";
  tracks.forEach((track, index) => {
    list += `<li data-track="${index}" data-file="${track.file}" class="plvy--song"><span class="plvy--song__title">${track.title}</span></li>`;
  });
  songs.innerHTML = list;
  allTracks = document.querySelectorAll(".plvy--song__title");
  allTracks.forEach((track, index) =>
    track.addEventListener("click", () => {
      if (settings.currentTrack === undefined) {
        loadTrack(index);
        pressPlay();
      } else if (audio.paused) {
        loadTrack(index);
      } else {
        loadTrack(index);
        audio.play();
      }
    })
  );
}
```

The last challenge I had was figuring out how to properly highlight the actively-playing track in the track list. I kept running into bugs where a track wouldn't lose its highlight class even after it was deselected or ended. The key was to learn some new events to latch on to - `emptied` and `loadstart`.

```js
// on loadstart of the audio resource, change the active song class
audio.addEventListener("loadstart", () => {
  let getter = settings.currentTrack;
  document
    .querySelector(`[data-file="${tracks[getter].file}"]`)
    .classList.add("plvy--song__active");
});

// when the track gets emptied, remove the active track class
audio.addEventListener("emptied", () => {
  document
    .querySelector(".plvy--song__active")
    .classList.remove("plvy--song__active");
});
```

## Final Thoughts
This could be better, yes. There are plenty of ways this can be improved that I'm both aware and not aware of. But it works for now and that's what matters. I had a problem and I solved it. Some improvements to be had in the future though:

- Make it accessible. I don't actually know how accessible it is right now and without a doubt it could be better (as most things could be).
- Make it cleaner.
- Fix the bugs on Chromium. There's a weird bug where the seeker will jump to 50% when changing tracks and I have no idea why that happens.
