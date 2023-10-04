---
title: "How to Fix Eleventy Serverless Functions on Netlify"
description: "In a strange turn of events where I made zero changes to my code, my serverless functions suddenly stopped working, until now."
date: 2023-10-03
tags:
- eleventy
syndication:
- mastodon
---

I started receiving this error on my site when trying to view a page generated with an Eleventy Serverless function:

```shell
 Error - Cannot find module '/var/task/netlify/functions/teapot/eleventy-serverless-map.json' Require stack: - /var/task/node_modules/@11ty/eleventy/src/Serverless.js - /var/task/node_modules/@11ty/eleventy/src/Eleventy.js - /var/task/netlify/functions/teapot/index.js - /var/task/teapot.js - /var/runtime/index.mjs 
```

It's referencing a specific function of mine - `teapot` - but the general message is there: Netlify couldn't find something and thus it broke. This error impacted both my serverless pages.

I hadn't made any changes to my site in a few weeks because life has been busy, so I know it couldn't have been triggered on my end as a result of bad code or an upgrade or anything.

So, I checked the Eleventy Discord server to see if someone else has seen this. It turns out people have **and** there's a solution! Add the following snippet to your `netlify.toml` configuration file:

```toml
[functions]
# Directory could be different for you
directory = "netlify/functions/"
node_bundler = "zisi"
```

I don't know what `zisi` is but adding that line fixed by functions.
