import Image from "next/image";
import type { ReactNode } from "react";

import { useMetadata } from "@/lib/i18n/metadata";

export function PageFooter(): ReactNode {
	const metadata = useMetadata();

	return (
		<footer className="border-t border-secondary">
			<div className="mx-auto flex max-w-6xl px-6 py-4 sm:justify-center sm:px-8">
				<div className="grid content-center gap-0.5 text-xs sm:text-center sm:text-sm">
					<span className="font-medium">{metadata.creator}</span>
					<span>{metadata.address}</span>
					<span>
						<a
							className="transition hover:text-primary focus-visible:text-primary"
							href={`mailto:${metadata.social.email}`}
						>
							{metadata.social.email}
						</a>{" "}
						|{" "}
						<a
							className="transition hover:text-primary focus-visible:text-primary"
							href={metadata.social.website}
						>
							{metadata.social.website}
						</a>
					</span>
				</div>

				<Image
					alt=""
					className="h-32 w-32 object-contain sm:hidden"
					height={567}
					src={metadata.bmLogo}
					unoptimized={true}
					width={850}
				/>
			</div>
		</footer>
	);
}
