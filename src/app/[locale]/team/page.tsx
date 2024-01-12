import { isNonEmptyString } from "@stefanprobst/lib";
import { allPeople, allTeamPages, type Person } from "contentlayer/generated";
import { type Metadata } from "next";
import Image from "next/image";
import { getMDXComponent } from "next-contentlayer/hooks";
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import { Fragment } from "react";

import { Container } from "@/components/container";
import { CVLink } from "@/components/cv-link";
import { EmailLink } from "@/components/email-link";
import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/page-title";
import { Paragraph } from "@/components/paragraph";
import { WebsiteLink } from "@/components/website-link";
import { getPage } from "@/lib/content";
import { type Locale } from "~/config/i18n.config";

interface TeamPageProps {
	params: {
		locale: Locale;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("TeamPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function TeamPage(props: TeamPageProps): Promise<JSX.Element> {
	const { params } = props;

	const { locale } = params;
	setRequestLocale(locale);

	const _t = await getTranslations("TeamPage");

	const page = getPage(allTeamPages, locale);

	const title = page.title;
	const code = page.body?.code;
	const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

	const team = allPeople
		.filter((person) => {
			return person.locale === locale;
		})
		.sort((a, z) => {
			return a.bosslevel - z.bosslevel;
		});

	function getFullName(person: Person) {
		const fullName = [person.title, person.firstName, person.lastName]
			.filter(isNonEmptyString)
			.join(" ");

		return fullName;
	}

	return (
		<MainContent>
			<Container size="sm">
				<PageTitle>
					{title} {team.map(getFullName).join(", ")}
				</PageTitle>

				<div className="space-y-6">
					<Content components={{ p: Paragraph }} />
				</div>

				<ul className="grid gap-12" role="list">
					{team.map((person) => {
						const fullName = getFullName(person);

						const code = person.body.code;
						const Content = isNonEmptyString(code) ? getMDXComponent(code) : Fragment;

						return (
							<Fragment key={person.id}>
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
													{isNonEmptyString(person.cv) ? (
														<CVLink href={person.cv} name={fullName} />
													) : null}
													{isNonEmptyString(person.website) ? (
														<WebsiteLink href={person.website} name={fullName} />
													) : null}
													{isNonEmptyString(person.email) ? (
														<EmailLink href={`mailto:${person.email}`} name={fullName} />
													) : null}
												</div>
											</div>
											<Avatar src={person.avatar} />
										</header>
										<div className="max-w-xl space-y-6 text-lg">
											<Content components={{ p: Paragraph }} />
										</div>
									</article>
								</li>
								<div className="h-px bg-secondary" />
							</Fragment>
						);
					})}
				</ul>
			</Container>
		</MainContent>
	);
}

interface AvatarProps {
	src: Person["avatar"];
}

function Avatar(props: AvatarProps): JSX.Element {
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
