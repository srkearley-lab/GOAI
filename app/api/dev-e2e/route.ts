/* TEMPORARY route for one live end-to-end test of the generation pipeline.
   Calls the real submitProposal server action (validation → team email →
   Firestore → enqueueGeneration) exactly as the contact wizard does.
   Guarded by the shared generation secret; 404s without it.
   REMOVE after the e2e run. */
import { submitProposal } from '@/app/actions/submit-proposal';

export async function POST(req: Request): Promise<Response> {
  if (req.headers.get('x-goai-e2e') !== process.env.GENERATION_SHARED_SECRET) {
    return new Response('not found', { status: 404 });
  }
  const input = await req.json();
  const result = await submitProposal(input);
  return Response.json(result);
}
