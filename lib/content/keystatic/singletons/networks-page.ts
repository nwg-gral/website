import { createContentFieldOptions, createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
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
			cooperationPartners: fields.object(
				{
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
							heading: false,
							image: false,
							table: false,
						},
						components: {},
					}),
					items: fields.array(
						fields.object({
							name: fields.text({
								label: "Name",
								validation: { isRequired: true },
							}),
							website: fields.url({
								label: "Website",
								validation: { isRequired: true },
							}),
							content: fields.mdx.inline({
								label: "Description",
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
						}),
						{
							label: "Cooperation partners",
							validation: { length: { min: 0 } },
							itemLabel(props) {
								return props.fields.name.value;
							},
						},
					),
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
							...createContentFieldOptions(paths),
							blockquote: false,
							codeBlock: false,
							heading: false,
							image: false,
							table: false,
						},
						components: {},
					}),
					items: fields.array(
						fields.object({
							name: fields.text({
								label: "Name",
								validation: { isRequired: true },
							}),
							website: fields.url({
								label: "Website",
								validation: { isRequired: true },
							}),
							content: fields.mdx.inline({
								label: "Description",
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
						}),
						{
							label: "International advisory board",
							validation: { length: { min: 0 } },
							itemLabel(props) {
								return props.fields.name.value;
							},
						},
					),
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
							...createContentFieldOptions(paths),
							blockquote: false,
							codeBlock: false,
							heading: false,
							image: false,
							table: false,
						},
						components: {},
					}),
					items: fields.array(
						fields.object({
							name: fields.text({
								label: "Name",
								validation: { isRequired: true },
							}),
							website: fields.url({
								label: "Website",
								validation: { isRequired: true },
							}),
							content: fields.mdx.inline({
								label: "Description",
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
						}),
						{
							label: "Network partners",
							validation: { length: { min: 0 } },
							itemLabel(props) {
								return props.fields.name.value;
							},
						},
					),
				},
				{
					label: "Networks",
				},
			),
		},
	});
});
