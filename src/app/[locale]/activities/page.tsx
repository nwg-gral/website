import { groupBy, isNonEmptyString } from "@stefanprobst/lib";
import {
	allActivitiesPages,
	allEvents,
	allPublications,
	type Section,
} from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import { Fragment, type ReactNode } from "react";

import { Container } from "@/components/container";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { SectionParagraph } from "@/components/section-paragraph";
import { SectionTitle } from "@/components/section-title";
import { getPage } from "@/lib/content";
import { Link } from "@/lib/navigation";
import { type Locale } from "~/config/i18n.config";

interface ActivitiesPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ActivitiesPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ActivitiesPage(props: ActivitiesPageProps): Promise<JSX.Element> {
	const { params } = props;

	const { locale } = params;
	setRequestLocale(locale);

	const _t = await getTranslations("ActivitiesPage");

	const page = getPage(allActivitiesPages, locale);

	const title = page.title;
	const code = page.body?.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	return (
		<MainContent>
			<Container>
				<PageTitle>{title}</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<div className="grid gap-16">
					<EventsSection section={page.events} />

					{/* <hr className="border-secondary" /> */}

					<PublicationsSection section={page.publications} />
				</div>
			</Container>
		</MainContent>
	);
}

interface EventsSectionProps {
	section: Section;
}

function EventsSection(props: EventsSectionProps): JSX.Element | null {
	const { section } = props;

	const locale = useLocale() as Locale;
	const t = useTranslations("ActivitiesPage");

	const title = section.title;
	const code = section.text?.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	const events = allEvents
		.filter((event) => {
			return event.locale === locale;
		})
		.sort((a, z) => {
			return compareDesc(new Date(a.date), new Date(z.date));
		});

	if (events.length === 0) return null;

	const eventsGroupedByYear = groupBy(events, (event) => {
		return new Date(event.date).getUTCFullYear();
	});

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>

			<div className="space-y-6">
				<Content components={{ p: Paragraph }} />
			</div>

			{Object.entries(eventsGroupedByYear).map(([year, events]) => {
				return (
					<section key={year} className="grid gap-6 pb-6">
						<h3 className="border-b border-primary font-display">{year}</h3>
						<ul className="grid gap-6 sm:grid-cols-2" role="list">
							{events.map((event) => {
								const code = event.summary.code;
								const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

								const href = `/activities/events/${event.id}`;

								return (
									<li key={event.id}>
										<article className="grid gap-2" id={event.id}>
											<h4>
												<Link href={href}>
													<span className="border-b border-primary font-display transition hover:text-primary">
														{event.title}
													</span>
												</Link>
											</h4>
											<div>
												<Content components={{ p: ActivityParagraph }} />
											</div>
											<Link
												className="block py-1 font-display text-sm text-secondary underline underline-offset-2 transition hover:text-primary"
												href={href}
											>
												{t("read-more")}
											</Link>
										</article>
									</li>
								);
							})}
						</ul>
					</section>
				);
			})}
		</section>
	);
}

interface PublicationsSectionProps {
	section: Section;
}

function PublicationsSection(props: PublicationsSectionProps): JSX.Element | null {
	const { section } = props;

	const locale = useLocale() as Locale;
	const t = useTranslations("ActivitiesPage");

	const title = section.title;
	const code = section.text?.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	const publications = allPublications
		.filter((publication) => {
			return publication.locale === locale;
		})
		.sort((a, z) => {
			return compareDesc(new Date(a.date), new Date(z.date));
		});

	if (publications.length === 0) return null;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>

			<div className="space-y-6">
				<Content components={{ p: SectionParagraph }} />
			</div>

			<ul className="grid gap-6 sm:grid-cols-2" role="list">
				{publications.map((publication) => {
					const code = publication.body.code;
					const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

					return (
						<li key={publication.id}>
							<article className="grid gap-2" id={publication.id}>
								<h4>
									<a href={publication.url}>
										<span className="border-b border-primary font-display transition hover:text-primary">
											{publication.title}
										</span>
									</a>
								</h4>
								<div>
									<Content components={{ p: ActivityParagraph }} />
								</div>
								{isNonEmptyString(publication.url) ? (
									<a
										className="block py-1 font-display text-sm text-secondary underline underline-offset-2 transition hover:text-primary"
										href={publication.url}
									>
										{t("read-more")}
									</a>
								) : null}
							</article>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

interface ActivityParagraphProps {
	children?: ReactNode;
}

function ActivityParagraph(props: ActivityParagraphProps): JSX.Element {
	const { children } = props;

	return (
		<p className="font-body text-[1rem] leading-[1.375rem] tracking-[0.75px] text-secondary sm:text-[1.0625rem] sm:leading-[1.4375rem]">
			{children}
		</p>
	);
}
