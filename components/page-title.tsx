import type { ReactNode } from "react";

interface PageTitleProps {
	children?: ReactNode;
}

export function PageTitle(props: Readonly<PageTitleProps>): ReactNode {
	const { children } = props;

	return (
		<h1 className="font-display text-[1.5rem] leading-[1.75rem] text-primary sm:text-[1.75rem] sm:leading-[2.125rem]">
			{children}
		</h1>
	);
}
