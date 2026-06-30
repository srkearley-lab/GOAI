/* ============================================================
   GO AI — generation result callback.
   The VPS Hermes agent POSTs build results here (HMAC-signed).
   We update the proposalRequests doc and, on a green ('ready')
   build, email the prospect their live sample link — once.
   ============================================================ */
import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '@/lib/firebaseAdmin';
import { verifySignature, sendSampleToProspect, SIGNATURE_HEADER } from '@/lib/generation';
import type { GenerationCallback, ProposalLead } from '@/types';

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

  // Merge the latest generation state onto the doc.
  const gen: Record<string, unknown> = { status: body.status, updatedAt: FieldValue.serverTimestamp() };
  if (body.sampleUrl) gen.sampleUrl = body.sampleUrl;
  if (body.repoUrl) gen.repoUrl = body.repoUrl;
  if (body.jobId) gen.jobId = body.jobId;
  if (body.error) gen.error = body.error;
  await ref.set({ generation: gen }, { merge: true });
  if (body.events?.length) {
    await ref.update({ 'generation.events': FieldValue.arrayUnion(...body.events) });
  }

  // Fully-automatic prospect email — only on a green build, and only once.
  if (body.status === 'ready' && body.sampleUrl) {
    const data = snap.data() as Record<string, unknown>;
    const alreadySent = (data.generation as { sampleSent?: boolean } | undefined)?.sampleSent === true;
    const lead = data as unknown as ProposalLead;
    if (!alreadySent && lead.email) {
      const sent = await sendSampleToProspect(lead, body.sampleUrl);
      await ref.set(
        { generation: { sampleSent: sent, sampleSentAt: FieldValue.serverTimestamp() } },
        { merge: true },
      );
    }
  }

  return Response.json({ ok: true });
}
