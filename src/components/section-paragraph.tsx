import { type ReactNode } from "react";

interface SectionParagraphProps {
	children?: ReactNode;
}

export function SectionParagraph(props: SectionParagraphProps): JSX.Element {
	const { children } = props;

	return <p className="font-body text-[1.25rem] text-secondary">{children}</p>;
}
