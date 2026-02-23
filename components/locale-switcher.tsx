"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/components/link";
import { getIntlLanguage, locales } from "@/lib/i18n/locales";
import { usePathname } from "@/lib/navigation/navigation";

export function LocaleSwitcher(): ReactNode {
	const currentLocale = useLocale();
	const t = useTranslations("LocaleSwitcher");
	const pathname = usePathname();

	return (
		<div className="flex gap-2 font-display text-sm">
			{locales.map((locale) => {
				const language = getIntlLanguage(locale);

				if (locale === currentLocale) {
					return (
						<span key={locale} className="pointer-events-none text-primary">
							<span aria-hidden={true}>{language.toUpperCase()}</span>
							<span className="sr-only">{t("current-locale")}</span>
						</span>
					);
				}

				return (
					<Link
						key={locale}
						href={pathname}
						className="underline underline-offset-4"
						locale={locale}
					>
						<span aria-hidden={true}>{language.toUpperCase()}</span>
						<span className="sr-only">{t("switch-locale", { locale: language })}</span>
					</Link>
				);
			})}
		</div>
	);
}
