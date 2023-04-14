import { type ReactNode } from "react";

interface SectionHeadingProps {
	children?: ReactNode;
}

export function SectionHeading(props: SectionHeadingProps): JSX.Element {
	const { children } = props;

	return (
		<h3 className="inline-flex border-b border-primary font-display text-lg text-secondary">
			{children}
		</h3>
	);
}
