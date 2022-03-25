---
layout: about
description: Normal person stuck in a computer.
---

If you'd like to know about my professional history, you can [view my résumé](https://resume.troyv.dev/). It's updated about as often as anyone else's résumé, but it looks nice and prints well.

If you want to know what I'm up to right now, then check my [now page](/now).

## Social Media

<ul>
{% for social in nav.socials %}
<li><a href="{{ social.url }}">{{ social.name }}</a></li>
{% endfor %}
</ul>

---

View this site's [Speedlify](https://speedlify.troyv.dev) scores.
