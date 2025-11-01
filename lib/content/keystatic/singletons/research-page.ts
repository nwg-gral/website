import { createContentFieldOptions, createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

// import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";

export const createResearchPage = createSingleton("/research-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Research page", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		entryLayout: "form",
		// previewUrl: createPreviewUrl("/research"),
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
			cards: fields.array(
				fields.object({
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					text: fields.mdx.inline({
						label: "Text",
						options: {
							...createContentFieldOptions(paths),
							blockquote: false,
							codeBlock: false,
							table: false,
						},
						components: {},
					}),
				}),
				{
					label: "Cards",
					validation: { length: { min: 0 } },
					itemLabel(props) {
						return props.fields.title.value;
					},
				},
			),
		},
	});
});
