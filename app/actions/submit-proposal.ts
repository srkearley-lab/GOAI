'use server';
/* ============================================================
   GO AI — proposal submission Server Action.
   On every valid submit it emails the lead to the team (Resend) AND persists
   it (Firestore) — both run together so a notification always goes out:
     • Email     (RESEND_API_KEY)     — notify RESEND_TO (support@go-ai.gr)
     • Firestore (FIREBASE_* env)     — structured store (optional)
     • Webhook   (LEAD_WEBHOOK_URL)   — last-resort fallback
   Returns { ok:true } only when a channel actually accepts the lead; otherwise
   { ok:false, error:'delivery' } so the UI surfaces the prefilled WhatsApp
   fallback — we never fake success and silently drop a lead.
   ============================================================ */
import { after } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '@/lib/firebaseAdmin';
import { catAmount, catRecurring } from '@/lib/catalog';
import { sendEmail } from '@/lib/resend';
import { enqueueGeneration } from '@/lib/generation';
import type { ProposalRequestInput, SubmitResult, ProposalLead, GenerationStatus } from '@/types';

const cap = (s: unknown, n: number): string => (typeof s === 'string' ? s.slice(0, n) : '');

/** Required so we can actually follow up. Services are OPTIONAL — an empty
 *  selection is a valid "help me choose / recommend for me" request, which the
 *  wizard's "Continue without" button and intro copy explicitly invite. */
function validate(p: ProposalRequestInput): string | null {
  if (!p.firstName?.trim()) return 'name';
  if (!p.businessName?.trim()) return 'business';
  if (!p.email?.trim() && !p.phoneWhatsapp?.trim()) return 'contact';
  return null;
}

/** Normalized, length-capped lead record shared by every delivery channel. */
function buildLead(input: ProposalRequestInput): ProposalLead {
  const items = Array.isArray(input.selectedProposalItems) ? input.selectedProposalItems : [];
  const ids = items.map((i) => i.id);
  const estOneoff = ids.filter((id) => !catRecurring(id)).reduce((sum, id) => sum + catAmount(id), 0);
  const estMonthly = ids.filter((id) => catRecurring(id)).reduce((sum, id) => sum + catAmount(id), 0);
  return {
    language: input.language,
    selectedProposalItems: items.map((i) => ({ id: cap(i.id, 80), label: cap(i.label, 160) })),
    firstName: cap(input.firstName, 120),
    lastName: cap(input.lastName, 120),
    businessName: cap(input.businessName, 200),
    email: cap(input.email, 200),
    phoneWhatsapp: cap(input.phoneWhatsapp, 60),
    businessType: cap(input.businessType, 120),
    location: cap(input.location, 200),
    existingWebsiteUrl: cap(input.existingWebsiteUrl, 300),
    needsHelp: cap(input.needsHelp, 400),
    message: cap(input.message, 4000),
    estOneoff,
    estMonthly,
    source: 'contact-wizard' as const,
  };
}

type Lead = ReturnType<typeof buildLead>;

/** Persist to Firestore if FIREBASE_* credentials are configured. Returns the
 *  new document id (the generation brief id) so the agent can be tracked. */
async function deliverToFirestore(lead: Lead): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  // Only seed a generation record when the agent is actually wired up, so we
  // don't leave perpetually-"queued" docs (or promise a sample) before launch.
  const gen = process.env.HERMES_VPS_ENDPOINT
    ? { generation: { status: 'queued' as GenerationStatus, updatedAt: FieldValue.serverTimestamp() } }
    : {};
  try {
    const ref = await db.collection('proposalRequests').add({
      ...lead,
      status: 'new',
      ...gen,
      createdAt: FieldValue.serverTimestamp(),
    });
    return ref.id;
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] Firestore write failed.');
    return null;
  }
}

/** POST the lead to a generic webhook (Zapier / Make / n8n / serverless). */
async function deliverToWebhook(lead: Lead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] Lead webhook POST failed.');
    return false;
  }
}

/** HTML body for the lead-notification email (user input is escaped). */
function buildEmailHtml(lead: Lead): string {
  const esc = (s: string) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch] as string));
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ');
  const row = (label: string, val: string) => (val ? `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#16181d;font-size:13px">${esc(val)}</td></tr>` : '');
  const services = lead.selectedProposalItems.length
    ? '<ul style="margin:6px 0 0;padding-left:18px;color:#16181d;font-size:13px">' + lead.selectedProposalItems.map((i) => `<li style="margin:2px 0">${esc(i.label || i.id)}</li>`).join('') + '</ul>'
    : '<span style="color:#6b7280;font-size:13px">— none selected (wants a recommendation)</span>';
  const est = [lead.estOneoff ? `€${lead.estOneoff.toLocaleString('el-GR')} one-off` : '', lead.estMonthly ? `€${lead.estMonthly.toLocaleString('el-GR')}/mo` : ''].filter(Boolean).join(' · ') || '—';
  const block = (label: string, val: string) => (val ? `<div style="margin-top:14px"><div style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em">${label}</div><div style="color:#16181d;font-size:13px;margin-top:4px;white-space:pre-wrap">${esc(val)}</div></div>` : '');
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e1e3ea;border-radius:14px;overflow:hidden">
    <div style="background:#4f46e5;padding:18px 22px;color:#fff">
      <div style="font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;opacity:.85">GO AI · New proposal request</div>
      <div style="font-size:20px;font-weight:800;margin-top:4px">${esc(lead.businessName || name || 'New lead')}</div>
    </div>
    <div style="padding:20px 22px">
      <table style="width:100%;border-collapse:collapse">
        ${row('Name', name)}${row('Business', lead.businessName)}${row('Type', lead.businessType)}${row('Location', lead.location)}${row('Email', lead.email)}${row('Phone / WhatsApp', lead.phoneWhatsapp)}${row('Existing site', lead.existingWebsiteUrl)}${row('Language', lead.language)}
      </table>
      <div style="margin-top:16px"><div style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em">Selected services</div>${services}</div>
      <div style="margin-top:14px"><div style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em">Estimate</div><div style="color:#4f46e5;font-size:14px;font-weight:800;margin-top:4px">${est}</div></div>
      ${block('Needs', lead.needsHelp)}${block('Message', lead.message)}
    </div>
    <div style="padding:12px 22px;background:#f4f5f7;color:#8b92a0;font-size:11px">Sent from the GO AI contact wizard · ${esc(lead.source)}</div>
  </div></body></html>`;
}

/** Email the lead to the team via the shared Resend helper. */
async function deliverToEmail(lead: Lead): Promise<boolean> {
  const to = process.env.RESEND_TO || 'support@go-ai.gr';
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ');
  return sendEmail({
    to,
    subject: `New proposal request — ${lead.businessName || name || 'New lead'}`,
    html: buildEmailHtml(lead),
    replyTo: lead.email || undefined,
  });
}

export async function submitProposal(input: ProposalRequestInput): Promise<SubmitResult> {
  const invalid = validate(input);
  if (invalid) return { ok: false, error: `validation:${invalid}` };

  const lead = buildLead(input);

  // Email the team (Resend) and persist (Firestore) together — the email always
  // fires so the owner is notified on every valid submit.
  const [emailed, briefId] = await Promise.all([deliverToEmail(lead), deliverToFirestore(lead)]);
  let delivered = emailed || !!briefId;
  if (!delivered) delivered = await deliverToWebhook(lead);

  // Best-effort, non-blocking: hand the stored brief to the generation agent.
  // Runs after the response is sent, so it never adds latency or fails the lead.
  if (briefId && process.env.HERMES_VPS_ENDPOINT) after(async () => { await enqueueGeneration(lead, briefId); });

  if (delivered) return { ok: true, id: 'received' };

  // Nothing accepted the lead — do NOT fake success (that silently drops it).
  // The UI shows the prefilled WhatsApp fallback so the lead still reaches us.
  // eslint-disable-next-line no-console
  console.warn(`[GO AI] proposal not delivered — no channel succeeded (hasEmail=${!!lead.email}, hasPhone=${!!lead.phoneWhatsapp}). UI falls back to WhatsApp.`);
  return { ok: false, error: 'delivery' };
}
