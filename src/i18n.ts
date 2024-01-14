import "server-only";

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { isValidLocale } from "~/config/i18n.config";

export default getRequestConfig(async ({ locale }) => {
	if (!isValidLocale(locale)) notFound();

	return {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		messages: (await import(`@/messages/${locale}.json`)).default,
	};
});
