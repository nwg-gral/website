import { allContactPages } from "contentlayer/generated";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { Container } from "@/components/container";
import { ImprintSection } from "@/components/imprint-section";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { getPage } from "@/lib/content";
import { type Locale } from "~/config/i18n.config";

interface ContactPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ContactPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ContactPage(_props: ContactPageProps): Promise<JSX.Element> {
	const locale = useLocale() as Locale;
	const t = await getTranslations("ContactPage");

	const page = getPage(allContactPages, locale);

	const title = page.title;
	const Content = page.body?.code != null ? getMDXComponent(page.body.code) : Fragment;

	return (
		<MainContent>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<form action="/api/contact" className="grid gap-8 font-display" method="POST">
					<div className="grid gap-8 sm:grid-cols-2">
						<label className="grid gap-2">
							<span className="justify-self-start border-b border-primary p-0.5 font-display text-secondary">
								{t("subject")}:
							</span>
							<input className="border border-secondary px-4 py-3" name="subject" />
						</label>
						<label className="grid gap-2">
							<span className="justify-self-start border-b border-primary p-0.5 font-display text-secondary">
								{t("email")}:
							</span>
							<input className="border border-secondary px-4 py-3" name="email" type="email" />
						</label>
					</div>
					<label className="grid gap-2">
						<span className="justify-self-start border-b border-primary p-0.5 font-display text-secondary">
							{t("message")}:
						</span>
						<textarea className="border border-primary px-4 py-3" name="message" rows={8} />
					</label>
					<input name="bot" type="hidden" />
					<div className="flex justify-end">
						<button
							className="bg-secondary px-6 py-3 font-display text-white transition hover:bg-primary"
							type="submit"
						>
							{t("submit")}
						</button>
					</div>
				</form>

				<ImprintSection />
			</Container>
		</MainContent>
	);
}
