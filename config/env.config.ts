/* eslint-disable no-restricted-syntax */

import { err, isErr, ok } from "@acdh-oeaw/lib";
import { createEnv, ValidationError } from "@acdh-oeaw/validate-env/next";
import * as v from "valibot";

const result = createEnv({
	schemas: {
		system(environment) {
			const schema = v.object({
				NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "production"),
			});

			const result = v.safeParse(schema, environment);

			if (!result.success) {
				return err(
					new ValidationError(
						`Invalid or missing environment variables.\n${v.summarize(result.issues)}`,
					),
				);
			}

			return ok(result.output);
		},
		private(environment) {
			const schema = v.object({
				BUILD_MODE: v.optional(v.picklist(["export", "standalone"])),
				CI: v.optional(v.pipe(v.unknown(), v.transform(Boolean), v.boolean())),
				KEYSTATIC_GITHUB_CLIENT_ID: v.optional(v.pipe(v.string(), v.nonEmpty())),
				KEYSTATIC_GITHUB_CLIENT_SECRET: v.optional(v.pipe(v.string(), v.nonEmpty())),
				KEYSTATIC_SECRET: v.optional(v.pipe(v.string(), v.nonEmpty())),
				NEXT_RUNTIME: v.optional(v.picklist(["edge", "nodejs"])),
			});

			const result = v.safeParse(schema, environment);

			if (!result.success) {
				return err(
					new ValidationError(
						`Invalid or missing environment variables.\n${v.summarize(result.issues)}`,
					),
				);
			}

			return ok(result.output);
		},
		public(environment) {
			const schema = v.object({
				NEXT_PUBLIC_APP_BASE_URL: v.pipe(v.string(), v.url()),
				NEXT_PUBLIC_BOTS: v.optional(v.picklist(["disabled", "enabled"]), "disabled"),
				NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: v.optional(v.pipe(v.string(), v.nonEmpty())),
				NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: v.optional(v.pipe(v.string(), v.nonEmpty())),
				NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME: v.optional(v.pipe(v.string(), v.nonEmpty())),
				NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER: v.optional(v.pipe(v.string(), v.nonEmpty())),
				NEXT_PUBLIC_KEYSTATIC_MODE: v.optional(v.picklist(["github", "local"]), "local"),
			});

			const result = v.safeParse(schema, environment);

			if (!result.success) {
				return err(
					new ValidationError(
						`Invalid or missing environment variables.\n${v.summarize(result.issues)}`,
					),
				);
			}

			return ok(result.output);
		},
	},
	environment: {
		BUILD_MODE: process.env.BUILD_MODE,
		CI: process.env.CI,
		KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
		KEYSTATIC_GITHUB_CLIENT_SECRET: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
		KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET,
		NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
		NEXT_PUBLIC_BOTS: process.env.NEXT_PUBLIC_BOTS,
		NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
		NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
		NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
		NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
		NEXT_PUBLIC_KEYSTATIC_MODE: process.env.NEXT_PUBLIC_KEYSTATIC_MODE,
		NEXT_RUNTIME: process.env.NEXT_RUNTIME,
		NODE_ENV: process.env.NODE_ENV,
	},
	validation: v.parse(
		v.optional(v.picklist(["disabled", "enabled", "public"]), "enabled"),
		process.env.ENV_VALIDATION,
	),
});

if (isErr(result)) {
	delete result.error.stack;
	throw result.error;
}

export const env = result.value;
