---
title: Plvylist is on npm
description: I finally got around to publishing Plvylist on npm. Isn't that great?
date: 2021-12-05
tags: ["web components", "projects"]
---

<!-- @format -->

`npm i plvylist`

That's all you need to do to use [Plvylist](/2021/04/13/plvylist-is-now-a-web-component/) in your own projects now. This is my first time publishing a package to npm so, uh, hopefully it works! I promise I did a test of adding it to a Vite + Vue project before writing this post and it worked out. Here's the code I used for said test:

```js
// src/App.vue
<script setup>
	import 'plvylist/dist/plvylist-component'
</script>

<template>
	<plvylist-player tracks="tracks.json"></plvylist-player>
</template>
```

Running `npm run dev` produced the expected result of Plvylist all alone in my app. Finger's crossed it's that straightforward for other use cases, but please submit any bugs to the [repo's issues](https://github.com/troyvassalotti/plvylist/issues).
