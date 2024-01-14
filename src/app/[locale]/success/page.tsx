import { type Metadata } from "next";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";

import { Container } from "@/components/container";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Link } from "@/lib/navigation";
import type { Locale } from "~/config/i18n.config";

interface SuccessPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("SuccessPage");

	const metadata: Metadata = {
		title: t("meta.title"),
		robots: { index: false },
	};

	return metadata;
}

export default async function SuccessPage(props: SuccessPageProps): Promise<JSX.Element> {
	const { params } = props;

	const { locale } = params;
	setRequestLocale(locale);

	const t = await getTranslations("SuccessPage");

	return (
		<MainContent>
			<Container size="sm">
				<PageTitle>{t("thanks-for-your-message")}</PageTitle>
				<div>
					<Link
						className="font-display underline underline-offset-2 transition hover:text-primary"
						href={{ pathname: "/" }}
					>
						{t("go-back-to-home-page")}
					</Link>
				</div>
			</Container>
		</MainContent>
	);
}
