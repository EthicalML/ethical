# Form receiver deployment

The website is in demo mode until `src/data/site.json` has a deployed Apps Script `/exec` URL in `forms.endpoint`. No secret is stored in the site.

1. Open the response Google Sheet, add tabs named `Responses` and `Quarantine`, then choose **Extensions → Apps Script**.
2. Replace the editor contents with `apps-script.gs` from this directory and save.
3. Choose **Deploy → New deployment → Web app**. Set **Execute as** to yourself and **Who has access** to **Anyone**, then deploy and approve access.
4. Copy the deployment URL ending in `/exec` into `src/data/site.json` as `forms.endpoint`. Do not use the placeholder URL.
5. Run `npm run build`, submit each form once, and confirm both rows appear in `Responses`.

The receiver drops filled honeypots and quarantines submissions that are too fast, oversized, over five requests per browser token per hour, or over the global hourly volume limit. Apps Script does not expose the sender IP to `doPost`, so the browser token is the available per-client throttle proxy; it is an abuse-speed bump, not authentication. Edit the script only by creating a new deployment version and updating the site endpoint if Google gives it a new URL.

Rows are appended as: timestamp, name, email, organisation/role, further information, interests, page, form variant, elapsed milliseconds.
