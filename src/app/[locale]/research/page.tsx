import { isNonEmptyString } from "@stefanprobst/lib";
import { allResearchPages } from "contentlayer/generated";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
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

export default async function ResearchPage(props: ResearchPageProps): Promise<JSX.Element> {
	const { params } = props;

	const { locale } = params;
	setRequestLocale(locale);

	const _t = await getTranslations("ResearchPage");

	const page = getPage(allResearchPages, locale);

	const title = page.title;
	const code = page.body?.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	return (
		<MainContent>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				{page.cards?.map((card) => {
					const title = card.title;
					const code = card.text?.code;
					const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

					return (
						<section key={card._id} className="grid gap-6 border border-secondary p-6 sm:p-8">
							<SectionTitle variant="primary">{title}</SectionTitle>

							<div className="space-y-2 [&>h3:not(:first-child)]:pt-4">
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
