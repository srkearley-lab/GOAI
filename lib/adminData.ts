import 'server-only';
/* ============================================================
   GO AI — /admin read layer over the `proposalRequests` collection.
   Serializes Firestore docs (Timestamps → ISO strings) for RSC rendering.
   ============================================================ */
import { getDb } from '@/lib/firebaseAdmin';
import type { GenerationEvent } from '@/types';

export interface AdminGeneration {
  status: string;
  sampleUrl?: string;
  repoUrl?: string;
  jobId?: string;
  error?: string;
  proposalSent?: boolean;
  proposalSentAt?: string | null;
  updatedAt?: string | null;
  events: GenerationEvent[];
}

export interface AdminLead {
  id: string;
  createdAt: string | null;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneWhatsapp: string;
  businessType: string;
  location: string;
  language: string;
  existingWebsiteUrl: string;
  needsHelp: string;
  message: string;
  estOneoff: number;
  estMonthly: number;
  items: { id: string; label: string }[];
  generation: AdminGeneration | null;
}

/* Firestore Timestamp | string | undefined → ISO string | null */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function iso(v: any): string | null {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate().toISOString();
  if (typeof v === 'string') return v;
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDoc(id: string, x: Record<string, any>): AdminLead {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: Record<string, any> | null = x.generation || null;
  return {
    id,
    createdAt: iso(x.createdAt),
    businessName: x.businessName || '',
    firstName: x.firstName || '',
    lastName: x.lastName || '',
    email: x.email || '',
    phoneWhatsapp: x.phoneWhatsapp || '',
    businessType: x.businessType || '',
    location: x.location || '',
    language: x.language || 'GR',
    existingWebsiteUrl: x.existingWebsiteUrl || '',
    needsHelp: x.needsHelp || '',
    message: x.message || '',
    estOneoff: Number(x.estOneoff) || 0,
    estMonthly: Number(x.estMonthly) || 0,
    items: Array.isArray(x.selectedProposalItems)
      ? x.selectedProposalItems.map((i: { id?: string; label?: string }) => ({ id: String(i?.id || ''), label: String(i?.label || i?.id || '') }))
      : [],
    generation: g
      ? {
          status: String(g.status || ''),
          sampleUrl: g.sampleUrl || undefined,
          repoUrl: g.repoUrl || undefined,
          jobId: g.jobId || undefined,
          error: g.error || undefined,
          proposalSent: g.proposalSent === true,
          proposalSentAt: iso(g.proposalSentAt),
          updatedAt: iso(g.updatedAt),
          events: Array.isArray(g.events)
            ? g.events.map((e: { at?: string; message?: string }) => ({ at: String(e?.at || ''), message: String(e?.message || '') }))
            : [],
        }
      : null,
  };
}

/** Newest-first lead list. Returns null when Firestore is unconfigured or unreachable. */
export async function fetchLeads(limit = 200): Promise<AdminLead[] | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await db.collection('proposalRequests').orderBy('createdAt', 'desc').limit(limit).get();
    return snap.docs.map((d) => mapDoc(d.id, d.data()));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] admin: Firestore read failed:', (e as Error)?.message?.slice(0, 200));
    return null;
  }
}

/** One lead; null = store unavailable, undefined = not found. */
export async function fetchLead(id: string): Promise<AdminLead | null | undefined> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await db.collection('proposalRequests').doc(id).get();
    if (!snap.exists) return undefined;
    return mapDoc(snap.id, snap.data() as Record<string, unknown>);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] admin: Firestore read failed:', (e as Error)?.message?.slice(0, 200));
    return null;
  }
}
