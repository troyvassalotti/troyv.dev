const Image = require("@11ty/eleventy-img");

module.exports = {
  Image: async function (
    src,
    alt,
    widthArray = [400, 600, 800, 1200],
    formatArray = ["webp", "jpg"],
    sizes = "(max-width: 700px) 100vw, 1200px",
    className = "",
    id = "",
    loading = "lazy"
  ) {
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
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline",
    });
  },
  ImageSync: function (
    src,
    alt,
    widthArray,
    formatArray,
    sizes,
    className = "",
    id = ""
  ) {
    let options = {
      widths: widthArray,
      formats: formatArray,
      urlPath: "/assets/img/",
      outputDir: "./_site/assets/img/",
    };
    // generate images, while this is async we don’t wait
    Image(src, options);

    let imageAttributes = {
      id,
      class: className,
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      whitespaceMode: "inline",
    };

    // get metadata even the images are not fully generated
    metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
  },
};
