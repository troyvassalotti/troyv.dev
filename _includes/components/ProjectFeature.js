const {html} = require('common-tags');

module.exports = function (content, title, id) {
  return html `
  <article class="project" id="project_${id}">
    <h2>${title}</h2>
    <div class="skewed-background col full">
      <div class="wrapper" data-constrain="some">
        <div class="content">
          ${content}
        </div>
      </div>
    </div>
  </article>`
}
