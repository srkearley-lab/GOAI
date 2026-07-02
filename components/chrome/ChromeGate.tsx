'use client';
/* Hides the marketing chrome (navbar/footer/assistant) on internal routes. */
import { usePathname } from 'next/navigation';

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;
  return <>{children}</>;
}
