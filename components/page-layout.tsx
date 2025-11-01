import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { id } from "@/components/main";
import { PageFooter } from "@/components/page-footer";
import { PageHeader } from "@/components/page-header";
import { SkipLink } from "@/components/skip-link";

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout(props: Readonly<PageLayoutProps>): ReactNode {
	const { children } = props;

	const t = useTranslations("PageLayout");

	return (
		<div className="grid min-h-full grid-rows-[auto_1fr_auto] overflow-auto border-4 border-primary">
			<SkipLink targetId={id}>{t("skip-to-main-content")}</SkipLink>

			<PageHeader />
			{children}
			<PageFooter />
		</div>
	);
}
