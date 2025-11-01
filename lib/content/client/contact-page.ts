import singleton from "@content/contact-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type ContactPage = typeof item;

export const client: SingletonClient<ContactPage> = {
	get() {
		return Promise.resolve(item);
	},
};
