/** @typedef {import('tailwindcss').Config} TailwindConfig */

const typographyPlugin = require("@tailwindcss/typography");
const colors = require("tailwindcss/colors");
const animatePlugin = require("tailwindcss-animate");

const neutral = colors.slate;
const primary = "#d83f15"; // red
const secondary = "#0e5976"; // bluegray

/** @type {TailwindConfig} */
const config = {
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

module.exports = config;
