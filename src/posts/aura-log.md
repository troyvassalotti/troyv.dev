---
title: I Made a Headache Tracker Starter Kit
description: What started as me tracking all my migraines became a mini framework.
date: 2023-02-16
tags: ["life", "migraines", "javascript"]
syndication: ["mastodon"]
---

<!-- @format -->

I've been getting migraines my whole life, but only started keeping a regular log of them in 2019. The process went through many iterations: from as a spreadsheet, to tracked in Migraine Buddy, to a JSON file on a single HTML page, to Markdown files in Obsidian, to now Markdown files in a repository hooked up to [Vite](https://www.vitejs.dev), [Lit](https://www.lit.dev), and data visualization libraries.

<!-- excerpt -->

I'm calling it [**Aura Log**](https://github.com/troyvassalotti/aura-log), named after the [aura](https://www.mayoclinic.org/diseases-conditions/migraine-with-aura/symptoms-causes/syc-20352072) associated with migraines like mine. Key features include:

- Vite, web components, and cool charts.
- Streamlined logging process through `plop`.
- (almost) Full customization in a single config file.

The idea to open it up came last weekend after a conversation at work, and I thought I might make it an `npm` package with binaries and all the bells and whistles of a mini framework... then I realized I [don't want to make a framework](https://daverupert.com/2023/01/so-you-want-to-make-a-new-js-framework/). I settled on this config file-based starter kit because it is simpler, and people could fork it and extend/customize it all they want.

The process looks something like this:

1. Fork and clone the repo.
2. `npm install`.
3. `npm run log` starts an interactive CLI to create a new entry (Markdown file) by answering a short prompts.
4. That file is saved to a folder that Vite reads to parse the front matter which all together make up the global data store.
5. `npm start` goes through the steps of reading, transforming, and rendering an `index.html` with web components of [D3](https://d3js.org) and [Highcharts](https://www.highcharts.com).

The components are fairly restrictive, but that's only because they fit exactly my needs only. Anyone can feel free to fork and customize as they see fit.

[Check it out](https://auralog.troyv.dev/)!
