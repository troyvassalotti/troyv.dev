module.exports = function (content, href, caption) {
    return `
        <figure class="caption-overlay">
            <a class="caption-link" href="${href}">
                ${content}
                <div class="caption">
                    <figcaption>
                        <h3>${caption}</h3>
                    </figcaption>
                </div>
            </a>
        </figure>`
}
