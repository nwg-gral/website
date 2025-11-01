import { createNavigation } from "next-intl/navigation";
import type { ComponentProps, ReactNode } from "react";

import { routing } from "@/lib/i18n/routing";

const {
	Link,
	getPathname,
	redirect: _redirect,
	usePathname,
	useRouter,
} = createNavigation(routing);

/** @see {@link https://github.com/amannn/next-intl/issues/823} */
const redirect: typeof _redirect = _redirect;

export { getPathname, redirect, usePathname, useRouter };

export { useSearchParams } from "next/navigation";

export interface LocaleLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
	href: string;
}

export const LocaleLink = Link as (props: LocaleLinkProps) => ReactNode;
