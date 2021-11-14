---
layout: post
date: 2021-11-13
tags:
- post
draft: false
title: Single File Components in Nunjucks
description: I loved Vue's SFCs so much that I replicated it in Nunjucks.
project: false
shortname: ''
use_screenshot_service: false
featuredImage: ''
website: ''

---
If you've worked with Vue, chances are you're familiar with its [Single File Components](https://v3.vuejs.org/guide/single-file-component.html#introduction) (SFC for short). If you haven't worked with Vue, the idea of a SFC can be boiled down to encapsulation of the template, logic, **and** styling of a component to a single file.

The site you're looking at right now is an [Eleventy](https://www.11ty.dev/) site using [Nunjucks](https://mozilla.github.io/nunjucks/) templates. I love the way Eleventy handles static site generation, and I think Nunjucks is an incredible templating language for my use cases. I've been working on my website for a couple years now and experimented with a variety of tooling methods for things like SASS compilation, asset minification, critical inlining, etc. The one thing I was missing was a way to create single file components like I've been able to do in Vue.

## Moving Towards Native Nunjucks

I didn't branch out of the basic uses of Nunjucks with Eleventy until the last few months. I relied heavily on layout files defined in the front matter for template inheritance until I hit an issue where I realized Nunjuck's `extends` feature was the solution. This change involved a level of abstraction away from Eleventy's logic and into what comes bundled with Nunjucks.

Template inheritance with `extends` meant I could define custom blocks aside from the `{{ content }}` (which is used to house any content in a template with the `layout` front matter) in my Nunjucks layouts and templates that can pass into each other. I learned that I couldn't use front matter for template inheritance if I also wanted to define custom blocks.

```twig
{% raw %}
---
layout: base.njk
---
{% block content %}
<!-- HTML and Nunjucks in here -->
{% endblock %}

{% block styles %}
<style>
// CSS rules in here, except this wouldn't pass into base.njk even if it had a defined {% block styles %} present
</style>
{% endblock %}
{% endraw %}
```

The above example is showing that even if my file defines code in a `styles` block, and if `base.njk` has a `styles` block defined to house it, nothing would actually be passed in. To pass content into predefined blocks, you have to use `extends`.

## Using `extends` to Create SFCs

My old solution to passing page-specific JS or CSS was to create files in my `_includes` directory with the same name as the slug it belongs to, and define logic in my base layout to look for and include any JS or CSS files with the same filename as the slug of the page being built. It wasn't perfect, but it got the job done.

My main issue with this method was that I was creating assets specific to _a single file_ but not housing them with the HTML of that file. Everything was separated in a way that made editing a single page with custom CSS or JS require opening three different files for one page. I knew there had to be a better way than that.

It turns out there is.

### What Does `extends` Do?

When you create a Nunjucks template, you can use `extends` at the top of the file to specify what layout or base the file should adhere to. This is essentially what the `layout` field in front matter is doing, except it also adheres to defined blocks.

In my `base.njk` layout - the primary layout all pages file into - I defined three blocks: content, style, and script.

```twig
{% raw %}
{# base.njk #}
<!-- snip -->
    
{%- block style %}
    {%- if css %}
        {%- if site.environment == "production" %}
            <style>{{ css | cssmin | safe }}</style>
        {% elseif site.environment == "development" %}
            <style>{{ css | safe }}</style>
        {% endif -%}
    {% endif -%}
{% endblock -%}

<!-- snip -->

{% block content %}{% endblock %}

{%- block script %}
    {%- if js %}
        {%- if site.environment == "production" %}
            <script type="module">{{ js | jsmin | safe }}</script>
            {%- elseif site.environment == "development" %}
            <script type="module">{{ js | safe }}</script>
        {% endif -%}
    {% endif -%}
{% endblock -%}
{% endraw %}
```

The way those blocks work is as follows:

* The `style` block is looking for a variable named `css`. If that variable is defined on the template, then it runs the content of that variable through as-is (development) or minified (production), passing the result into a `<style>` tag.
* The `content` block will contain any HTML contained in the template's `content` block.
* The `script` block is doing the same thing as the `style` block, except the variable it looks for is named `js`.

Now take a look at an example from my homepage where I define those blocks and variables for use in the layout:

```twig
{% raw %}
---
title: Welcome
description: Watch as Troy Vassalotti learns his way around a computer.
---
{% extends 'layouts/base.njk' %}

{% block content %}
<main class="layout">
    <!-- snip -->
</main>
{% endblock %}

<style>
    {% set css %}
    main.layout { margin-block-start: 3em; }
    // snip
    {% endset %}
</style>

<script type="module">
    {% set js %}
    const sundial = document.querySelector("#sundial");
    // snip
    {% endset %}
</script>
{% endraw %}
```

What's happening in that file now is as follows:

* I tell the template to extend my base layout file.
* I define the `content` block with all my HTML and Nunjucks logic.
* I set the `css` variable and include any critical CSS within it. The `<style>` tags wrapping the variable are strictly for syntax highlighting in the editor and _do not_ get passed along themselves.
* I finally set the `js` variable with the same logic as the `css` variable.

The end result is a single template file with its templating HTML and critical CSS and JS contained in a single file that pass into the final layout to be processed and placed where they need to be.

## The Payoff

I realize this system may not work for everyone, but I'm extremely proud of how it turned out and believe my development workflow has only benefited from such abstractions. I'm able to deliver a performant page with inlined critical assets while encapsulating all the dependencies of a page to a single file.

No wonder Vue leans so heavily into the SFC system of page building.