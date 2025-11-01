import type { ReactNode } from "react";

import { SectionTitle } from "@/components/section-title";
import { createClient } from "@/lib/content/create-client";

export async function ImprintSection(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.imprintPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>
			<div className="prose">
				<Content />
			</div>
		</section>
	);
}
