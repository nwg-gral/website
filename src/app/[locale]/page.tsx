import { allHomePages } from "contentlayer/generated";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { Container } from "@/components/container";
import { FeaturedContent } from "@/components/featured-content";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { getPage } from "@/lib/content";
import { type Locale } from "~/config/i18n.config";

interface IndexPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const _t = await getTranslations("IndexPage");

	const metadata: Metadata = {
		/**
		 * Fall back to default root layout title.
		 */
		// title: t("meta.title"),
	};

	return metadata;
}

export default async function IndexPage(_props: IndexPageProps): Promise<JSX.Element> {
	const locale = useLocale() as Locale;
	const _t = await getTranslations("IndexPage");

	const page = getPage(allHomePages, locale);

	const title = page.title;
	const Content = page.body?.code != null ? getMDXComponent(page.body.code) : Fragment;

	return (
		<MainContent>
			<Container>
				<div className="grid gap-8 sm:grid-cols-[3fr_1fr]">
					<div className="grid gap-8">
						<PageTitle>{title}</PageTitle>

						<div className="space-y-6">
							<Content components={{ p: Paragraph }} />
						</div>
					</div>

					<FeaturedContent />
				</div>
			</Container>
		</MainContent>
	);
}
