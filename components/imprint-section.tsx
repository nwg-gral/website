import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SectionTitle } from "@/components/section-title";
import { createClient } from "@/lib/content/create-client";
import { getIntlLanguage } from "@/lib/i18n/locales";

export async function ImprintSection(): Promise<ReactNode> {
	const locale = await getLocale();
	const client = await createClient(getIntlLanguage(locale));

	const page = await client.singletons.imprintPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>
			<div className="prose prose-sm">
				<Content />
			</div>
		</section>
	);
}
