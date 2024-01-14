import "tailwindcss/tailwind.css";
import "@/styles/index.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { baseUrl } from "~/config/app.config";

interface RootLayoutProps {
	children: ReactNode;
}

export const viewport: Viewport = {
	colorScheme: "light",
	initialScale: 1,
	width: "device-width",
};

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	alternates: {
		canonical: "./",
	},
};

export default function RootLayout(props: RootLayoutProps): ReactNode {
	const { children } = props;

	return children;
}
