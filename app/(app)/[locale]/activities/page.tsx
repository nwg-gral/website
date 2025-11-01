import { groupByToMap, isNonEmptyArray, isNonEmptyString } from "@acdh-oeaw/lib";
import type { MDXContent } from "mdx/types";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { SectionParagraph } from "@/components/section-paragraph";
import { SectionTitle } from "@/components/section-title";
import { createClient } from "@/lib/content/create-client";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ActivitiesPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ActivitiesPage(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.activitiesPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<Main>
			<Container>
				<PageTitle>{title}</PageTitle>

				<div className="prose space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<div className="grid gap-16">
					<EventsSection section={page.events} />

					{/* <hr className="border-secondary" /> */}

					<PublicationsSection section={page.publications} />
				</div>
			</Container>
		</Main>
	);
}

interface EventsSectionProps {
	section: {
		text: MDXContent;
		title: string;
	};
}

async function EventsSection(props: Readonly<EventsSectionProps>): Promise<ReactNode> {
	const { section } = props;

	const t = await getTranslations("ActivitiesPage");

	const title = section.title;
	const Content = section.text;

	const client = await createClient();

	const events = await client.collections.events.all();

	if (events.length === 0) return null;

	const eventsGroupedByYear = groupByToMap(events, (event) => {
		return new Date(event.metadata.date).getUTCFullYear();
	});
	const sorted = Array.from(eventsGroupedByYear.keys()).sort((a, z) => {
		return z - a;
	});

	return (
		<section className="grid gap-4">
			{/* <SectionTitle>{title}</SectionTitle> */}
			<h2 className="sr-only">{title}</h2>

			<div className="prose space-y-6">
				<Content components={{ p: Paragraph }} />
			</div>

			{sorted.map((year) => {
				const events = eventsGroupedByYear.get(year) ?? [];

				return (
					<section key={year} className="grid gap-6 pb-6">
						<h3 className="border-b border-primary pb-1 font-display text-[1.375rem] leading-[1.625rem] text-primary">
							{year}
						</h3>
						<ul className="grid gap-6 sm:grid-cols-2" role="list">
							{events.map((event) => {
								const Content = event.metadata.summary;

								const href = `/events/${event.id}`;

								return (
									<li key={event.id}>
										<article className="grid gap-2" id={event.id}>
											<h4>
												<Link href={href}>
													<span className="border-b border-primary font-display transition hover:text-primary">
														{event.metadata.title}
													</span>
												</Link>
											</h4>
											<div className="prose">
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
	section: {
		text: MDXContent;
		title: string;
	};
}

async function PublicationsSection(props: Readonly<PublicationsSectionProps>): Promise<ReactNode> {
	const { section } = props;

	const t = await getTranslations("ActivitiesPage");

	const title = section.title;
	const Content = section.text;

	const client = await createClient();

	const publications = await client.collections.publications.all();

	if (publications.length === 0) return null;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>

			<div className="prose space-y-6">
				<Content components={{ p: SectionParagraph }} />
			</div>

			<ul className="grid gap-6 sm:grid-cols-2" role="list">
				{publications.map((publication) => {
					const Content = publication.content;

					return (
						<li key={publication.id}>
							<article className="grid gap-2" id={publication.id}>
								<h4>
									{publication.metadata.url != null ? (
										<a href={publication.metadata.url}>
											<span className="border-b border-primary font-display transition hover:text-primary">
												{publication.metadata.title}
											</span>
										</a>
									) : (
										<span className="border-b border-primary font-display transition hover:text-primary">
											{publication.metadata.title}
										</span>
									)}
								</h4>
								<div className="prose">
									<Content components={{ p: ActivityParagraph }} />
								</div>
								{isNonEmptyArray(publication.metadata.attachments) ? (
									<div>
										{publication.metadata.attachments.map((attachment, index) => {
											return (
												<a
													// eslint-disable-next-line @eslint-react/no-array-index-key
													key={index}
													className="block py-1 font-display text-sm text-secondary underline underline-offset-2 transition hover:text-primary"
													href={attachment.file}
												>
													{attachment.label}
												</a>
											);
										})}
									</div>
								) : null}
								{isNonEmptyString(publication.metadata.url) ? (
									<a
										className="block py-1 font-display text-sm text-secondary underline underline-offset-2 transition hover:text-primary"
										href={publication.metadata.url}
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

function ActivityParagraph(props: Readonly<ActivityParagraphProps>): ReactNode {
	const { children } = props;

	return (
		<p className="font-body text-[1rem] leading-[1.375rem] tracking-[0.75px] text-secondary sm:text-[1.0625rem] sm:leading-[1.4375rem]">
			{children}
		</p>
	);
}
