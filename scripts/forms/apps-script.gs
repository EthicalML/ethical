const RESPONSE_TAB = 'Responses';
const QUARANTINE_TAB = 'Quarantine';

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

  const fields = [
    data.name,
    data.email,
    data.organisation,
    data.furtherInformation,
    (data.interests || []).join(', '),
  ];
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
  sheet.appendRow([new Date(), ...fields, data.page || '', data.variant || '', elapsedMs]);
  return reply({ ok: true, quarantined: suspect });
}

function reply(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
