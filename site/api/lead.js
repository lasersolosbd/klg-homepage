// Receives the KLG contact form and creates/updates the contact in GoHighLevel (Kind Logic Group
// sub-account). The GHL token lives only in the Vercel env var GHL_API_TOKEN, never in the page.
// Fails loudly (503/502) instead of silently dropping leads.

const LOCATION_ID = process.env.GHL_LOCATION_ID || '7OvzyRUXiyMjsGZx7ypk'; // Kind Logic Group sub-account
const CONSENT_VERSION = '2026-10-12-v1';
const FIELD = {
  leadSourceSite: 'kYjYbiuTG77Rd2uMmY0d',
  contactMessage: 'GSanOw6ch6GwMIZr8ssw',
  smsConsentTimestamp: '8VzdA8ykwR1fZonm2p0b',
  smsConsentVersion: 'uEinuRm5Etir7q4hHMUk',
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const s = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  const token = process.env.GHL_API_TOKEN;
  if (!token) { console.error('lead: GHL_API_TOKEN is not set'); return res.status(503).json({ ok: false, error: 'not_configured' }); }

  const b = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  if (s(b.hp, 100)) return res.status(200).json({ ok: true }); // honeypot: pretend success to bots

  const name = s(b.name, 120), email = s(b.email, 200), phone = s(b.phone, 40);
  const organization = s(b.organization, 160), message = s(b.message, 4000);
  if (!name || !EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: 'invalid_input' });
  if (phone && phone.replace(/\D/g, '').length < 10) return res.status(400).json({ ok: false, error: 'invalid_phone' });

  // Texting is opt-in only: a consent box counts only when a phone number was given.
  const service = b.sms_service === true && !!phone;
  const marketing = b.sms_marketing === true && !!phone;
  const consentAt = new Date().toISOString();
  const tags = ['source-klg-site', 'klg-contact-form'];
  if (service) tags.push('sms-service-opt-in');
  if (marketing) tags.push('sms-marketing-opt-in');
  if (phone && !service && !marketing) tags.push('no-sms-consent');

  const customFields = [{ id: FIELD.leadSourceSite, field_value: 'KLG website' }];
  if (message) customFields.push({ id: FIELD.contactMessage, field_value: message });
  if (service || marketing) {
    customFields.push({ id: FIELD.smsConsentTimestamp, field_value: consentAt });
    customFields.push({ id: FIELD.smsConsentVersion, field_value: CONSENT_VERSION });
  }

  const payload = { locationId: LOCATION_ID, name, email, source: 'KLG Website Contact Form', customFields };
  if (phone) payload.phone = phone;
  if (organization) payload.companyName = organization;

  try {
    const r = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) { console.error('lead: GHL responded', r.status, (await r.text()).slice(0, 500)); return res.status(502).json({ ok: false, error: 'upstream_error' }); }
    const data = await r.json().catch(() => ({}));
    const contactId = data && data.contact && data.contact.id;
    if (!contactId) { console.error('lead: no contact id in GHL response'); return res.status(502).json({ ok: false, error: 'upstream_error' }); }
    // Tags are added separately: the upsert endpoint's `tags` field OVERWRITES existing tags,
    // which would wipe earlier consent/source tags if the same person submits again or on the other site.
    const t = await fetch('https://services.leadconnectorhq.com/contacts/' + encodeURIComponent(contactId) + '/tags', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ tags }),
    });
    if (!t.ok) { console.error('lead: GHL add-tags responded', t.status, (await t.text()).slice(0, 500)); return res.status(502).json({ ok: false, error: 'upstream_error' }); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('lead: GHL request failed', e && e.message);
    return res.status(502).json({ ok: false, error: 'upstream_unreachable' });
  }
};

function safeParse(t) { try { return JSON.parse(t); } catch (e) { return {}; } }
