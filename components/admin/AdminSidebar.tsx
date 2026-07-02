'use client';
/* GO AI — /admin left sidebar: branding, nav with live status filters,
   signed-in account + sign-out, back-to-site. Collapses to a top bar on mobile. */
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SignOutButton } from '@/components/admin/SignOutButton';

const ITEMS: { href: string; status: string | null; icon: string; label: string }[] = [
  { href: '/admin', status: null, icon: 'LayoutDashboard', label: 'Dashboard' },
  { href: '/admin?status=ready', status: 'ready', icon: 'CheckCircle2', label: 'Samples ready' },
  { href: '/admin?status=sent', status: 'sent', icon: 'Mail', label: 'Proposals emailed' },
  { href: '/admin?status=failed', status: 'failed', icon: 'CircleX', label: 'Failed builds' },
];

function NavItems() {
  const pathname = usePathname() || '';
  const params = useSearchParams();
  const current = pathname === '/admin' ? params.get('status') : '__detail__';
  return (
    <nav className="adm-nav">
      {ITEMS.map((it) => {
        const active = pathname === '/admin' && current === it.status;
        return (
          <Link key={it.label} href={it.href} className={'adm-nav-item' + (active ? ' active' : '')}>
            <Icon name={it.icon} size={17} />
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({ email }: { email: string }) {
  return (
    <aside className="adm-side">
      <Link href="/admin" className="adm-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/goai-logo.png" alt="GO AI" style={{ height: 26, width: 'auto' }} />
        <span className="adm-brand-tag">Operations</span>
      </Link>

      <Suspense fallback={null}>
        <NavItems />
      </Suspense>

      <div className="adm-side-foot">
        <a href="/" target="_blank" rel="noreferrer" className="adm-nav-item">
          <Icon name="ExternalLink" size={16} />
          <span>View site</span>
        </a>
        <div className="adm-account">
          <span className="adm-account-email" title={email}>{email}</span>
          <SignOutButton />
        </div>
      </div>

      <style>{`
        .adm-side { width: 232px; flex-shrink: 0; position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; gap: var(--space-6); padding: 22px 14px; background: var(--surface); border-right: 1px solid var(--line); }
        .adm-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; }
        .adm-brand-tag { font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); border: 1px solid var(--line-2); border-radius: var(--radius-full); padding: 2px 8px; }
        .adm-nav { display: flex; flex-direction: column; gap: 2px; }
        .adm-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 600; color: var(--ink-2); transition: background .15s ease, color .15s ease; }
        .adm-nav-item:hover { background: var(--surface-2); color: var(--ink); }
        .adm-nav-item.active { background: var(--brand-soft); color: var(--brand-ink); }
        .adm-side-foot { margin-top: auto; display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--line); padding-top: 14px; }
        .adm-account { display: flex; flex-direction: column; gap: 8px; padding: 0 10px; }
        .adm-account-email { font-size: var(--text-xs); color: var(--ink-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (max-width: 860px) {
          .adm-side { position: static; width: 100%; height: auto; flex-direction: column; border-right: none; border-bottom: 1px solid var(--line); padding: 14px; gap: 12px; }
          .adm-nav { flex-direction: row; flex-wrap: wrap; }
          .adm-side-foot { margin-top: 0; flex-direction: row; align-items: center; justify-content: space-between; border-top: none; padding-top: 0; }
          .adm-account { flex-direction: row; align-items: center; }
        }
      `}</style>
    </aside>
  );
}
