import type { ReactNode } from "react";

interface SectionHeadingProps {
	children?: ReactNode;
}

export function SectionHeading(props: Readonly<SectionHeadingProps>): ReactNode {
	const { children } = props;

	return (
		<h3>
			<span className="font-display text-[1rem] leading-[1.25rem] text-secondary sm:text-[1.15rem] sm:leading-[1.5rem]">
				{children}
			</span>
		</h3>
	);
}
