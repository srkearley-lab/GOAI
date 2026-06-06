/* ============================================================
   GO AI — Industries page (bilingual)
   ============================================================ */

function QuickNav() {
  const { tr } = useApp();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
  };
  return (
    <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'var(--nav-bg)', backdropFilter: 'blur(14px) saturate(1.4)', WebkitBackdropFilter: 'blur(14px) saturate(1.4)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px var(--space-8)' }}>
        {DATA.industries.map((ind) => (
          <button key={ind.id} onClick={() => scrollTo(ind.id)} className="chip" style={{ cursor: 'pointer', background: 'var(--surface)' }}>
            <Icon name={ind.icon} size={13} /> {tr(ind.label)}
          </button>
        ))}
      </div>
    </div>
  );
}

function FeatureRow({ b, tr }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
      <span className="icon-badge sm"><Icon name={b.icon} size={17} /></span>
      <div>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 3 }}>{tr(b.label)}</p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5 }}>{tr(b.detail)}</p>
      </div>
    </div>
  );
}

function IndustrySection({ industry, index }) {
  const { tr, t } = useApp();
  const isAlt = index % 2 !== 0;
  return (
    <section id={industry.id} style={{ padding: 'var(--section-y) 0', background: isAlt ? 'var(--surface-2)' : 'var(--bg)', borderBottom: '1px solid var(--line)', scrollMarginTop: 130 }}>
      <div className="container industry-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="icon-badge"><Icon name={industry.icon} size={22} /></span>
            <Eyebrow>{tr(industry.label)}</Eyebrow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr(industry.tagline)}</h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--ink-2)' }}>{tr(industry.description)}</p>
          </div>
          <blockquote style={{ margin: 0, borderLeft: '3px solid var(--brand-line)', paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Icon name="Quote" size={18} style={{ color: 'var(--brand-ink)' }} />
            <p style={{ fontSize: 'var(--text-base)', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr(industry.painPoint)}</p>
          </blockquote>
          <Link to="/contact" data-action="request-proposal" className="link-arrow" style={{ alignSelf: 'flex-start' }}>
            {t('ind_getplan')}{tr(industry.label).toLowerCase()} <Icon name="ArrowRight" size={15} />
          </Link>
        </Reveal>

        <Reveal delay={80} className="card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{t('ind_whatwebuild')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {industry.builds.map((b, i) => <FeatureRow key={i} b={b} tr={tr} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Industries() {
  const { t } = useApp();
  return (
    <main>
      <PageHero tag={t('ind_tag')} title={t('ind_title')} description={t('ind_desc')} />
      <QuickNav />
      {DATA.industries.map((ind, i) => <IndustrySection key={ind.id} industry={ind} index={i} />)}

      <FinalCTA tagKey="ind_dontsee_tag" titleKey="ind_dontsee_title" bodyKey="ind_dontsee_body" primaryKey="cta_free_btn" />

      <style>{`
        @media (max-width: 860px) { .industry-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; } }
      `}</style>
    </main>
  );
}

Object.assign(window, { Industries });
