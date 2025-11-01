import singleton from "@content/team-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type TeamPage = typeof item;

export const client: SingletonClient<TeamPage> = {
	get() {
		return Promise.resolve(item);
	},
};
