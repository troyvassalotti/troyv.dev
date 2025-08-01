/** @format */

export default function (plop) {
	plop.setGenerator("post", {
		description: "Write a new blog post",
		prompts: [
			{
				type: "input",
				name: "title",
				message: "What's the title?",
			},
			{
				type: "input",
				name: "description",
				message: "What's the description of the post?",
			},
			{
				type: "input",
				name: "date",
				message: "What's the date? (YYYY-MM-DD)",
			},
			{
				type: "checkbox",
				name: "tags",
				message: "What are the tags?",
				choices: [
					"bookmarks",
					"charmcityjs",
					"design",
					"eleventy",
					"express",
					"front royal",
					"hugo",
					"indie web",
					"javascript",
					"life",
					"migraines",
					"music",
					"nunjucks",
					"podcast idea",
					"projects",
					"rust",
					"speaking",
					"thoughts",
					"vue",
					"web audio",
					"web components",
				],
			},
			{
				type: "checkbox",
				name: "syndication",
				message: "Where should this be syndicated?",
				choices: ["mastodon"],
			},
			{
				type: "editor",
				name: "content",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/posts/{{dashCase title}}.md",
				templateFile: "plop-templates/post.hbs",
			},
		],
	});

	/**
	 * @deprecated: Use Sveltia CMS
	 */
	plop.setGenerator("tweet", {
		description: "Write a new tweet",
		prompts: [
			{
				type: "input",
				name: "title",
				message: "What's the title?",
			},
			{
				type: "editor",
				name: "content",
				postfix: "md",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/notes/{{dashCase datePretty}}-{{dashCase title}}.md",
				templateFile: "plop-templates/note.hbs",
				data() {
					let now = new Date();
					let date = new Intl.DateTimeFormat("se-SV", {
						timeZone: "America/New_York",
					}).format(now);

					return {
						datePretty: date,
						date: now.toISOString(),
					};
				},
			},
		],
	});
}
