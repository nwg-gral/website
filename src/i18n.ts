import "server-only";

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { isValidLocale } from "~/config/i18n.config";

export default getRequestConfig(async ({ locale }) => {
	if (!isValidLocale(locale)) notFound();

	return {
		messages: (await import(`@/messages/${locale}.json`)).default,
	};
});
