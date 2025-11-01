import { createUrl } from "@acdh-oeaw/lib";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { jsonLdScriptProps } from "react-schemaorg";
import type { WebSite, WithContext } from "schema-dts";

import { DocumentBody } from "@/app/_components/document-body";
import { HtmlDocument } from "@/app/_components/html-document";
import { Providers } from "@/app/_components/providers";
import { PageLayout } from "@/components/page-layout";
import { env } from "@/config/env.config";
import { isValidLocale } from "@/lib/i18n/locales";
import { getMetadata } from "@/lib/i18n/metadata";
import { routing } from "@/lib/i18n/routing";

export { viewport } from "@/app/_lib/viewport.config";

interface LocaleLayoutProps extends LayoutProps<"/[locale]"> {}

export function generateStaticParams(): Array<Awaited<LocaleLayoutProps["params"]>> {
	return routing.locales.map((locale) => {
		return { locale };
	});
}

export async function generateMetadata(): Promise<Promise<Metadata>> {
	const locale = await getLocale();
	const meta = await getMetadata();

	const metadata: Metadata = {
		metadataBase: createUrl({ baseUrl: env.NEXT_PUBLIC_APP_BASE_URL }),
		alternates: {
			canonical: "./",
		},
		title: {
			default: meta.title,
			template: ["%s", meta.title].join(" | "),
		},
		description: meta.description,
		openGraph: {
			title: meta.title,
			description: meta.description,
			url: "./",
			siteName: meta.title,
			locale,
			type: "website",
		},
		// twitter: {
		// 	card: "summary_large_image",
		// 	creator: meta.social.twitter,
		// 	site: meta.social.twitter,
		// },
		verification: {
			google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
		},
	};

	return metadata;
}

export default async function LocaleLayout(props: Readonly<LocaleLayoutProps>): Promise<ReactNode> {
	const { children, params } = props;

	// TODO: Replace with whatever succeeds `dynamicParams = false`.
	if (!isValidLocale((await params).locale)) {
		notFound();
	}

	const locale = await getLocale();
	const meta = await getMetadata();

	const schemaOrgMetadata: WithContext<WebSite> = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: meta.title,
		description: meta.description,
	};

	return (
		<HtmlDocument locale={locale}>
			<DocumentBody>
				<script {...jsonLdScriptProps(schemaOrgMetadata)} />

				<Providers locale={locale}>
					<PageLayout>{children}</PageLayout>
				</Providers>
			</DocumentBody>
		</HtmlDocument>
	);
}
