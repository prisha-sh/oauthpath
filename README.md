# OAuth Path

Look up an app, get a guide you can follow and share, know what to do next.

Live demo: https://oauthpath-cyan.vercel.app/

## The problem as I understand it
A provider OAuth app is the registration (client ID, secret, redirect URIs, scopes) that lets your product ask users to connect their account. Managed auth hides it, but developers who bring their own app face unknown effort. Setup ranges from 10 minutes (GitHub) to weeks of review plus a paid security assessment (Google restricted scopes). The painful part is not knowing which one you are in until you are blocked.

## Key decisions
1. Lead with a verdict, not docs. Every guide opens with difficulty (1 to 5), hands on effort and approval wait, kept separate because they are different problems.
2. Split agent work from human work. Each step is tagged "Agent can do" (code, scope minimization, drafting review text and demo scripts) or "You do" (console clicks, identity, payment, replying to reviewers). A "next action" card shows the first step the human must take.
3. Show the nuance that decides the timeline, not a generic checklist. Examples: Google drive.file avoids the security assessment; Slack non Marketplace apps are throttled to 1 history request per minute; LinkedIn refresh tokens are partner only.
4. Honest evidence. Every guide carries a verification log (Confirmed, Corrected, Unverified), sources and a list of uncertainties. See VERIFICATION.md.
5. Shareable. Library guides have links, every guide copies or downloads as Markdown, and progress checkboxes persist locally.

## Scope
Four varied apps: GitHub (instant), Slack (easy, optional review with real consequences), Google (hard, weeks and cost), LinkedIn (gated partner access). Live generation works for any other app name or website.

## Live generation
* In the demo, generation runs on Claude from model knowledge with no browsing, and the guide is labeled that way.
* index.html first calls /api/generate, a research agent (api/generate.js) that searches official docs and returns the same JSON plus its own verification log. If that endpoint is missing, it falls back to Claude on claude.ai without browsing.

## Setup
1. Open index.html in a browser to see the library (live generation needs the hosted demo).
2. To deploy with the browsing agent: import the repo into Vercel and set ANTHROPIC_API_KEY (see .env.example). Vercel serves index.html and api/generate.js together.
No credentials are in this repo.

## Limitations
* No guide was tested against a real provider console. Nothing was registered or submitted.
* Verification used web search with mostly secondary sources.
* Timelines for reviews are estimates unless marked Confirmed.
* The hosted live generator cannot browse, so its output is lower confidence than library guides.
* Four of the 100 target apps are done. The next step is running the backend across a list of 100 apps, then spot checking by hand.
