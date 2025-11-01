import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import icon from "@/public/assets/images/icon-email.svg";

interface EmailLinkProps {
	href: string;
	name: string;
}

export function EmailLink(props: Readonly<EmailLinkProps>): ReactNode {
	const { href, name } = props;

	const t = useTranslations("EmailLink");

	return (
		<a aria-label={t("email", { name })} className="shrink-0" href={href}>
			<Image
				alt=""
				className="h-12 w-auto object-contain transition-all hover:text-primary"
				loading="eager"
				src={icon}
			/>
		</a>
	);
}
