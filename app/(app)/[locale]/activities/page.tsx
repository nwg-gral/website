import { groupByToMap } from "@acdh-oeaw/lib";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
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

				<div className="drop-caps prose space-y-6">
					<Content />
				</div>

				<div className="grid gap-16">
					<EventsSection />
				</div>
			</Container>
		</Main>
	);
}

async function EventsSection(): Promise<ReactNode> {
	const t = await getTranslations("ActivitiesPage");

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
											<div className="prose prose-sm">
												<Content />
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
