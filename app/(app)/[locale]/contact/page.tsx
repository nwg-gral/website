import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { ContactForm } from "@/app/(app)/[locale]/contact/_components/contact-form";
import { Container } from "@/components/container";
import { ImprintSection } from "@/components/imprint-section";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { createClient } from "@/lib/content/create-client";
import { getIntlLanguage } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ContactPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ContactPage(): Promise<ReactNode> {
	const locale = await getLocale();
	const client = await createClient(getIntlLanguage(locale));

	const page = await client.singletons.contactPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<Main>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="prose space-y-6">
					<Content />
				</div>

				<ContactForm />

				<ImprintSection />
			</Container>
		</Main>
	);
}
