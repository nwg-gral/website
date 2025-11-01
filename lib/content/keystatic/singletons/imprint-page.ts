import { createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";

export const createImprintPage = createSingleton("/imprint-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Imprint page", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		entryLayout: "form",
		previewUrl: createPreviewUrl("/"),
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			content: fields.mdx({
				label: "Content",
			}),
		},
	});
});
