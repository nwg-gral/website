import Image from "next/image";
import { useTranslations } from "next-intl";

import icon from "~/public/assets/images/icon-cv.svg";

interface CVLinkProps {
	href: string;
	name: string;
}

export function CVLink(props: CVLinkProps): JSX.Element {
	const { href, name } = props;

	const t = useTranslations("CVLink");

	return (
		<a aria-label={t("cv", { name })} className="shrink-0" href={href}>
			<Image
				alt=""
				className="h-12 w-auto object-contain transition-all hover:text-primary"
				loading="eager"
				src={icon}
			/>
		</a>
	);
}
