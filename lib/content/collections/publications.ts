import { createCollection } from "@acdh-oeaw/content-lib";
import { withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
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
import { getIntlLanguage, type IntlLocale } from "@/lib/i18n/locales";

function createPublicationsCollection<TLocale extends IntlLocale>(locale: TLocale) {
	const language = getIntlLanguage(locale);
	const collection = withI18nPrefix("publications", language);

	const compileOptions: CompileOptions = {
		remarkPlugins: [
			createGitHubMarkdownPlugin(),
			createTypographicQuotesPlugin(getIntlLanguage(locale)),
		],
		remarkRehypeOptions: createRemarkRehypeOptions(locale),
		rehypePlugins: [createImageSizesPlugin()],
	};

	return createCollection({
		name: collection,
		directory: `./content/${language}/publications/`,
		include: ["*/index.mdx"],
		read(item) {
			return reader.collections[collection].readOrThrow(item.id, { resolveLinkedFiles: true });
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

			return {
				id: item.id,
				content: module,
				metadata: {
					...metadata,
				},
			};
		},
	});
}

export const publications = {
	de: createPublicationsCollection("de-DE"),
	en: createPublicationsCollection("en-GB"),
};
