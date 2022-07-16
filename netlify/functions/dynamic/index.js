const { EleventyServerless } = require("@11ty/eleventy");
require("./eleventy-bundler-modules.js");

async function handler(event) {
  let elev = new EleventyServerless("dynamic", {
    path: new URL(event.rawUrl).pathname,
    query: event.multiValueQueryStringParameters || event.queryStringParameters,
    functionsDir: "./netlify/functions/",
  });

  try {
    let [page] = await elev.getOutput();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
      body: page.content,
    };
  } catch (error) {
    if (elev.isServerlessUrl(event.path)) {
      console.log("Serverless Error:", error);
    }

    return {
      statusCode: error.httpStatusCode || 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    };
  }
}

exports.handler = handler;
