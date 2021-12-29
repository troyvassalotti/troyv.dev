---
title: Cool Template Features With Eleventy
description: I gave this site a full-blown refresh for 2021, so I'm going to talk about how cool it is.
date: 2021-04-14
---
You know what's great about having a personal website? The fact that I can configure it to be as simple or complicated as I please. Sure, it isn't _ideal_ to make things complicated, but would I really consider myself a developer if I wasn't spending hours upon hours trying to automate something that's otherwise a slight inconvenience?

**No.**

This site has been built using [Eleventy](https://www.11ty.dev) ever since I decided I wanted to learn what the heck was so great about static site generators. Eleventy sounded like the best option for someone who didn't want to learn something entirely new (like a JavaScript framework) while learning something else entirely new at the same time (static site generators).

I know I made the right choice here. After all the struggles I had getting a [Nuxt](https://nuxtjs.org/) site to work, even as someone who knew how to use Vue at the time, would have discouraged me to some extent.

> Not that it was Nuxt's fault at all. I was trying to accomplish something too quickly without enough planning or reading the docs because I thought "how hard could this be?"

## An Evolution in Design
A lot of changes have been made around here since this site's existence. I was still getting the hang of _personal branding_ (rather, I didn't give enough thought into _personality_). The site was simple and got the job done, but there wasn't anything special about it, and it didn't reflect _who I am_.

I made a giant redesign a few months ago - the site you're looking at right now but which you might not be looking at in the future if you read this at a later point where I've redesigned the redesign - and jumped head first into making it a templating machine, harnessing the power of Eleventy and [Nunjucks](https://mozilla.github.io/nunjucks/) to create a monster.

> Talk about a kick-ass way to template my pages; Nunjucks [saves the day](https://youtu.be/UwIF95svGp0) in so many aspects.

## New and Improved
There's a lot to cover here, so I'm going to break out each cool thing into its own section here.

### Plugins
I've alluded before to my hesitancy with dependency-hell and wanting to keep my sites in a place that I can jump back into without feeling overwhelmed. So, this site previously had very little dependencies being used. I still feel that sentiment, but I am more comfortable in my implementations and decided a few plugins will be greatly beneficial here.

#### npm install @11ty/eleventy-image
I used to head over to [Squoosh](https://squoosh,app) for manually compressing my images in their various formats; I wanted to stop doing this. It wasn't a time-consuming process necessarily, but I wanted it automated. Luckily, there's an official plugin for this sort of thing. Enter, [`eleventy-image`](https://www.11ty.dev/docs/plugins/image/). This plugin takes a file and produces it back in the desired file formats and sizes that you ask for - all at build time.

For my purposes, I needed two shortcodes created to be able to fully use the plugin. One for synchronous transforms (like iterating over items in a paired shortcode) and one for asynchronous transforms (like creating images standalone that don't require knowledge of the containing shortcode).

```js
// ImageShortcode.js is asynchronous
const Image = require("@11ty/eleventy-img");

module.exports = async function (src, alt, widthArray, formatArray, sizes, className = '', id = '') {
  let metadata = await Image(src, {
    widths: widthArray,
    formats: formatArray,
    urlPath: "/assets/img/",
    outputDir: "./_site/assets/img/",
  });

  let imageAttributes;

  if (id === '' && className === '') {
    imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    }
  } else if (otherlogic) {
    /* a load of omitted code */
  }

  return Image.generateHTML(metadata, imageAttributes, {whitespaceMode: "inline"});
}
```

I encountered a few hiccups when figuring out how to tell it where my image was. I changed my project structure so that all the source files live in `src` and all the config files (`package.json`,  `.eleventy.js`, etc. ) live in the root, so that was a tiny wrench in my system. This was the solution I came to:

```twig
{# index.njk #}
{% raw %}
{% image './public/assets/img/me-on-set.jpg', 'This is me. I look like this.', [300, 600], ['webp', 'avif', 'jpg'], '(max-width: 700px) 100vw, 50vw', 'full', 'me' %}
{% endraw %}
```

The outcome of this all is a single image resized, compressed, and in .webp, .avif, and .jpg formats. You can do some other cool things with variables using Nunjucks, which I do for some other pages, but this is the simplest usage I have.

#### npm install @11ty/eleventy-plugin-syntaxhighlight
Who doesn't love some syntax highlighting? The beauty of this plugin is that all I need to do is provide my own [Prism](https://prismjs.com/) styles. The code being highlighted gets all the HTML applied at build time without the need to use client-side JS.

#### npm install clean-css
CSS _is_ awesome, but it's better if it's minified for production and critical styles are inlined. I'm pretty sure that was a quote somewhere or something, _don't @ me though_. By installing clean-css, I am able to create a filter through which to pass my stylesheets or CSS snippets that makes them incredibly mini.

To do all that though, I needed to alter my Nunjucks template. The below code snippet looks for `addCSS` in the front matter of any template pages and finds the page's name in the directory I keep all my CSS includes. If there's syntax highlighting, I have a front matter of `codeblock` and add Prism styles. I still need to update Plvylist to the web component version on this site, but it currently looks for that too. It takes all that, runs it through the filter, and places it in a `<style>` block.

```twig
{% raw %}
{% if addCSS or codeblock or plvylist %}
    {%- set css -%}
        {%- if addCSS -%}
            {%- include "css/" + page.fileSlug + ".css" -%}
        {%- endif -%}

        {%- if codeblock -%}
            {%- include "css/prism.css" -%}
        {%- endif -%}

        {%- if plvylist -%}
            {%- include "css/plvylist.css" -%}
        {%- endif -%}
    {%- endset -%}
    <style>
        {{ css | cssmin | safe }}
    </style>
{% endif %}
{% endraw %}
```

Pretty cool, yeah? Well, let's get even cooler.

#### npm install terser
I wanted to inline and minify my JavaScript the same way I did my CSS. The process is the same except that I installed terser to do so. When it all comes together, the Eleventy config file looks something like this:

```js
// .eleventy.js

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const {minify} = require("terser");

module.exports = function (eleventyConfig) {
  // add the syntax highlighting plugin from earlier
  eleventyConfig.addPlugin(syntaxHighlight);

  // add a css minifier filter from clean-css
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // add javascript minifier
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });
}
```

**Neat.**

### Nunjucks Features
I've covered most of the cool Nunjucks stuff in the previous sections, but there's still more. For example, I'm really taking advantage of the built in `set` and `include` methods, breaking out code into more modular pieces. My primary layout file is a good example:

```twig
{% raw %}
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {%- if noindex -%}
        <meta name="robots" content="noindex">
    {%- endif -%}
    <link rel="preconnect" href="https://d33wubrfki0l68.cloudfront.net">
    <link rel="dns-prefetch" href="https://d33wubrfki0l68.cloudfront.net">
    <link rel="canonical" href="https://www.troyv.dev{{ page.url }}">
    <link rel="stylesheet" href="https://fonts.typotheque.com/WF-036345-011398.css" type="text/css"/>
    <link rel="stylesheet" href="/assets/css/main.css">
    {% if page.fileSlug === "" -%}
        <link rel="stylesheet" href="/assets/css/homepage.css">
    {%- endif %}
    {% include "process-css.njk" %}
    {% include "seo.njk" %}
</head>
<body class="{{ pageName }}">
    {% include "header.html" %}
    {{ content | safe }}
    {% include "footer.html" %}
    {% include "process-js.njk" %}
</body>
</html>
{% endraw %}
```

I actually started doing this because I _needed to_ for the paired shortcodes on my projects page. **Problem**: I wanted to generate individual sections for each project, with their own screenshots and descriptions. I needed to be able to transform the images via a shortcode in this project image component (itself a shortcode since I repeat it). **Solution**: Set each project's description to a variable, storing the HTML in the `_includes` folder.

```twig
{% raw %}
{# projects/index.njk #}
{%- set frontroyal -%}
  {%- include "front-royal-project-description.html" -%}
{%- endset -%}
{%- set notsocial -%}
  {%- include "notsocial-project-description.html" -%}
{%- endset -%}

{%- projectFeature 'Front Royal (The Band, Not The Town)', frontroyal, 'https://www.frontroyalband.com', 'fr' -%}
      {%- imageSync './public/assets/img/front-royal1920x1080.jpeg', 'Screenshot of the Front Royal website', projWidths, imgFormats, projSizes, 'full' -%}
    {%- endprojectFeature -%}
    {%- projectFeature 'NotSocial: A New Type of Social Media', notsocial, 'https://notsocial.app/', 'ns' -%}
      {%- imageSync './public/assets/img/notsocial1920x1080.jpeg', 'Screenshot of the NotSocial website', projWidths, imgFormats, projSizes, 'full' -%}
{%- endprojectFeature -%}
{% endraw %}
```

That `projectFeature` shortcode works like this:

```js
// _includes/components/ProjectFeature.js
const {html} = require('common-tags');

module.exports = function (content, title, description, href, id) {
  return html `
  <article class="project" id="project_${id}">
    <h2>${title}</h2>
    <div class="skewed-background col full">
      <div class="wrapper" data-constrain="some">
        <div class="content">
          <section class="project-image">
            <a href="${href}" target="_blank" rel="noopener">
              ${content}
            </a>
          </section>
          <section class="project-description">
            ${description}
          </section>
        </div>
      </div>
    </div>
  </article>`
}
```

**Sweet.**

## I Could Keep Going
I'm super thrilled with my site right now. It's taking a lot of restraint to _not_ implement some of these killer features in my other sites, but I know better than to subject myself to such a task on a project I made as a proof of concept.

While there are a ton of little things on this site I can talk about (like CSS, dynamic content via front matter, etc.), I need to cut this blog post off here.