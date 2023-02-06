---
title: 'How My "Now Playing" Feature Works'
description: "A brief explainer of how I display the songs I'm currently listening to."
date: 2023-02-05
tags: ["music"]
syndication: ["mastodon"]
---

I mentioned [in a previous post](/2022/07/28/redesign-2022/#see-what's-playing-now) how I display any song I'm currently listening to on my site[^1], but I want to set the record straight about something in particluar with that feature.

> TL;DR I fetch data from the ListenBrainz API, but that might not mean the song you see is a song I'm choosing to hear.

Everything I've ever listened to since 2021 (that I've been able to scrobble) is sent to [ListenBrainz](https://listenbrainz.org/user/actionhamilton/). They provide a simple API for sending, pulling, and even deleting listens. That API is how the various browser extensions and apps I use scrobble what I'm listening to. An app called Pano Scrobbler is specifically what scrobbles listens from my phone. The app looks out for the media notification on my Google Pixel for media coming from any apps I select - Deezer, Pocketcasts, YouTube, etc. - and can also use the phone's Now Playing feature as a source.

Pixels have what is essentially an always-on Shazam (yeah, a little creepy, but it's a sacrifice I make in the name of logging my listening habits). It can tell me what song I'm playing from my laptop if the volume is loud enough, but it can also tell me what song is playing at the gym or my local coffee shop. I love that because it provides insight into the music I hear **passively**, but the catch is that at any moment in time someone can visit my website and think I'm _actually choosing_ to listen to Imagine Dragons.

Next time you see what's playing, consider for a moment that I might not be aware of the song I'm hearing (unless that song makes me exceptionally cooler, in which case I'm definitely choosing to play it).

[^1]: It used to be done with edge functions, but I created a web component instead after seeing [Andy Bell's version](https://andy-bell.co.uk/).
