const POSTS_DIRECTORY = "src/posts";
const AVAILABLE_TAGS = [
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
  "speaking",
  "thoughts",
  "vue",
  "web audio",
  "web components",
];
const SYNDICATION_TARGETS = ["mastodon"];

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
        choices: AVAILABLE_TAGS,
      },
      {
        type: "checkbox",
        name: "syndication",
        message: "Where should this be syndicated?",
        choices: SYNDICATION_TARGETS,
      },
      {
        type: "editor",
        name: "content",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${POSTS_DIRECTORY}/{{dashCase title}}.md`,
        templateFile: "plop-templates/post.hbs",
      },
    ],
  });
}
