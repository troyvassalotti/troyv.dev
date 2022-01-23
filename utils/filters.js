/**
 * @file Single location of template filters available
 */

const { DateTime } = require("luxon")
const sanitizeHTML = require("sanitize-html")

module.exports = {
    /**
     * Date string used in header data on posts
     * @param date
     * @returns {string}
     */
    dateString: function (date) {
        let d = date.toUTCString()
        let gmt = /\s00:00:00\sGMT/g
        return d.replace(gmt, "")
    },
    /**
     * Makes a readable date for Webmentions
     * @param dateObj
     * @param format
     * @returns {string}
     */
    readableDate: function (dateObj, format = "dd LLL yyyy") {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format)
    },
    /**
     * Takes a timestamp and turns it into a date for Webmentions
     * @param timestamp
     * @returns {Date}
     */
    dateFromTimestamp: function (timestamp) {
        return DateTime.fromISO(timestamp, { zone: "utc" }).toJSDate()
    },
    /**
     * Sanitize Webmention content of unsafe HTML tags
     * @link https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
     * @param entry
     * @returns {string|string|*}
     */
    sanitizeWebmention: function (entry) {
        const allowedHTML = {
            allowedTags: ["b", "i", "em", "strong", "a"],
            allowedAttributes: {
                a: ["href"],
            },
        }

        const { html, text } = entry.content

        if (html) {
            // really long html mentions, usually newsletters or compilations
            entry.content.value =
                html.length > 2000
                    ? `mentioned this in <a href="${entry["wm-source"]}">${entry["wm-source"]}</a>`
                    : sanitizeHTML(html, allowedHTML)
        } else {
            entry.content.value = sanitizeHTML(text, allowedHTML)
        }

        return entry.value
    },
    /**
     * Define the types of Webmentions to be included
     * @link https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
     * @param webmentions
     * @param url
     * @param allowedTypes
     * @returns {*}
     */
    webmentionsForUrl: function (webmentions, url, allowedTypes) {
        if (!allowedTypes) {
            allowedTypes = ["mention-of", "in-reply-to", "like-of", "repost-of", "bookmark-of"]
        } else if (typeof allowedTypes === "string") {
            allowedTypes = [allowedTypes]
        }

        // sort webmentions by published timestamp chronologically.
        const orderByDate = (a, b) => new Date(b.published) - new Date(a.published)

        /* only allow webmentions that have an author name
        const checkRequiredFields = (entry) => {
          const { author } = entry;
          return !!author && !!author.name;
        }; */

        // run all of the above for each webmention that targets the current URL
        return (
            webmentions
                .filter((entry) => entry["wm-target"] === url)
                .filter((entry) => allowedTypes.includes(entry["wm-property"]))
                // .filter(checkRequiredFields)
                .sort(orderByDate)
        )
    },
}
