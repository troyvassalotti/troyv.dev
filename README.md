# troyv.dev

This is a site on the web.

## How To Make A Website

It might be helpful for me to outline how this site is created as a resource to myself so I don't mess it up later.

### Creating Pages

Top-level pages - `dir/index.html` pages - take Front Matter to declare the title, description, and `<body>` class. All pages serve as their own components through the use of Nunjucks extends and variables.

Pick a layout to extend by placing `{% extends 'layouts/your-layout.html' %}` right under the front matter.

To set the HTML content of the page, place the structure inside a `{% block %}`. If the layout being extended is `base.html` then it's `{% block content %}{% endblock %}`. If it's `page.html` then use `{% block main %}{% endblock %}`.

Pages get their own critical CSS by setting a variable in the file. This is done as follows:

```nunjucks
<style>
    {% set css %}
    .some-class {styles: go here;}
    {% endset %}
</style>
```

The `<style>` tags will be ignored in the component, and only the content inside the `{% set css %}` will be passed to the layout. The same process is used for inlined JavaScript.

### Optimizing Assets

For files that need concatenation and minification, there's the `_optimize-assets` folder. These get ignored in Eleventy Collections and combine files using `{% include %}` before finally outputting the content through filters.

### Using Partials In Posts

Sometimes, a post might require custom content not built into the layout. For example, my post on my 2020 migraines renders a heatmap using D3. The layout isn't built with the option to pass unique CSS and JS, or even extensive HTML. That's where the `_includes/partials` directory comes in.

Throw in a `.html` file with any styles, html, or js required to render a custom section of the post. In the markdown file of the post, use a Nunjucks `{% include %}` to find it and pass it in.
