const { defaults } = require("@chrisburnell/eleventy-cache-webmentions")()

// Load .env variables with dotenv
require("dotenv").config()

module.exports = Object.assign(defaults, {
    domain: "https://www.troyv.dev",
      feed: `https://webmention.io/api/mentions.jf2?domain=www.troyv.dev&per-page=9001&token=${process.env.WEBMENTION_IO_TOKEN}`,
      key: "children",
	  directory: "_cache"
})