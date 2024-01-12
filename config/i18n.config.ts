const _locales = ["de"] as const;
export const locales = _locales as Writable<typeof _locales>;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export function isValidLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}
