import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { ImprintSection } from "@/components/imprint-section";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { createClient } from "@/lib/content/create-client";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("ContactPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ContactPage(): Promise<ReactNode> {
	const t = await getTranslations("ContactPage");

	const client = await createClient();

	const page = await client.singletons.contactPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<Main>
			<Container size="sm">
				<PageTitle>{title}</PageTitle>

				<div className="prose space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<form className="grid gap-8 font-display" data-netlify="true" method="POST" name="contact">
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
		</Main>
	);
}
