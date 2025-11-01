import type { ReactNode } from "react";

interface SkipLinkProps {
	children: ReactNode;
	id?: string;
	targetId: string;
}

export function SkipLink(props: Readonly<SkipLinkProps>): ReactNode {
	const { children, id, targetId } = props;

	return (
		<a
			className="fixed top-0 left-0 inline-flex -translate-y-full rounded border-secondary bg-white px-8 py-4 font-display underline underline-offset-2 transition focus:translate-y-0"
			href={`#${targetId}`}
			id={id}
		>
			{children}
		</a>
	);
}
