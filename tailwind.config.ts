import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import animatePlugin from "tailwindcss-animate";

const neutral = colors.slate;
const primary = "#d83f15"; // red
const secondary = "#0e5976"; // bluegray

const config: Config = {
	content: ["./src/**/*.@(mdx|ts|tsx)"],
	plugins: [animatePlugin, typographyPlugin],
	theme: {
		extend: {
			colors: {
				neutral,
				primary,
				secondary,
			},
			fontFamily: {
				body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
				display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
			},
		},
	},
};

export default config;
