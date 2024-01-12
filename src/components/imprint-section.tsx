import { isNonEmptyString } from "@stefanprobst/lib";
import { allImprintPages } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useLocale } from "next-intl";
import { Fragment } from "react";

import { SectionTitle } from "@/components/section-title";
import { getPage } from "@/lib/content";
import { type Locale } from "~/config/i18n.config";

export function ImprintSection(): JSX.Element {
	const locale = useLocale() as Locale;

	const page = getPage(allImprintPages, locale);

	const title = page.title;
	const code = page.body?.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	return (
		<section className="grid gap-4">
			<SectionTitle>{title}</SectionTitle>
			<div>
				<Content />
			</div>
		</section>
	);
}
