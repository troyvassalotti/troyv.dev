---
layout: work
use_screenshot_service: true
repo: https://github.com/troyvassalotti/hello-worldvue/
title: Hello WorldVue
description: A Vue 3 and Vite app for visualizing KMZ, KML, and GPX files in a Leaflet
    map.
framework: Vue 3 + Vite
website: https://helloworldvue.netlify.app/
featuredImage: ""
---

I like tracking my runs in the [OpenTracks](https://github.com/OpenTracksApp/OpenTracks) app because it does GPS tracking locally on my device without any network access. Tracks can be exported in a variety of formats including KMZ, KML, and GPX. I wanted to learn how to use these files to display my runs and ended up creating Hello WorldVue using [Vite](https://vitejs.dev/) with [Vue 3](https://v3.vuejs.org/). The way it works is you upload a KMZ, KML, or GPX file and it gets rendered on a [Leaflet](https://leafletjs.com/) map. Because I don't want to deal with setting up a database, your uploaded files are used as object URLs in the browser and don't get stored anywhere. Have fun!
