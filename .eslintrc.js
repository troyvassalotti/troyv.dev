module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: "./node_modules/@troyv/common-config/.eslintrc.json",
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		// Ignores TemplateLiterals to prevent clashing between dprint indentation and eslint indentation
		indent: [
			"error",
			"tab",
			{ ignoredNodes: ["TemplateLiteral > *"] },
		],
		"linebreak-style": [
			"error",
			"unix",
		],
		quotes: [
			"error",
			"double",
		],
		semi: [
			"error",
			"always",
		],
	},
};
