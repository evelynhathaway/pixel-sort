import eslintPluginEvelyn from "eslint-plugin-evelyn";
import tseslint from "typescript-eslint";

export default tseslint.config(
	...eslintPluginEvelyn.configs.base,
	...eslintPluginEvelyn.configs.esm,
	...eslintPluginEvelyn.configs.react,
	...eslintPluginEvelyn.configs.next,
	...eslintPluginEvelyn.configs.typescript,
	...eslintPluginEvelyn.configs.jest,
	...eslintPluginEvelyn.configs.testingLibraryReact,
);
