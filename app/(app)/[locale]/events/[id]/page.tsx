import { isNonEmptyString } from "@acdh-oeaw/lib";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { ParagraphNoDropCaps } from "@/components/paragraph";
import { createClient } from "@/lib/content/create-client";

interface EventPageProps extends PageProps<"/[locale]/events/[id]"> {}

export async function generateMetadata(props: EventPageProps): Promise<Metadata> {
	const { id: _id } = await props.params;
	const id = decodeURIComponent(_id);

	const client = await createClient();

	const event = await client.collections.events.get(id);

	if (event == null) notFound();

	const metadata: Metadata = {
		title: event.metadata.title,
	};

	return metadata;
}

export default async function EventPage(props: Readonly<EventPageProps>): Promise<ReactNode> {
	const { params } = props;

	const { id: _id } = await params;
	const id = decodeURIComponent(_id);

	const client = await createClient();

	const t = await getTranslations("EventPage");

	const event = await client.collections.events.get(id);

	if (event == null) notFound();

	const title = event.metadata.title;
	const Content = event.content;

	return (
		<Main>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="prose space-y-6">
					<Content components={{ p: ParagraphNoDropCaps }} />
				</div>

				{isNonEmptyString(event.metadata.url) ? (
					<a
						className="block py-1 font-display text-sm text-secondary underline underline-offset-2 transition hover:text-primary"
						href={event.metadata.url}
					>
						{t("read-more")}
					</a>
				) : null}
			</Container>
		</Main>
	);
}
