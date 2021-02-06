const {html} = require('common-tags');

module.exports = function (href, website, alt, target = 'target="_blank" rel="noopener"') {
  return html `
  <a href="${href}" ${target}>
    <picture>
      <source srcset="/assets/img/${website}1280x720.jpeg" media="(min-width: 800px)">
      <source srcset="/assets/img/${website}1920x1080.jpeg" media="(min-width: 1400px)">
      <img src="/assets/img/${website}1140x640.jpeg" alt="${alt}" width="320" height="180" loading="lazy"/>
    </picture>
  </a>`
}
