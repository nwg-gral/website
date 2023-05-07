import { allResearchPages } from "contentlayer/generated";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { Container } from "@/components/container";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { SectionHeading } from "@/components/section-heading";
import { SectionParagraph } from "@/components/section-paragraph";
import { SectionTitle } from "@/components/section-title";
import { getPage } from "@/lib/content";
import { type Locale } from "~/config/i18n.config";

interface ResearchPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ResearchPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ResearchPage(_props: ResearchPageProps): Promise<JSX.Element> {
	const locale = useLocale() as Locale;
	const _t = await getTranslations("ResearchPage");

	const page = getPage(allResearchPages, locale);

	const title = page.title;
	const Content = page.body?.code != null ? getMDXComponent(page.body.code) : Fragment;

	return (
		<MainContent>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				{page.cards?.map((card) => {
					const title = card.title;
					const Content = card.text?.code != null ? getMDXComponent(card.text.code) : Fragment;

					return (
						<section key={card._id} className="grid gap-6 border border-secondary p-6 sm:p-8">
							<SectionTitle variant="primary">{title}</SectionTitle>

							<div className="space-y-6">
								<Content
									components={{
										h3: SectionHeading,
										p: SectionParagraph,
									}}
								/>
							</div>
						</section>
					);
				})}
			</Container>
		</MainContent>
	);
}
