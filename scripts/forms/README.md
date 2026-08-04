# Form receiver deployment

The website is in demo mode until the build environment provides `FORM_ENDPOINT` with a deployed Apps Script `/exec` URL. No secret is stored in the repository.

1. Open the response Google Sheet and add two tabs named `2026 Responses` and `2026 Quarantine`, matching `RESPONSE_TAB` and `QUARANTINE_TAB` at the top of the script exactly. The legacy Google Form keeps its own linked tab untouched: it owns that tab's header and inserts its own rows, so the receiver never writes there. Give each new tab the header row below and freeze it (**View → Freeze → 1 row**) so sorting cannot consume it.
2. Choose **Extensions → Apps Script** from that spreadsheet, so the script is bound to it and `SpreadsheetApp.getActive()` resolves without an id.
3. Replace the editor contents with `apps-script.gs` from this directory and save.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to yourself and **Who has access** to **Anyone**, then deploy and approve access.
5. Set `FORM_ENDPOINT` to the deployment URL ending in `/exec` in the build environment.
6. Run `npm run build`, submit each form once, and confirm both rows appear in `Responses`.

The receiver drops filled honeypots and quarantines submissions that are too fast, oversized, over five requests per browser token per hour, or over the global hourly volume limit. Apps Script does not expose the sender IP to `doPost`, so the browser token is the available per-client throttle proxy; it is an abuse-speed bump, not authentication. Edit the script only by creating a new deployment version and updating the site endpoint if Google gives it a new URL.

Rows are appended in this order, which is also the header both tabs need:

```
Timestamp | Name | Email | Organisation & role | Further information | Network | Newsletter | Frameworks | Page | Variant | Elapsed ms
```

The three interest columns are booleans (`TRUE`/`FALSE`), one per checkbox, rather than one joined cell, so each is filterable and COUNTIF-able. Their order is fixed by `INTERESTS` in the script and must match the interest values in `src/data/contactForm.ts`; adding an interest means adding it in both places and inserting a column in both tabs.
