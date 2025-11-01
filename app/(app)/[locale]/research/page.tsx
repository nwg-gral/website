import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { SectionHeading } from "@/components/section-heading";
import { SectionParagraph } from "@/components/section-paragraph";
import { SectionTitle } from "@/components/section-title";
import { createClient } from "@/lib/content/create-client";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ResearchPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ResearchPage(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.researchPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<Main>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="prose space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				{page.cards.map((card, index) => {
					const title = card.title;
					const Content = card.text;

					return (
						// eslint-disable-next-line @eslint-react/no-array-index-key
						<section key={index} className="grid gap-6 border border-secondary p-6 sm:p-8">
							<SectionTitle variant="primary">{title}</SectionTitle>

							<div className="prose space-y-2 [&>h3:not(:first-child)]:pt-4">
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
		</Main>
	);
}
