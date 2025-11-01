import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import icon from "@/public/assets/images/icon-website.svg";

interface WebsiteLinkProps {
	href: string;
	name: string;
}

export function WebsiteLink(props: Readonly<WebsiteLinkProps>): ReactNode {
	const { href, name } = props;

	const t = useTranslations("WebsiteLink");

	return (
		<a aria-label={t("website", { name })} className="shrink-0" href={href}>
			<Image
				alt=""
				className="h-12 w-auto object-contain transition-all hover:text-primary"
				priority={true}
				src={icon}
			/>
		</a>
	);
}
