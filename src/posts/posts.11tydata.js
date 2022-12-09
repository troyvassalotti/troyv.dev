const configWebmentions = require("../../utils/configWebmentions");
const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

module.exports = {
  layout: "post",
  tags: ["post"],
  permalink: "{{ page.date | yyyymmdd }}/{{ title | slugify }}/",
  eleventyComputed: {
    webmentions: (data) => {
        return getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
    },
  }
}