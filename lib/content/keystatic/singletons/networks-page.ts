import { createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";

export const createNetworksPage = createSingleton("/networks-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Networks page", locale),
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
			cooperationPartners: fields.object(
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
					label: "Cooperation partners",
				},
			),
			internationalAdvisoryBoard: fields.object(
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
					label: "International advisory board",
				},
			),
			networks: fields.object(
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
					label: "Networks",
				},
			),
		},
	});
});
