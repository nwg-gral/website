import { createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";

export const createActivitiesPage = createSingleton("/activities-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Activities page", locale),
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
			events: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					text: fields.mdx.inline({
						label: "Text",
						options: {
							blockquote: false,
							codeBlock: false,
							heading: false,
							image: false,
							table: false,
						},
						components: {},
					}),
				},
				{
					label: "Events",
				},
			),
			publications: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					text: fields.mdx.inline({
						label: "Text",
						options: {
							blockquote: false,
							codeBlock: false,
							heading: false,
							image: false,
							table: false,
						},
						components: {},
					}),
				},
				{
					label: "Publications",
				},
			),
		},
	});
});
