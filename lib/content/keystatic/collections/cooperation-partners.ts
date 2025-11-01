import { createCollection, createContentFieldOptions, createLabel } from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

export const createCooperationPartners = createCollection(
	"/cooperation-partners/",
	(paths, locale) => {
		return collection({
			label: createLabel("Cooperation partners", locale),
			path: paths.contentPath,
			format: { contentField: "content" },
			slugField: "name",
			columns: ["name"],
			entryLayout: "form",
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					},
				}),
				website: fields.url({
					label: "Website",
					validation: { isRequired: true },
				}),
				content: fields.mdx({
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
			},
		});
	},
);
