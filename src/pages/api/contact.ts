/* eslint-disable @typescript-eslint/explicit-module-boundary-types, import/no-default-export */

import sendgrid from "@sendgrid/mail";
import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "~/config/env.config";

sendgrid.setApiKey(env.SENDGRID_API_KEY);
const senderEmailAddress = env.SENDGRID_SENDER_EMAIL_ADDRESS;
const recipientEmailAddress = env.RECIPIENT_EMAIL_ADDRESS;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	if (request.method?.toLowerCase() !== "post") {
		return response.status(405).end();
	}

	try {
		const formData = request.body;

		if (formData == null) {
			return response.status(400).end();
		}

		/** Honeypot field. */
		if (formData.bot !== "") {
			return response.status(400).end();
		}

		const message = {
			to: recipientEmailAddress,
			from: senderEmailAddress,
			subject: ["[gral] Message from", formData.name, formData.email].join(" "),
			text: formData.message,
		};

		await sendgrid.send(message);

		/** 303 changes the method to GET. */
		return response.redirect(303, "/success");
	} catch (error) {
		console.error(error);
		const statusCode =
			error instanceof Error && "statusCode" in error && typeof error.statusCode === "number"
				? error.statusCode
				: 500;
		return response.status(statusCode).end();
	}
}
