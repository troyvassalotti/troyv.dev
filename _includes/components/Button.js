const {
  html
} = require('common-tags');

module.exports = function (href, text, target = 'target="_blank" rel="noopener"') {
  return html `
  <a class="button" href="${href}" ${target}>${text}</a>`
}