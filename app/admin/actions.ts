'use server';
/* GO AI — /admin sign-in/out server actions. */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkPassword, makeSession, ADMIN_COOKIE } from '@/lib/adminAuth';

export async function adminLogin(formData: FormData): Promise<void> {
  const password = String(formData.get('password') || '');
  if (!checkPassword(password)) redirect('/admin?error=1');
  const s = makeSession();
  (await cookies()).set(s.name, s.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: s.maxAge,
  });
  redirect('/admin');
}

export async function adminLogout(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, '', { path: '/admin', maxAge: 0 });
  redirect('/admin');
}
