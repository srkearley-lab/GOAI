'use client';
/* GO AI — /admin sign-out: clears the server session + the Firebase client. */
import { signOut } from 'firebase/auth';
import { clientAuth } from '@/lib/firebaseClient';

export function SignOutButton() {
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        await fetch('/api/admin/session', { method: 'DELETE' }).catch(() => undefined);
        await signOut(clientAuth()).catch(() => undefined);
        window.location.assign('/admin');
      }}
    >
      Sign out
    </button>
  );
}
