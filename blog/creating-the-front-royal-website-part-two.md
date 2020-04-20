---
title: Creating The Front Royal Website, Part 2
description: I created the first draft of the Front Royal band site, but had to make some changes to the original design after realizing my mockups were too small in reality...
layout: post.liquid
postDate: April 20th, 2020
tags: ['post', 'front royal', 'design']
---
I _really_ dropped the ball on this whole "blogging in real time" thing because the site is basically done.

In [the first blog](/blog/creating-the-front-royal-website-part-one), I outlined my goals for the site with a screenshot of a few design ideas, and what stack I'll be using to build it.

Well, over that weekend, boredom got the best of me and [I made the dang thing](https://priceless-shockley-84fcc2.netlify.app/). We haven't bought a domain yet, so ignore the randomly-selected words that Netlify provided.

## The Approach Pt. 2
To recap, I set out to make it a simple, single-page site with little bells and whistles. It was supposed to be:
* Scrollable;
* Navigable;
* And easy to follow.

And also cover:
* Ability to stream music;
* Real-time tour dates;
* Links to our social media and newsletter;
* Reusable components to make updates and new additions easier for me to code.

## My Stack
The repository is [fairly bare](https://github.com/troyvassalotti/front-royal); aside from the CSS and image assets, it's just an index page, a Netlify config, and a custom 404 page.

The Lighthouse performance score is nothing to write home about since I'm using three separate third-party widgets (Spotify for album embedding, bandsintown for tour dates, and Mailchimp for our newsletter signup form), but the site works and it only requires a single page to download.

## The Design Pt. 2
Being a band, I figured listening to our music - our product - was most important. The very first section is our latest release with a Spotify embed for it, and links to our other albums.

I had to make some adjustments to Spotify's code to get the `<iframe>` to do what I wanted it to do, but I'm used to that by now.

```css
<style>
.player {
  margin: auto;
  width: 100%;
}

.player__featured {
  max-width: 300px;
}
</style>

<iframe class="player player__featured" src="https://open.spotify.com/embed/album/17q2Qwv2jqrhVaX8iWX5wm" width="300" height="320" frameborder="0" allowtransparency="true" allow="encrypted-media" title="These Things Happen Spotify player" loading="lazy"></iframe>
```

I put the bandsintown tour dates widget right after the music, which again required a small CSS adjustment.

```css
<style>
.bit-widget .bit-no-dates-container {
  padding: 5rem 0 !important;
</style>
```

It's sad to look at since it's so empty (we have no dates coming up), but it'll look great when things are back in motion.

Finally, I listed links out to our various social media and embedded a signup form for our newsletter that I also am in charge of.

## Feelings Overall
Building websites is fun. I get chances to try new things I wouldn't normally do. In this case, I tried a new method for coding the main navigation on mobile and desktop.

There's a background image in the design, but the text got hard to read upon expanding the nav links on mobile. To get around that, I had to add some extra JavaScript to make sure the image remained the same and didn't expand to block the text.

```javascript
// these functions remove and toggle classes for properly styling the background image
const openMenu = () => {
  container.classList.remove("mobile-hide");
  nav.classList.remove("menu__closed");
  nav.classList.toggle("menu__open");
};

const closeMenu = () => {
  container.classList.toggle("mobile-hide");
  nav.classList.remove("menu__open");
  nav.classList.toggle("menu__closed");
};

// this does the work of opening or closing the menu
const animateMenu = () => {
  if (isEven(clickCount)) {
    menu.innerHTML = x;
    openMenu();
  } else if (isOdd(clickCount)) {
    menu.innerHTML = bars;
    closeMenu();
  }
  clickCount++;
};

// look for that magic click
open.addEventListener("click", animateMenu);
```

Making easily reusable sections got me thinking about how I could rework this very site you're reading right now. Just this past weekend, I did that too.

So, check out the Front Royal site, tell me where I could do better, and give us a listen. Maybe tell your friends about us too.
