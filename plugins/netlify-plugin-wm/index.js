/**
 * @format
 * @file Notes plugin for sending webmentions.
 */

const Webmention = require("@remy/webmention");

const {CONTEXT, URL} = process.env;

module.exports = {
	async onSuccess({utils, constants, inputs}) {
		const limit = inputs.limit || 1;
		const feeds = inputs.feeds;
		const baseUrl = URL;
		const feedUrls = feeds.map(
			(feed) => `${baseUrl.replace(/\$/, "")}/${feed}`,
		);

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
						console.log("");

						const wm = new Webmention({limit, send: true});

						wm.on("error", (e) => reject(e));

						wm.on("sent", (res) => {
							console.log(
								`Sent ${res.source} to ${res.endpoint.url} (${res.endpoint.type})`,
							);
							if (res.error) {
								console.log(
									`Error sending to ${res.endpoint.url}: ${res.error}`,
								);
							}
							console.log("");
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
	},
};
