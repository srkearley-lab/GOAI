/* GO AI — /admin shell: left sidebar when signed in, plain canvas otherwise. */
import { cookies } from 'next/headers';
import { verifySession, ADMIN_COOKIE } from '@/lib/adminAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const email = await verifySession((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!email) return <>{children}</>;
  return (
    <div className="adm-shell">
      <AdminSidebar email={email} />
      <div className="adm-content">{children}</div>
      <style>{`
        .adm-shell { display: flex; min-height: 100vh; background: var(--bg); }
        .adm-content { flex: 1; min-width: 0; }
        @media (max-width: 860px) { .adm-shell { flex-direction: column; } }
      `}</style>
    </div>
  );
}
