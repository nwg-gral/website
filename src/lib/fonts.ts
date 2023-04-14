import { EB_Garamond, Golos_Text } from "next/font/google";

export const body = EB_Garamond({
	subsets: ["latin", "latin-ext"],
	variable: "--font-body",
});

export const display = Golos_Text({
	subsets: ["latin", "latin-ext"],
	variable: "--font-display",
});
