const Image = require("@11ty/eleventy-img");

module.exports = async function (src, alt, widthArray, formatArray, sizes, className = '', id = '') {
    let metadata = await Image(src, {
        widths: widthArray,
        formats: formatArray,
        urlPath: "/assets/img/",
        outputDir: "./_site/assets/img/",
    });

    let imageAttributes;

    if (id === '' && className === '') {
        imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }
    } else if (id !== '' && className === '') {
        imageAttributes = {
            id,
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }
    } else if (id === '' && className !== '') {
        imageAttributes = {
            class: className,
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }
    } else if (id !== '' && className !== '') {
        imageAttributes = {
            id,
            class: className,
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }
    }

    return Image.generateHTML(metadata, imageAttributes, {whitespaceMode: "inline"});
}
