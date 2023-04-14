import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

export const id = "main-content";

interface MainContentProps {
	children?: ReactNode;
	className?: string;
}

export function MainContent(props: MainContentProps): JSX.Element {
	return (
		<main className={cn("pb-8", props.className)} id={id}>
			{props.children}
		</main>
	);
}
