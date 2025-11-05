"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, type ReactNode, useState } from "react";

export function ContactForm(): ReactNode {
	const t = useTranslations("ContactForm");

	/**
	 * @see {@link https://opennext.js.org/netlify/forms}
	 */

	const [status, setStatus] = useState<
		| { status: "idle" }
		| { status: "pending" }
		| { status: "success" }
		| { status: "error"; message: string }
	>({ status: "idle" });

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			setStatus({ status: "pending" });

			const formElement = event.currentTarget;
			const formData = new FormData(formElement);
			const response = await fetch("/__forms.html", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
				body: new URLSearchParams(formData as any).toString(),
			});
			if (response.ok) {
				setStatus({ status: "success" });
				formElement.reset();
			} else {
				setStatus({
					status: "error",
					message: `${String(response.status)} ${response.statusText}`,
				});
			}
		} catch (error) {
			setStatus({
				status: "error",
				message: String(error),
			});
		}
	}

	return (
		<form
			action="/__forms.html"
			className="grid gap-8 font-display"
			method="POST"
			name="contact"
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onSubmit={onSubmit}
		>
			<input type="hidden" name="form-name" value="contact" />
			<div className="grid gap-8 sm:grid-cols-2">
				<label className="grid gap-2">
					<span className="justify-self-start border-b border-primary p-0.5 font-display text-secondary">
						{t("subject")}:
					</span>
					<input className="border border-secondary px-4 py-3" name="subject" required={true} />
				</label>
				<label className="grid gap-2">
					<span className="justify-self-start border-b border-primary p-0.5 font-display text-secondary">
						{t("email")}:
					</span>
					<input
						className="border border-secondary px-4 py-3"
						name="email"
						required={true}
						type="email"
					/>
				</label>
			</div>
			<label className="grid gap-2">
				<span className="justify-self-start border-b border-primary p-0.5 font-display text-secondary">
					{t("message")}:
				</span>
				<textarea
					className="border border-primary px-4 py-3"
					name="message"
					required={true}
					rows={8}
				/>
			</label>
			<div className="flex justify-end">
				<button
					className="bg-secondary px-6 py-3 font-display text-white transition hover:bg-primary"
					disabled={status.status === "pending"}
					type="submit"
				>
					{t("submit")}
				</button>
			</div>
			<div aria-live="polite" className="flex justify-end text-right">
				{status.status === "success" ? (
					<span className="text-green-600">{t("success")}</span>
				) : status.status === "error" ? (
					<span className="text-red-600">{status.message}</span>
				) : null}
			</div>
		</form>
	);
}
