import singleton from "@content/activities-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type ActivitiesPage = typeof item;

export const client: SingletonClient<ActivitiesPage> = {
	get() {
		return Promise.resolve(item);
	},
};
