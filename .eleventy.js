const pluginSass = require("eleventy-plugin-sass");
module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginSass);

  // Passthroughs
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css/fonts");
  eleventyConfig.addPassthroughCopy("css/compressed");
  eleventyConfig.addPassthroughCopy("js/compressed");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("contact/resume.pdf");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("mainNav", function () {
    return `<header class="hideOnPrint">
      <div id="menu">
        <button id="open" aria-label="Open the navigation menu">
          <svg width="30" height="30">
            <path d="M0,5 30,5"/>
            <path d="M0,14 30,14"/>
            <path d="M0,23 30,23"/>
          </svg>
        </button>
      </div>
      <nav class="mainNavigation" id="mainNavigation">
        <button id="close" aria-label="Close the navigation menu">
          <svg width="30" height="30">
            <path d="M5,5 25,25"/>
            <path d="M5,25 25,5"/>
          </svg>
        </button>
        <ul class="navbar">
          <li id="link__home-container"><a href="/" aria-label="Go to the homepage." id="link__home">troy vassalotti.</a></li>
          <li id="link__blog-container"><a href="/blog/" aria-label="Visit my blog." id="link__blog">blog.</a></li>
          <li id="link__projects-container"><a href="/projects/" aria-label="View my various projects." id="link__projects">projects.</a></li>
          <li id="link__music-container"><a href="/music/" aria-label="Learn more about my music." id="link__music">music.</a></li>
          <li id="link__contact-container"><a href="/contact/" aria-label="View my resume and more on my contact page." id="link__contact">contact.</a></li>
        </ul>
      </nav>
    </header>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("footer", function () {
    return `<footer class="contain hideOnPrint">
      <div class="flex footer__wrapper">
        <picture>
          <source srcset="/images/headshot-arrow.webp" type="image/webp">
          <img id="me" src="/images/headshot-arrow_160x160.png" width="160" height="160" alt="This is me. I look like this." loading="lazy">
        </picture>
        <div class="grid place-center two-col footer__icons">
          <a class="icon-link" href="https://github.com/troyvassalotti" target="_blank" rel="noopener" aria-label="Visit my GitHub page."><img src="/images/github-black.svg" alt="Github" width="32" height="32" loading="lazy"></a>
          <a class="icon-link" href="https://codepen.io/troyvassalotti" target="_blank" rel="noopener" aria-label="View smaller projects on my CodePen."><img src="/images/codepen-black.svg" alt="Codepen" width="32" height="32" loading="lazy"></a>
          <a class="icon-link" href="https://www.linkedin.com/in/troy-vassalotti-468053142/" target="_blank" rel="noopener" aria-label="Visit my LinkedIn."><img src="/images/linkedin-black.svg" alt="Linkedin" width="32" height="32" loading="lazy"></a>
          <a class="icon-link" href="https://twitter.com/validcharacters" target="_blank" rel="noopener" aria-label="Follow me on Twitter."><img src="/images/twitter-black.svg" alt="Twitter" width="32" height="32" loading="lazy"></a>
        </div>
      </div>
      <p>&copy; troy vassalotti. | Built with <a href="https://www.11ty.dev" target="_blank" rel="noopener">Eleventy</a>.</p>
    </footer>`
  })

  // Any global scripts, external or internal, can be placed here
  eleventyConfig.addShortcode("scripts", function () {
    return `<script src="/js/compressed/main.min.js" async></script>
      <script src="/js/compressed/instantpage-5.1.0.js" type="module" defer></script>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("contactForm", function () {
    return `<form class="contact-form" name="contactForm" netlify netlify-honeypot="bot-field" data-netlify-recaptcha="true" action="/pages/success/">
      <label style="display: none;">Don’t fill this out: <input name="bot-field"></label>
    	<label for="name">Name<input name="name" type="text" id="name" required></label>
    	<label for="email">Email<input name="email" type="email" id="email" required></label>
    	<label for="message">Message<textarea name="message" id="message" required placeholder="Say hi!"></textarea></label>
      <div data-netlify-recaptcha="true"></div>
      <input type="submit" value="Submit" class="button" id="submit">
    </form>`
  })

  // Figures are meant to be self-contained content, so this component is created without the intent on adding IDs or Classes to them
  eleventyConfig.addShortcode("figure", function (href, img, alt, caption, w, h, target = 'target="_blank" rel="noopener"') {
    return `<figure>
      <a href="${href}" ${target}>
        <picture>
          <source srcset="/images/${img}.webp" type="image/webp"/>
          <img src="/images/${img}.jpg" alt="${alt}" width="${w}" height="${h}" loading="lazy"/>
        </picture>
      </a>
      <figcaption>${caption}</figcaption>
    </figure>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("button", function (href, aria, text, target = 'target="_blank" rel="noopener"') {
    return `<div class="button__container">
      <a class="button" href="${href}" aria-label="${aria}" ${target}>${text}</a>
    </div>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("linkedPicture", function (href, img, alt, fallbackType, w, h, target = 'target="_blank" rel="noopener"') {
    return `<a href="${href}" ${target}>
      <picture>
        <source srcset="/images/${img}.webp" type="image/webp"/>
        <img src="/images/${img}.${fallbackType}" alt="${alt}" width="${w}" height="${h}" loading="lazy"/>
      </picture>
    </a>`
  })
}