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

export const researchPage = createCollection({
	name: "research-page",
	directory: "./content/de/research-page/",
	include: ["index.mdx"],
	read() {
		return reader.singletons["de:research-page"].readOrThrow({ resolveLinkedFiles: true });
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

		const cards = [];

		for (const card of data.cards) {
			cards.push({
				...card,
				text: await transformMdxField(card.text),
			});
		}

		return {
			id: item.id,
			content: module,
			metadata: {
				...metadata,
			},
			cards,
		};
	},
});
