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

// Minimum time on the page before a submission is trusted, per form variant.
// The dwell check exists to catch scripted posts that fill and submit instantly,
// so the bar has to scale with how much there is to fill in: the contact form
// asks for five fields, the newsletter form asks for an email address and
// nothing else, and holding both to the same 3s made honest one-field
// submissions look like bots. The newsletter form also plays a 1.5s send
// animation before it posts, so a real visitor clears 1500 without waiting.
//
// Deliberately server-side. The page sends its own minimumSubmissionMs and this
// ignores it: a threshold the client can name is a threshold a bot can set to
// zero. variant is client-supplied too, so a bot can claim the lower bar by
// posting variant: 'newsletter-subscribe' — accepted, because 1500 vs 3000
// barely inconveniences a bot, while the honeypot and the per-client and
// hourly throttles are what actually carry the load here.
const MINIMUM_SUBMISSION_MS = { 'newsletter-subscribe': 1500 };
const DEFAULT_MINIMUM_SUBMISSION_MS = 3000;

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
  const minimumMs = MINIMUM_SUBMISSION_MS[data.variant] || DEFAULT_MINIMUM_SUBMISSION_MS;
  const suspect =
    !Number.isFinite(elapsedMs) ||
    elapsedMs < minimumMs ||
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
  // Two names, deliberately. The greeting needs a fallback for the newsletter
  // form, which posts no name at all; the internal notification needs the raw
  // value, or the 'there' placeholder leaks into its subject and Name line and
  // a nameless subscriber is reported as being called "there".
  const rawName = String(data.name || '').trim();
  const name = rawName || 'there';
  const organisation = String(data.organisation || '').trim();
  const info = String(data.furtherInformation || '').trim();
  const chosen = INTERESTS.filter((interest, i) => interestFlags[i]);

  const blocks = [];
  // A submission with no interest ticked is someone using the contact form to
  // send a plain message. It used to produce an internal notification and no
  // reply at all, so the sender heard nothing back and had no way to tell the
  // message had arrived.
  if (!chosen.length) {
    blocks.push(
      'Your message has reached us directly and we read every one. We reply to the ones that need a reply, so if yours does, expect to hear from us; there is nothing further you need to do in the meantime.',
    );
  }
  if (chosen.indexOf('network') !== -1) {
    blocks.push(
      'Ethical AI Network application: applications are reviewed on a rolling basis and we receive a high volume of them, so we reply to successful applicants within 4 weeks. If you have not heard from us by then, the application was unfortunately not successful this time. Membership is contribution-driven, so you can read how it works at https://ethical.institute/membership/ and strengthen a future application. Thank you for taking the time to apply!',
    );
  }
  if (chosen.indexOf('newsletter') !== -1) {
    blocks.push(
      'The Machine Learning Engineer newsletter: you are subscribed. Issues go out weekly with curated ML engineering reading, and every past issue is archived at https://ethical.institute/newsletter/. Every issue carries an unsubscribe link, so you can leave whenever you like.',
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
  // Every interest now contributes a block, so a newsletter-only submission is
  // answered too. It previously was not, on the assumption that Brevo would
  // send its own confirmation: adding a contact through POST /v3/contacts sends
  // nothing at all unless a welcome automation or double opt-in workflow is
  // configured on the list, and none is, so subscribers were being added in
  // silence. blocks.length is still the guard, for a submission that selected
  // no interest at all.
  if (blocks.length) {
    // A pure newsletter signup is a subscription confirmation, not a response
    // to a form, and "Submission Information" reads like neither a welcome nor
    // anything the subscriber asked for. Keyed on the chosen interest rather
    // than on data.variant so a newsletter-only tick on the contact form is
    // recognised as the same thing.
    const newsletterOnly = chosen.length === 1 && chosen[0] === 'newsletter';
    const replySubject = newsletterOnly
      ? "You're subscribed to The Machine Learning Engineer newsletter"
      : 'Submission Information - The Institute for Ethical AI Alignment & Safety';
    const replyBody = newsletterOnly
      ? 'Hi ' + name + '!\n\n' + blocks.join('\n\n') + '\n'
      : 'Hi ' +
        name +
        '! Thank you for your submission.\n\nImportant info about your response:\n\n' +
        blocks.join('\n\n') +
        '\n';
    MailApp.sendEmail(email, replySubject, replyBody);
  }

  const role = String(data.role || '').trim();
  const tag = chosen.length ? chosen.join(',').toUpperCase() : 'OTHER';
  const who = role || rawName || email;
  const subject = `[EthicalML] [${tag}]: ${organisation || 'no organisation'}, ${who}`;
  const body = `${subject}\n\nName: ${rawName || '-'}\nEmail: ${email}\nRole: ${role || '-'}\nPage: ${data.page || ''}\n\n${info}`;
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
  // listId > 0 rather than Number.isFinite: a missing property reads as null,
  // Number(null) is 0, and isFinite(0) is true, so the old guard let an unset
  // BREVO_LIST_ID through and posted listIds: [0] for Brevo to reject.
  if (!apiKey || !(listId > 0)) {
    console.error('Brevo not configured: apiKey=%s listId=%s', !!apiKey, listId);
    return;
  }
  try {
    const res = UrlFetchApp.fetch('https://api.brevo.com/v3/contacts', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'api-key': apiKey },
      payload: JSON.stringify({ email: email, updateEnabled: true, listIds: [listId] }),
      muteHttpExceptions: true,
    });
    const code = res.getResponseCode();
    if (code < 200 || code >= 300) {
      console.error('Brevo %s for %s: %s', code, email, res.getContentText());
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        '[EthicalML] Brevo subscribe failed',
        code + ' for ' + email + '\n\n' + res.getContentText(),
      );
    }
  } catch (err) {
    // Logged, not rethrown: the submission is already recorded in the sheet.
    console.error('Brevo threw for %s: %s', email, err);
  }
}

// Run straight from the Apps Script editor to see the real Brevo response
// without going through the form. Check Executions for the logged output.
function testBrevo() {
  addToBrevo('axsauze+brevotest@gmail.com');
}

// Reports the egress IP of this execution. Apps Script has no static outbound
// address, so running it repeatedly returns different IPs from Google's shared
// pool: that is why Brevo's authorised-IP list cannot be made to fit it.
function myIp() {
  console.log(UrlFetchApp.fetch('https://api.ipify.org').getContentText());
}

function reply(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
