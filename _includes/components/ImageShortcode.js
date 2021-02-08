const Image = require("@11ty/eleventy-img");

module.exports = async function (src, alt, widthArray, formatArray, sizes, id = '') {
  let metadata = await Image(src, {
    widths: widthArray,
    formats: formatArray,
    urlPath: "/assets/img/",
    outputDir: "./_site/assets/img/",
  });

  let imageAttributes;

  if (id === '') {
    imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    }
  } else if (id !== '') {
    imageAttributes = {
      id,
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    }
  }

  return Image.generateHTML(metadata, imageAttributes, {whitespaceMode: "inline"});
}
