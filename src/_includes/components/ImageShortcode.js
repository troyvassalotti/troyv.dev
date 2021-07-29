const Image = require("@11ty/eleventy-img");

module.exports = async function (src, alt, widthArray = [400, 600, 800, 1200], formatArray = ['webp', 'jpg'], sizes = '(max-width: 700px) 100vw, 1200px', className = '', id = '', loading = 'lazy') {
    let metadata = await Image(src, {
        widths: widthArray,
        formats: formatArray,
        urlPath: "/assets/img/",
        outputDir: "./_site/assets/img/",
    });

    let imageAttributes = {
        id,
        class: className,
        alt,
        sizes,
        loading,
        decoding: "async"
    }

    return Image.generateHTML(metadata, imageAttributes, {whitespaceMode: "inline"});
}
