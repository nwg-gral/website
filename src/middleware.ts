import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "~/config/i18n.config";

export default createMiddleware({
	locales,
	defaultLocale,
});

export const config = {
	matcher: ["/", "/de/:path*"],
};
