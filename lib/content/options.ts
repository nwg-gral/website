export const socialMediaKinds = [
	{ label: "Bluesky", value: "bluesky" },
	{ label: "Email", value: "email" },
	{ label: "Facebook", value: "facebook" },
	{ label: "Instagram", value: "instagram" },
	{ label: "LinkedIn", value: "linkedin" },
	{ label: "Mastodon", value: "mastodon" },
	{ label: "ORCID", value: "orcid" },
	{ label: "Twitter", value: "twitter" },
	{ label: "Website", value: "website" },
	{ label: "YouTube", value: "youtube" },
] as const;

export type SocialMediaKind = (typeof socialMediaKinds)[number]["value"];
