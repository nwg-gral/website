import { client as activitiesPage } from "@/lib/content/client/activities-page";
import { client as contactPage } from "@/lib/content/client/contact-page";
import { client as events } from "@/lib/content/client/events";
import { client as imprintPage } from "@/lib/content/client/imprint-page";
import { client as indexPage } from "@/lib/content/client/index-page";
import { client as networksPage } from "@/lib/content/client/networks-page";
import { client as publications } from "@/lib/content/client/publications";
import { client as researchPage } from "@/lib/content/client/research-page";
import { client as teamMembers } from "@/lib/content/client/team-members";
import { client as teamPage } from "@/lib/content/client/team-page";
import type { Client } from "@/lib/content/types";

export const client = {
	collections: {
		events,
		publications,
		teamMembers,
	},
	singletons: {
		activitiesPage,
		contactPage,
		imprintPage,
		indexPage,
		networksPage,
		researchPage,
		teamPage,
	},
} satisfies Client;
