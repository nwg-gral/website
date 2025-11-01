import { createCollection, createLabel } from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

export const createEvents = createCollection("/events/", (paths, locale) => {
	return collection({
		label: createLabel("Events or lectures", locale),
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
			summary: fields.mdx.inline({
				label: "Summary",
				options: {
					blockquote: false,
					codeBlock: false,
					heading: false,
					image: false,
					table: false,
				},
				components: {},
			}),
			content: fields.mdx({
				label: "Details",
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
