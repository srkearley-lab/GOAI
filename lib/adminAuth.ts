import 'server-only';
/* ============================================================
   GO AI — /admin team session (lightweight, no user accounts).
   One shared password (ADMIN_PASSWORD env) → an HttpOnly cookie
   holding `expiry.hmac(expiry)` signed with a key derived from
   the password. No DB, no external auth service.
   ============================================================ */
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'goai_admin';
const SESSION_SECONDS = 7 * 24 * 60 * 60; // 1 week

function pass(): string {
  return process.env.ADMIN_PASSWORD || '';
}

function sig(exp: string): string {
  return createHmac('sha256', 'goai-admin:' + pass()).update(exp).digest('hex');
}

export function adminConfigured(): boolean {
  return pass().length > 0;
}

export function checkPassword(candidate: string): boolean {
  const a = Buffer.from(candidate || '', 'utf8');
  const b = Buffer.from(pass(), 'utf8');
  return b.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export function makeSession(): { name: string; value: string; maxAge: number } {
  const exp = String(Date.now() + SESSION_SECONDS * 1000);
  return { name: ADMIN_COOKIE, value: `${exp}.${sig(exp)}`, maxAge: SESSION_SECONDS };
}

export function verifySession(value: string | undefined): boolean {
  if (!value || !adminConfigured()) return false;
  const i = value.indexOf('.');
  if (i < 0) return false;
  const exp = value.slice(0, i);
  const given = value.slice(i + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(sig(exp), 'utf8');
  const got = Buffer.from(given, 'utf8');
  return expected.length === got.length && timingSafeEqual(expected, got);
}
