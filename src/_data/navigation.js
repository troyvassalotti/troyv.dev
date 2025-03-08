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
	new Navigation("contact"),
	new Navigation("links"),
];
