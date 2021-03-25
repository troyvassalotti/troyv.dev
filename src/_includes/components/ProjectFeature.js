const {html} = require('common-tags');

module.exports = function (content, title, description, href, id) {
  return html `
  <article class="project" id="project_${id}">
    <h2>${title}</h2>
    <div class="skewed-background col full">
      <div class="wrapper" data-constrain="some">
        <div class="content">
          <section class="project-image">
            <a href="${href}" target="_blank" rel="noopener">
              ${content}
            </a>
          </section>
          <section class="project-description">
            ${description}
          </section>
        </div>
      </div>
    </div>
  </article>`
}
