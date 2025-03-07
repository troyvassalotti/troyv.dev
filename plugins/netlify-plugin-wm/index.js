/**
 * @format
 * @file Notes plugin for sending webmentions.
 * @link https://github.com/CodeFoodPixels/netlify-plugin-webmentions
 */

import Webmention from "@remy/webmention";

const {CONTEXT, URL} = process.env;

export async function onSuccess({utils, constants, inputs}) {
	const limit = inputs.limit || 1;
	const feeds = inputs.feeds;
	const baseUrl = URL;
	const feedUrls = feeds.map((feed) => `${baseUrl.replace(/\$/, "")}/${feed}`);

	if (constants.IS_LOCAL || CONTEXT !== "production") {
		console.log(
			"Skipping discovering webmentions because this isn't a production build",
		);

		return;
	}

	try {
		const promises = feedUrls.map(
			(url) =>
				new Promise((resolve, reject) => {
					console.log(
						`Discovering Webmentions in ${url} with a limit of ${limit} ${
							limit === 1 ? "entry" : "entries"
						}`,
					);

					const wm = new Webmention({limit, send: true});

					wm.on("error", (e) => reject(e));

					wm.on("sent", (res) => {
						console.log(
							`Sent ${res.source} to ${res.endpoint.url} (${res.endpoint.type})`,
						);
						if (res.error) {
							console.log(`Error sending to ${res.endpoint.url}: ${res.error}`);
						}
					});

					wm.on("end", () => {
						resolve();
					});

					wm.fetch(url);
				}),
		);

		await Promise.all(promises);
	} catch (e) {
		utils.build.failPlugin(e);
	}
}
