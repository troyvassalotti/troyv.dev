/**
 * @file Fetches Webmentions from the webmention.io api
 */
const fs = require("fs")
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))
const unionBy = require("lodash/unionBy")
const domain = require("./metadata.json").domain
require("dotenv").config()
const CACHE_DIR = ".cache"
const API = "https://webmention.io/api"
const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function fetchWebmentions(since, perPage = 10000) {
    if (!domain) {
        console.warn(">>> unable to fetch webmentions: no domain name specified.")
        return false
    }

    if (!TOKEN) {
        console.warn(">>> unable to fetch webmentions: no access token specified in environment.")
        return false
    }

    let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`
    if (since) url += `&since=${since}`

    const response = await fetch(url)
    if (response.ok) {
        const feed = await response.json()
        console.log(`${feed.children.length} new webmentions fetched from ${API}`)
        return feed
    }

    return null
}

/**
 * Merge fresh webmentions with cached entried, unique per id
 * @param a
 * @param b
 * @returns {*}
 */
function mergeWebmentions(a, b) {
    return unionBy(a.children, b.children, "wm-id")
}

/**
 * Save combined webmentions in cache file
 * @param data
 */
function writeToCache(data) {
    const filePath = `${CACHE_DIR}/webmentions.json`
    const fileContent = JSON.stringify(data, null, 2)
    // create cache folder if it doesn't exist already
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR)
    }
    // write data to cache json file
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) throw err
        console.log(`>>> webmentions saved to ${filePath}`)
    })
}

/**
 * Get cache contents from json file
 * @returns {{children: *[], lastFetched: null}|any}
 */
function readFromCache() {
    const filePath = `${CACHE_DIR}/webmentions.json`

    if (fs.existsSync(filePath)) {
        const cacheFile = fs.readFileSync(filePath)
        return JSON.parse(cacheFile)
    }

    // no cache found
    return {
        lastFetched: null,
        children: [],
    }
}

module.exports = async function () {
    const cache = readFromCache()

    if (cache.children.length) {
        console.log(`>>> ${cache.children.length} webmentions loaded from cache`)
    }

    // Only fetch new webmentions in production
    if (process.env.ELEVENTY_ENV === "production") {
        const feed = await fetchWebmentions(cache.lastFetched)
        if (feed) {
            const webmentions = {
                lastFetched: new Date().toISOString(),
                children: mergeWebmentions(cache, feed),
            }

            writeToCache(webmentions)
            return webmentions
        }
    }

    return cache
}