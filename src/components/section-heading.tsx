import { type ReactNode } from "react";

interface SectionHeadingProps {
	children?: ReactNode;
}

export function SectionHeading(props: SectionHeadingProps): JSX.Element {
	const { children } = props;

	return (
		<h3>
			<span className="border-b border-primary font-display text-[1rem] leading-[1.25rem] text-secondary sm:text-[1.15rem] sm:leading-[1.5rem]">
				{children}
			</span>
		</h3>
	);
}
