---
title: "Building My Resume in Rust"
description: "Learning Rust has been a goal of mine for a while. I finally made a usable project with it."
date: 2024-05-09
tags:
  - projects
  - rust
syndication:
  - mastodon
---

<!-- @format -->

> TL;DR check out the [repository to view source](https://github.com/troyvassalotti/resume/).

I remember sitting in a Starbucks a few years ago, reading the [Rust handbook](https://doc.rust-lang.org/stable/book/) line by line, having high aspirations for what learning this new and exciting programming language could bring me. I made little CLI projects like a number guessing game or something that could print out the lyrics to a song.

Years came and went. Nothing new was learned.

That is, until I got inspired after talking to engineers at a recent [charmCityJS](https://charmcityjs.org) meetup who have far more experience than I do with Rust. They helped me get a simple enough idea for a useful starter project: making templates on the file system.

Being my first useful Rust project, I didn't want to start with something too daunting. The easy choice was take my resume - already a repository that takes a single JSON file and uses its data in a Nunjucks template (thanks [Eleventy](https://11ty.dev)!) - and replace any Eleventy code with Rust code.

I almost chose a Rust-flavored static site generator, but quickly realized that doesn't satisfy my requirements. I needed to write Rust code that can take that JSON file, pass it to a template, and create a new file in a `dist` directory, copying static assets like images and fonts to the same destination.

> Hot take: please tell me how I'm supposed to read crate package documentation sites. I know it's different because I don't know the language as well, but you can't tell me the one documentation site generator every crate uses is actually the best choice. That doesn't even cover how nothing is listed where I expect it to be.

After researching what packages to use - minijinja for support using my existing Nunjucks template, Actix for a development server, other utilities for handling dates or file system needs - I got to work ripping out Node code and having an all-Rust codebase.

Quick note: I will give Node credit with npm scripts though. I installed `cargo-cmd` for an npm-like experience being able to type `cargo cmd -x "some cargo comman"` like I would `npm run some-script`.

The final result isn't anything groundbreaking. It does what it says on the tin. Here's a snippet of the build script, minus anything set-up related.

```rust
// main.rs
fn build() -> Result<(), Box<dyn std::error::Error>> {
    let cli: Cli = argh::from_env();
    let source = fs::read_to_string(&cli.template)?;
    let name = cli.template.file_name().unwrap().to_str().unwrap();

    let mut env = create_env();
    env.add_template(name, &source)?;

    let ctx: serde_json::Value = serde_json::from_slice(&fs::read(&cli.context)?)?;
    let tmpl = env.get_template(name).unwrap();
    let contents = tmpl.render(ctx)?;

    let mut cfg = Cfg::new();
    cfg.keep_comments = true;
    cfg.keep_closing_tags = true;
    cfg.do_not_minify_doctype = true;
    cfg.minify_css = true;
    cfg.keep_spaces_between_attributes = true;
    cfg.keep_html_and_head_opening_tags = true;
    cfg.ensure_spec_compliant_unquoted_attribute_values = true;
    let minified = minify(contents.as_bytes(), &cfg);

    fs::create_dir_all("dist")?;
    let mut file = File::create("dist/index.html")?;
    file.write_all(&minified)?;

    let mut options = dir::CopyOptions::new();
    options.overwrite = true;
    let from_paths = vec!["public/static", "public/favicon.ico"];
    copy_items(&from_paths, "dist", &options)?;

    Ok(())
}

fn main() {
    build().unwrap();
}
```

You can view the full file source [on GitHub](https://github.com/troyvassalotti/resume/blob/main/src/main.rs).

I actually feel excited to make similar Rust projects in the future. I know I could do this in Node without a lot of issues, but being able to use a new language for smaller tasks like this gives me the chance to learn at the same time.
