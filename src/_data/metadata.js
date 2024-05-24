/** @format */

class SocialMedia {
	constructor(name, url) {
		this.name = name;
		this.url = url;
	}
}

class Cloudinary {
	constructor(id) {
		this.source = "https://res.cloudinary.com";
		this.image = `${this.source}/${id}/image/upload`;
		this.video = `${this.source}/${id}/video/upload`;
		this.fetch = `${this.source}/${id}/image/fetch`;
	}
}

const GitHub = new SocialMedia("GitHub", "https://github.com/troyvassalotti");
const Mastodon = new SocialMedia("Mastodon", "https://fosstodon.org/@rest");
const CodePen = new SocialMedia("CodePen", "https://codepen.io/troyvassalotti");

class Metadata {
	title = "Troy Vassalotti";
	domain = "www.troyv.dev";
	url = "https://www.troyv.dev";
	repo = "https://github.com/troyvassalotti/troyv.dev";
	socials = [GitHub, Mastodon, CodePen];
	cloudinary = new Cloudinary("dpmchqezv");
	follow = {
		mastodon: Mastodon.url,
	};
	rss = {
		url: "https://www.troyv.dev/",
		language: "en",
		author: {
			name: "Troy Vassalotti",
			email: "fqa560de@anonaddy.me",
		},
		feeds: {
			blog: {
				title: "Troy Vassalotti :: Blog",
				subtitle: "Troy writes about web development and being a person.",
				items: "post",
				alternate: "archive/",
			},
			notes: {
				title: "Troy Vassalotti :: Notes",
				subtitle: "Bite-sized notes from Troy.",
				items: "note",
				alternate: "notes/",
			},
		},
	};
}

export default new Metadata();
