"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/lib/navigation";

export function LocaleSwitcher(): JSX.Element {
	const pathname = usePathname();

	return (
		<div className="grid content-start gap-4 justify-self-stretch text-right font-display text-xs font-medium uppercase tracking-[0.15em] text-secondary">
			<Link
				aria-current={pathname?.startsWith("/de") === true ? "page" : undefined}
				className="transition hover:text-primary aria-[current]:text-primary"
				href={{ pathname }}
				locale="de"
			>
				Deutsch
			</Link>
			{/* <Link
				aria-current={pathname?.startsWith("/en") === true ? "page" : undefined}
				className="transition hover:text-primary aria-[current]:text-primary"
				href={{ pathname }}
				locale="en"
			>
				English
			</Link> */}
		</div>
	);
}
