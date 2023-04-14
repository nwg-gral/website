import { type Metadata } from "next";
import { Link } from "next-intl";
import { getTranslations } from "next-intl/server";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("SuccessPage");

	const metadata: Metadata = {
		title: t("meta.title"),
		robots: { index: false, follow: false },
	};

	return metadata;
}

export default async function SuccessPage(): Promise<JSX.Element> {
	const t = await getTranslations("SuccessPage");

	return (
		<MainContent>
			<PageTitle>{t("thanks-for-your-message")}</PageTitle>
			<div>
				<Link href={{ pathname: "/" }}>{t("go-back-to-home-page")}</Link>
			</div>
		</MainContent>
	);
}
