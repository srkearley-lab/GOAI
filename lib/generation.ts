import 'server-only';
/* ============================================================
   GO AI — generation pipeline glue (app side).
   - Signs/verifies the HMAC shared with the VPS Hermes agent.
   - buildProposalData: snapshots catalog pricing/copy for the brief so the
     agent can RENDER the proposal PDF without ever storing prices itself
     (lib/catalog.ts stays the single source of truth).
   - enqueueGeneration: hands the stored brief + proposal data to the agent.
   The agent (generate → build → deploy → email the prospect) runs on the
   VPS; the app only enqueues and records results for the admin side.
   ============================================================ */
import { createHmac, timingSafeEqual } from 'crypto';
import { cat, catLabel, catPrice, catAmount, catRecurring, catFeatures, GROUP_TITLES } from '@/lib/catalog';
import type { ProposalLead, ProposalData, ProposalDataItem, Group } from '@/types';

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

/** Wizard step order — the PDF lists services in the order the client chose them. */
const GROUP_ORDER: Group[] = ['website', 'digital', 'automation', 'support'];

/** Localized snapshot of everything the PDF needs, taken from the live catalog
 *  at enqueue time. Items keep wizard-group order; unknown/stale ids degrade to
 *  the label captured at selection time. */
export function buildProposalData(lead: ProposalLead): ProposalData {
  const lang = lead.language === 'GR' ? 'GR' : 'EN';
  const byGroup = new Map<Group, ProposalDataItem[]>();
  const ungrouped: ProposalDataItem[] = [];

  for (const sel of lead.selectedProposalItems || []) {
    const item = cat(sel.id);
    const entry: ProposalDataItem = item
      ? {
          id: sel.id,
          label: catLabel(sel.id, lang),
          priceLabel: catPrice(sel.id, lang),
          desc: item.desc[lang],
          bestFor: item.best[lang],
          features: catFeatures(sel.id, lang) || [],
          amount: catAmount(sel.id),
          recurring: catRecurring(sel.id),
          groupTitle: GROUP_TITLES[item.group][lang],
          note:
            sel.id === 'crm-platform'
              ? lang === 'GR'
                ? 'Το εφάπαξ στήσιμο €350 τιμολογείται στην έναρξη — δεν περιλαμβάνεται στο μηνιαίο σύνολο.'
                : 'The €350 one-off setup is billed at kickoff — not included in the monthly total.'
              : undefined,
        }
      : {
          id: sel.id,
          label: sel.label || sel.id,
          priceLabel: '',
          desc: '',
          bestFor: '',
          features: [],
          amount: 0,
          recurring: false,
          groupTitle: '',
        };
    if (item) {
      const list = byGroup.get(item.group) || [];
      list.push(entry);
      byGroup.set(item.group, list);
    } else {
      ungrouped.push(entry);
    }
  }

  const items: ProposalDataItem[] = [];
  for (const g of GROUP_ORDER) items.push(...(byGroup.get(g) || []));
  items.push(...ungrouped);

  return {
    items,
    totals: { oneoff: lead.estOneoff || 0, monthly: lead.estMonthly || 0 },
  };
}

/** POST the brief + proposal snapshot to the VPS generation agent. Best-effort:
 *  returns false (never throws) if the agent is unconfigured or unreachable, so
 *  a lead is never lost to a generation outage. */
export async function enqueueGeneration(lead: ProposalLead, briefId: string): Promise<boolean> {
  const endpoint = process.env.HERMES_VPS_ENDPOINT;
  if (!endpoint || !SECRET) return false;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://go-ai.gr';
  const payload = JSON.stringify({
    briefId,
    brief: lead,
    proposalData: buildProposalData(lead),
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
