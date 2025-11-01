import type { ReactNode } from "react";

interface ParagraphProps {
	children?: ReactNode;
}

export function Paragraph(props: Readonly<ParagraphProps>): ReactNode {
	const { children } = props;

	return (
		<p className="font-body text-[1rem] leading-[1.25rem] tracking-[0.75px] text-secondary first-letter:float-left first-letter:mr-1 first-letter:font-display first-letter:text-[3.375rem] first-letter:leading-none first-letter:text-primary sm:text-[1.25rem] sm:leading-[1.4375rem] sm:first-letter:text-[3.8125rem]">
			{children}
		</p>
	);
}

export function ParagraphNoDropCaps(props: Readonly<ParagraphProps>): ReactNode {
	const { children } = props;

	return (
		<p className="font-body text-[1rem] leading-[1.25rem] tracking-[0.75px] text-secondary sm:text-[1.25rem] sm:leading-[1.4375rem] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:decoration-dotted">
			{children}
		</p>
	);
}
