module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css/fonts");
  eleventyConfig.addPassthroughCopy("css/compressed");
  eleventyConfig.addPassthroughCopy("js/compressed");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("contact/resume.pdf");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("mainNav", function() {
    return `<header>
      <div id="menu">
        <button id="open" aria-label="Open the navigation menu">
          <svg width="30" height="30">
            <path d="M0,5 30,5"/>
            <path d="M0,14 30,14"/>
            <path d="M0,23 30,23"/>
          </svg>
        </button>
      </div>
      <nav class="sideNavigation" id="sideNavigation">
        <button id="close" aria-label="Close the navigation menu">&times;</button>
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
  eleventyConfig.addShortcode("footer", function() {
    return `<footer>
      <div class="footer-wrapper">
        <picture>
          <source srcset="/images/headshot-arrow.webp" type="image/webp">
          <img id="me" src="/images/headshot-arrow_160x160.png" alt="This is me. I look like this." loading="lazy">
        </picture>
        <div class="footer-icons">
          <a class="icon-link" href="https://github.com/troyvassalotti" target="_blank" rel="noopener" aria-label="Visit my GitHub page."><img src="/images/github-black.svg" alt="Github"></a>
          <a class="icon-link" href="https://codepen.io/troyvassalotti" target="_blank" rel="noopener" aria-label="View smaller projects on my CodePen."><img src="/images/codepen-black.svg" alt="Codepen"></a>
          <a class="icon-link" href="https://www.linkedin.com/in/troy-vassalotti-468053142/" target="_blank" rel="noopener" aria-label="Visit my LinkedIn."><img src="/images/linkedin-black.svg" alt="Linkedin"></a>
          <a class="icon-link" href="https://twitter.com/lowercasetroy" target="_blank" rel="noopener" aria-label="Follow me on Twitter."><img src="/images/twitter-black.svg" alt="Twitter"></a>
        </div>
      </div>
      <p>&copy; troy vassalotti.</p>
    </footer>`
  })

  // Any global scripts, external or internal, can be placed here
  eleventyConfig.addShortcode("scripts", function() {
    return `<script src="/js/compressed/javascript.min.js" async></script>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("contactForm", function() {
    return `<form class="contact-form" name="contactForm" netlify netlify-honeypot="bot-field" action="/pages/success/">
      <label style="display: none;">Don’t fill this out: <input name="bot-field"></label>
    	<label for="name">Name<input name="name" type="text" id="name" required></label>
    	<label for="email">Email<input name="email" type="email" id="email" required></label>
    	<label for="message">Message<textarea name="message" id="message" required placeholder="Say hi!"></textarea></label>
      <input type="submit" value="Submit" class="button" id="submit">
    </form>`
  })

  // Figures are meant to be self-contained content, so this component is created without the intent on adding IDs or Classes to them
  eleventyConfig.addShortcode("figure", function(href, img, alt, caption, target='target="_blank" rel="noopener"') {
    return `<figure>
      <a href="${href}" ${target}>
        <picture>
          <source srcset="/images/${img}.webp" type="image/webp"/>
          <img src="/images/${img}.jpg" alt="${alt}" loading="lazy"/>
        </picture>
        <figcaption>${caption}</figcaption>
      </a>
    </figure>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("button", function(href, aria, text, target='target="_blank" rel="noopener"') {
    return `<div class="button-wrapper">
      <a class="button" href="${href}" aria-label="${aria}" ${target}>${text}</a>
    </div>`
  })

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("hrefPic", function(href, img, alt, target='target="_blank" rel="noopener"') {
    return `<a href="${href}" ${target}>
      <picture>
        <source srcset="/images/${img}.webp" type="image/webp"/>
        <img src="/images/${img}.png" alt="${alt}" loading="lazy"/>
      </picture>
    </a>`
  })

  // A reusable block of SEO meta tags
  eleventyConfig.addShortcode("seoTags", function() {
    return `<meta name="description" content="{{description}}">
    <meta name="og:locale" content="en_US">
    <meta name="og:type" content="article">
    <meta name="og:title" content="{{title}}">
    <meta name="og:description" content="{{description}}">
    <meta name="og:site_name" content="troyv.dev">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="{{title}}">
    <meta name="twitter:description" content="{{description}}">
    <meta name="twitter:creator" content="@lowercasetroy">`
  })
}
