---
title: "Website Cheatcodes"
description: "I want the web to be fun again."
date: 2023-04-22
tags:
  - javascript
syndication:
  - mastodon
---

<!-- @format -->

The internet, am I right? It's a scary place full of terror, ads, and people you wish would log off every once in a while. Where did all the fun go?

I've been seeing personal blogs get redesigned with an old school aesthetic, embracing the flashy graphics of a web long forgotten, and I want that for this here website. I'm not a super talented graphic designer though, but maybe that's okay if I want visitors to feel like they've been transported back to a time when [AIM status messages](https://greatist.com/connect/friendships-were-easier-with-aim) meant something.

There is something I _can_ do though, and that's give my website cheat codes.

What does that mean? I'm glad you asked!

Cheat codes is a bit of javascript [you can import](https://github.com/troyvassalotti/cheatcodes) on your site to listen to events that will trigger the prize: a stream of confetti cannons.

If you're reading this post on my site (not in your RSS reader), have you tried the Konami code? _hint hint_.

Oh hey, and if you have a Guitar Hero guitar lying around, plug it in. Try this out: **Green, Red, Green, Yellow, Green, Blue, Green, Orange, Tilt**. Star Power!

## How Does It Work?

Cheat codes is a simple [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) that can be configured to listen for a specific pattern, with a time limit for how quickly you need to enter it, a duration for the confetti cannons to fire, and customizable confetti options. Possible listeners are key presses and gamepads.

As you press keys (or buttons on your gamepad), each one is stored in an array that resets itself after the time limit. The codes in the array must match the pattern being listened for in order for the confetti to launch.

> For now, it does only support [`canvas-confetti`](https://www.npmjs.com/package/canvas-confetti) but contributions are welcome to extend the prize to other visual effects.

The default cheat code is the Konami code and it's a few lines of code away from being activated on your site.

```js
import CheatCode from "@troyv/cheatcodes";
new CheatCode().listen(); // Konami code is ready!
```

The arguments list goes like this:

1. A specified pattern to listen for, such as "a b c d" or "1 2 3 4".
2. Type of listener - "keyboard" or "gamepad".
3. The time limit before the current input is reset and you need to start over.
4. How long (in ms) the confetti cannons last.
5. Custom confetti options if you wish to change the default effect.

I mentioned my site uses both the Konami code and a Guitar Hero pattern at this time. This is what it looks like to hook up a Guitar Hero (gamepad) code:

```js
// Green, Red, Green, Yellow, Green, Blue, Green, Orange, Tilt
new CheatCode("7 1 7 0 7 2 7 3 6", "gamepad").listen();
```

I listed the mappings for both a PS2 controller as well as a guitar controller [in the repo](https://github.com/troyvassalotti/cheatcodes/blob/main/src/enums.ts).

What do you think? Are you going to try it out yourself? Let me know! Let's make the web fun together.
