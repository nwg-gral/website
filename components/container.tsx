import cn from "clsx/lite";
import type { ReactNode } from "react";

const sizes = {
	sm: "max-w-4xl",
	md: "max-w-6xl",
};

interface ContainerProps {
	children: ReactNode;
	/** @default 'md' */
	size?: keyof typeof sizes;
}

export function Container(props: Readonly<ContainerProps>): ReactNode {
	const { children, size = "md" } = props;

	return <div className={cn("mx-auto grid gap-8 p-6 sm:p-8", sizes[size])}>{children}</div>;
}
