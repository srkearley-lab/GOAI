#!/usr/bin/env node
/* ============================================================
   GO AI — stub generation agent (stands in for the VPS Hermes agent).
   Lets you test the repo-side pipeline (enqueue → callback → prospect
   email → Firestore) before the real VPS exists.

   It signs/verifies with the SAME HMAC scheme as the app
   (HMAC-SHA256 hex of the raw body, header `x-goai-signature`,
   keyed by GENERATION_SHARED_SECRET) — so it doubles as a check
   that the signing contract matches.

   Requires Node 20.6+ for --env-file.

   USAGE
   -----
   1) Server mode — pretend to be the VPS endpoint:
        node --env-file=.env.local scripts/stub-generator.mjs serve 8787
      Then set in .env.local:  HERMES_VPS_ENDPOINT=http://localhost:8787
      Submit a brief on /contact → this receives it and, ~2s later, POSTs a
      signed `ready` callback back to the app with a placeholder sample URL.

   2) One-shot — fire a signed callback for a known briefId (tests the route
      directly, no submit needed):
        node --env-file=.env.local scripts/stub-generator.mjs callback \
          <briefId> <callbackUrl> [sampleUrl] [status]
      e.g. ... callback abc123 http://localhost:3000/api/generate/callback \
               https://acme-gym.preview.go-ai.gr ready
   ============================================================ */
import { createServer } from 'node:http';
import { createHmac } from 'node:crypto';

const SECRET = process.env.GENERATION_SHARED_SECRET || '';
const SIG_HEADER = 'x-goai-signature';
if (!SECRET) {
  console.error('Set GENERATION_SHARED_SECRET (e.g. run with --env-file=.env.local).');
  process.exit(1);
}

const sign = (raw) => createHmac('sha256', SECRET).update(raw).digest('hex');

async function postSigned(url, obj) {
  const raw = JSON.stringify(obj);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', [SIG_HEADER]: sign(raw) },
    body: raw,
  });
  const text = await res.text();
  console.log(`→ POST ${url} : ${res.status} ${text}`);
  return res.ok;
}

function slugify(s) {
  return (s || 'sample').toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'sample';
}

const mode = process.argv[2];

if (mode === 'callback') {
  const [, , , briefId, callbackUrl, sampleUrl, status] = process.argv;
  if (!briefId || !callbackUrl) {
    console.error('Usage: callback <briefId> <callbackUrl> [sampleUrl] [status]');
    process.exit(1);
  }
  await postSigned(callbackUrl, {
    briefId,
    status: status || 'ready',
    sampleUrl: sampleUrl || `https://${slugify(briefId)}.preview.go-ai.gr`,
    repoUrl: `https://github.com/goai-sites/${slugify(briefId)}`,
    jobId: `stub-${briefId}`,
    events: [{ at: new Date().toISOString(), message: 'stub: generated + deployed' }],
  });
  process.exit(0);
}

if (mode === 'serve') {
  const port = Number(process.argv[3] || 8787);
  createServer((req, res) => {
    if (req.method !== 'POST') { res.writeHead(405).end('method not allowed'); return; }
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', async () => {
      const ok = req.headers[SIG_HEADER] === sign(raw);
      console.log(`\n← enqueue received (sig ${ok ? 'OK' : 'BAD'})`);
      let job;
      try { job = JSON.parse(raw); } catch { res.writeHead(400).end('bad json'); return; }
      console.log(`  briefId=${job.briefId} business=${job.brief?.businessName} lang=${job.brief?.language}`);
      res.writeHead(202, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, accepted: job.briefId }));
      // Simulate build time, then call back.
      const slug = slugify(job.brief?.businessName || job.briefId);
      setTimeout(() => {
        postSigned(job.callbackUrl, {
          briefId: job.briefId,
          status: 'ready',
          sampleUrl: `https://${slug}.preview.go-ai.gr`,
          repoUrl: `https://github.com/goai-sites/${slug}`,
          jobId: `stub-${job.briefId}`,
          events: [{ at: new Date().toISOString(), message: 'stub: built + deployed' }],
        }).catch((e) => console.error('callback failed:', e.message));
      }, 2000);
    });
  }).listen(port, () => console.log(`Stub generation agent listening on http://localhost:${port}  (point HERMES_VPS_ENDPOINT here)`));
} else {
  console.error('Usage: stub-generator.mjs <serve [port] | callback <briefId> <callbackUrl> [sampleUrl] [status]>');
  process.exit(1);
}
