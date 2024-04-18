/** @format */

/**
 * A project I created either for fun or just on the side.
 * @typedef {Object} Project
 * @property {string} name Name of the project.
 * @property {string} [repository] URL to the code repository.
 * @property {string} [url] URL to the project's demo.
 * @property {string} description A description of the project.
 * @property {string[]} [tags] List of tags for this project.
 */

/** @type {Project[]} */
const PROJECTS = [
	{
		name: "NotSocial",
		url: "https://pang.troyv.dev/",
		repository: "https://github.com/troyvassalotti/pang",
		description: "A not-so-social media website.",
	},
	{
		name: "Cats",
		url: "https://cats.troyv.dev/",
		repository: "https://github.com/troyvassalotti/express-cats",
		description:
			"My first Express site which showcases my cats. Note: it can take up to 30 seconds to spin up if it's been a while since someone viewed it!",
	},
	{
		name: "This is a Band",
		url: "https://thisisa.band/",
		repository: "https://github.com/troyvassalotti/thisisaband-site",
		description: "A blog about bands I'm currently listening to.",
	},
	{
		name: "Hello Worldvue",
		url: "https://helloworld.troyv.dev/",
		repository: "https://github.com/troyvassalotti/hello-worldvue/",
		description: "View your GPX, KMZ, or KML files in an interactive map.",
	},
	{
		name: ".docx to .html",
		url: "https://docx-to-html.troyv.dev/",
		repository: "https://github.com/troyvassalotti/docx-to-html",
		description:
			"Turn a dreaded Word document into pure HTML. Ahh, how nice that feels.",
	},
	{
		name: "Vuedoku",
		url: "https://sudoku.troyv.dev",
		repository: "https://github.com/troyvassalotti/sudoku",
		description: "Play Sudoku and challenge your friends.",
		tags: ["play"],
	},
	{
		name: "BPM Finder",
		url: "/bpm/",
		description: "A simple beats per minute finder.",
		tags: ["play"],
	},
	{
		name: "Guitar Tuner",
		url: "/tuner/",
		description: "A simple guitar (or whatever stringed instrument) tuner.",
		tags: ["play"],
	},
	{
		name: "Gonk",
		url: "https://www.gonk.app/",
		repository: "https://github.com/troyvassalotti/gonk",
		description:
			"Send Honks with Gonk! I won't explain that any further, so check it out for yourself.",
		tags: ["play"],
	},
	{
		name: "Aura Log",
		url: "https://auralog.troyv.dev/",
		repository: "https://github.com/troyvassalotti/aura-log",
		description:
			"Track headaches with a CLI journaling process and customizable charts.",
	},
	{
		name: "TroyGPT",
		url: "/blog-maker/",
		description: "Write a blog using my words as the LLM.",
		tags: ["play"],
	},
];

export default PROJECTS;
