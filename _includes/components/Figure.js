const {
  html
} = require('common-tags');

module.exports = function (href, img, alt, caption, w, h, target = 'target="_blank" rel="noopener"') {
  return html `
  <figure>
    <a href="${href}" ${target}>
      <picture>
        <source srcset="/assets/img/${img}.webp" type="image/webp"/>
        <img src="/assets/img/${img}.jpg" alt="${alt}" width="${w}" height="${h}" loading="lazy"/>
      </picture>
    </a>
    <figcaption>${caption}</figcaption>
  </figure>`
}