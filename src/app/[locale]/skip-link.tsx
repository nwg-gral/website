"use client";

import { type ReactNode } from "react";

import { Link } from "@/lib/navigation";

interface SkipLinkProps {
	children: ReactNode;
	id?: string;
	targetId: string;
}

export function SkipLink(props: SkipLinkProps): JSX.Element {
	const { children, id, targetId } = props;

	function onClick() {
		document.getElementById(targetId)?.focus();
	}

	return (
		<Link
			className="fixed left-0 top-0 inline-flex -translate-y-full rounded border-secondary bg-white px-8 py-4 font-display underline underline-offset-2 transition focus:translate-y-0"
			href={{ hash: targetId }}
			id={id}
			onClick={onClick}
		>
			{children}
		</Link>
	);
}
