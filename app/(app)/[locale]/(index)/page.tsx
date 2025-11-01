import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { FeaturedContent } from "@/components/featured-content";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { createClient } from "@/lib/content/create-client";

export default async function IndexPage(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.indexPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	return (
		<Main>
			<Container>
				<div className="grid gap-8 sm:grid-cols-[3fr_1fr]">
					<div className="grid gap-8 sm:gap-y-16">
						<PageTitle>{title}</PageTitle>

						<div className="drop-caps prose space-y-6">
							<Content />
						</div>
					</div>

					<FeaturedContent />
				</div>
			</Container>
		</Main>
	);
}
