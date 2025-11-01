import {
	createAssetOptions,
	createContentFieldOptions,
	createLabel,
	createSingleton,
} from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

// import { createPreviewUrl } from "@/lib/content/keystatic/utils/create-preview-url";
import * as validation from "@/lib/content/keystatic/validation";

export const createTeamPage = createSingleton("/team-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Team page", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		entryLayout: "form",
		// previewUrl: createPreviewUrl("/team"),
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
			members: fields.array(
				fields.object({
					name: fields.text({
						label: "Last name",
						validation: { isRequired: true },
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
					content: fields.mdx.inline({
						label: "Short biography",
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
					label: "Members",
					validation: { length: { min: 0 } },
					itemLabel(props) {
						return [props.fields.firstName.value, props.fields.name.value].join(" ");
					},
				},
			),
		},
	});
});
