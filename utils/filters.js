/**
 * @file Custom template filters
 */

module.exports = {
  /**
   * Date string used in header data on posts
   * @param date
   * @returns {string}
   */
  dateString: function(date) {
    return date.toUTCString().replace(/\s00:00:00\sGMT/g, "");
  },
  filterWebmentions: function(array, type) {
    return array.filter(item => item["wm-property"] === type);
  },
  /**
   * Slash-separated dates
   * @param date
   * @returns {`${number}/${number}/${number}`}
   */
  yyyymmdd: function(date) {
    const d = new Date(date);
    let year = d.getUTCFullYear();
    let month = d.getUTCMonth() + 1;
    let day = d.getUTCDate();

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    return `${year}/${month}/${day}`;
  },
  /**
   * Removes specific tags from a post's post.data.tags list
   * Shares functionality from the custom collection for tag pages
   * @param tags
   * @returns {*[]}
   */
  postTagRemoval: function(tags) {
    return (tags || []).filter(tag => ["all", "post", "posts"].indexOf(tag) === -1);
  },
};
