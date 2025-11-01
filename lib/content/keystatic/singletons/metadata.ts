import { createAssetOptions, createLabel, createSingleton } from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

import { socialMediaKinds } from "@/lib/content/options";

export const createMetadata = createSingleton("/metadata/", (paths, locale) => {
	return singleton({
		label: createLabel("Metadata", locale),
		path: paths.contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true },
			}),
			creator: fields.text({
				label: "Creator",
				validation: { isRequired: true },
			}),
			address: fields.text({
				label: "Address",
				validation: { isRequired: true },
				multiline: true,
			}),
			logo: fields.image({
				label: "Logo",
				validation: { isRequired: true },
				...createAssetOptions(paths.assetPath),
			}),
			manifest: fields.object(
				{
					name: fields.text({
						label: "Name",
						validation: { isRequired: true },
					}),
					"short-name": fields.text({
						label: "Short name",
						validation: { isRequired: true },
					}),
					description: fields.text({
						label: "Description",
						validation: { isRequired: true },
					}),
				},
				{
					label: "Webmanifest",
				},
			),
			social: fields.array(
				fields.object(
					{
						kind: fields.select({
							label: "Kind",
							options: socialMediaKinds,
							defaultValue: "website",
						}),
						href: fields.url({
							label: "URL",
							validation: { isRequired: true },
						}),
					},
					{
						label: "Social",
					},
				),
				{
					label: "Social media",
					validation: { length: { min: 1 } },
					itemLabel(props) {
						return props.fields.kind.value;
					},
				},
			),
		},
	});
});
