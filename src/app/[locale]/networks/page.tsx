import {
	allCooperationPartners,
	allInternationalAdvisoryBoardMembers,
	allNetworkPartners,
	allNetworksPages,
	type CooperationPartner,
	type InternationalAdvisoryBoardMember,
	type NetworkPartner,
} from "contentlayer/generated";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type ComponentType, Fragment, type ReactNode } from "react";

import { Container } from "@/components/container";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { SectionTitle } from "@/components/section-title";
import { WebsiteLink } from "@/components/website-link";
import { getPage } from "@/lib/content";
import { type Locale } from "~/config/i18n.config";

interface NetworksPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("NetworksPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function NetworksPage(_props: NetworksPageProps): Promise<JSX.Element> {
	const locale = useLocale() as Locale;
	const _t = await getTranslations("NetworksPage");

	const page = getPage(allNetworksPages, locale);

	const title = page.title;
	const Content = page.body?.code != null ? getMDXComponent(page.body.code) : Fragment;

	return (
		<MainContent>
			<Container>
				<PageTitle>{title}</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<div className="grid gap-16">
					<PartnerSection
						content={
							page.cooperationPartners.text?.code != null
								? getMDXComponent(page.cooperationPartners.text.code)
								: Fragment
						}
						partners={allCooperationPartners.filter((partner) => {
							return partner.locale === locale;
						})}
						title={page.cooperationPartners.title}
					/>

					<PartnerSection
						content={
							page.internationalAdvisoryBoard.text?.code != null
								? getMDXComponent(page.internationalAdvisoryBoard.text.code)
								: Fragment
						}
						partners={allInternationalAdvisoryBoardMembers.filter((partner) => {
							return partner.locale === locale;
						})}
						title={page.internationalAdvisoryBoard.title}
					/>

					<PartnerSection
						content={
							page.networks.text?.code != null ? getMDXComponent(page.networks.text.code) : Fragment
						}
						partners={allNetworkPartners.filter((partner) => {
							return partner.locale === locale;
						})}
						title={page.networks.title}
					/>
				</div>
			</Container>
		</MainContent>
	);
}

interface PartnerSectionProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content: ComponentType<any>;
	partners: Array<CooperationPartner | InternationalAdvisoryBoardMember | NetworkPartner>;
	title: ReactNode;
}

function PartnerSection(props: PartnerSectionProps): JSX.Element | null {
	const { content: Content, partners, title } = props;

	if (partners.length === 0) return null;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>

			<div className="space-y-6">
				<Content components={{ p: Paragraph }} />
			</div>

			<ul className="grid gap-12 sm:grid-cols-2" role="list">
				{partners.map((partner) => {
					const Content = getMDXComponent(partner.body.code);

					return (
						<Fragment key={partner.id}>
							<li className="grid content-between gap-6">
								<article className="grid gap-4">
									<h2 className="font-display text-2xl text-primary">{partner.name}</h2>
									<div className="flex gap-12">
										<WebsiteLink href={partner.website} name={partner.name} />
										<div className="text-lg">
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
