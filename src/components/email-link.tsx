import Image from "next/image";
import { useTranslations } from "next-intl";

import icon from "~/public/assets/images/icon-email.svg";

interface EmailLinkProps {
	href: string;
	name: string;
}

export function EmailLink(props: EmailLinkProps): JSX.Element {
	const { href, name } = props;

	const t = useTranslations("EmailLink");

	return (
		<a aria-label={t("email", { name })} className="shrink-0" href={href}>
			{/* <span className="border-b border-primary p-0.5 font-display text-sm uppercase transition hover:text-primary focus-visible:text-primary" /> */}
			<Image
				alt=""
				className="h-12 w-auto object-contain transition-all hover:text-primary"
				src={icon}
			/>
		</a>
	);
}
