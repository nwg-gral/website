import singleton from "@content/networks-page";

import type { SingletonClient } from "@/lib/content/types";

const item = singleton.get("")!.document;

export type NetworksPage = typeof item;

export const client: SingletonClient<NetworksPage> = {
	get() {
		return Promise.resolve(item);
	},
};
