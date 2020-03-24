---
title: Front Royal Site Design - Phase 1
description: We want a website so we have a presence that isn't exclusively on social media. So, I'm whipping up a site and blogging about it in real time.
layout: post.liquid
postDate: March 16th, 2020
tags: ['post', 'front royal', 'design']
---
There was a point in time bands either had a myspace, PureVolume, or both. Nowadays, it's not so simple.

People take up _so much_ space on the internet and bands have to spread their coverage out even further.

It's like, all of a sudden, you had to know how to play an instrument and be a stellar _content creator_ at the same time.

That means you're not going to make it much of anywhere in the music industry if your band doesn't have a Facebook, Twitter, Instagram, YouTube, Tinder, **and** Mastodon (don't @ me because I don't even know what you do on Mastodon).

While that's all well and good I guess, it's not centralized and at any moment the algorithms could change and your band falls off the face of the Earth; that's where having your own website becomes the one-stop-shop for everything Your Band.

No, I don't think social media will disappear and bands will be left with nothing, but I _do_ think that building websites is fun and am not against having a home base for Front Royal.

## The Approach
This is the first time I'm designing a website from the ground up _(with the exception of image assets created by [DJ Greger](https://www.youtube.com/user/Flashgitzanimation))_ that isn't the site you're looking at right now.

Looking at other approaches to band sites, it's pretty clear a single-page design is the way to go.
* It's scrollable
* It's navigable
* It does what it needs to do without all the bells and whistles

All a band's content lives elsewhere, so you don't need to host it all on your site...unless everything comes crashing down, but we'll all cross that bridge together later.

A single page constrains you because it needs to concisely have all the content you need while also being fast.

The latter can be hard to achieve when the page is loaded with widgets (media players, real-time tour dates), so everything else needs to be minimal (JavaScript, HTTP requests, even CSS).

I decided the these were the most important features to cover:
* Ability to stream music
* Real-time tour dates
* Links to our social media and newsletter
* Reusable components to make updates and new additions easier for me to code

## The Design
After an afternoon of fiddling around in Figma, I created these four visuals that show some promise for covering [all that](https://en.wikipedia.org/wiki/All_That):

![The first four visuals of the Front Royal website](/images/froro-des-phase1.jpg)

I realized by Version 4 that I forgot to add our newsletter signup, so that's why it's missing from the other three...

## The Specifics
While I haven't done any actual coding yet, I plan on this being mostly flexbox with a little bit of grid.

The tour dates will be a widget from bandsintown and the media players will either come from Spotify or Bandcamp, but I'm not sure which to go with yet.

I want to avoid using Font Awesome to reduce unnecessary HTTP requests, so I'll opt for SVG instead.

I'll also self-optimize the images that accompany the media players so I can control the amount of data they bring with them.

Oh, and I'm hoping to avoid any website builders like Squarespace or WordPress because I want the practice and think it'll be more fun.

I know a builder would be easier and more accessible for most everyone else who takes it over, but we can cross that bridge as well when we get there.
