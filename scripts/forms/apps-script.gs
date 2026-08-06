// Year-scoped tabs, living alongside the legacy Google Form's own linked tab in
// the same spreadsheet. Both names are matched exactly, so opening a tab pair
// for a new year means editing these two constants and redeploying a new
// version of the web app.
const RESPONSE_TAB = '2026 Responses';
const QUARANTINE_TAB = '2026 Quarantine';

// One column per interest rather than one joined cell, so each is a real
// boolean the sheet can filter, sort and COUNTIF. Order fixes the column order;
// it has to match the interest values in src/data/contactForm.ts, and adding an
// interest there means adding it here and inserting a column in both tabs.
const INTERESTS = ['network', 'newsletter', 'frameworks'];

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  if (data.website) return reply({ ok: true });

  const cache = CacheService.getScriptCache();
  const clientKey = `client:${String(data.clientKey || '').slice(0, 64)}`;
  const hourKey = `volume:${new Date().toISOString().slice(0, 13)}`;
  const clientCount = Number(cache.get(clientKey) || 0) + 1;
  const volumeCount = Number(cache.get(hourKey) || 0) + 1;
  cache.put(clientKey, String(clientCount), 3600);
  cache.put(hourKey, String(volumeCount), 3600);

  const fields = [data.name, data.email, data.organisation, data.furtherInformation];
  const chosen = data.interests || [];
  const interestFlags = INTERESTS.map((interest) => chosen.indexOf(interest) !== -1);
  // The page measures its own elapsed time; subtracting a browser-supplied
  // startedAt from the Apps Script clock would fold in clock skew and can go
  // negative on a browser running ahead, quarantining a genuine submission.
  // Both numbers are client-supplied either way, so nothing is lost by trusting
  // the one that is internally consistent.
  const elapsedMs = Number(data.elapsedMs);
  const suspect =
    !Number.isFinite(elapsedMs) ||
    elapsedMs < 3000 ||
    clientCount > 5 ||
    volumeCount > 100 ||
    fields.some((value) => String(value || '').length > 500);
  const sheet = SpreadsheetApp.getActive().getSheetByName(suspect ? QUARANTINE_TAB : RESPONSE_TAB);
  sheet.appendRow([
    new Date(),
    ...fields,
    ...interestFlags,
    data.page || '',
    data.variant || '',
    elapsedMs,
  ]);
  return reply({ ok: true, quarantined: suspect });
}

function reply(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
