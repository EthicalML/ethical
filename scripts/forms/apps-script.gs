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

  const fields = [data.name, data.email, data.organisation, data.role, data.furtherInformation];
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
  if (!suspect) {
    if (interestFlags[INTERESTS.indexOf('newsletter')]) {
      addToBrevo(String(data.email || '').trim());
    }
    autoRespond(data, interestFlags);
  }
  return reply({ ok: true, quarantined: suspect });
}

// Replaces the legacy form-submit autoresponder. appendRow does not fire form
// triggers, so this runs directly from doPost with the parsed payload; only
// non-quarantined submissions are answered so suspected bots get nothing.
const NOTIFY_EMAIL = 'axsauze@gmail.com';

function autoRespond(data, interestFlags) {
  const email = String(data.email || '').trim();
  if (!email || email.indexOf('@') === -1) return;
  const name = String(data.name || '').trim() || 'there';
  const organisation = String(data.organisation || '').trim();
  const info = String(data.furtherInformation || '').trim();
  const chosen = INTERESTS.filter((interest, i) => interestFlags[i]);

  const blocks = [];
  if (chosen.indexOf('network') !== -1) {
    blocks.push(
      'Ethical AI Network application: applications are reviewed on a rolling basis and we receive a high volume of them, so we reply to successful applicants within 4 weeks. If you have not heard from us by then, the application was unfortunately not successful this time. Membership is contribution-driven, so you can read how it works at https://ethical.institute/membership/ and strengthen a future application. Thank you for taking the time to apply!',
    );
  }
  if (chosen.indexOf('frameworks') !== -1) {
    blocks.push(
      'AI-RFX frameworks, available right away:\n\n' +
        '* AI RFP https://drive.google.com/file/d/1rH35yZljQBFwdKWyb6OUyQPuQg9ZD91v/view?usp=sharing\n' +
        '* AI RFP (Web Format) https://ethical.institute/frameworks/ai-rfx/\n' +
        '* ML Maturity Model https://drive.google.com/file/d/13XbufddyD3Z5C0OePdk22h_uFzAWlGAX/view?usp=sharing\n' +
        '* ML Maturity Model (Web Format) https://ethical.institute/frameworks/maturity-model/',
    );
  }
  // Newsletter-only submissions get no autoresponse: Brevo handles that
  // subscription and its own emails. The reply goes out only when there is a
  // network or frameworks block to deliver.
  if (blocks.length) {
    const replySubject = 'Submission Information - The Institute for Ethical AI Alignment & Safety';
    const replyBody =
      'Hi ' +
      name +
      '! Thank you for your submission.\n\nImportant info about your response:\n\n' +
      blocks.join('\n\n') +
      '\n';
    MailApp.sendEmail(email, replySubject, replyBody);
  }

  const role = String(data.role || '').trim();
  const tag = chosen.length ? chosen.join(',').toUpperCase() : 'OTHER';
  const subject = `[EthicalML] [${tag}]: ${organisation || 'no organisation'}, ${role || name}`;
  const body = `${subject}\n\nName: ${name}\nEmail: ${email}\nRole: ${role}\nPage: ${data.page || ''}\n\n${info}`;
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

// Adds newsletter opt-ins to Brevo. Script Properties (Project Settings →
// Script Properties) hold the configuration so nothing sensitive lives in the
// repo: BREVO_API_KEY (Brevo → Settings → SMTP & API → API Keys) and
// BREVO_LIST_ID (the numeric id shown on the list's page in Brevo). A Brevo
// failure must never break the sheet write path, hence the try/catch and
// muteHttpExceptions.
function addToBrevo(email) {
  if (!email || email.indexOf('@') === -1) return;
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('BREVO_API_KEY');
  const listId = Number(props.getProperty('BREVO_LIST_ID'));
  if (!apiKey || !Number.isFinite(listId)) return;
  try {
    UrlFetchApp.fetch('https://api.brevo.com/v3/contacts', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'api-key': apiKey },
      payload: JSON.stringify({ email: email, updateEnabled: true, listIds: [listId] }),
      muteHttpExceptions: true,
    });
  } catch (err) {
    // Ignored: the submission is already recorded in the sheet.
  }
}

function reply(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
