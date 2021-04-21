// Use this one when needed inside a paired shortcode
const Image = require("@11ty/eleventy-img");

module.exports = function (src, alt, widthArray, formatArray, sizes, className = '') {
    let options = {
        widths: widthArray,
        formats: formatArray,
        urlPath: "/assets/img/",
        outputDir: "./_site/assets/img/"
    };
    // generate images, while this is async we don’t wait
    Image(src, options);

    let imageAttributes;

    if (className === '') {
        imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
            whitespaceMode: "inline",
        }
    } else if (className !== '') {
        imageAttributes = {
            class: className,
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
            whitespaceMode: "inline",
        }
    }
    // get metadata even the images are not fully generated
    metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
}
