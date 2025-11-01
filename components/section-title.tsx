import cn from "clsx/lite";
import type { ReactNode } from "react";

interface SectionTitleProps {
	children?: ReactNode;
	/** @default 'secondary' */
	variant?: "primary" | "secondary";
}

const variants = {
	primary: "text-primary",
	secondary: "text-secondary",
};

export function SectionTitle(props: Readonly<SectionTitleProps>): ReactNode {
	const { children, variant = "secondary" } = props;

	return (
		<h2 className={cn("font-display text-[1.375rem] leading-[1.625rem]", variants[variant])}>
			{children}
		</h2>
	);
}
