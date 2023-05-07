import { type ReactNode } from "react";

interface SectionParagraphProps {
	children?: ReactNode;
}

export function SectionParagraph(props: SectionParagraphProps): JSX.Element {
	const { children } = props;

	return (
		<p className="font-body text-[1rem] leading-[1.25rem] tracking-[0.75px] text-secondary sm:text-[1.25rem] sm:leading-[1.4375rem]">
			{children}
		</p>
	);
}
