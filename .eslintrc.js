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
			"rules": {
				// When passing Location methods, TypeScript will warn that it's unbound, but we're not calling them
				"@typescript-eslint/unbound-method": "off",
			},
		},
	],
};
