"use client";

import { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import Link from "next-intl/link";
import { type ReactNode } from "react";

interface NavLinkProps {
	children: ReactNode;
	href: Exclude<LinkProps["href"], string>;
}

export function NavLink(props: NavLinkProps): JSX.Element {
	const { children, href } = props;

	const pathname = usePathname();

	const isCurrentPage = href.pathname === pathname;

	return (
		<Link
			aria-current={isCurrentPage ? "page" : undefined}
			className="border-b border-primary p-1 transition hover:text-primary focus-visible:text-primary aria-[current]:text-primary"
			href={href}
		>
			{children}
		</Link>
	);
}
