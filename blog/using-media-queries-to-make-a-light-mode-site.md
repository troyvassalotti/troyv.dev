---
title: Using Media Queries to Make a Light Mode Website
description: My site is designed with dark mode in mind, but after reading about the latest in media query news, I was antsy to give light mode users a unique experience.
layout: post
postDate: April 27th, 2020
date: 2020-04-27
tags: ['post', 'media queries', 'light mode', 'a11y', 'design']
---
I was having a normal Saturday morning of exploring the latest features in [Firefox Preview Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fenix.nightly) and installed the Dark Reader add-on to see what it does to my site.

As an avid dark mode user, I designed my site with dark mode in mind. I wanted it to be dark by default and leave open the idea of a light mode version down the line.

That idea was pushed aside as I made more pertinent enhancements, but after giving Dark Reader a whirl, I got real excited about the `prefers-color-scheme` media query. So, I read up on the media queries available to us now and made some designs.

**PROBLEM ALERT**: If you're viewing this on your phone as of April 27th, 2020, you might realize your browser has taken my `prefers-color-scheme: light` styles as default, even if your system preferences are set to "dark" and the default styles of my site use darker colors _(looking at you Firefox & Edge)_.

I don't know how to get the lot of you back to the original color scheme I intended, but luckily I like the light mode scheme enough to consider it a not-too-important issue.

## Dark Reader vs. troyv.dev
Take a look at my homepage in its default form compared to the dark and light emulation from Dark Reader:

![What my site looks like without any sort of color scheme emulation, a dark color scheme, and a light color scheme](/images/mobile-all-three.jpg)

As you might expect, using Dark Reader turned my site into a dark-but-not-too-dark wonderland. _But_, changing the settings in the add-on to a "light" scheme causes a handful of problems. Mainly, some of the work I did making sure my colors were properly contrasting was just thrown out the window.

This is clearly an issue. I don't want people emulating a false light mode when using this website because they will face some potentially-major problems.

## Incoming: The Light Mode Experience
I love making these minor improvements to this site because I know the use cases might be small, but the experience will be appreciated to those who are looking for it. Plus, any project that involves CSS is a project I want in on.

### Step 1: Color Palette
I jumped into my favorite [color palette generator, coolors.co](https://coolors.co/), and spun the wheel a few times until I found a basic scheme I liked, locking in colors as I found fit and generating more until I came out with this beautiful palette.

![My light mode color palette](/images/light-palette.jpg)

These would be my guiding light (pun intended) in giving light mode users a de-_light_-ful experience.

### Step 2: Color Contrast
The next logical step is to make sure my colors are contrasting enough to be usable _and_ accessible. So I jumped into my favorite [color contrast grid generator](https://contrast-grid.eightshapes.com/) and checked it out.

I forgot to mention that my original color palette _wasn't_ what is pictured above because I had to make some adjustments to make them properly accessible for me, but you get the point.

After figuring out what color combinations were acceptable, I got started on the CSS changes.

### Step 3: Stylesheet Adjustments
I'm a big fan of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*), even if I don't get as in-depth with them as many others do; the simplicity and ease-of-maintenance win me over. As such, they were hugely helpful in turning on the lights around here.

Let's recap on the `prefers-color-scheme` media query and come back to custom properties after.

#### @media (prefers-color-scheme: light) {...}
The same way a media query is set for multiple devices, you check whether a user has a color scheme preference and change styles based on that.

#### Custom Properties
Now that we all remember how to code a color scheme change, let's look at my usage of custom properties:

```css
@media (prefers-color-scheme: light) {
  :root {
  --light: #F0E9E9;
  --black: #02040F;
  --bright: #E59500;
  --red: #7d002d;
  --cobalt: #3D348B;
  --blue: #006992;
  --headerBorder: 2px solid var(--black);
  --headings: 'Lora', sans-serif;
  }
}
```

Boom. Simple. Oh, I also changed the `font-family` in `--headings` because I liked the idea of having a more _elegant_ look on light mode. Actually, I love it, so I've added font optimization to my new list of performance updates.

The `font-weight` for body copy also got one measure smaller - 300 - on default/dark versions for better readability. Weight is set back to normal - 400 - with light mode viewing.

Changing the colors was easy. All I had to do was figure out which elements had colors attached to them and swap them as needed, like so:

```css
a {
  color: var(--red);
}

a:hover {
  color: var(--cobalt);
}

.button {
  background-color: var(--red);
  color: var(--light);
}

.button:hover {
  background-color: var(--cobalt);
}
/* etc... */
```

Present me was very pleased with past me for using custom properties from the start and streamlining my rules early.

#### But Wait, What About Larger Screens?
I wondered that too, but the answer is super simple.

```css
@media (prefers-color-scheme: light) and (min-width: 720px) {
  /* rules here */
}
```

## Light Mode Is Here...Now...Try It Out.
Chrome allows you to emulate a color scheme within their Dev Tools settings if you'd rather not change your system settings.

Turning it on reveals a lovely new version of the site that looks like this:

![My light mode website](/images/light-mode.jpg)

### One More Media Query
I almost forgot to mention that I am catering to our `prefers-reduced-motion` folks with a separate rule turning off the animated header.

```css
@media (prefers-reduced-motion) {
	.type-animation__first, .type-animation__second {
		animation: none;
	}
}
```

## Recap
1. I was excited to create a light mode version of my website using the `prefers-color-scheme` media query.
2. I did some research about best practices for light mode designs in comparison to dark mode.
3. I got together the necessary assets (color palette, a11y notes).
4. I got to work switching up my colors within the media query in my main stylesheet.
5. Users can now view my site in two different experiences - light or dark - or, they might see one or the other by default depending on which browser they're using (sorry).

Love it? Hate it? Let me know and @ me later. And no, my normal Saturday mornings _do not_ consist of me looking up browser features.
