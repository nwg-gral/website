/** @typedef {import('next').NextConfig} NextConfig */

import { createContentlayerPlugin } from "next-contentlayer";
import createI18nPlugin from "next-intl/plugin";

/** @type {NextConfig} */
const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	headers() {
		/** @type {Awaited<ReturnType<NonNullable<NextConfig['headers']>>>} */
		const headers = [];

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

		return Promise.resolve(headers);
	},
	output: "standalone",
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack(config) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		config.infrastructureLogging = { level: "error" };

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return config;
	},
};

/** @type {Array<(config: NextConfig) => NextConfig>} */
const plugins = [createI18nPlugin(), createContentlayerPlugin({})];

export default plugins.reduce((config, plugin) => {
	return plugin(config);
}, config);
