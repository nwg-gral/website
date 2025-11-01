import * as path from "node:path";

import baseConfig from "@acdh-oeaw/eslint-config";
import nextConfig from "@acdh-oeaw/eslint-config-next";
import reactConfig from "@acdh-oeaw/eslint-config-react";
import tailwindConfig from "@acdh-oeaw/eslint-config-tailwindcss";
import { defineConfig } from "eslint/config";
import gitignore from "eslint-config-flat-gitignore";

export default defineConfig(
	gitignore({ strict: false }),
	{ ignores: ["content/**", "public/**"] },
	{
		extends: [baseConfig],
		rules: {
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/require-array-sort-compare": "error",
			"@typescript-eslint/strict-boolean-expressions": "error",
			"arrow-body-style": ["error", "always"],
			"no-restricted-syntax": [
				"error",
				{
					message: "Please use `@/config/env.config` instead.",
					selector: 'MemberExpression[computed!=true][object.name="process"][property.name="env"]',
				},
			],
			"object-shorthand": ["error", "always", { avoidExplicitReturnArrows: true }],
			"preserve-caught-error": "error",
		},
	},
	{
		extends: [reactConfig],
		rules: {
			"@eslint-react/prefer-read-only-props": "error",
		},
	},
	nextConfig,
	tailwindConfig,
	{
		settings: {
			tailwindcss: {
				config: path.resolve("./styles/index.css"),
			},
		},
	},
);
