module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("contact/resume.pdf");

  eleventyConfig.addShortcode("footer", function() {
    return `<footer>
      <div class="footer-wrapper">
        <picture>
          <source srcset="images/headshot-arrow.webp" type="image/webp">
          <img src="images/headshot-arrow_160x160.png" alt="This is me. I look like this." loading="lazy">
        </picture>
        <div class="footer-icons">
          <a class="icon-link" href="https://github.com/troyvassalotti" target="_blank" rel="noopener" aria-label="Visit my GitHub."><i class="fab fa-github fa-3x"></i></a>
          <a class="icon-link" href="https://codepen.io/troyvassalotti" target="_blank" rel="noopener" aria-label="Visit my CodePen."><i class="fab fa-codepen fa-3x"></i></a>
          <a class="icon-link" href="https://www.linkedin.com/in/troy-vassalotti-468053142/" target="_blank" rel="noopener" aria-label="Visit my LinkedIn."><i class="fab fa-linkedin fa-3x"></i></a>
          <a class="icon-link" href="https://twitter.com/lowercasetroy" target="_blank" rel="noopener" aria-label="Visit my Twitter."><i class="fab fa-twitter fa-3x"></i></a>
        </div>
      </div>
      <p>&copy; troy vassalotti.</p>
    </footer>`
  })

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
          <li id="link__home-container"><a href="/" aria-label="Go back to the homepage." id="link__home">troy vassalotti.</a></li>
          <li id="link__projects-container"><a href="/projects/" id="link__projects">projects.</a></li>
          <li id="link__music-container"><a href="/music/" id="link__music">music.</a></li>
          <li id="link__contact-container"><a href="/contact/" id="link__contact">contact.</a></li>
        </ul>
      </nav>
    </header>`
  })
};
