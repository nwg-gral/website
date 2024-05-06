import Image from "next/image";
import { useTranslations } from "next-intl";

import { NavLink } from "@/components/nav-link";
import { Link } from "@/lib/navigation";
// import { LocaleSwitcher } from "@/components/locale-switcher";
import instagram from "~/public/assets/images/icon-instagram.svg";
import gralLogo from "~/public/assets/images/logo.svg";
import bmfLogo from "~/public/assets/images/logo-bmf.jpg";

export function PageHeader(): JSX.Element {
	const t = useTranslations("PageHeader");

	const links = {
		home: { href: { pathname: "/" }, label: t("links.home") },
		team: { href: { pathname: "/team" }, label: t("links.team") },
		research: { href: { pathname: "/research" }, label: t("links.research") },
		networks: { href: { pathname: "/networks" }, label: t("links.networks") },
		activities: { href: { pathname: "/activities" }, label: t("links.activities") },
		contact: { href: { pathname: "/contact" }, label: t("links.contact") },
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
					<Image alt="" className="object-contain" priority src={gralLogo} />
				</Link>
				<Image
					alt=""
					className="hidden w-full object-contain sm:block"
					src={bmfLogo}
					sizes="10rem"
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
					<li>
						<a aria-label="Instagram" href="https://instagram.com/gral__bielefelduniversity">
							<Image
								alt=""
								className="h-6 w-6 object-contain transition-all hover:text-primary"
								priority
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
