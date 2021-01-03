---
title: 'Project: troy. is a band'
description: I decided to give troy. - a band I have - a website.
layout: post
postDate: November 28th, 2020
date: 2020-11-28
tags: ['post', 'design', 'plvylist', 'project', 'music']
codeblock: true
---
# troy. is a band
If you've looked around here, you would've noticed I write music under the name [_troy._](https://justtroy.bandcamp.com), which I call a band but it's really just me. I used to be called Action Hamilton until I decided that was too weird and people around me convinced me to change it.

I don't do anything serious with troy..

> If the band name ends in a period stylistically, and it's the end of a sentence, should that sentence also end in a period or should the formal period be omitted? I'm going to leave off the second period from now on if that happens again.

As I was saying, I don't do anything serious with troy. You might be able to gather that from the [terms and conditions](https://validcharacters.netlify.app/pages/terms/) on the website I made for it. I've never performed the songs live or sold any physical merch. You can listen to my music on most streaming platforms and [buy it from Bandcamp](https://justtroy.bandcamp.com), but that's about it. There used to be a Facebook page until I deleted my Facebook.

However, I was bored and just created [Plvylist](../plvylist) and wanted to just _create a website_.

It's a [very simple website](https://validcharacters.netlify.app/) I made. Built with Eleventy, simple colors, not a lot of assets or pages. But as with most new sites I make, it has to incorporate a new technique I just learned about (aside from Plvylist in this case).

## All The New Things
For one, the navigation is accessible and responsive in a way I haven't used before. Also, my links have this cool underline animation on hover that I saw on CodePen and decided to implement. That part was tricky because the CodePen was using a class and I wanted _all my links that weren't buttons_ to behave that way, so I had to tinker with it.

```css
a:not([data-btn]) {
 color: var(--blue);
 position: relative;
 text-decoration: none;
}

a:not([data-btn])::before {
 content: "";
 position: absolute;
 bottom: 0;
 left: 0;
 height: 0.06em;
 width: 100%;
 background-color: currentColor;
 transition: transform 400ms ease-out;
}

a:not([data-btn]):hover::before {
 transform: scaleX(0);
 transform-origin: right;
}

a:not([data-btn])::before {
 transform: scaleX(1);
 transform-origin: left;
}
```

Oh, I also used HTML video with the built-in `<video>` element. This one got weird because I kept getting git errors when trying to push my changes. It turned out that my videos were too large (over 100mb) but the error messages in Atom weren't giving me that much detail (thanks...), so I was just left confused and frustrated for a while.

I had to use a separate package in Atom to git push that gave me a _different error message_ with more details on why my push wouldn't go through. Then I compressed the videos a ton and now it's fine.

You can watch those videos in the [demo vault](https://validcharacters.netlify.app/demos/). Eventually, I'll add videos of the creation of my second album, currently named _redux_ because it'll be my second go at a name for myself, and quite frankly it's just a better album.

Enjoy!
