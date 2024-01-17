import { createUrl } from "@stefanprobst/lib";
import { allEvents } from "contentlayer/generated";
import type { MetadataRoute } from "next";

import { baseUrl } from "~/config/app.config";
import { locales } from "~/config/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/activities", "/contact", "/networks", "/research", "/team"];

	const events = allEvents.map((event) => {
		return `/${event.id}`;
	});

	routes.push(...events);

	return locales.flatMap((locale) => {
		return routes.map((pathname) => {
			return {
				url: String(createUrl({ baseUrl, pathname: `/${locale}${pathname}` })),
				lastModified: new Date(),
			};
		});
	});
}
