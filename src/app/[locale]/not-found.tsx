import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("NotFoundPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function NotFoundPage(): Promise<JSX.Element> {
	const t = await getTranslations("NotFoundPage");

	return (
		<MainContent>
			<PageTitle>{t("page-not-found")}</PageTitle>
		</MainContent>
	);
}
