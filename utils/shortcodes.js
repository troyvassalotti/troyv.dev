/**
 * @file Single location of available shortcodes on the site
 */

const Image = require("@11ty/eleventy-img");

module.exports = {
  /**
   * Asynchronous eleventy-image handling
   * @param src
   * @param alt
   * @param widthArray
   * @param formatArray
   * @param sizes
   * @param className
   * @param id
   * @param loading
   * @returns {Promise<string>}
   * @constructor
   */
  Image: async function(
    src,
    alt,
    widthArray = [400, 600, 800, 1200],
    formatArray = ["webp", "jpg"],
    sizes = "(max-width: 700px) 100vw, 1200px",
    className = "",
    id = "",
    loading = "lazy",
  ) {
    let metadata = await Image(src, {
      widths: widthArray,
      formats: formatArray,
      urlPath: "/img/",
      outputDir: "./_site/img/",
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
  /**
   * Synchronous eleventy-image handling
   * @param src
   * @param alt
   * @param widthArray
   * @param formatArray
   * @param sizes
   * @param className
   * @param id
   * @returns {string}
   * @constructor
   */
  ImageSync: function(src, alt, widthArray, formatArray, sizes, className = "", id = "") {
    let options = {
      widths: widthArray,
      formats: formatArray,
      urlPath: "/img/",
      outputDir: "./_site/img/",
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
    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
  },
  /**
   * Add images from Cloudinary via shortcode
   * Doesn't come with options to add class, id, width, height
   * @param path
   * @param transforms
   * @param alt
   * @returns {`<img src="https://res.cloudinary.com/${*}/${string}/${string}" alt="${string}" loading="lazy" decoding="async">`}
   */
  cloudinaryImage: function(path, transforms, alt) {
    return `<img src="https://res.cloudinary.com/dpmchqezv/image/upload/${transforms}/${path}" alt="${alt}" loading="lazy" decoding="async">`;
  },
};
