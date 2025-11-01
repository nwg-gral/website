import cn from "clsx/lite";
import type { ReactNode } from "react";

export const id = "main-content";

interface MainProps {
	children: ReactNode;
	className?: string;
}

export function Main(props: Readonly<MainProps>): ReactNode {
	const { children, className, ...rest } = props;

	return (
		<main {...rest} className={cn("outline-hidden", className)} id={id} tabIndex={-1}>
			{children}
		</main>
	);
}
