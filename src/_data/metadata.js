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

class Metadata {
	title = "Troy Vassalotti";
	domain = "www.troyv.dev";
	url = "https://www.troyv.dev";
	repo = "https://github.com/troyvassalotti/troyv.dev";
	socials = [
		new SocialMedia("GitHub", "https://github.com/troyvassalotti"),
		new SocialMedia("Mastodon", "https://fosstodon.org/@rest"),
		new SocialMedia("CodePen", "https://codepen.io/troyvassalotti"),
	];
	cloudinary = new Cloudinary("dpmchqezv");
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
