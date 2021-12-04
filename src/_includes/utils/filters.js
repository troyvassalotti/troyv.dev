const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const sanitizeHTML = require("sanitize-html");

module.exports = {
  cssmin: function (code) {
    return new CleanCSS({ level: 2 }).minify(code).styles;
  },
  mmyyyy: function (date) {
    let d = new Date(date);
    return `${d.getMonth() + 1}/${d.getUTCFullYear()}`;
  },
  readableDate: function (dateObj, format = "dd LLL yyyy") {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  },
  dateFromTimestamp: function (timestamp) {
    return DateTime.fromISO(timestamp, { zone: "utc" }).toJSDate();
  },
  htmlDateString: function (dateObj) {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
  },
  head: function (array, n) {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  },
  webmentionsForUrl: function (webmentions, url) {
    // define which types of webmentions should be included per URL.
    // possible values listed here:
    // https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
    const allowedTypes = ["mention-of", "in-reply-to"];

    // define which HTML tags you want to allow in the webmention body content
    // https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
    const allowedHTML = {
      allowedTags: ["b", "i", "em", "strong", "a"],
      allowedAttributes: {
        a: ["href"],
      },
    };

    // clean webmention content for output
    const clean = (entry) => {
      const { html, text } = entry.content;

      if (html) {
        // really long html mentions, usually newsletters or compilations
        entry.content.value =
          html.length > 2000
            ? `mentioned this in <a href="${entry["wm-source"]}">${entry["wm-source"]}</a>`
            : sanitizeHTML(html, allowedHTML);
      } else {
        entry.content.value = sanitizeHTML(text, allowedHTML);
      }

      return entry;
    };

    // sort webmentions by published timestamp chronologically.
    // swap a.published and b.published to reverse order.
    const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

    // only allow webmentions that have an author name and a timestamp
    const checkRequiredFields = (entry) => {
      const { author, published } = entry;
      return !!author && !!author.name && !!published;
    };

    // run all of the above for each webmention that targets the current URL
    return webmentions
      .filter((entry) => entry["wm-target"] === url)
      .filter((entry) => allowedTypes.includes(entry["wm-property"]))
      .filter(checkRequiredFields)
      .sort(orderByDate)
      .map(clean);
  },
};
