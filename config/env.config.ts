import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOTS?: string | undefined;
			OAUTH_ALLOWED_ORIGIN?: string | undefined;
			OAUTH_CLIENT_ID?: string | undefined;
			OAUTH_CLIENT_SECRET?: string | undefined;
			OAUTH_PROVIDER?: string | undefined;
			OAUTH_REDIRECT_URL?: string | undefined;
			RECIPIENT_EMAIL_ADDRESS?: string | undefined;
			SENDGRID_API_KEY?: string | undefined;
			SENDGRID_SENDER_EMAIL_ADDRESS?: string | undefined;

			NEXT_PUBLIC_BASE_URL?: string | undefined;
		}
	}
}

export const env = createEnv({
	client: {
		NEXT_PUBLIC_BASE_URL: z.string(),
	},
	server: {
		BOTS: z.enum(["disabled", "enabled"]).optional(),
		OAUTH_ALLOWED_ORIGIN: z.string().url(),
		OAUTH_CLIENT_ID: z.string(),
		OAUTH_CLIENT_SECRET: z.string(),
		OAUTH_PROVIDER: z.literal("github"),
		OAUTH_REDIRECT_URL: z.string().url(),
		RECIPIENT_EMAIL_ADDRESS: z.string().email(),
		SENDGRID_API_KEY: z.string(),
		SENDGRID_SENDER_EMAIL_ADDRESS: z.string().email(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		BOTS: process.env.BOTS,
		OAUTH_ALLOWED_ORIGIN: process.env.OAUTH_ALLOWED_ORIGIN,
		OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
		OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
		OAUTH_PROVIDER: process.env.OAUTH_PROVIDER,
		OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
		RECIPIENT_EMAIL_ADDRESS: process.env.RECIPIENT_EMAIL_ADDRESS,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		SENDGRID_SENDER_EMAIL_ADDRESS: process.env.SENDGRID_SENDER_EMAIL_ADDRESS,
	},
});
