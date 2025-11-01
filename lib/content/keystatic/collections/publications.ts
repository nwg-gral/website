import { createAssetOptions, createCollection, createLabel } from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

export const createPublications = createCollection("/publications/", (paths, locale) => {
	return collection({
		label: createLabel("Publications", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		slugField: "title",
		columns: ["title", "date"],
		entryLayout: "form",
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			date: fields.date({
				label: "Date",
				validation: { isRequired: true },
			}),
			url: fields.url({
				label: "URL",
				validation: { isRequired: false },
			}),
			attachments: fields.array(
				fields.object({
					label: fields.text({
						label: "Label",
						validation: { isRequired: true },
					}),
					file: fields.file({
						label: "File",
						validation: { isRequired: true },
						...createAssetOptions(paths.downloadPath),
					}),
				}),
				{
					label: "Attachments",
					validation: { length: { min: 0 } },
					itemLabel(props) {
						return props.fields.label.value;
					},
				},
			),
			content: fields.mdx({
				label: "Description",
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
	});
});
