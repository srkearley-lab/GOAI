/* ============================================================
   GO AI — Navbar (lang switcher + proposal badge) + Footer
   ============================================================ */

const NAV_LINKS = [
  { key: 'nav_services', to: '/services' },
  { key: 'nav_industries', to: '/industries' },
  { key: 'nav_portfolio', to: '/portfolio' },
  { key: 'nav_automation', to: '/automation' },
  { key: 'nav_contact', to: '/contact' },
];

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} aria-label="GO AI home"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: 'var(--brand)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: 17, letterSpacing: '-0.04em', boxShadow: 'var(--shadow-brand)',
      }}>G</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
        GO<span style={{ color: 'var(--brand-ink)' }}>&nbsp;AI</span>
      </span>
    </Link>
  );
}

/* Request Proposal button with live count badge */
function RequestProposalButton({ size = 'sm', full = false, onNavigate }) {
  const { t, count } = useApp();
  const go = (e) => {
    e && e.preventDefault();
    onNavigate && onNavigate();
    navigate('/contact');
    setTimeout(() => {
      const el = document.getElementById('proposal-form');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    }, 140);
  };
  return (
    <button onClick={go} data-action="request-proposal" data-count={count}
      className={'btn btn-primary ' + (size === 'sm' ? 'btn-sm' : '') + (full ? ' full' : '')}
      style={{ position: 'relative', overflow: 'visible' }}>
      {t('request_proposal')}
      {count > 0 && (
        <span aria-label={count + ' selected'} style={{
          position: 'absolute', top: -7, right: -7, minWidth: 22, height: 22, padding: '0 6px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--gold)', color: '#1a1206', borderRadius: 'var(--radius-full)',
          fontSize: 12, fontWeight: 800, lineHeight: 1, border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
        }}>{count}</span>
      )}
    </button>
  );
}

function Navbar() {
  const path = useHashRoute();
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
                }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink-2)'; }}
                >{t(l.key)}</Link>
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

function Footer() {
  const { t, tr } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', paddingTop: 'var(--space-20)' }}>
      <div className="container">
        <div className="footer-grid" style={{ paddingBottom: 'var(--space-12)', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Logo />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '30ch' }}>{t('foot_tagline')}</p>
            <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Icon name="MessageCircle" size={16} /> {t('foot_whatsapp')}
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="foot-head">{t('foot_pages')}</p>
            <Link to="/" className="foot-link">{t('home')}</Link>
            {NAV_LINKS.map((l) => <Link key={l.to} to={l.to} className="foot-link">{t(l.key)}</Link>)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="foot-head">{t('foot_services')}</p>
            {DATA.growthCards.map((s) => (
              <span key={s.cid} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{tr(s.title)}</span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="foot-head">{t('foot_contact')}</p>
            <Link to="/contact" className="foot-link">{t('foot_request')}</Link>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('foot_location')}</span>
          </div>
        </div>

        <div style={{ padding: 'var(--space-6) 0 var(--space-10)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>© {year} GO AI. {t('foot_rights')}</p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{t('foot_built')}</p>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: var(--space-10); }
        .foot-head { font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 4px; }
        .foot-link { font-size: var(--text-sm); color: var(--ink-2); transition: color 140ms ease; }
        .foot-link:hover { color: var(--brand-ink); }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: var(--space-8); } }
        @media (max-width: 460px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}

Object.assign(window, { Navbar, Footer, Logo, RequestProposalButton });
