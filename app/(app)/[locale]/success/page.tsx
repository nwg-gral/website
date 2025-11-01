import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("SuccessPage");

	const metadata: Metadata = {
		title: t("meta.title"),
		robots: { index: false },
	};

	return metadata;
}

export default async function SuccessPage(): Promise<ReactNode> {
	const t = await getTranslations("SuccessPage");

	return (
		<Main>
			<Container size="sm">
				<PageTitle>{t("thanks-for-your-message")}</PageTitle>
				<div>
					<Link
						className="font-display underline underline-offset-2 transition hover:text-primary"
						href="/"
					>
						{t("go-back-to-home-page")}
					</Link>
				</div>
			</Container>
		</Main>
	);
}
