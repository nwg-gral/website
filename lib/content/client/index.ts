import { log } from "@acdh-oeaw/lib";

import { createClient as createActivitiesPageClient } from "@/lib/content/client/activities-page";
import { createClient as createContactPageClient } from "@/lib/content/client/contact-page";
import { createClient as createEventsClient } from "@/lib/content/client/events";
import { createClient as createImprintPageClient } from "@/lib/content/client/imprint-page";
import { createClient as createIndexPageClient } from "@/lib/content/client/index-page";
import { createClient as createNetworksPageClient } from "@/lib/content/client/networks-page";
import { createClient as createPublicationsClient } from "@/lib/content/client/publications";
import { createClient as createPublicationsPageClient } from "@/lib/content/client/publications-page";
import { createClient as createResearchPageClient } from "@/lib/content/client/research-page";
import { createClient as createTeamPageClient } from "@/lib/content/client/team-page";
import type { Client } from "@/lib/content/types";
import type { IntlLanguage } from "@/lib/i18n/locales";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function createClient(language: IntlLanguage) {
	try {
		const [
			activitiesPage,
			contactPage,
			events,
			imprintPage,
			indexPage,
			networksPage,
			publications,
			publicationsPage,
			researchPage,
			teamPage,
		] = await Promise.all([
			createActivitiesPageClient(language),
			createContactPageClient(language),
			createEventsClient(language),
			createImprintPageClient(language),
			createIndexPageClient(language),
			createNetworksPageClient(language),
			createPublicationsClient(language),
			createPublicationsPageClient(language),
			createResearchPageClient(language),
			createTeamPageClient(language),
		]);

		const client = {
			collections: {
				events,
				publications,
			},
			singletons: {
				activitiesPage,
				contactPage,
				imprintPage,
				indexPage,
				networksPage,
				publicationsPage,
				researchPage,
				teamPage,
			},
		} satisfies Client;

		return client;
	} catch (error) {
		log.error(
			'Failed to create content client. Did you run "pnpm content:build" or "pnpm content:dev"?',
		);
		throw error;
	}
}
