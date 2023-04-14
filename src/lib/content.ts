import { assert } from "@stefanprobst/assert";

import { type Locale } from "~/config/i18n.config";

/**
 * CMS currently only supports `single_file` for `i18n` in `file` collections.
 */
export function getPage<T>(pages: Array<{ [key in Locale]: T }>, locale: Locale): T {
	const [page] = pages;

	assert(page != null && locale in page);

	return page[locale];
}
