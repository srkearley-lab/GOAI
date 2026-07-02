/* ============================================================
   GO AI — /admin operations dashboard (team-only).
   Server-rendered from Firestore via the admin SDK; gated by a
   shared-password session cookie (lib/adminAuth). Not indexed.
   ============================================================ */
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifySession, adminConfigured, ADMIN_COOKIE } from '@/lib/adminAuth';
import { fetchLeads } from '@/lib/adminData';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { SignOutButton } from '@/components/admin/SignOutButton';
import { StatusChip, fmtDate, estimate } from './ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'GO AI — Admin',
  robots: { index: false, follow: false },
};

function LoginView() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '120px 24px 64px' }}>
      <div className="card" style={{ width: '100%', maxWidth: 400, padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <span className="eyebrow">GO AI · Admin</span>
        <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Team sign-in</h1>
        {!adminConfigured() ? (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            Admin access isn&apos;t configured yet — set <code>ADMIN_ALLOWED_EMAILS</code> (comma-separated team
            emails) in the environment and redeploy.
          </p>
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </main>
  );
}

export default async function AdminPage() {
  const adminEmail = await verifySession((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!adminEmail) return <LoginView />;

  const leads = await fetchLeads();
  const list = leads || [];
  const ready = list.filter((l) => l.generation?.status === 'ready').length;
  const failed = list.filter((l) => l.generation?.status === 'failed').length;
  const sent = list.filter((l) => l.generation?.proposalSent).length;

  return (
    <main style={{ padding: '110px 0 64px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="eyebrow">GO AI · Operations</span>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Leads &amp; sample builds</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{adminEmail}</span>
            <SignOutButton />
          </div>
        </div>

        {leads === null ? (
          <div className="card" style={{ padding: 'var(--space-6)', color: 'var(--ink-2)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
            Firestore isn&apos;t reachable from this environment — either the <code>FIREBASE_*</code> env vars are missing,
            or the Cloud Firestore API/database hasn&apos;t been enabled on the Firebase project yet.
          </div>
        ) : (
          <>
            <div className="adm-stats">
              {[
                { v: String(list.length), l: 'Total leads' },
                { v: String(ready), l: 'Samples ready' },
                { v: String(sent), l: 'Proposals emailed' },
                { v: String(failed), l: 'Failed builds' },
              ].map((s) => (
                <div className="card adm-stat" key={s.l}>
                  <span className="adm-stat-v">{s.v}</span>
                  <span className="adm-stat-l">{s.l}</span>
                </div>
              ))}
            </div>

            <div className="card adm-scroll" style={{ padding: 0 }}>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Business</th><th>Contact</th><th>Estimate</th><th>Status</th><th>Sample</th><th>Received</th><th />
                  </tr>
                </thead>
                <tbody>
                  {list.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--ink-3)', padding: 28 }}>No leads yet — they&apos;ll appear here the moment someone submits the wizard.</td></tr>
                  )}
                  {list.map((l) => (
                    <tr key={l.id}>
                      <td>
                        <Link href={`/admin/${l.id}`} style={{ fontWeight: 700, color: 'var(--ink)' }}>{l.businessName || '(no name)'}</Link>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{l.businessType || '—'}{l.location ? ` · ${l.location}` : ''}</div>
                      </td>
                      <td>
                        <div>{[l.firstName, l.lastName].filter(Boolean).join(' ') || '—'}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{l.email || l.phoneWhatsapp || '—'}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--brand-ink)', whiteSpace: 'nowrap' }}>{estimate(l)}</td>
                      <td><StatusChip status={l.generation?.status} /></td>
                      <td>
                        {l.generation?.sampleUrl
                          ? <a href={l.generation.sampleUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--brand-ink)', fontWeight: 600, fontSize: 'var(--text-xs)' }}>open ↗</a>
                          : <span style={{ color: 'var(--ink-3)' }}>—</span>}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', color: 'var(--ink-2)', fontSize: 'var(--text-xs)' }}>{fmtDate(l.createdAt)}</td>
                      <td><Link href={`/admin/${l.id}`} aria-label="View lead" style={{ color: 'var(--ink-3)' }}>›</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <style>{`
        .adm-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
        @media (max-width: 760px) { .adm-stats { grid-template-columns: 1fr 1fr; } }
        .adm-stat { padding: var(--space-5); display: flex; flex-direction: column; gap: 4px; }
        .adm-stat-v { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; letter-spacing: -0.03em; color: var(--brand-ink); line-height: 1; }
        .adm-stat-l { font-size: var(--text-xs); font-weight: 600; color: var(--ink-3); }
        .adm-scroll { overflow-x: auto; }
        .adm-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); min-width: 760px; }
        .adm-table th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-3); padding: 14px 16px; border-bottom: 1px solid var(--line-2); }
        .adm-table td { padding: 13px 16px; border-bottom: 1px solid var(--line); vertical-align: middle; }
        .adm-table tbody tr:last-child td { border-bottom: none; }
        .adm-table tbody tr:hover { background: var(--surface-2); }
      `}</style>
    </main>
  );
}
