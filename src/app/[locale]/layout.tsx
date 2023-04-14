import "@/styles/index.css";
import "tailwindcss/tailwind.css";

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { type ReactNode } from "react";

import { PageFooter } from "@/app/[locale]/page-footer";
import { PageHeader } from "@/app/[locale]/page-header";
import { SkipLink } from "@/app/[locale]/skip-link";
import { id } from "@/components/main-content";
import { cn } from "@/lib/cn";
import * as fonts from "@/lib/fonts";
import { baseUrl } from "~/config/app.config";
// import { baseUrl } from "~/config/app.config";
import { type Locale } from "~/config/i18n.config";

interface RootLayoutProps {
	children: ReactNode;
	params: {
		locale: Locale;
	};
}

// TODO: requries `next/intl` support
// export function generateStaticParams(): Array<RootLayoutProps["params"]> {
// 	return locales.map((locale) => {
// 		return { locale };
// 	});
// }

export async function generateMetadata(_params: RootLayoutProps): Promise<Metadata> {
	const locale = getLocale();
	const t = await getTranslations("RootLayout");

	const metadata: Metadata = {
		title: {
			template: ["%s", t("meta.title")].join(" | "),
			default: t("meta.title"),
		},
		description: t("meta.description"),
		metadataBase: new URL(baseUrl),
		openGraph: {
			type: "website",
			title: t("meta.title"),
			description: t("meta.description"),
			siteName: t("meta.title"),
			locale,
		},
		twitter: {
			card: "summary_large_image",
		},
	};

	return metadata;
}

export default function RootLayout(props: RootLayoutProps): JSX.Element {
	const { children, params } = props;

	const locale = useLocale();
	const t = useTranslations("RootLayout");

	if (params.locale !== locale) {
		notFound();
	}

	return (
		<html
			className={cn(
				"overflow-hidden bg-white font-body text-base text-secondary antialiased",
				fonts.body.variable,
				fonts.display.variable,
			)}
			lang={locale}
		>
			<body className="grid grid-rows-[auto_1fr_auto] overflow-auto border-4 border-primary">
				<SkipLink targetId={id}>{t("skip-to-main-content")}</SkipLink>

				<PageHeader />
				{children}
				<PageFooter />
			</body>
		</html>
	);
}
