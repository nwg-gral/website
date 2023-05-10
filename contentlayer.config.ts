import { existsSync } from "node:fs";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import {
	defineComputedFields,
	defineDocumentType,
	defineNestedType,
	makeSource,
} from "contentlayer/source-files";
import { xxhash64 } from "hash-wasm";
import size from "image-size";

const computedFields = defineComputedFields({
	id: {
		type: "string",
		resolve(doc) {
			const fileName = basename(doc._raw.sourceFileName);
			const extension = extname(doc._raw.sourceFileName);
			return fileName.slice(0, -extension.length);
		},
	},
	locale: {
		type: "string",
		resolve(doc) {
			/**
			 * CMS currently only supports `single_file` for `i18n` in `file` collections.
			 */
			if (doc._raw.sourceFileDir.startsWith("pages")) {
				return undefined;
			}

			return doc._raw.sourceFileDir.split("/").at(-1);
		},
	},
});

const Section = defineNestedType(() => {
	return {
		name: "Section",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			text: {
				type: "mdx",
				required: false,
			},
		},
	};
});

/**
 * CMS currently only supports `single_file` for `i18n` in `file` collections.
 */

const HomePageContent = defineNestedType(() => {
	return {
		name: "HomePageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const HomePage = defineDocumentType(() => {
	return {
		name: "HomePage",
		filePathPattern: "pages/**/index.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: HomePageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: HomePageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const TeamPageContent = defineNestedType(() => {
	return {
		name: "TeamPageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const TeamPage = defineDocumentType(() => {
	return {
		name: "TeamPage",
		filePathPattern: "pages/**/team.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: TeamPageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: TeamPageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const ContactPageContent = defineNestedType(() => {
	return {
		name: "ContactPageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const ContactPage = defineDocumentType(() => {
	return {
		name: "ContactPage",
		filePathPattern: "pages/**/contact.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: ContactPageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: ContactPageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const ImprintPageContent = defineNestedType(() => {
	return {
		name: "ImprintPageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const ImprintPage = defineDocumentType(() => {
	return {
		name: "ImprintPage",
		filePathPattern: "pages/**/imprint.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: ImprintPageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: ImprintPageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const NetworksPageContent = defineNestedType(() => {
	return {
		name: "NetworksPageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			cooperationPartners: {
				type: "nested",
				of: Section,
				required: true,
			},
			internationalAdvisoryBoard: {
				type: "nested",
				of: Section,
				required: true,
			},
			networks: {
				type: "nested",
				of: Section,
				required: true,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const NetworksPage = defineDocumentType(() => {
	return {
		name: "NetworksPage",
		filePathPattern: "pages/**/networks.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: NetworksPageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: NetworksPageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const ResearchPageContent = defineNestedType(() => {
	return {
		name: "ResearchPageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			cards: {
				type: "list",
				of: Section,
				required: false,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const ResearchPage = defineDocumentType(() => {
	return {
		name: "ResearchPage",
		filePathPattern: "pages/**/research.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: ResearchPageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: ResearchPageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const ActivitiesPageContent = defineNestedType(() => {
	return {
		name: "ActivitiesPageContent",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			events: {
				type: "nested",
				of: Section,
				required: true,
			},
			publications: {
				type: "nested",
				of: Section,
				required: true,
			},
			body: {
				type: "mdx",
				required: false,
			},
		},
	};
});

const ActivitiesPage = defineDocumentType(() => {
	return {
		name: "ActivitiesPage",
		filePathPattern: "pages/**/activities.mdx",
		contentType: "mdx",
		fields: {
			de: {
				type: "nested",
				of: ActivitiesPageContent,
				required: true,
			},
			en: {
				type: "nested",
				of: ActivitiesPageContent,
				required: true,
			},
		},
		computedFields,
	};
});

const Event = defineDocumentType(() => {
	return {
		name: "Event",
		filePathPattern: "events/**/*.mdx",
		contentType: "mdx",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			date: {
				type: "date",
				required: true,
			},
			url: {
				type: "string",
				required: false,
			},
			featured: {
				type: "boolean",
				required: false,
			},
		},
		computedFields,
	};
});

const CooperationPartner = defineDocumentType(() => {
	return {
		name: "CooperationPartner",
		filePathPattern: "networks/cooperation-partners/**/*.mdx",
		contentType: "mdx",
		fields: {
			name: {
				type: "string",
				required: true,
			},
			website: {
				type: "string",
				required: true,
			},
		},
		computedFields,
	};
});

const InternationalAdvisoryBoardMember = defineDocumentType(() => {
	return {
		name: "InternationalAdvisoryBoardMember",
		filePathPattern: "networks/international-advisory-board/**/*.mdx",
		contentType: "mdx",
		fields: {
			name: {
				type: "string",
				required: true,
			},
			website: {
				type: "string",
				required: true,
			},
		},
		computedFields,
	};
});

const NetworkPartner = defineDocumentType(() => {
	return {
		name: "NetworkPartner",
		filePathPattern: "networks/networks/**/*.mdx",
		contentType: "mdx",
		fields: {
			name: {
				type: "string",
				required: true,
			},
			website: {
				type: "string",
				required: true,
			},
		},
		computedFields,
	};
});

const Person = defineDocumentType(() => {
	return {
		name: "Person",
		filePathPattern: "team/**/*.mdx",
		contentType: "mdx",
		fields: {
			title: {
				type: "string",
				required: false,
			},
			firstName: {
				type: "string",
				required: true,
			},
			lastName: {
				type: "string",
				required: true,
			},
			role: {
				type: "string",
				required: true,
			},
			email: {
				type: "string",
				required: false,
			},
			website: {
				type: "string",
				required: false,
			},
			cv: {
				type: "string",
				required: false,
			},
			image: {
				type: "string",
				required: true,
			},
			bosslevel: {
				type: "number",
				required: true,
			},
		},
		computedFields: {
			...computedFields,
			avatar: {
				type: "{ src: string; alt: string; width: number; height: number } | string" as "string",
				async resolve(doc) {
					const src = doc["image"] as string;
					if (!src.startsWith("/")) return src;

					const publicFolder = join(process.cwd(), "public");
					const filePath = join(publicFolder, src);

					const { width, height } = size(filePath);
					const hash = await xxhash64(await readFile(filePath));

					const extension = extname(filePath);
					const fileName = basename(filePath).slice(0, -extension.length + 1);
					const assetFileName = fileName + hash + extension;

					const assetFolder = join(publicFolder, "assets", "_images");
					if (!existsSync(assetFolder)) {
						await mkdir(assetFolder, { recursive: true });
					}
					const assetFilePath = join(assetFolder, assetFileName);
					await copyFile(filePath, assetFilePath);

					const publicFilePath = join("/", "assets", "_images", assetFileName);

					return { src: publicFilePath, alt: "", width, height };
				},
			},
		},
	};
});

const Attachment = defineNestedType(() => {
	return {
		name: "Attachment",
		fields: {
			label: {
				type: "string",
				required: true,
			},
			file: {
				type: "string",
				required: true,
			},
		},
	};
});

const Publication = defineDocumentType(() => {
	return {
		name: "Publication",
		filePathPattern: "publications/**/*.mdx",
		contentType: "mdx",
		fields: {
			title: {
				type: "string",
				required: true,
			},
			date: {
				type: "date",
				required: true,
			},
			url: {
				type: "string",
				required: false,
			},
			attachments: {
				type: "list",
				of: Attachment,
				required: false,
			},
			featured: {
				type: "boolean",
				required: false,
			},
		},
		computedFields,
	};
});

export default makeSource({
	contentDirPath: "content",
	documentTypes: [
		Event,
		HomePage,
		ActivitiesPage,
		ContactPage,
		ImprintPage,
		TeamPage,
		ResearchPage,
		NetworksPage,
		CooperationPartner,
		InternationalAdvisoryBoardMember,
		NetworkPartner,
		Person,
		Publication,
	],
});
