"use client";

import type { ReactNode } from "react";

import { Link } from "@/components/link";
import { createFullUrl } from "@/lib/navigation/create-full-url";
import { usePathname } from "@/lib/navigation/navigation";

interface NavLinkProps {
	children: ReactNode;
	href: string;
}

export function NavLink(props: Readonly<NavLinkProps>): ReactNode {
	const { children, href } = props;

	const pathname = usePathname();

	const isCurrentPage = createFullUrl({ pathname: href }).pathname === pathname;

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
