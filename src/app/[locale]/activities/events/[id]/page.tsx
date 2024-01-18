import { isNonEmptyString } from "@stefanprobst/lib";
import { allEvents } from "contentlayer/generated";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import { Fragment } from "react";

import { Container } from "@/components/container";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { type Locale } from "~/config/i18n.config";

interface EventPageProps {
	params: {
		id: string;
		locale: Locale;
	};
}

export function generateMetadata(props: EventPageProps): Metadata {
	const { id: _id, locale } = props.params;

	const id = decodeURIComponent(_id);
	const event = allEvents.find((e) => {
		return e.locale === locale && e.id === id;
	});

	if (event == null) notFound();

	const metadata: Metadata = {
		title: event.title,
	};

	return metadata;
}

export default async function EventPage(props: EventPageProps): Promise<JSX.Element> {
	const { params } = props;

	const { id: _id, locale } = params;
	setRequestLocale(locale);

	const t = await getTranslations("EventPage");

	const id = decodeURIComponent(_id);
	const event = allEvents.find((e) => {
		return e.locale === locale && e.id === id;
	});

	if (event == null) notFound();

	const title = event.title;
	const code = event.body.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	return (
		<MainContent>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				{isNonEmptyString(event.url) ? (
					<a
						className="block py-1 font-display text-sm text-secondary underline underline-offset-2 transition hover:text-primary"
						href={event.url}
					>
						{t("read-more")}
					</a>
				) : null}
			</Container>
		</MainContent>
	);
}
