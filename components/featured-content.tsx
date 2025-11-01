import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Link } from "@/components/link";
import type { Event } from "@/lib/content/client/events";
import type { Publication } from "@/lib/content/client/publications";
import { createClient } from "@/lib/content/create-client";
import { createHref } from "@/lib/navigation/create-href";

export function FeaturedContent(): ReactNode {
	const t = useTranslations("FeaturedContent");

	const title = t("title");

	return (
		<aside className="grid content-start gap-4">
			<div>
				<h2 className="border-y border-secondary py-2 text-center font-display text-sm font-medium tracking-[0.375em] text-secondary uppercase">
					{title}
				</h2>
				<div aria-hidden={true} className="flex justify-center gap-2 text-sm text-primary">
					<span>↓</span>
					<span>↓</span>
					<span>↓</span>
				</div>
			</div>
			<FeaturedItems />
		</aside>
	);
}

async function FeaturedItems(): Promise<ReactNode> {
	const t = await getTranslations("FeaturedItems");

	const client = await createClient();

	const page = await client.singletons.indexPage.get();

	const featured: Array<Publication | Event> = [];

	for (const item of page.metadata.featured) {
		switch (item.discriminant) {
			case "events": {
				const event = await client.collections.events.get(item.value);
				if (event != null) {
					featured.push(event);
				}
				break;
			}

			case "publications": {
				const publication = await client.collections.publications.get(item.value);
				if (publication != null) {
					featured.push(publication);
				}
				break;
			}
		}
	}

	if (featured.length === 0) {
		return <span>{t("empty")}.</span>;
	}

	return (
		<ul className="grid gap-4" role="list">
			{featured.map((item) => {
				const Content = "summary" in item.metadata ? item.metadata.summary : item.content;

				return (
					<li key={item.id}>
						<article className="grid gap-0.5">
							<h3>
								<Link
									className="border-b border-primary font-display text-sm text-secondary transition hover:text-primary"
									href={createHref({ pathname: "/activities", hash: item.id })}
								>
									{item.metadata.title}
								</Link>
							</h3>
							<div className="prose line-clamp-3">
								<Content />
							</div>
						</article>
					</li>
				);
			})}
		</ul>
	);
}
