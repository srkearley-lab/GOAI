/* GO AI — /admin session endpoint.
   POST {idToken}  → verify + whitelist-check → set the session cookie.
   DELETE          → clear the session cookie (sign out). */
import { cookies } from 'next/headers';
import { createSession, ADMIN_COOKIE, SESSION_MS, adminConfigured } from '@/lib/adminAuth';

export async function POST(req: Request): Promise<Response> {
  if (!adminConfigured()) {
    return Response.json({ error: 'not-configured' }, { status: 503 });
  }
  let idToken = '';
  try {
    idToken = String((await req.json())?.idToken || '');
  } catch {
    /* fall through */
  }
  if (!idToken) return Response.json({ error: 'bad-request' }, { status: 400 });

  try {
    const session = await createSession(idToken);
    if (!session) return Response.json({ error: 'not-allowed' }, { status: 403 });
    (await cookies()).set(ADMIN_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MS / 1000,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'invalid-token' }, { status: 401 });
  }
}

export async function DELETE(): Promise<Response> {
  (await cookies()).set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return Response.json({ ok: true });
}
