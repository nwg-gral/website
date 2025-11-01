import {
	createContentFieldOptions,
	createLabel,
	createSingleton,
	withI18nPrefix,
} from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";

export const createIndexPage = createSingleton("/index-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Home page", locale),
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
			featured: fields.array(
				fields.conditional(
					fields.select({
						label: "Collection",
						options: [
							{ value: "events", label: "Event" },
							{ value: "publications", label: "Publication" },
						],
						defaultValue: "events",
					}),
					{
						events: fields.relationship({
							label: "Event",
							validation: { isRequired: true },
							collection: withI18nPrefix("events", locale),
						}),
						publications: fields.relationship({
							label: "Publication",
							validation: { isRequired: true },
							collection: withI18nPrefix("publications", locale),
						}),
					},
				),
				{
					label: "Featured",
					validation: { length: { min: 0, max: 5 } },
					itemLabel(props) {
						return props.value.value ?? "Item";
					},
				},
			),
		},
	});
});
