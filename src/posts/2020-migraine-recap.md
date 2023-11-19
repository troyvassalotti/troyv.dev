---
title: I Logged My Migraines For Another Year (2020)
description: Another year, another migraine recap.
date: 2021-02-23
tags: ["migraines"]
---

<!-- @format -->

We learned last year that my migraine situation was a problem. Well, more of a problem than usual. You can read more about [how I did in 2019](/2020/03/12/i-logged-my-migraines-for-a-year-2019/), but it wasn't great. I continued to log each migraine I had throughout 2020 because I'm a nerd.

I made improvements, but they came in the second half of the year since it takes that long for trial and error to work. That said, I ended the year at **45 migraines** (a drop from **67** in 2019). It's still not ideal, but plenty of people have it worse than I do, so I'm lucky in that sense.

The shining light of this year's log is that I now have a working calendar heatmap created with the power of D3. This is great because D3 is more in my wheelhouse than Tableu and I can keep it running for each new year I decide to keep doing this madness.

Here's the resulting calendar to showcase 2019 and 2020.

<style>::part(heatmap) {font-family: var(--code)}</style>

<script src="/assets/js/calendar-heatmap.js" type="module"></script>

<calendar-heatmap data-src="/assets/js/migraines-2020.json"></calendar-heatmap>

D3 is fun and exciting and equally complicated, so my chart only goes so far in displaying the data. I only keep track of the **day** and **start time** so the chart isn't too overwhelming, but it makes it more maintainable for myself as well.

## What Were The Causes?

Look at this graph:

![A graph showing the associated trigger for each of the 45 migraines I had. Among those triggers are stress, alcohol, poor sleep, anxiety, rebounds, natural causes, and weather.]({{ metadata.cloudinary }}/c_scale,f_auto,q_auto:eco/v1646349103/blog/2020-by-triggers_prdhi6.webp)

It's _very hard_ to associate what causes a migraine. For one, it isn't always due to a single trigger alone but rather a multitude or building up of triggers over time. Also, it feels too reductive at times - especially when I have no idea what happened and I can only point to _natural causes_.

It shouldn't be surprising then that the order is as follows:

1. Stress or Natural Causes
2. Weather
3. Poor Sleep
4. Rebound headaches or Anxiety
5. Alcohol (thanks New Year's Eve)

## When Did They Most Happen?

I mentioned earlier that I saw improvements in the later part of the year. October was the only month I went without a single attack (woohoo), but from that point on they've been sparse. This is a result of finding the right routine and medications, but it feels great to not live in a constant state of tension-headache-fear.

Look at this graph now:

![A graph showing the number of migraines I had per quarter of the year.]({{ metadata.cloudinary }}/c_scale,f_auto,q_auto:eco/v1646349103/blog/2020-by-quarter_iqkdev.webp)

- **January - March**: Not great. 10 migraines.
- **April - June**: Even worse at 16.
- **July - September**: Barely better with 15.
- **October - December**: A pleasant total of 4.

Since I keep track of the time of day they happen, I also know what _times of day_ they most occurred. If that sounds interesting to you, then you'll love this graph:

![A histogram showing the number of migraines I had broken out by the time of day in buckets of 4 hours.]({{ metadata.cloudinary }}/c_scale,f_auto,q_auto:eco/v1646349103/blog/2020-by-time_o98q5l.webp)

This one is a little less telling since it's a pretty regular distribution, but I had the most migraines between the hours of noon - 4:00 p.m. The second place slot was tied with midnight - 4:00 a.m. and 8:00 a.m. - noon.

> It's not like I was staying up late all the time and that's why I got so many after midnight. The reason for that is I have the unfortunate habit of waking up in the middle of the night with a migraine fully in progress.

## What Now?

I've stopped doing all the logging by hand because it is cumbersome trying to keep track of every little detail myself. There's this cool app called _Migraine Buddy_ that I'm trying now. So far, it's great because it asks all the same questions I was asking myself _and then some_! I need to keep track of the dates and times separately for my calendar tracker, but that's a worthwhile trade.

Here's to another year of hopeful progress.
