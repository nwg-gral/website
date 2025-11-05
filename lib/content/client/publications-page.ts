import singleton from "@content/publications-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type PublicationsPage = typeof item;

export const client: SingletonClient<PublicationsPage> = {
	get() {
		return Promise.resolve(item);
	},
};
