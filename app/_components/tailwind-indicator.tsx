import type { ReactNode } from "react";

import { env } from "@/config/env.config";

export function TailwindIndicator(): ReactNode {
	if (env.NODE_ENV !== "development") {
		return null;
	}

	return (
		<div className="fixed right-5 bottom-5 z-10 grid size-9 cursor-default place-content-center rounded-full bg-[#000c] font-mono text-xs font-medium text-white shadow-[0_0_0_1px_#171717,_inset_0_0_0_1px_#ffffff24,_0px_16px_32px_-8px_#0000003d] backdrop-blur-[48px] select-none">
			<span className="sr-only">{"Breakpoint: "}</span>
			<span className="xs:hidden block">{"2xs"}</span>
			<span className="xs:block hidden sm:hidden">{"xs"}</span>
			<span className="hidden sm:block md:hidden">{"sm"}</span>
			<span className="hidden md:block lg:hidden">{"md"}</span>
			<span className="hidden lg:block xl:hidden">{"lg"}</span>
			<span className="hidden xl:block 2xl:hidden">{"xl"}</span>
			<span className="3xl:hidden hidden 2xl:block">{"2xl"}</span>
			<span className="3xl:block hidden">{"3xl"}</span>
		</div>
	);
}
