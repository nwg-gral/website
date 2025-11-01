import { keyByToMap } from "@acdh-oeaw/lib";
import collection from "@content/international-advisory-board-members";

import type { CollectionClient } from "@/lib/content/types";

const ids = Array.from(collection.keys());

const all = Array.from(collection.values())
	.map((entry) => {
		return entry.document;
	})
	.sort((a, z) => {
		return z.metadata.name.localeCompare(a.metadata.name);
	});

const byId = keyByToMap(all, (item) => {
	return item.id;
});

export type InternationalAdvisoryBoardMember = (typeof all)[number];

export const client: CollectionClient<InternationalAdvisoryBoardMember> = {
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
