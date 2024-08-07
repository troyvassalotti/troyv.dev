/** @format */

class Navigation {
	constructor(name, exception = null) {
		this.name = name;
		this.exception = exception;
	}

	get url() {
		return this.exception ?? `/${this.name}/`;
	}
}

export default [
	new Navigation("home", "/"),
	new Navigation("archive"),
	new Navigation("notes"),
	new Navigation("music"),
	new Navigation("projects"),
	new Navigation("contact"),
	new Navigation("follow"),
	new Navigation("now"),
	new Navigation("blogroll"),
	new Navigation("links"),
	new Navigation(
		"likes",
		"https://www.inoreader.com/stream/user/1005377372/tag/user-liked/view/html?t=Liked%20Feed&l=https%3A%2F%2Fwww.troyv.dev%2Ffavicons%2Fandroid-chrome-512x512.png&cs=m",
	),
];
