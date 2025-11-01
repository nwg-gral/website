/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { withImageSizes } from "@acdh-oeaw/mdx-lib";
import withHeadingIds from "rehype-slug";
import type { Pluggable } from "unified";

import { withRemoteImageUrls } from "@/lib/content/mdx/with-remote-image-urls";

export function createHeadingIdsPlugin() {
	return withHeadingIds satisfies Pluggable;
}

export function createImageSizesPlugin(components?: Array<string>) {
	return [withImageSizes, { components }] satisfies Pluggable;
}

export function createRemoteImageUrlsPlugin(baseUrl: string, components?: Array<string>) {
	return [withRemoteImageUrls, { baseUrl, components }] satisfies Pluggable;
}
