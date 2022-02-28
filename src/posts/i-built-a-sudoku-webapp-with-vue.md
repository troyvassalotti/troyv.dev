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

Since we outlined the features our app needs, we can try to map our what components it will need. It's a small app which means there are but a handful of pieces to this _puzzle_ (ha ha, get it?).

1. `SudokuBoard.vue` is our board itself.
2. `SudokuField.vue` is the individual square or block composing the board.
3. `Timer.vue` is the clock keeping track of how long you've been playing.
4. `Result.vue` is what shows when your puzzle is completed (either by cheating with the shortcut or naturally because you're so good at Sudoku).
5. `ReloadPrompt.vue` also exists, but it's only purpose is to display a message when the app is available for offline use, as part of the `vite-plugin-pwa` package.

Knowing what the outcome is supposed to be and what components we'll need, we can now start building it. I used Vite's Vue 3 starter, so [follow their docs](https://vitejs.dev/guide/) for the most up to date method of doing that.

## Generating Data

In order to create a board, we need a Sudoku generator, so let's install `sudoku` from `npm`.

```js
npm i sudoku
```

The sudoku package comes with two key functions we'll be using: `makepuzzle()` and `solvepuzzle()`. The former generates an array with `null` values for empty boxes and fills the rest with starter numbers.

That's great, but we need it to be in the format of columns and rows since that's how you work with the board. We also need the solution for that puzzle so we can check progress during the game. And that's not all! We want to track the player's start time **and** end time.

The best way of keeping all these pieces of information together is by creating our own object to store data in.

```js
// lib/sudoku.js
import {makepuzzle, solvepuzzle} from 'sudoku'

/*
  Generates a sudoku with the structure
  {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, readonly: true}, ...]}, ...]}
*/
export function generateSudoku() {
    const fromUrl = extractUrlData() // Used if you share the game with a friend

    const raw = fromUrl ? fromUrl.raw : makepuzzle()
    const rawSolution = solvepuzzle(raw)

    const formatted = raw.map(e => (e === null ? null : e + 1)) // Adjust the values slightly since we're working with a 0 indexed situation
    const formattedSolution = rawSolution.map(e => e + 1) // Same thing goes for the solution

    const result = {
        raw,
        rows: [],
        solution: formattedSolution,
        startTime: new Date(),
        solvedTime: null,
        challengerStartTime: fromUrl && new Date(fromUrl.startTime),
        challengerSolvedTime: fromUrl && new Date(fromUrl.solvedTime)
    }

	// Loop over the formatted data to generate row and column data
    for (let i = 0; i < 9; i++) {
        const row = {cols: [], index: i}
        for (let j = 0; j < 9; j++) {
            const value = formatted[i * 9 + j]
            const col = {
                row: i,
                col: j,
                value: value,
                readonly: value !== null
            }
            row.cols.push(col)
        }
        result.rows.push(row)
    }

    return result
}
```

At this point, we have a file `sudoku.js` in our `lib` directory. To use our data, we need to import `generateSudoku()`to our `App.vue` and store the Sudoku in app state.

```js
// src/App.vue
<script setup>
import {reactive} from 'vue'
import {generateSudoku} from './lib/sudoku'

const store = {
  state: reactive({
    sudoku: generateSudoku(),
    showProgress: false, // Used in highlighting correct/incorrect cells
    previousSudoku: null,
  }),
  
  /*
  * snip
  */
</script>
```

Our app now has access to a `store` object, which holds our app's `state` object. The app state is defined as reactive so we can change its value as needed, and our Sudoku is generated on the fly (along with a game options setting and previous Sudoku fields). It's `store.state.sudoku` that gets passed as a prop to our board component.

```js
// src/App.vue
<script setup>
import {reactive} from 'vue'
import {generateSudoku} from './lib/sudoku'
import SudokuBoard from './components/SudokuBoard.vue'

const store = {
  state: reactive({
    sudoku: generateSudoku(),
    showProgress: false, // Used in highlighting correct/incorrect cells
    previousSudoku: null,
  }),
  
  /*
  * snip
  */
</script>

<template>
  <SudokuBoard :sudoku="store.state.sudoku" :progress="store.state.showProgress" :previous="store.state.previousSudoku"/>
</template>
```

## The Board

We have data, but we have no home for that data. Our app needs a `SudokuField` component because it's those fields where we will provide our guesses, and our data is what plops those fields into the board.

Our field component needs to accept block information (a value and whether it should be read only), and it needs to pass change events back into the app. The entire component is relatively small since it has only a few specific needs.

```js
// src/components/SudokuField.vue
<script setup>
const props = defineProps({
  field: Object,
  onChange: Function
})

/**
 * Pass changed field up to the Sudoku board to evaluate the field's value
 * @param e - Event
 */
function handleChange(e) {
  const el = e.target
  const value = e.target.value === '' ? null : parseInt(e.target.value, 10)
  props.onChange({...props.field, value: value, el: el})
}
</script>

<template>
  <input class="field" inputmode="numeric" maxlength="1" pattern="[0-9]*" :value="props.field.value || ''" :readonly="props.field.readonly" @change="handleChange">
</template>

<style lang="scss" scoped>
.field {
  --lightness: 8%;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--ink);
  color: hsl(0deg, 0%, var(--lightness));
  font: {
    size: var(--step-1);
  }
  text-align: center;

  &[readonly] {
    --lightness: 30%;
    cursor: not-allowed;
  }

  &:nth-of-type(3) {
    border-inline-end-width: var(--thickness);
  }

  &:nth-of-type(6) {
    border-inline-end-width: var(--thickness);
  }
}

@media (prefers-color-scheme: dark) {
  .field {
    --lightness: 95%;
    background-color: var(--canvas);

    &[readonly] {
      --lightness: 70%;
    }
  }
}
</style>
```

You may have noticed our `handleChange()` function and `onChange` prop. These two pieces are what pass state back to our app. `onChange` is a function prop from `App.vue` and `handleChange()` passes our `onChange` function data for the field you're currently working with. What's getting passed? Well, we need to tell the app 1) which field out of all the fields is being changed (`props.field`), and 2) what value that cell now is.

Our `onChange` function takes that checks your guesses against the stored solution to determine if your game is completed or still in progress.

```js
// src/App.vue
/*
 * snip
 */
 
const store = {
  state: reactive({
    sudoku: generateSudoku(),
    showProgress: false,
    previousSudoku: null,
  }),

  /**
   * Receives events from the individual fields to either highlight cells or check solutions
   * @param e - Event
   */
  handleChange(e) {
    store.state.sudoku.rows[e.row].cols[e.col].value = e.value
    highlightCell(e, store.state.sudoku)
    if (!store.state.sudoku.solvedTime) {
      const solved = checkSolution(store.state.sudoku)
      if (solved) {
        store.state.sudoku.solvedTime = new Date()
        store.state.sudoku.shareUrl = shareUrl(store.state.sudoku)
      }
    }
  },
  
  /*
   * snip
   */
```