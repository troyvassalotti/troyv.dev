module.exports = function (eleventyConfig) {
  // Passthroughs
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("audio");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("contact/resume.pdf");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("contactForm", function () {
    return `<form class="contact-form" name="contactForm" netlify netlify-honeypot="bot-field" action="/pages/success/">
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

  // A reusable block, so it helps to have it maintainable in one place
  eleventyConfig.addShortcode("screenshot", function (href, website, alt, target = 'target="_blank" rel="noopener"') {
    return `<a href="${href}" ${target}>
        <img src="/images/screenshots/${website}/desktopPage1920x1080.jpeg" alt="${alt}" width="320" height="180" loading="lazy"/>
    </a>`
  })
}