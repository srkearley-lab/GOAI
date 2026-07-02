'use client';
/* GO AI — /admin sign-in: Firebase email/password + Google. The server
   whitelist (ADMIN_ALLOWED_EMAILS) decides who actually gets a session. */
import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type UserCredential,
} from 'firebase/auth';
import { clientAuth } from '@/lib/firebaseClient';

const ERRORS: Record<string, string> = {
  'not-allowed': 'This account isn’t authorised for the GO AI backend.',
  'not-configured': 'Admin access isn’t configured yet (ADMIN_ALLOWED_EMAILS).',
  'invalid-token': 'Sign-in expired — please try again.',
  credentials: 'Wrong email or password — try again.',
  generic: 'Sign-in failed — please try again.',
};

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function establish(cred: UserCredential) {
    const idToken = await cred.user.getIdToken();
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      await signOut(clientAuth()).catch(() => undefined);
      throw new Error(j?.error || 'generic');
    }
    window.location.assign('/admin');
  }

  async function run(fn: () => Promise<UserCredential>) {
    setBusy(true);
    setError('');
    try {
      await establish(await fn());
    } catch (e) {
      const code = (e as { code?: string; message?: string })?.code || (e as Error)?.message || 'generic';
      if (code.startsWith('auth/')) {
        setError(code === 'auth/popup-closed-by-user' ? '' : ERRORS.credentials);
      } else {
        setError(ERRORS[code] || ERRORS.generic);
      }
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(() => signInWithEmailAndPassword(clientAuth(), email.trim(), password));
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
      >
        <label className="label" htmlFor="adm-email">Email</label>
        <input id="adm-email" type="email" required autoComplete="email" className="field" placeholder="you@go-ai.gr" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="label" htmlFor="adm-pass">Password</label>
        <input id="adm-pass" type="password" required autoComplete="current-password" className="field" placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ fontSize: 'var(--text-xs)', color: '#b91c1c', fontWeight: 600 }}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={busy} style={{ marginTop: 4 }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-3)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
        <span style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />or<span style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        disabled={busy}
        onClick={() => run(() => signInWithPopup(clientAuth(), new GoogleAuthProvider()))}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}
      >
        <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
          <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
