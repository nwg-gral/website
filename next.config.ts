import type { NextConfig as Config } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const config: Config = {
	allowedDevOrigins: ["127.0.0.1"],
	experimental: {
		globalNotFound: true,
		rootParams: true,
	},
	images: {
		qualities: [100, 75],
	},
	redirects() {
		const redirects: Awaited<ReturnType<NonNullable<Config["redirects"]>>> = [
			{
				source: "/admin",
				destination: "/keystatic",
				permanent: false,
			},
		];

		return Promise.resolve(redirects);
	},
	typedRoutes: true,
	typescript: {
		ignoreBuildErrors: true,
	},
};

const plugins: Array<(config: Config) => Config> = [
	createNextIntlPlugin({
		experimental: {
			/** @see {@link https://next-intl.dev/docs/workflows/typescript#messages-arguments} */
			createMessagesDeclaration: ["./content/de/metadata/index.json", "./messages/de.json"],
		},
		requestConfig: "./lib/i18n/request.ts",
	}),
];

export default plugins.reduce((config, plugin) => {
	return plugin(config);
}, config);
