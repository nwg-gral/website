import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/components/link";
import { NavLink } from "@/components/nav-link";
import { useMetadata } from "@/lib/i18n/metadata";
import instagram from "@/public/assets/images/icon-instagram.svg";
import gralLogo from "@/public/assets/images/logo.svg";

export function PageHeader(): ReactNode {
	const t = useTranslations("PageHeader");

	const metadata = useMetadata();

	const links = {
		home: { href: "/", label: t("links.home") },
		team: { href: "/team", label: t("links.team") },
		research: { href: "/research", label: t("links.research") },
		networks: { href: "/networks", label: t("links.networks") },
		activities: { href: "/activities", label: t("links.activities") },
		publications: { href: "/publications", label: t("links.publications") },
		contact: { href: "/contact", label: t("links.contact") },
	};

	return (
		<header>
			<div className="mx-auto grid max-w-6xl grid-cols-2 justify-items-center gap-4 px-6 py-4 sm:grid-cols-[160px_1fr_160px] sm:px-8">
				<div>{/* <LocaleSwitcher /> */}</div>
				<Link
					aria-label={links.home.label}
					className="relative aspect-square h-full w-full max-w-xs object-contain"
					href={links.home.href}
				>
					<Image alt="" className="object-contain" priority={true} src={gralLogo} />
				</Link>
				<Image
					alt=""
					className="hidden w-full object-contain sm:block"
					height={567}
					src={metadata.bmLogo}
					sizes="10rem"
					unoptimized={true}
					width={850}
				/>
			</div>

			<nav className="mx-auto max-w-6xl px-6 py-4 sm:px-8">
				<ul
					className="flex flex-wrap justify-between gap-x-4 gap-y-3 font-display text-sm"
					role="list"
				>
					{Object.entries(links).map(([key, link]) => {
						return (
							<li key={key}>
								<NavLink href={link.href}>{link.label}</NavLink>
							</li>
						);
					})}
					<li className="ml-auto sm:ml-0">
						<a aria-label="Instagram" href={metadata.social.instagram}>
							<Image
								alt=""
								className="h-6 w-6 object-contain transition-all hover:text-primary"
								priority={true}
								src={instagram}
								sizes="1.5rem"
							/>
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
