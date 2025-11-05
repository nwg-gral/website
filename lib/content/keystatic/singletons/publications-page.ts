import { createContentFieldOptions, createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

// import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";

export const createPublicationsPage = createSingleton("/publications-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Publications page", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		entryLayout: "form",
		// previewUrl: createPreviewUrl("/publications"),
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					...createContentFieldOptions(paths),
					blockquote: false,
					codeBlock: false,
					heading: false,
					image: false,
					table: false,
				},
				components: {},
			}),
		},
	});
});
