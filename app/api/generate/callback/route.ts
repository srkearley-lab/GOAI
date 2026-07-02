/* ============================================================
   GO AI — generation result callback.
   The VPS Hermes agent POSTs build results here (HMAC-signed).
   The agent itself emails the prospect (proposal PDF + sample
   link); this route only RECORDS the outcome on the Firestore
   doc so the team/admin side sees the full lifecycle:
   queued → building → ready|failed, proposal sent at <time>.
   ============================================================ */
import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '@/lib/firebaseAdmin';
import { verifySignature, SIGNATURE_HEADER } from '@/lib/generation';
import type { GenerationCallback } from '@/types';

export async function POST(req: Request): Promise<Response> {
  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get(SIGNATURE_HEADER))) {
    return new Response('unauthorized', { status: 401 });
  }

  let body: GenerationCallback;
  try {
    body = JSON.parse(raw) as GenerationCallback;
  } catch {
    return new Response('bad request', { status: 400 });
  }
  if (!body?.briefId || !body?.status) return new Response('bad request', { status: 400 });

  const db = getDb();
  if (!db) return new Response('store unavailable', { status: 503 });

  const ref = db.collection('proposalRequests').doc(body.briefId);
  const snap = await ref.get();
  if (!snap.exists) return new Response('not found', { status: 404 });

  // Merge the latest generation state onto the doc (admin-side record).
  const gen: Record<string, unknown> = { status: body.status, updatedAt: FieldValue.serverTimestamp() };
  if (body.sampleUrl) gen.sampleUrl = body.sampleUrl;
  if (body.repoUrl) gen.repoUrl = body.repoUrl;
  if (body.jobId) gen.jobId = body.jobId;
  if (body.error) gen.error = body.error;
  if (body.proposalSent === true) {
    gen.proposalSent = true;
    gen.proposalSentAt = FieldValue.serverTimestamp();
  }
  await ref.set({ generation: gen }, { merge: true });
  if (body.events?.length) {
    await ref.update({ 'generation.events': FieldValue.arrayUnion(...body.events) });
  }

  return Response.json({ ok: true });
}
