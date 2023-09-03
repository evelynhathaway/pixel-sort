module.exports = {
	"plugins": [
		"evelyn",
	],

	"extends": [
		"plugin:evelyn/default",
		"plugin:evelyn/typescript",
		"plugin:evelyn/react",
		"next",
		"next/core-web-vitals",
	],

	"ignorePatterns": [
		"next-env.d.ts",
	],

	"overrides": [
		{
			"files": [
				"**/*.ts",
				"**/*.tsx",
			],
			"extends": [
				"plugin:evelyn/typescript",
			],
		},
		{
			"files": "**/*.mjs",
			"extends": [
				"plugin:evelyn/esm",
			],
		},
	],
};
