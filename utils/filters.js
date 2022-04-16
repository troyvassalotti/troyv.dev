/**
 * @file Single location of template filters available
 */

module.exports = {
  /**
   * Date string used in header data on posts
   * @param date
   * @returns {string}
   */
  dateString: function (date) {
    let d = date.toUTCString();
    let gmt = /\s00:00:00\sGMT/g;
    return d.replace(gmt, "");
  },
};
