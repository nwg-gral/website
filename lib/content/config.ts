import { createConfig } from "@acdh-oeaw/content-lib";

import { events } from "@/lib/content/collections/events";
import { publications } from "@/lib/content/collections/publications";
import { activitiesPage } from "@/lib/content/singletons/activities-page";
import { contactPage } from "@/lib/content/singletons/contact-page";
import { imprintPage } from "@/lib/content/singletons/imprint-page";
import { indexPage } from "@/lib/content/singletons/index-page";
import { networksPage } from "@/lib/content/singletons/networks-page";
import { publicationsPage } from "@/lib/content/singletons/publications-page";
import { researchPage } from "@/lib/content/singletons/research-page";
import { teamPage } from "@/lib/content/singletons/team-page";

export const config = createConfig({
	collections: [
		activitiesPage.de,
		activitiesPage.en,

		contactPage.de,
		contactPage.en,

		imprintPage.de,
		imprintPage.en,

		indexPage.de,
		indexPage.en,

		networksPage.de,
		networksPage.en,

		publicationsPage.de,
		publicationsPage.en,

		researchPage.de,
		researchPage.en,

		teamPage.de,
		teamPage.en,

		events.de,
		events.en,

		publications.de,
		publications.en,
	],
});
