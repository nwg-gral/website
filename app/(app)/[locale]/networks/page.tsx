import type { MDXContent } from "mdx/types";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Fragment, type ReactNode } from "react";

import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { SectionTitle } from "@/components/section-title";
import { WebsiteLink } from "@/components/website-link";
import { createClient } from "@/lib/content/create-client";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("NetworksPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function NetworksPage(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.networksPage.get();

	const { title, cooperationPartners, internationalAdvisoryBoard, networks } = page.metadata;
	const Content = page.content;

	return (
		<Main>
			<Container>
				<PageTitle>{title}</PageTitle>

				<div className="prose space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<div className="grid gap-16">
					<PartnerSection
						content={cooperationPartners.text}
						partners={cooperationPartners.items}
						title={cooperationPartners.title}
					/>

					<PartnerSection
						content={internationalAdvisoryBoard.text}
						partners={internationalAdvisoryBoard.items}
						title={internationalAdvisoryBoard.title}
					/>

					<PartnerSection
						content={networks.text}
						partners={networks.items}
						title={networks.title}
					/>
				</div>
			</Container>
		</Main>
	);
}

interface PartnerSectionProps {
	content: MDXContent;
	partners: Array<{
		content: MDXContent;
		name: string;
		website: string;
	}>;
	title: ReactNode;
}

function PartnerSection(props: Readonly<PartnerSectionProps>): ReactNode {
	const { content: Content, partners, title } = props;

	if (partners.length === 0) return null;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>

			<div className="prose space-y-6">
				<Content components={{ p: Paragraph }} />
			</div>

			<ul className="grid gap-12 sm:grid-cols-2" role="list">
				{partners.map((partner, index) => {
					const Content = partner.content;

					return (
						// eslint-disable-next-line @eslint-react/no-array-index-key
						<Fragment key={index}>
							<li className="grid content-between gap-6">
								<article className="grid gap-4">
									<h2 className="font-display text-2xl text-primary">{partner.name}</h2>
									<div className="flex gap-12">
										<WebsiteLink href={partner.website} name={partner.name} />
										<div className="prose text-lg">
											<Content />
										</div>
									</div>
								</article>
								<div className="h-px bg-secondary" />
							</li>
						</Fragment>
					);
				})}
			</ul>
		</section>
	);
}
