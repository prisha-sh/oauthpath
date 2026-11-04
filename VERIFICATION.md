# Verification log (4 Nov 2026)

Method: I drafted four guides from prior knowledge, then ran web searches on the claims most likely to hurt a developer if wrong. I did not log in to any provider console or create any OAuth app. Most sources are secondary (vendor docs and developer write ups) except where noted.

## Corrected
* Slack: the guide said history rate limits were "reported". They are exact. Commercially distributed apps outside the Marketplace get 1 request per minute and 15 objects per call on conversations.history and conversations.replies. New apps from 29 May 2025, existing installs from 3 March 2026 (the date moved from September 2025). Marketplace and internal customer built apps are exempt. Source: Slack changelog and FAQ.
* Google: two escape hatches were missing. The drive.file scope is non sensitive and avoids the security assessment. A Workspace "Internal" consent screen skips verification, the 100 user cap and the 7 day token expiry. Added both.
* LinkedIn: guide was vague on refresh tokens. Programmatic refresh tokens (365 days) are only for approved Marketing Developer Platform partners. Everyone else gets 60 day access tokens and must re authenticate. Source: Microsoft Learn.
* GitHub: removed a confident claim about classic OAuth app token expiry that I could not confirm. Replaced with the confirmed GitHub App behavior (8 hour user tokens, 6 month refresh tokens).

## Confirmed
* Google Testing mode: 100 test users, refresh tokens expire after 7 days unless only basic scopes.
* Google restricted scopes need verification plus an annual CASA assessment; verification can take several weeks or longer.
* LinkedIn access tokens last 60 days.

## Could not verify
* Slack Marketplace review duration.
* CASA cost (one third party says 5K to 20K dollars a year).
* LinkedIn approval odds and review time for gated products.
* GitHub classic OAuth app review requirements and token expiry.
* Everything about real console flows. No setup attempt was made.

## Next checks I would do
Create a throwaway GitHub OAuth app and a Slack dev app, run the code flow, and log every field and surprise. Open Google and LinkedIn official pages directly instead of secondary sources.
