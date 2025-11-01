import type { NextProxy, ProxyConfig } from "next/server";

import { middleware as i18nMiddleware } from "@/lib/i18n/middleware";
import { composeMiddleware } from "@/lib/server/compose-middlewares";

export const proxy: NextProxy = composeMiddleware(i18nMiddleware);

export const config: ProxyConfig = {
	matcher: ["/", "/(de|en)/:path*"],
};
