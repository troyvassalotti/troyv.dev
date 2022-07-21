---
title: I Made an Express App About my Cats
description: What better way to practice Express, Pug, and Tailwind than a cat app?
date: 2021-04-25
tags: ["projects", "express"]
featuredImage: /v1646349103/blog/cats_stm8wv.jpg
website: https://cats.onrender.com/
---

I recently got antsy to make an Express app. The original idea was to try and recreate _this very website_ using Express and Pug templates instead of Nunjucks. It started off fine, but then I realized it'd be a little more of a waste of time to base it on my website since 1) the site is already made with Node, and 2) it won't necessarily teach me something that new.

So instead, I chose to create a mini site about my cats and add on the extra challenge of using Tailwind CSS for the first time. You can find the [code for this app](https://github.com/troyvassalotti/express-cats) on my GitHub.

## The Setup

Getting the structure started wasn't too much of a problem. I had a repo to use as a starter from a Node & Express tutorial I've followed. Pug wasn't an issue either since I use it on other 11ty sites and it came hand-in-hand with _other_ Express tutorials.

> Speaking of boilerplates, this project led to me creating a starter repo for cases like this. Check out my [Node, Express, Pug, Tailwind starter](https://github.com/troyvassalotti/node-express-pug-starter) if you'd like.

The most difficult hurdle to jump in new projects, for me at least, is how to organize the files. I like having everything in their proper places as early as possible so I don't have to move them around later; this can be seen in both my digital and physical lives alike. Luckily, this is a small project.

- Pug templates go in `/views` with partials and layouts broken out in their respective directories.
- Tailwind CSS goes in `/public`.
- All the routing goes in `/routes`.
- All the config files stay in the root.

Look at this `app.js` - so minimal.

```js
const express = require("express");
const app = express();
const routes = require("./routes/site");
const compression = require("compression");

// set pug engine
app.set("view engine", "pug");

// set compression
app.use(compression());

// set static assets
app.use(express.static("./public"));

app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
```

I've made attempts at cleaning out my project roots and keeping only config files there (not the default for 11ty sites) because it was making me feel unkempt having HTML or otherwise next to my `package.json`.

Since I've never used Tailwind or PostCSS, I had to do a quick dive into the docs to figure out how to get it started, and how to use Tailwind in general. A couple `npm install`s and `.json` files later and things were working fine... except for the **massive** CSS files being generated because I wasn't purging unused styles.

Oops!

## Routing and Page Generation

The website has three main types of pages you could look at: the homepage, the about page, and the cat page (one for each cat). Typing that out made me realize I didn't create a 404 page.

Oops again!

Everything was able to be passed into the general layout file though. Template inheritance meant I could separate data-handling partials away from the main content and everything plays well together.

```pug
// layout.pug

doctype html
html.text-gray-900.text-base.leading-tight(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Cats | #{title}
        block styles
            link(rel="stylesheet", href="/css/main.css")
    body.min-h-screen.flex.flex-col.justify-between
        main
            block content
                p default content goes here
        block footer
            footer.text-center.p-8
                h2 Thanks for having an interest in our cats!
                p If you want to see more details about this site, #[a(href="/about", class="underline text-blue-700 hover:text-blue-400") visit the about page].
```

Probably my favorite part about the site is figuring out how to pass the cat data to each route that needed it and visualize it on the page. What do I mean by that? I mean I passed the cat object into the homepage to display links to both cats dynamically, but also passed it into the `cat.pug` template to use a single file as both cat pages _while still_ keeping their routes separate.

### The Router

See, check out the router here:

```pug
// site.js

const express = require('express');
const router = express.Router();
const cats = require('../data/cats');

router.get('/', (req, res) => {
    res.render('index', {
        cats,
        title: 'All About Cats'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About This Site'
    })
})

router.get('/cats/:page', (req, res) => {
    const {page} = req.params;
    const cat = cats.filter(item=>Object.values(item).includes(page))[0];
    const remi = cats.filter(item=>Object.values(item).includes("Remi"))[0];
    const sophie = cats.filter(item=>Object.values(item).includes("Sophie"))[0];

    res.render('cat', {
        cat,
        remi,
        sophie,
        title: cat.title
    })
})

module.exports = router;
```

What's going on here is I have a `cats.js` file that holds the object for cat information. That object is imported to the router as `const cats`, and then it is passed into the response call of a route. In the case of the route `/cats/:page`, I'm manipulating it a bit. **Note**: I am aware this is a very brute force way of dealing with the data, but since I only have two cats it was fine.

I store the cat being requested from the request parameters. You couldn't request any cat though - I determined the cats being requested by linking to them on the homepage. Then I filter the `cats` array by finding the object that uses the requested cat in a key:value pair. That's not all though since then I need to store the _opposite_ cat, so I create two more variables for each individual cat. All three of these variables are passed to the page to dynamically generate the cat post _as well as_ the link to the other cat.

See how I use all this on the cat template:

```pug
extends ./layouts/layout.pug

block content
    .p-6.max-w-lg.mx-auto.bg-white.rounded-xl.shadow-md.flex.items-center.space-x-4
        .flex-shrink-0
            img.w-32.h-32(src="/img/" + cat.url + "-hero.jpg", alt=cat.title)
        ul.text-gray-500
            li.text-xl.font-medium #[b.text-black Name:] #{cat.title}
            li #[b.text-black Gotcha Day:] #{cat.date}
            li #[b.text-black Weight:] #{cat.weight}
            li #[b.text-black Personality:] #{cat.personality}
    .container.mx-auto.p-8
        article(class="grid grid-cols-1 gap-8 justify-items-center items-center md:grid-cols-2")
            if cat.url == "sophie"
                include:markdown-it ./partials/sophie.md
            else
                include:markdown-it ./partials/remi.md
        .text-center.mt-8.text-2xl.grid.gap-4
            if cat.url == "sophie"
                p: a(href="/cats/" + remi.url, class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2") Read About Remi.
            else
                p: a(href="/cats/" + sophie.url, class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2") Read About Sophie.
            p: a(href="/", class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2") Return Home.
```

If you visit Sophie's page, you'll see a button/link to Remi's page, and vice versa. Aside from all that, the only piece of the puzzle remaining is styling the thing, which leads us to Tailwind.

## Thoughts on Tailwind

I should use it more. Not that it was a life-changing tool to use here. In fact, it was a little annoying feeling like I removed control of creating custom CSS and having to rely on a seemingly-endless series of predetermined classes. One downside of this is applying the same classes to adjacent HTML elements since I couldn't create an all-encompassing rule to target all `h2` elements or something.

That being said, I only used it this one time in a very surface-level way. People love this thing and I have no doubts I could fall in love with it too if I read more of the docs and tried it out on a larger scale. But without all that prior practice, I definitely could've made this thing quicker if I used my own CSS files.

There are aspects of Tailwind I grew to enjoy. For one, I appreciate the notion that headings should be detached from their initial font sizes because it isn't always the case that the `h1` should be bigger than the `h2`. Years of it being that way by default makes it feel weird for them to not follow that order, but years of seeing people use a heading element because it has the size or styling they want - as opposed to it being the right element semantically - says that isn't how everyone sees it.

But I didn't love having a blank slate either. Since everything is reset with no styles, I felt more pressure to make sure all lists, links, headings, body text, etc were accounted for. I didn't design the app ahead of time though, which is why it is very basic looking. I would not let this go as a production-ready application, but it is totally fine as a simple, fun, nonsense thing.

## Hosting

You can find the app [at this link]({{ website }}). I chose Heroku to host it because I had recently used it for - you guessed it - a tutorial. I had way more of an issue getting the app to work than I should have. For some reason, the first bunch of pushes were giving me good deploy logs with a broken URL. I still don't know how I fixed the issue, but I uninstalled and reinstalled dependencies, and changed some language even if the language _worked locally_, until the app finally deployed correctly. Again, nothing in the logs were telling me something was wrong so...

I have no intentions of editing this thing. It is alive and in the world, and I am banished from making any improvements because it doesn't matter - it's a joke site. The only thing that might change is where I host it, but Heroku is fine for now.

> Now hosted on Render!
