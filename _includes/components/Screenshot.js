const {
  html
} = require('common-tags');

module.exports = function (href, website, alt, target = 'target="_blank" rel="noopener"') {
  return html `
  <a href="${href}" ${target}>
    <img src="/assets/img/screenshots/${website}/desktopPage1920x1080.jpeg" alt="${alt}" width="320" height="180" loading="lazy"/>
  </a>`
}