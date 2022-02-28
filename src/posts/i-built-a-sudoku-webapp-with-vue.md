---
date: 2022-02-17
use_screenshot_service: true
draft: true
title: Making a Sudoku App with Vue
description: What started as a Valentine's Day gift turned into a full-blown webapp.
tags: []
project: false
shortname: ''
featuredImage: ''
website: ''

---
I was surprised by how difficult it was to find a full-blown tutorial for making a Sudoku app with Vue. On the contrary, the internet is overflowing with React versions of Sudoku, so I decided to follow one of those and _port_ it into Vue.

Matt Biilmann of Netlify fame [made a Sudoku React app](https://www.youtube.com/watch?v=GytUZLK4kwA) that can be found over on the freeCodeCamp YouTube channel, and it's this video that was the entry point to my app, [Vuedoku](https://github.com/troyvassalotti/sudoku). I got it started with Vite because I've been using that a lot lately and think it's rad.

## Getting Started

It's important to first understand how Sudoku works. I'm not qualified to define it for you, but Wikipedia is:

> Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9 x 9 grid with digits so that each column, each row, and each of the nine 3 x 3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.

Makes sense, right?

At its core, my app needed the following features:

1. A way to generate a playable board and store its solution in the background.
2. The ability to add guesses to blank spaces _and only_ the blank spaces.
3. A shortcut to fill in the solution when you get stuck, or generate a brand new puzzle if you'd like.

Additional features that came from both Matt's video and my post-video thinking include:

1. The option to highlight your guesses as either correct or incorrect if you find yourself stuck or needing a hint.
2. Sharable boards so you can challenge friends to see who can complete the same board in the shortest amount of time.
3. A way to restore your previous board in case you accidentally generate a new puzzle, overriding your current work.

Knowing what the outcome is supposed to be, we can now start building it.

## Generating Data

In order to create a board, we need a Sudoku generator, so let's install `sudoku` from `npm`.

## Components

It's a small app which means there are but a handful of pieces to this puzzle (ha ha, get it?).

1. `SudokuBoard.vue` is our board itself.
2. `SudokuField.vue` is the individual square or block composing the board.
3. `Timer.vue` is the clock keeping track of how long you've been playing.
4. `Result.vue` is what shows when your puzzle is completed (either by cheating with the shortcut or naturally because you're so good at Sudoku).
5. `ReloadPrompt.vue` also exists, but it's only purpose is to display a message when the app is available for offline use, as part of the `vite-plugin-pwa` package.

### The Board