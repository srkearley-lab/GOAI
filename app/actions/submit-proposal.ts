'use server';
/* ============================================================
   GO AI — proposal submission Server Action.
   BYPASS MODE: never fails the user. Persists to Firestore only
   if credentials are configured; otherwise logs the payload and
   returns success so the confirmation screen always shows.
   Swap in Resend / Firestore / a webhook here when ready.
   ============================================================ */
import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '@/lib/firebaseAdmin';
import { catAmount, catRecurring } from '@/lib/catalog';
import type { ProposalRequestInput, SubmitResult } from '@/types';

const cap = (s: unknown, n: number): string => (typeof s === 'string' ? s.slice(0, n) : '');

function validate(p: ProposalRequestInput): string | null {
  if (!p.firstName?.trim()) return 'name';
  if (!p.businessName?.trim()) return 'business';
  if (!p.email?.trim() && !p.phoneWhatsapp?.trim()) return 'contact';
  if (!Array.isArray(p.selectedProposalItems) || p.selectedProposalItems.length === 0) return 'service';
  return null;
}

export async function submitProposal(input: ProposalRequestInput): Promise<SubmitResult> {
  const invalid = validate(input);
  if (invalid) return { ok: false, error: `validation:${invalid}` };

  // Always capture the lead in server logs until a delivery channel is wired up.
  try {
    // eslint-disable-next-line no-console
    console.log('[GO AI] proposal-request', JSON.stringify(input));
  } catch {}

  // Best-effort persist to Firestore — only if credentials are configured.
  const db = getDb();
  if (db) {
    try {
      const ids = input.selectedProposalItems.map((i) => i.id);
      const estOneoff = ids.filter((id) => !catRecurring(id)).reduce((sum, id) => sum + catAmount(id), 0);
      const estMonthly = ids.filter((id) => catRecurring(id)).reduce((sum, id) => sum + catAmount(id), 0);

      const doc = {
        language: input.language,
        selectedProposalItems: input.selectedProposalItems.map((i) => ({ id: cap(i.id, 80), label: cap(i.label, 160) })),
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
        status: 'new',
        source: 'contact-wizard',
        createdAt: FieldValue.serverTimestamp(),
      };

      const ref = await db.collection('proposalRequests').add(doc);
      return { ok: true, id: ref.id };
    } catch {
      // Persistence failed — don't block the user; fall through to soft success.
      // eslint-disable-next-line no-console
      console.warn('[GO AI] Firestore write failed; returning soft success.');
    }
  }

  // Bypass: no backend configured (or write failed) — succeed anyway for now.
  return { ok: true, id: 'pending' };
}
