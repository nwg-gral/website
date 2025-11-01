import type metadata from "@/content/de/metadata/index.json";
import { getIntlLanguage, type IntlLocale } from "@/lib/i18n/locales";
import type messages from "@/messages/de.json";

type Messages = typeof messages;
type Metadata = typeof metadata;
type SocialMediaKind = Metadata["social"][number]["kind"];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getIntlMessages(locale: IntlLocale) {
	const language = getIntlLanguage(locale);

	const _messages = (await import(`@/messages/${language}.json`)) as Messages;
	const _metadata = (await import(`@/content/${language}/metadata/index.json`)) as Metadata;

	const _social: Record<string, string> = {};

	for (const entry of _metadata.social) {
		_social[entry.kind] = entry.href;
	}

	switch (language) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		case "de": {
			await import("@valibot/i18n/de");
			break;
		}

		// case "en": {
		// 	/** Default messages. */
		// 	break;
		// }
	}

	const messages = {
		..._messages,
		metadata: {
			..._metadata,
			social: _social as Record<SocialMediaKind, string>,
		},
	};

	return messages;
}

export type IntlMessages = Awaited<ReturnType<typeof getIntlMessages>>;
