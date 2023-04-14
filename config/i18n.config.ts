const _locales = ["de"] as const;
export const locales = _locales as Writable<typeof _locales>;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";
