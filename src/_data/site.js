/**
 * @file Store the site's current environment in a variable
 * @type {{environment: string}}
 */
module.exports = {
    environment: process.env.ELEVENTY_ENV,
}
