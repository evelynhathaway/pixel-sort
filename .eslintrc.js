module.exports = {
	"plugins": [
		"evelyn",
	],

	"extends": [
		"plugin:evelyn/default",
		"plugin:evelyn/react",
	],

	"ignorePatterns": [
		"lib",
		"coverage",
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
	],

	"rules": {
		"unicorn/no-null": "off",
	},
};
