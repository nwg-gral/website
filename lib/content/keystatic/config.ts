import { withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
import { config as createConfig } from "@keystatic/core";

import { env } from "@/config/env.config";
import { createEvents } from "@/lib/content/keystatic/collections/events";
import { createPublications } from "@/lib/content/keystatic/collections/publications";
import { createActivitiesPage } from "@/lib/content/keystatic/singletons/activities-page";
import { createContactPage } from "@/lib/content/keystatic/singletons/contact-page";
import { createImprintPage } from "@/lib/content/keystatic/singletons/imprint-page";
import { createIndexPage } from "@/lib/content/keystatic/singletons/index-page";
import { createMetadata } from "@/lib/content/keystatic/singletons/metadata";
import { createNetworksPage } from "@/lib/content/keystatic/singletons/networks-page";
import { createPublicationsPage } from "@/lib/content/keystatic/singletons/publications-page";
import { createResearchPage } from "@/lib/content/keystatic/singletons/research-page";
import { createTeamPage } from "@/lib/content/keystatic/singletons/team-page";

export const config = createConfig({
	collections: {
		[withI18nPrefix("events", "de")]: createEvents("de"),
		[withI18nPrefix("events", "en")]: createEvents("en"),

		[withI18nPrefix("publications", "de")]: createPublications("de"),
		[withI18nPrefix("publications", "en")]: createPublications("en"),
	},
	singletons: {
		[withI18nPrefix("activities-page", "de")]: createActivitiesPage("de"),
		[withI18nPrefix("activities-page", "en")]: createActivitiesPage("en"),

		[withI18nPrefix("contact-page", "de")]: createContactPage("de"),
		[withI18nPrefix("contact-page", "en")]: createContactPage("en"),

		[withI18nPrefix("imprint-page", "de")]: createImprintPage("de"),
		[withI18nPrefix("imprint-page", "en")]: createImprintPage("en"),

		[withI18nPrefix("index-page", "de")]: createIndexPage("de"),
		[withI18nPrefix("index-page", "en")]: createIndexPage("en"),

		[withI18nPrefix("metadata", "de")]: createMetadata("de"),
		[withI18nPrefix("metadata", "en")]: createMetadata("en"),

		[withI18nPrefix("networks-page", "de")]: createNetworksPage("de"),
		[withI18nPrefix("networks-page", "en")]: createNetworksPage("en"),

		[withI18nPrefix("publications-page", "de")]: createPublicationsPage("de"),
		[withI18nPrefix("publications-page", "en")]: createPublicationsPage("en"),

		[withI18nPrefix("research-page", "de")]: createResearchPage("de"),
		[withI18nPrefix("research-page", "en")]: createResearchPage("en"),

		[withI18nPrefix("team-page", "de")]: createTeamPage("de"),
		[withI18nPrefix("team-page", "en")]: createTeamPage("en"),
	},
	storage:
		env.NEXT_PUBLIC_KEYSTATIC_MODE === "github" &&
		env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER != null &&
		env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME != null
			? {
					kind: "github",
					repo: {
						owner: env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	ui: {
		brand: {
			name: "GraL Website",
		},
		navigation: {
			Data: [
				withI18nPrefix("events", "de"),
				withI18nPrefix("events", "en"),

				withI18nPrefix("publications", "de"),
				withI18nPrefix("publications", "en"),
			],
			Pages: [
				withI18nPrefix("index-page", "de"),
				withI18nPrefix("index-page", "en"),

				withI18nPrefix("team-page", "de"),
				withI18nPrefix("team-page", "en"),

				withI18nPrefix("research-page", "de"),
				withI18nPrefix("research-page", "en"),

				withI18nPrefix("networks-page", "de"),
				withI18nPrefix("networks-page", "en"),

				withI18nPrefix("activities-page", "de"),
				withI18nPrefix("activities-page", "en"),

				withI18nPrefix("publications-page", "de"),
				withI18nPrefix("publications-page", "en"),

				withI18nPrefix("contact-page", "de"),
				withI18nPrefix("contact-page", "en"),

				withI18nPrefix("imprint-page", "de"),
				withI18nPrefix("imprint-page", "en"),
			],
			Settings: [withI18nPrefix("metadata", "de"), withI18nPrefix("metadata", "en")],
		},
	},
});
