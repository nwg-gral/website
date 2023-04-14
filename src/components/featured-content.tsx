import { allEvents, allPublications } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Link, useFormatter, useLocale, useTranslations } from "next-intl";

export function FeaturedContent(): JSX.Element {
	const title = "Aktuelles";

	return (
		<aside className="grid content-start gap-4">
			<div>
				<h2 className="border-y border-secondary py-2 text-center font-display text-sm font-medium uppercase tracking-[0.375em] text-secondary">
					{title}
				</h2>
				<div className="flex justify-center gap-2 text-sm text-primary">
					<span>↓</span>
					<span>↓</span>
					<span>↓</span>
				</div>
			</div>
			<FeaturedItems />
		</aside>
	);
}

function FeaturedItems(): JSX.Element {
	const locale = useLocale();
	const t = useTranslations("FeaturedContent");
	const format = useFormatter();

	const featured = [...allEvents, ...allPublications]
		.filter((item) => {
			return item.locale === locale && item.featured === true;
		})
		.sort((a, z) => {
			return compareDesc(new Date(a.date), new Date(z.date));
		})
		.slice(0, 5);

	if (featured.length === 0) {
		return <span>{t("empty")}.</span>;
	}

	return (
		<ul className="grid gap-4" role="list">
			{featured.map((item) => {
				const Content = getMDXComponent(item.body.code);

				return (
					<li key={item.id}>
						<article className="grid gap-0.5">
							<h3>
								<Link
									className="border-b border-primary font-display text-sm text-secondary transition hover:text-primary"
									href={{ pathname: "/activities", hash: item.id }}
								>
									{item.title} ({format.dateTime(new Date(item.date))})
								</Link>
							</h3>
							<div className="line-clamp-3">
								<Content />
							</div>
						</article>
					</li>
				);
			})}
		</ul>
	);
}
