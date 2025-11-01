import { createCollection } from "@acdh-oeaw/content-lib";
import type { MDXContent } from "mdx/types";
import { VFile } from "vfile";

import { reader } from "@/lib/content/keystatic/reader";
import { compile, type CompileOptions } from "@/lib/content/mdx/compile";
import { createImageSizesPlugin } from "@/lib/content/mdx/rehype-plugins";
import {
	createGitHubMarkdownPlugin,
	createTypographicQuotesPlugin,
} from "@/lib/content/mdx/remark-plugins";
import { createRemarkRehypeOptions } from "@/lib/content/mdx/remark-rehype-options";
import { defaultLocale, getIntlLanguage } from "@/lib/i18n/locales";

const locale = defaultLocale;

const compileOptions: CompileOptions = {
	remarkPlugins: [
		createGitHubMarkdownPlugin(),
		createTypographicQuotesPlugin(getIntlLanguage(locale)),
	],
	remarkRehypeOptions: createRemarkRehypeOptions(locale),
	rehypePlugins: [createImageSizesPlugin()],
};

export const activitiesPage = createCollection({
	name: "activities-page",
	directory: "./content/de/activities-page/",
	include: ["index.mdx"],
	read() {
		return reader.singletons["de:activities-page"].readOrThrow({ resolveLinkedFiles: true });
	},
	async transform(data, item, context) {
		const { content, ...metadata } = data;

		async function transformMdxField(content: string) {
			const input = new VFile({ path: item.absoluteFilePath, value: content });
			const output = await compile(input, compileOptions);
			const module = context.createJavaScriptImport<MDXContent>(String(output));
			return module;
		}

		const module = await transformMdxField(content);

		const events = {
			...data.events,
			text: await transformMdxField(data.events.text),
		};

		const publications = {
			...data.publications,
			text: await transformMdxField(data.publications.text),
		};

		return {
			id: item.id,
			content: module,
			metadata: {
				...metadata,
			},
			events,
			publications,
		};
	},
});
