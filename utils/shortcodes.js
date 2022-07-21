/**
 * @file Site shortcodes
 */

module.exports = {
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
