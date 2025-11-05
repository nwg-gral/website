import { isNonEmptyArray, isNonEmptyString } from "@acdh-oeaw/lib";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { createClient } from "@/lib/content/create-client";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("PublicationsPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function PublicationsPage(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.publicationsPage.get();

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
					<PublicationsSection />
				</div>
			</Container>
		</Main>
	);
}

async function PublicationsSection(): Promise<ReactNode> {
	const t = await getTranslations("PublicationsPage");

	const client = await createClient();

	const publications = await client.collections.publications.all();

	if (publications.length === 0) return null;

	return (
		<section className="grid gap-4">
			<ul className="grid gap-6 md:grid-cols-2" role="list">
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
								<div className="prose prose-sm">
									<Content />
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
