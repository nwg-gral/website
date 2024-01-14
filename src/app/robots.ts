import { createUrl } from "@stefanprobst/lib";
import type { MetadataRoute } from "next";

import { baseUrl } from "~/config/app.config";

export default function robots(): MetadataRoute.Robots {
	return {
		host: baseUrl,
		rules: {
			allow: "/",
			userAgent: "*",
		},
		sitemap: String(createUrl({ baseUrl, pathname: "sitemap.xml" })),
	};
}
