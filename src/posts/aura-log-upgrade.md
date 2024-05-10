---
title: "Aura Log Upgrade"
description: "I revisited Aura Log and turned it into a site generator."
date: 2024-05-09
tags:
  - javascript
  - migraines
  - projects
  - web components
syndication:
  - mastodon
---

<!-- @format -->

I wrote about making a [headache tracker starter kit](/2023/02/16/i-made-a-headache-tracker-starter-kit/) early last year. It was essentially a forked version of my own migraine log that anyone could fork and configure to their needs. The catch is once you forked it, all the responsibility of it working was up to you.

A few weeks ago, I wanted to make updates to my personal log and didn't like the fact that my public [Aura Log repository](https://github.com/troyvassalotti/aura-log) would have outdated code. Maintaining two separate repositories of nearly identical code is also annoying.

The result of this situation was a major upgrade to Aura Log that involved re-writing it as a site generator of sorts.

You can install it [on npm](https://www.npmjs.com/package/@troyv/auralog) and [view the current demo](https://auralog.troyv.dev/).

Aura Log works by reading a directory of Markdown files representing each headache, with front matter providing the details like date and time, or possible triggers. There are sensible (to me) defaults for everything except for medications you use because my medications are not the same as yours. Because of that, there are a few requirements to using Aura Log:

- Install Aura Log with `npm i @troyv/auralog`.
- Create an `auralog.config.js` file in your project root.
- Add your list of medications:

```js
// auralog.config.js
export default {
	medications: ["medication one", "medication two"],
};
```

- Run `npx auralog` to be presented with an interactive CLI for adding your first headache entry.

You can override any of the built-in configuration options from your config file.

It took a solid chunk of hours to figure out how to make a JS binary that can be run from `node_modules` and read data from your project root while also building an HTML file using templates from the npm package root! I learned a lot in the process and am happy with how it all turned out.
