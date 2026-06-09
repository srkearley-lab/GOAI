'use server';
/* ============================================================
   GO AI — proposal submission Server Action.
   Captures the lead via the first configured channel that accepts it:
     1. Firestore (FIREBASE_* env)       — preferred structured store
     2. Webhook   (LEAD_WEBHOOK_URL env) — POST the lead as JSON
   Returns { ok:true } ONLY when a channel actually accepts the lead.
   If nothing is configured (or every channel fails) it returns
   { ok:false, error:'delivery' } so the UI surfaces the prefilled
   WhatsApp fallback — we never fake success and silently drop a lead.
   ============================================================ */
import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '@/lib/firebaseAdmin';
import { catAmount, catRecurring } from '@/lib/catalog';
import type { ProposalRequestInput, SubmitResult } from '@/types';

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
function buildLead(input: ProposalRequestInput) {
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

/** Persist to Firestore if FIREBASE_* credentials are configured. */
async function deliverToFirestore(lead: Lead): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db.collection('proposalRequests').add({ ...lead, status: 'new', createdAt: FieldValue.serverTimestamp() });
    return true;
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] Firestore write failed.');
    return false;
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

export async function submitProposal(input: ProposalRequestInput): Promise<SubmitResult> {
  const invalid = validate(input);
  if (invalid) return { ok: false, error: `validation:${invalid}` };

  const lead = buildLead(input);

  // Capture via the first channel that succeeds.
  if (await deliverToFirestore(lead)) return { ok: true, id: 'received' };
  if (await deliverToWebhook(lead)) return { ok: true, id: 'received' };

  // Nothing accepted the lead — do NOT fake success (that silently drops it).
  // The UI shows the prefilled WhatsApp fallback so the lead still reaches us.
  // eslint-disable-next-line no-console
  console.warn(`[GO AI] proposal not delivered — no channel configured (hasEmail=${!!lead.email}, hasPhone=${!!lead.phoneWhatsapp}). UI falls back to WhatsApp.`);
  return { ok: false, error: 'delivery' };
}
