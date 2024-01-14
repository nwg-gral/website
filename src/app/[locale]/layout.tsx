import "tailwindcss/tailwind.css";
import "@/styles/index.css";

import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import { type ReactNode } from "react";
import { jsonLdScriptProps } from "react-schemaorg";

import { PageFooter } from "@/app/[locale]/page-footer";
import { PageHeader } from "@/app/[locale]/page-header";
import { SkipLink } from "@/app/[locale]/skip-link";
import { id } from "@/components/main-content";
import { cn } from "@/lib/cn";
import * as fonts from "@/lib/fonts";
import { baseUrl } from "~/config/app.config";
import { type Locale, locales } from "~/config/i18n.config";

interface RootLayoutProps {
	children: ReactNode;
	params: {
		locale: Locale;
	};
}

export function generateStaticParams(): Array<RootLayoutProps["params"]> {
	return locales.map((locale) => {
		return { locale };
	});
}

export async function generateMetadata(props: RootLayoutProps): Promise<Metadata> {
	const { locale } = props.params;
	const t = await getTranslations("RootLayout");

	const metadata: Metadata = {
		title: {
			template: ["%s", t("meta.title")].join(" | "),
			default: t("meta.title"),
		},
		description: t("meta.description"),
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: "./",
		},
		openGraph: {
			type: "website",
			title: t("meta.title"),
			description: t("meta.description"),
			siteName: t("meta.title"),
			locale,
			url: "./",
		},
		twitter: {
			card: "summary_large_image",
		},
		verification: {
			google: "-DQUJYM86am02kuON8bpCqod_gOABsPv-BPO8E7Ob3o",
		},
	};

	return metadata;
}

export default function RootLayout(props: RootLayoutProps): JSX.Element {
	const { children, params } = props;

	const { locale } = params;
	setRequestLocale(locale);

	const t = useTranslations("RootLayout");

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
				<script
					{...jsonLdScriptProps({
						"@context": "https://schema.org",
						"@type": "WebSite",
						name: t("meta.title"),
						description: t("meta.description"),
					})}
				/>

				<SkipLink targetId={id}>{t("skip-to-main-content")}</SkipLink>

				<PageHeader />
				{children}
				<PageFooter />
			</body>
		</html>
	);
}
