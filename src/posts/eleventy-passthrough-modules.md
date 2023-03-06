---
title: Use Node Modules in Eleventy
description: Use Passthrough File Copy to, well, pass them through.
date: 2022-04-01
tags: ["eleventy"]
---

When I started my Eleventy journey, I was still _very_ new to web development. I'd see posts about cool [CSS resets](https://piccalil.li/blog/a-modern-css-reset/) or script packages and want to use them, only to be stumped on how to get from `npm i` to using it in my static site website.

Well, this month I was doing some Googling on something I've already forgotten and found an [issue in the 11ty repo](https://github.com/11ty/eleventy/issues/768) where someone asked this exact question, months before I needed it.

The solution? Eleventy's [Passthrough File Copy](https://www.11ty.dev/docs/copy/).

```js
// Zach's answer from the GitHub issue
eleventyConfig.addPassthroughCopy({
	"node_modules/chartist/dist/chartist.min.css": "assets/chartist.min.css",
	"node_modules/chartist/dist/chartist.min.js": "assets/chartist.min.js",
});
```

If only I knew how to properly Google code questions back then. Hopefully someone else may find this useful.
