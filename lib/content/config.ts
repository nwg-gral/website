import { createConfig } from "@acdh-oeaw/content-lib";

import { cooperationPartners } from "@/lib/content/collections/cooperation-partners";
import { events } from "@/lib/content/collections/events";
import { internationalAdvisoryBoardMembers } from "@/lib/content/collections/international-advisory-board-members";
import { neworkPartners } from "@/lib/content/collections/network-partners";
import { publications } from "@/lib/content/collections/publications";
import { teamMembers } from "@/lib/content/collections/team-members";
import { activitiesPage } from "@/lib/content/singletons/activities-page";
import { contactPage } from "@/lib/content/singletons/contact-page";
import { imprintPage } from "@/lib/content/singletons/imprint-page";
import { indexPage } from "@/lib/content/singletons/index-page";
import { networksPage } from "@/lib/content/singletons/networks-page";
import { researchPage } from "@/lib/content/singletons/research-page";
import { teamPage } from "@/lib/content/singletons/team-page";

export const config = createConfig({
	collections: [
		activitiesPage,
		contactPage,
		imprintPage,
		indexPage,
		networksPage,
		researchPage,
		teamPage,

		cooperationPartners,
		events,
		internationalAdvisoryBoardMembers,
		neworkPartners,
		publications,
		teamMembers,
	],
});
