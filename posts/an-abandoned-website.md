---
title: 'An Abandoned Website'
description: We've all come across an abandoned website that was left to wither away and never be thought about again. Well, what if it actually looked that way too?
layout: post
postDate: September 12th, 2020
date: 2020-09-12
tags: ['post', 'design', 'abandoned', 'project', 'hugo']
---
Websites can be bought and live on forever...or so long as the domain name continues to be renewed. As a result, some sites just become abandoned, living in the aether, but because of backwards compatibility they don't really _look abandoned_.

Well, what if they did? What if the website deteriorated over time, things fell apart, and the darkness came to consume it? That's where my new project, [www.abandoned.website](https://www.abandoned.website), comes in.

> Brief intermission to talk about how cool domain names are and that I can literally choose the domain abandoned.website for a project that is an abandoned website.

I don't know when, why, or how I came up with the idea to create this project. If I'm remembering correctly, it was way back in my early stages of learning to code - you know, when you're just full of ideas that sound _fun_ and _exciting_ and _definitely not hard to implement_ - and I just jotted it down as a note in my phone.

I clearly didn't have the skills to build it yet.
- No design skills.
- I could barely code an email and that was my full-time job.
- No clear idea how to even make a website live.

But I knew one day I'd get there, and here we are.

As with every project, the final product never quite lives up to the vision in your head. I'm getting better at design with each project - at least I hope so - but I know it would have been much better implemented if a designer-by-trade did the bulk of the work in [Figma](https://www.figma.com) instead of me.

Anyway, with everything that was 2020, it came time to pick this project up! I created this site with the intention of - as I mentioned - making a website look abandoned, but it turned out to also be a journey into the world of building a website [using Hugo](https://gohugo.io/).

Hugo's great. I was really worried for a while that I chose the wrong static site generator when I actually read the docs (should've learned my [lesson from fake social media app](../not-social-media)), but I accepted the challenge and made it anyway.

It wasn't a complete mistake! Now, Hugo might not be the best suited option here:
- This site isn't really a blog.
- It's only a few pages.
- Not a lot gets reused.

Only later in the build process did I realize those were shortcomings, but once I understood the way the directory structure works in Hugo it all made sense and I was able to make it work for me.

Honestly, the hardest parts became the following:
1. Getting the favicon to appear when in the root directory (I gave up and put it in the `/img/` directory instead).
2. Templating the page titles the way I wanted them to be (Learning about the `{{ .Page.Title }}` variable changed everything for me).
3. Setting up the 404 page to work within the `baseof.html` template while still having its own special treatment (inline `<style>` blocks and `noindex` directive).

I hope to continue working on it. Side projects are hard to find the time for, but this one is more than just a proof-of-concept. Hell, I bought a domain name for it. I'd like to really take things I learn over time and make this thing better with every iteration.
