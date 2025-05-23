# GraL website

Deployed at <https://www.nwg-gral.de>.

## Setting up GitHub OAuth for CMS sign in

- create a new OAuth app at <https://github.com/settings/applications> and set the callback URL to
  `/api/oauth/callback` on your domain.
- set the `OAUTH_CLIENT_ID` environment variable to the OAuth app's client id, and the
  `OAUTH_CLIENT_SECRET` to the OAuth app's client secret.
- set the `OAUTH_ALLOWED_ORIGIN` to your domain, and the `OAUTH_REDIRECT_URL` to the callback URL
  set when creating the OAuth app.
- update the config at `public/admin/config.yml`.

## Setting up Email

- provide the recipient email address via the `RECIPIENT_EMAIL_ADDRESS` environment variable. this
  is where contact form submissions will be sent to.
- provide a valid SendGrid API key and sender via the `SENDGRID_API_KEY` and
  `SENDGRID_SENDER_EMAIL_ADDRESS` environment variables.
