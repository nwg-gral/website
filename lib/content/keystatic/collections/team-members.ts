import { createAssetOptions, createCollection, createLabel } from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

import * as validation from "@/lib/content/keystatic/validation";

export const createTeamMembers = createCollection("/team-members/", (paths, locale) => {
	return collection({
		label: createLabel("Team members", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		slugField: "name",
		columns: ["name", "firstName"],
		entryLayout: "form",
		schema: {
			name: fields.slug({
				name: {
					label: "Last name",
					validation: { isRequired: true },
				},
			}),
			firstName: fields.text({
				label: "First name",
				validation: { isRequired: false },
			}),
			title: fields.text({
				label: "Title",
				validation: { isRequired: false },
			}),
			role: fields.text({
				label: "Role",
				validation: { isRequired: true },
			}),
			email: fields.text({
				label: "Email",
				validation: { isRequired: false, pattern: validation.email },
			}),
			website: fields.url({
				label: "Website",
				validation: { isRequired: false },
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetOptions(paths.assetPath),
			}),
			bosslevel: fields.integer({
				label: "Boss level",
				validation: { isRequired: true },
				defaultValue: 4,
			}),
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
