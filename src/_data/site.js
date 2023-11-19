/**
 * @format
 * @file Store the site's current environment in a variable Can be used in templates if desired
 * @type {{environment: string}}
 */

module.exports = {
	environment: process.env.ELEVENTY_ENV,
	serverless: process.env.ELEVENTY_SERVERLESS,
};
