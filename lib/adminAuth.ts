import 'server-only';
/* ============================================================
   GO AI — /admin access control (Firebase Auth + whitelist).
   Sign-in happens client-side (email/password or Google via the
   Firebase Web SDK); the server verifies the ID token, checks the
   email against ADMIN_ALLOWED_EMAILS (comma-separated), and issues
   a Firebase session cookie. Every admin request re-verifies the
   cookie AND the whitelist, so removing an email revokes access.
   ============================================================ */
import { getAdminAuth } from '@/lib/firebaseAdmin';

export const ADMIN_COOKIE = 'goai_admin';
export const SESSION_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

function whitelist(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function adminConfigured(): boolean {
  return whitelist().length > 0 && !!getAdminAuth();
}

export function isAllowedEmail(email: string | undefined): boolean {
  return !!email && whitelist().includes(email.toLowerCase());
}

/** ID token (fresh, from the client SDK) → session cookie value, or null when
 *  the account isn't whitelisted / auth is unavailable. */
export async function createSession(idToken: string): Promise<string | null> {
  const auth = getAdminAuth();
  if (!auth) return null;
  const decoded = await auth.verifyIdToken(idToken);
  if (!isAllowedEmail(decoded.email)) return null;
  return auth.createSessionCookie(idToken, { expiresIn: SESSION_MS });
}

/** Session cookie → signed-in admin email, or null. */
export async function verifySession(cookieValue: string | undefined): Promise<string | null> {
  if (!cookieValue) return null;
  const auth = getAdminAuth();
  if (!auth) return null;
  try {
    const decoded = await auth.verifySessionCookie(cookieValue, false);
    return isAllowedEmail(decoded.email) ? (decoded.email as string) : null;
  } catch {
    return null;
  }
}
