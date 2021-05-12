const {html} = require('common-tags');

module.exports = function (content, href, caption, target = '') {
    return html`
        <figure class="caption-overlay">
            <a class="caption-link" href="${href}" ${target}>
                ${content}
                <div class="caption">
                    <figcaption>
                        <h3>${caption}</h3>
                    </figcaption>
                </div>
            </a>
        </figure>`
}
