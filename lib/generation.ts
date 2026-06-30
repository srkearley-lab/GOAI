import 'server-only';
/* ============================================================
   GO AI — generation pipeline glue (app side).
   - Signs/verifies the HMAC shared with the VPS Hermes agent.
   - enqueueGeneration: hands a stored brief to the agent (best-effort).
   - sendSampleToProspect: emails the prospect their live sample link.
   The agent itself (generate → build → deploy) runs on the VPS; this
   module is only the app's outbound enqueue + inbound-result helpers.
   ============================================================ */
import { createHmac, timingSafeEqual } from 'crypto';
import { sendEmail, escapeHtml } from '@/lib/resend';
import type { ProposalLead } from '@/types';

const SECRET = process.env.GENERATION_SHARED_SECRET || '';
const SIG_HEADER = 'x-goai-signature';

/** Hex HMAC-SHA256 of the raw request body, keyed by the shared secret. */
export function signPayload(raw: string): string {
  return createHmac('sha256', SECRET).update(raw).digest('hex');
}

/** Constant-time verification of an inbound signature against the raw body. */
export function verifySignature(raw: string, signature: string | null): boolean {
  if (!SECRET || !signature) return false;
  const expected = signPayload(raw);
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export const SIGNATURE_HEADER = SIG_HEADER;

/** POST the brief to the VPS generation agent. Best-effort: returns false
 *  (never throws) if the agent is unconfigured or unreachable, so a lead is
 *  never lost to a generation outage. */
export async function enqueueGeneration(lead: ProposalLead, briefId: string): Promise<boolean> {
  const endpoint = process.env.HERMES_VPS_ENDPOINT;
  if (!endpoint || !SECRET) return false;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://go-ai.gr';
  const payload = JSON.stringify({
    briefId,
    brief: lead,
    callbackUrl: `${siteUrl}/api/generate/callback`,
  });
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [SIG_HEADER]: signPayload(payload) },
      body: payload,
      signal: AbortSignal.timeout(6000),
    });
    // eslint-disable-next-line no-console
    if (!res.ok) console.warn('[GO AI] generation enqueue rejected:', res.status);
    return res.ok;
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] generation enqueue failed (VPS unreachable).');
    return false;
  }
}

/** Bilingual HTML for the prospect's "your sample is ready" email. */
function buildSampleEmailHtml(lead: ProposalLead, sampleUrl: string, gr: boolean): string {
  const url = escapeHtml(sampleUrl);
  const biz = escapeHtml(lead.businessName || (gr ? 'την επιχείρησή σας' : 'your business'));
  const hi = gr ? `Γεια σας${lead.firstName ? ' ' + escapeHtml(lead.firstName) : ''},` : `Hi${lead.firstName ? ' ' + escapeHtml(lead.firstName) : ''},`;
  const lead1 = gr
    ? `Φτιάξαμε ένα <strong>δωρεάν δείγμα</strong> ιστοσελίδας για ${biz}. Είναι ζωντανό — ρίξτε μια ματιά:`
    : `We've put together a <strong>free sample</strong> website for ${biz}. It's live — take a look:`;
  const btn = gr ? 'Δείτε το δείγμα σας' : 'View your sample';
  const note = gr
    ? 'Είναι ένα πρώτο AI προσχέδιο για να πάρετε μια ιδέα. Αν σας αρέσει, απαντήστε σε αυτό το email και η ομάδα μας το τελειοποιεί και το κάνει δικό σας.'
    : "It's an early AI draft to give you the idea. If you like it, just reply to this email and our team will polish it and make it yours.";
  const sign = gr ? 'Η ομάδα της GO AI' : 'The GO AI team';
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e1e3ea;border-radius:14px;overflow:hidden">
    <div style="background:#4f46e5;padding:20px 24px;color:#fff">
      <div style="font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.85">GO AI</div>
      <div style="font-size:20px;font-weight:800;margin-top:4px">${gr ? 'Το δείγμα σας είναι έτοιμο' : 'Your sample is ready'}</div>
    </div>
    <div style="padding:24px">
      <p style="font-size:15px;color:#16181d;margin:0 0 12px">${hi}</p>
      <p style="font-size:15px;color:#16181d;line-height:1.6;margin:0 0 20px">${lead1}</p>
      <a href="${url}" style="display:inline-block;background:#4f46e5;color:#fff;font-size:15px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:10px">${btn} →</a>
      <p style="font-size:13px;color:#565d6b;line-height:1.6;margin:22px 0 0">${note}</p>
      <p style="font-size:13px;color:#8b92a0;margin:20px 0 0">${sign}</p>
    </div>
    <div style="padding:12px 24px;background:#f4f5f7;color:#8b92a0;font-size:11px;word-break:break-all">${url}</div>
  </div></body></html>`;
}

/** Email the prospect their live sample link. Caller must only invoke this on a
 *  green ('ready') build. Returns false if the prospect gave no email. */
export async function sendSampleToProspect(lead: ProposalLead, sampleUrl: string): Promise<boolean> {
  if (!lead.email) return false;
  const gr = lead.language === 'GR';
  const subject = gr
    ? `${lead.businessName || 'Η επιχείρησή σας'} — το δείγμα ιστοσελίδας σας είναι έτοιμο`
    : `${lead.businessName || 'Your business'} — your sample website is ready`;
  return sendEmail({
    to: lead.email,
    subject,
    html: buildSampleEmailHtml(lead, sampleUrl, gr),
    replyTo: process.env.RESEND_TO || 'support@go-ai.gr',
  });
}
