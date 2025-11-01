import singleton from "@content/research-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type ResearchPage = typeof item;

export const client: SingletonClient<ResearchPage> = {
	get() {
		return Promise.resolve(item);
	},
};
