import { createUrl } from "@stefanprobst/lib";
import type { MetadataRoute } from "next";

import { baseUrl } from "~/config/app.config";
import { locales } from "~/config/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["/", "/activities", "/contact", "/networks", "/research", "/team"];

	return locales.flatMap((locale) => {
		return routes.map((pathname) => {
			return {
				url: String(createUrl({ baseUrl, pathname: `/${locale}/${pathname}` })),
				lastModified: new Date(),
			};
		});
	});
}
