import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

const sizes = {
	sm: "max-w-4xl",
	md: "max-w-6xl",
};

interface ContainerProps {
	children: ReactNode;
	/** @default 'md' */
	size?: keyof typeof sizes;
}

export function Container(props: ContainerProps): JSX.Element {
	const size = props.size ?? "md";

	return <div className={cn("mx-auto grid gap-8 p-6 sm:p-8", sizes[size])}>{props.children}</div>;
}
