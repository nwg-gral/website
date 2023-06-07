"use client";

// FIXME:
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocaleSwitcher(): JSX.Element {
	const pathname = usePathname();

	function redirectedPathname(locale: string) {
		if (pathname == null) return "/";

		const segments = pathname.split("/");
		segments[1] = locale;

		return segments.join("/");
	}

	return (
		<div className="grid content-start gap-4 justify-self-stretch text-right font-display text-xs font-medium uppercase tracking-[0.15em] text-secondary">
			<Link
				aria-current={pathname?.startsWith("/de") === true ? "page" : undefined}
				className="transition hover:text-primary aria-[current]:text-primary"
				href={redirectedPathname("de")}
			>
				Deutsch
			</Link>
			<Link
				aria-current={pathname?.startsWith("/en") === true ? "page" : undefined}
				className="transition hover:text-primary aria-[current]:text-primary"
				href={redirectedPathname("en")}
			>
				English
			</Link>
		</div>
	);
}
