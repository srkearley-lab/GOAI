'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Link } from '@/components/ui/Link';
import { Icon } from '@/components/ui/Icon';
import { LangSwitcher } from '@/components/proposal/LangSwitcher';
import { Logo } from './Logo';
import { RequestProposalButton } from './RequestProposalButton';
import { NAV_LINKS } from './navLinks';

export function Navbar() {
  const path = usePathname();
  const { t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);

  const showSolid = scrolled || open;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 240ms ease, border-color 240ms ease, box-shadow 240ms ease',
        background: showSolid ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: showSolid ? 'blur(16px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: showSolid ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: showSolid ? '1px solid var(--line)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-xs)' : 'none',
      }}>
        <div className="container" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Logo />

          <nav className="nav-desktop" style={{ alignItems: 'center', gap: 2 }}>
            {NAV_LINKS.map((l) => {
              const active = path === l.to;
              return (
                <Link key={l.to} to={l.to} style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: active ? 'var(--ink)' : 'var(--ink-2)',
                  padding: '9px 13px', borderRadius: 'var(--radius-full)',
                  background: active ? 'var(--surface-2)' : 'transparent',
                  transition: 'color 140ms ease, background 140ms ease', whiteSpace: 'nowrap',
                }}>{t(l.key)}</Link>
              );
            })}
          </nav>

          <div className="nav-desktop" style={{ alignItems: 'center', gap: 12 }}>
            <LangSwitcher />
            <RequestProposalButton />
          </div>

          {/* mobile cluster */}
          <div className="nav-mobile" style={{ alignItems: 'center', gap: 10 }}>
            <LangSwitcher compact />
            <button onClick={() => setOpen(!open)} aria-label={t('menu')}
              style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--surface)', border: '1px solid var(--line-2)', borderRadius: 'var(--radius-md)', color: 'var(--ink)' }}>
              <Icon name={open ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, zIndex: 49,
          background: 'var(--surface)', borderBottom: '1px solid var(--line)',
          padding: 'var(--space-4) var(--space-5) var(--space-6)', boxShadow: 'var(--shadow-lg)',
        }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} style={{
              display: 'block', padding: '14px 4px', fontSize: 'var(--text-md)', fontWeight: 600,
              color: 'var(--ink)', borderBottom: '1px solid var(--line)',
            }}>{t(l.key)}</Link>
          ))}
          <div style={{ marginTop: 'var(--space-4)' }}>
            <RequestProposalButton size="md" full onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 980px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        .btn.full { width: 100%; }
      `}</style>
    </>
  );
}
