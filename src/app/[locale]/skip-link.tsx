import Link from "next/link";
import { type ReactNode } from "react";

interface SkipLinkProps {
	children: ReactNode;
	id?: string;
	targetId: string;
}

export function SkipLink(props: SkipLinkProps): JSX.Element {
	const { children, id, targetId } = props;

	return (
		<Link
			className="fixed left-0 top-0 inline-flex -translate-y-full rounded px-8 py-4 focus:translate-y-0"
			href={{ hash: targetId }}
			id={id}
		>
			{children}
		</Link>
	);
}
