import { isNonEmptyString } from "@acdh-oeaw/lib";
import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment, type ReactNode } from "react";

import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-link";
import { Main } from "@/components/main";
import { PageTitle } from "@/components/page-title";
import { WebsiteLink } from "@/components/website-link";
import { createClient } from "@/lib/content/create-client";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("TeamPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function TeamPage(): Promise<ReactNode> {
	const client = await createClient();

	const page = await client.singletons.teamPage.get();

	const title = page.metadata.title;
	const Content = page.content;

	const team = page.metadata.members;

	function getFullName(person: (typeof team)[number]) {
		const fullName = [person.title, person.firstName, person.name]
			.filter(isNonEmptyString)
			.join(" ");

		return fullName;
	}

	return (
		<Main>
			<Container size="sm">
				<PageTitle>
					{title} {team.map(getFullName).join(", ")}
				</PageTitle>

				<div className="drop-caps prose space-y-6">
					<Content />
				</div>

				<ul className="grid gap-12" role="list">
					{team.map((person, index) => {
						const fullName = getFullName(person);

						const Content = person.content;

						return (
							// eslint-disable-next-line @eslint-react/no-array-index-key
							<Fragment key={index}>
								<li>
									<article className="grid gap-6">
										<header className="flex justify-between">
											<div className="grid content-start gap-6">
												<div>
													<span className="border-b border-primary p-0.5 font-display">
														{person.role}
													</span>
												</div>
												<h2 className="font-display text-[1.5rem] leading-[1.75rem] text-primary sm:text-[1.75rem] sm:leading-[2.125rem]">
													{fullName}
												</h2>
												<div className="flex gap-4">
													{/* {isNonEmptyString(person.cv) ? (
														<CVLink href={person.cv} name={fullName} />
													) : null} */}
													{isNonEmptyString(person.website) ? (
														<WebsiteLink href={person.website} name={fullName} />
													) : null}
													{isNonEmptyString(person.email) ? (
														<EmailLink href={`mailto:${person.email}`} name={fullName} />
													) : null}
												</div>
											</div>
											<Avatar src={person.image} />
										</header>
										<div className="drop-caps prose max-w-xl space-y-6">
											<Content />
										</div>
									</article>
								</li>
								<div className="h-px bg-secondary" />
							</Fragment>
						);
					})}
				</ul>
			</Container>
		</Main>
	);
}

interface AvatarProps {
	src: StaticImageData | string;
}

function Avatar(props: Readonly<AvatarProps>): ReactNode {
	const { src } = props;

	if (typeof src === "string") {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				alt=""
				className="h-28 w-28 shrink-0 rounded-full border-2 border-secondary object-cover sm:h-52 sm:w-52"
				src={src}
			/>
		);
	}

	return (
		<Image
			alt=""
			className="h-28 w-28 shrink-0 rounded-full border-2 border-secondary object-cover sm:h-52 sm:w-52"
			src={src}
			sizes="(max-width: 639px) 12rem, 22rem"
			quality={100}
		/>
	);
}
