import singleton from "@content/imprint-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type ImprintPage = typeof item;

export const client: SingletonClient<ImprintPage> = {
	get() {
		return Promise.resolve(item);
	},
};
