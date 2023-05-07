import { notFound } from "next/navigation";

/**
 * A root `src/app/not-found.tsx` page would automatically do this,
 * but since we want to use a localised 404 page, and non-root `not-found`
 * pages are only displayed in response to `notFound()`, we need this
 * catch-all route.
 */
export default function NotFoundPage(): JSX.Element {
	notFound();
}
