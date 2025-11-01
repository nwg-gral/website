import { keyByToMap } from "@acdh-oeaw/lib";
import collection from "@content/publications";

import type { CollectionClient } from "@/lib/content/types";

const ids = Array.from(collection.keys());

const all = Array.from(collection.values())
	.map((entry) => {
		return entry.document;
	})
	.sort((a, z) => {
		return z.metadata.date.localeCompare(a.metadata.date);
	});

const byId = keyByToMap(all, (item) => {
	return item.id;
});

export type Publication = (typeof all)[number];

export const client: CollectionClient<Publication> = {
	ids() {
		return Promise.resolve(ids);
	},
	all() {
		return Promise.resolve(all);
	},
	byId() {
		return Promise.resolve(byId);
	},
	get(id: (typeof ids)[number]) {
		return Promise.resolve(byId.get(id) ?? null);
	},
};
