import { withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
import { config as createConfig } from "@keystatic/core";

import { env } from "@/config/env.config";
import { createCooperationPartners } from "@/lib/content/keystatic/collections/cooperation-partners";
import { createEvents } from "@/lib/content/keystatic/collections/events";
import { createInternationalAdvisoryBoardMembers } from "@/lib/content/keystatic/collections/international-advisory-board-members";
import { createNetworkPartners } from "@/lib/content/keystatic/collections/network-partners";
import { createPublications } from "@/lib/content/keystatic/collections/publications";
import { createTeamMembers } from "@/lib/content/keystatic/collections/team-members";
import { createActivitiesPage } from "@/lib/content/keystatic/singletons/activities-page";
import { createContactPage } from "@/lib/content/keystatic/singletons/contact-page";
import { createImprintPage } from "@/lib/content/keystatic/singletons/imprint-page";
import { createIndexPage } from "@/lib/content/keystatic/singletons/index-page";
import { createMetadata } from "@/lib/content/keystatic/singletons/metadata";
import { createNetworksPage } from "@/lib/content/keystatic/singletons/networks-page";
import { createResearchPage } from "@/lib/content/keystatic/singletons/research-page";
import { createTeamPage } from "@/lib/content/keystatic/singletons/team-page";
import { defaultLocale, getIntlLanguage } from "@/lib/i18n/locales";

const locale = getIntlLanguage(defaultLocale);

export const config = createConfig({
	collections: {
		[withI18nPrefix("cooperation-partners", locale)]: createCooperationPartners(locale),
		[withI18nPrefix("events", locale)]: createEvents(locale),
		[withI18nPrefix("international-advisory-board-members", locale)]:
			createInternationalAdvisoryBoardMembers(locale),
		[withI18nPrefix("network-partners", locale)]: createNetworkPartners(locale),
		[withI18nPrefix("publications", locale)]: createPublications(locale),
		[withI18nPrefix("team-members", locale)]: createTeamMembers(locale),
	},
	singletons: {
		[withI18nPrefix("activities-page", locale)]: createActivitiesPage(locale),
		[withI18nPrefix("contact-page", locale)]: createContactPage(locale),
		[withI18nPrefix("imprint-page", locale)]: createImprintPage(locale),
		[withI18nPrefix("index-page", locale)]: createIndexPage(locale),
		[withI18nPrefix("metadata", locale)]: createMetadata(locale),
		[withI18nPrefix("networks-page", locale)]: createNetworksPage(locale),
		[withI18nPrefix("research-page", locale)]: createResearchPage(locale),
		[withI18nPrefix("team-page", locale)]: createTeamPage(locale),
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
				withI18nPrefix("team-members", locale),
				withI18nPrefix("cooperation-partners", locale),
				withI18nPrefix("international-advisory-board-members", locale),
				withI18nPrefix("network-partners", locale),
				withI18nPrefix("events", locale),
				withI18nPrefix("publications", locale),
			],
			Pages: [
				withI18nPrefix("index-page", locale),
				withI18nPrefix("team-page", locale),
				withI18nPrefix("research-page", locale),
				withI18nPrefix("networks-page", locale),
				withI18nPrefix("activities-page", locale),
				withI18nPrefix("contact-page", locale),
				withI18nPrefix("imprint-page", locale),
			],
			Settings: [withI18nPrefix("metadata", locale)],
		},
	},
});
