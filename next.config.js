/** @typedef {import('next').NextConfig} NextConfig */

import { log } from "@stefanprobst/log";
import ms from "ms";
import { createContentlayerPlugin } from "next-contentlayer";
import createI18nPlugin from "next-intl/plugin";

/** @type {NextConfig} */
const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	async headers() {
		/** @type {Awaited<ReturnType<NonNullable<NextConfig['headers']>>>} */
		const headers = [];

		/**
		 * Cache all content pages.
		 *
		 * @see https://next-intl-docs.vercel.app/docs/next-13/server-components#cdn-caching
		 */
		headers.push({
			source: "/((?!_next|.*\\..*).*)",
			headers: [
				{
					key: "Cache-Control",
					value: [`s-maxage=${ms("1d") / 1000}`, `stale-while-revalidate=${ms("1y") / 1000}`].join(
						", ",
					),
				},
			],
			/**
			 * For hosts which do not support the `Vary` header (e.g. Vercel), ensure caching for
			 * prefetch requests of Server Components is disabled.
			 *
			 * @see https://github.com/vercel/vercel/discussions/7612#discussioncomment-2434736
			 */
			missing: [
				{
					type: "header",
					key: "Next-Router-Prefetch",
				},
			],
		});

		/**
		 * Cache team member images, which are content hashed and copied in contentlayer config.
		 */
		headers.push({
			source: "/assets/_images/:path",
			headers: [
				{
					key: "Cache-Control",
					value: "public,max-age=31536000,immutable",
				},
			],
		});

		/**
		 * Only allow indexing by search engines when the `BOTS` environment variable is set.
		 */
		if (process.env.BOTS !== "enabled") {
			headers.push({
				source: "/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex, nofollow",
					},
				],
			});

			log.warn("Indexing by search engines is disallowed.");
		}

		return headers;
	},
	output: "standalone",
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack(config) {
		config.infrastructureLogging = { level: "error" };

		return config;
	},
};

/** @type {Array<(config: NextConfig) => NextConfig>} */
const plugins = [
	// @ts-expect-error Upstream type issue.
	createI18nPlugin(),
	createContentlayerPlugin({}),
];

export default plugins.reduce((config, plugin) => {
	return plugin(config);
}, config);
