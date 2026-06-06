/* ============================================================
   GO AI — Home: hero, Start Your Journey, sections
   ============================================================ */

/* ---- Browser showcase mockup (hero) — demo visual, copy stays EN ---- */
function HeroShowcase() {
  return (
    <Reveal delay={120} style={{ marginTop: 'var(--space-16)' }}>
      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ position: 'absolute', inset: '-8% 6% -14% 6%', background: 'radial-gradient(60% 70% at 50% 30%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 70%)', filter: 'blur(40px)', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', background: 'var(--surface)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--line-2)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', borderBottom: '1px solid var(--line)', background: 'var(--surface-2)' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
            <div style={{ flex: 1, maxWidth: 320, height: 24, margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon name="Lock" size={11} style={{ color: 'var(--ink-3)' }} />
              <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>santorinidreamvillas.gr</span>
            </div>
          </div>
          <div style={{ position: 'relative', height: 440 }} className="showcase-body">
            <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80" alt="Sample villa website" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,24,0.36) 0%, rgba(8,12,24,0.12) 40%, rgba(8,12,24,0.62) 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>Santorini Dream</span>
              <div style={{ display: 'flex', gap: 22 }} className="showcase-nav">
                {['Villas', 'Gallery', 'Rates', 'Book'].map((tx) => <span key={tx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>{tx}</span>)}
              </div>
            </div>
            <div style={{ position: 'absolute', left: 28, bottom: 28, right: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Caldera views · Oia</span>
              <h3 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, maxWidth: '16ch' }}>Your private villa above the Aegean</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 42, padding: '0 22px', borderRadius: 999, background: 'var(--brand)', color: '#fff', fontSize: 14, fontWeight: 700 }}>Check availability</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 42, padding: '0 20px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 14, fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)' }}>
                  <Icon name="MessageCircle" size={15} /> WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="float-chip" style={{ position: 'absolute', right: -16, top: 96, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="icon-badge sm" style={{ background: 'color-mix(in srgb, var(--success) 14%, transparent)', borderColor: 'color-mix(in srgb, var(--success) 30%, transparent)', color: 'var(--success)' }}>
            <Icon name="TrendingUp" size={18} />
          </span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>+38%</p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>direct bookings</p>
          </div>
        </div>
        <style>{`@media (max-width: 720px) { .showcase-body { height: 300px !important; } .float-chip { display: none !important; } .showcase-nav { display: none !important; } }`}</style>
      </div>
    </Reveal>
  );
}

function scrollToId(id, offset = 90) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

/* ---- Hero ---- */
function Hero() {
  const { t } = useApp();
  return (
    <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 132, paddingBottom: 'var(--space-24)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(70% 50% at 50% 0%, color-mix(in srgb, var(--brand) 12%, transparent), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 60%, var(--bg) 100%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
        <Reveal>
          <span className="chip" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)' }} />
            {t('hero_badge')}
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.035em', maxWidth: '18ch', margin: '0 auto', color: 'var(--ink)' }}>
            {t('hero_headline_a')}<span style={{ color: 'var(--brand-ink)' }}>{t('hero_headline_b')}</span>
          </h1>
        </Reveal>
        <Reveal delay={110}>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch', margin: '0 auto' }}>{t('hero_sub')}</p>
        </Reveal>
        <Reveal delay={160} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <RequestProposalButton size="md" />
          <button onClick={() => scrollToId('services')} data-action="view-services" className="btn btn-secondary btn-lg">
            {t('view_services')} <Icon name="ArrowDown" size={17} />
          </button>
        </Reveal>
        <Reveal delay={210} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', justifyContent: 'center', marginTop: 4 }}>
          {DATA.heroProofKeys.map((k) => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 500 }}>
              <Icon name="Check" size={15} style={{ color: 'var(--brand-ink)' }} /> {t(k)}
            </span>
          ))}
        </Reveal>
        <HeroShowcase />
      </div>
    </section>
  );
}

/* ============================================================
   START YOUR JOURNEY
   ============================================================ */
const JOURNEY_SUPPORT = [
  { cid: 'hosting-care',          icon: 'ShieldCheck', desc: { EN: 'Hosting, security, backups and updates — fully managed for you.', GR: 'Φιλοξενία, ασφάλεια, backups και ενημερώσεις — πλήρως διαχειριζόμενα.' } },
  { cid: 'ai-proposal-generation', icon: 'FileText',   desc: { EN: 'Auto-generate tailored proposals and send them via WhatsApp or email.', GR: 'Αυτόματη δημιουργία προτάσεων και αποστολή μέσω WhatsApp ή email.' } },
  { cid: 'analytics-reporting',   icon: 'BarChart3',   desc: { EN: 'A clear monthly report on what’s working and what to do next.', GR: 'Ξεκάθαρη μηνιαία αναφορά για το τι αποδίδει και τι ακολουθεί.' } },
  { cid: 'basic-hosting',         icon: 'Server',      desc: { EN: 'Reliable hosting that keeps your website live and maintained.', GR: 'Αξιόπιστη φιλοξενία που κρατά το site σας live και συντηρημένο.' } },
];

function JourneyCard({ cid, icon, title, price, desc, foundation }) {
  const { hasItem, tr, t, priceOf } = useApp();
  const added = hasItem(cid);
  const priceLabel = priceOf(cid) || (price ? tr(price) : '');
  return (
    <div className="card" style={{
      position: 'relative', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      border: '1.5px solid ' + (added ? 'var(--brand)' : 'var(--line)'),
      background: added ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 70%)' : 'var(--surface)',
      boxShadow: added ? 'var(--shadow-md)' : 'var(--shadow-sm)', transition: 'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
    }}>
      {added && (
        <span style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name="Check" size={13} stroke={3} />
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="icon-badge"><Icon name={icon} size={22} /></span>
        {foundation && <span className="chip chip-brand chip-mini">{t('foundation_badge')}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{tr(title)}</h3>
          {priceLabel && <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--brand-ink)', whiteSpace: 'nowrap' }}>{priceLabel}</span>}
        </div>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--ink-2)' }}>{tr(desc)}</p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <AddToProposalButton id={cid} full />
      </div>
    </div>
  );
}

function JourneyGroup({ label, note, children }) {
  return (
    <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{label}</h3>
        {note && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{note}</p>}
      </div>
      {children}
    </Reveal>
  );
}

function JourneyLauncher() {
  const { t, count } = useApp();
  const steps = [t('j_short1'), t('j_short2'), t('j_short3'), t('j_short4'), t('j_short5'), t('j_short6')];
  const go = () => navigate('/journey');
  return (
    <Section id="start-journey" bg="alt" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <Reveal className="card" style={{ maxWidth: 'var(--width-lg)', margin: '0 auto', padding: 'var(--space-16) var(--space-12)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)', border: '1.5px solid var(--brand-line)', background: 'linear-gradient(180deg, var(--surface-accent), var(--surface) 70%)' }}>
        <Eyebrow tone="gold" dot>{t('j_launch_tag')}</Eyebrow>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: '20ch' }}>{t('j_launch_title')}</h2>
        <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '56ch' }}>{t('j_launch_sub')}</p>
        <div className="launch-steps">
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: '50%', background: 'var(--brand-soft)', border: '1px solid var(--brand-line)', color: 'var(--brand-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{i + 1}</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>{s}</span>
              {i < steps.length - 1 && <Icon name="ChevronRight" size={14} style={{ color: 'var(--ink-3)' }} className="launch-arrow" />}
            </div>
          ))}
        </div>
        <button onClick={go} data-action="start-journey" className="btn btn-primary btn-lg" style={{ marginTop: 4 }}>
          <Icon name="Sparkles" size={18} /> {count > 0 ? t('j_resume') : t('j_start')}
          {count > 0 && <span style={{ marginLeft: 2, minWidth: 22, height: 22, padding: '0 6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gold)', color: '#1a1206', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 800 }}>{count}</span>}
        </button>
      </Reveal>
      <style>{`
        .launch-steps { display: flex; flex-wrap: wrap; gap: 12px 16px; justify-content: center; }
        @media (max-width: 600px) { .launch-arrow { display: none; } }
      `}</style>
    </Section>
  );
}

/* ---- info cards / tiles ---- */
function ServiceCard({ icon, title, description, delay }) {
  const { tr } = useApp();
  return (
    <Reveal delay={delay} className="card card-hover" style={{ padding: 'var(--card-pad)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <span className="icon-badge"><Icon name={icon} size={22} /></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{tr(title)}</h3>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr(description)}</p>
      </div>
    </Reveal>
  );
}

function IndustryTile({ icon, label, to, delay }) {
  const { tr } = useApp();
  return (
    <Reveal delay={delay}>
      <Link to={'/industries'} onClick={() => { setTimeout(() => scrollToId(to, 120), 140); }}
        className="card card-hover" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'center', textDecoration: 'none' }}>
        <span className="icon-badge round"><Icon name={icon} size={22} /></span>
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>{tr(label)}</span>
      </Link>
    </Reveal>
  );
}

function StepCard({ number, icon, title, description, isLast, delay }) {
  const { tr } = useApp();
  return (
    <Reveal delay={delay} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-4)' }}>
      {!isLast && <div className="step-line" style={{ position: 'absolute', top: 28, left: 'calc(50% + 38px)', right: 'calc(-50% + 38px)', height: 2, background: 'var(--line-2)' }} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="icon-badge lg round" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}><Icon name={icon} size={24} /></span>
        <span style={{ position: 'absolute', top: -4, right: -4, width: 24, height: 24, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, border: '3px solid var(--bg)' }}>{number}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)' }}>{tr(title)}</h3>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '28ch', margin: '0 auto' }}>{tr(description)}</p>
      </div>
    </Reveal>
  );
}

function PackageCard({ pkg, delay }) {
  const { tr, t } = useApp();
  const { popular } = pkg;
  const badge = pkg.badge ? tr(pkg.badge) : null;
  return (
    <Reveal delay={delay} className={'card' + (popular ? '' : ' card-hover')} style={{
      position: 'relative', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
      border: popular ? '2px solid var(--brand)' : undefined, boxShadow: popular ? 'var(--shadow-lg)' : undefined, transform: popular ? 'translateY(-8px)' : undefined,
      background: popular ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 60%)' : undefined,
    }}>
      {badge && <span style={{ position: 'absolute', top: 18, right: 18 }} className={'chip ' + (popular ? 'chip-brand' : '')}>{badge}</span>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, minHeight: '2.4em', paddingRight: badge ? 96 : 0, display: 'flex', alignItems: 'center' }}>{tr(pkg.name)}</h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1 }}>{tr(pkg.price)}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)' }}>{tr(pkg.unit)}</span>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{tr(pkg.description)}</p>
      </div>
      <hr className="divider" />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>{t('best_for')}</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{tr(pkg.bestFor)}</p>
      </div>
      <SelectWebsiteButton id={pkg.cid} />
    </Reveal>
  );
}

function Home() {
  const { t } = useApp();
  return (
    <main>
      <Hero />
      <JourneyLauncher />

      {/* Pricing — directly under the guided journey */}
      <Section id="pricing" bg="base" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('sec_pricing_tag')} title={t('sec_pricing_title')} description={t('sec_pricing_desc')} />
          <div className="grid-3" style={{ width: '100%', alignItems: 'stretch' }}>
            {DATA.packages.map((p, i) => <PackageCard key={i} pkg={p} delay={i * 70} />)}
          </div>
          <div className="card" style={{ maxWidth: 'var(--width-md)', padding: 'var(--space-5) var(--space-8)', textAlign: 'center', background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{t('pricing_vat_note')}</p>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink-3)' }}>{t('pricing_sub_note')}</p>
          </div>
        </div>
      </Section>

      {/* What we do */}
      <Section id="services" bg="base">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('sec_whatwedo_tag')} title={t('sec_whatwedo_title')} description={t('sec_whatwedo_desc')} />
          <div className="grid-3" style={{ width: '100%' }}>
            {DATA.services.map((s, i) => <ServiceCard key={i} {...s} delay={i * 50} />)}
          </div>
        </div>
      </Section>

      {/* Industries */}
      <Section bg="alt" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('sec_industries_tag')} title={t('sec_industries_title')} description={t('sec_industries_desc')} />
          <div className="grid-industries" style={{ width: '100%' }}>
            {DATA.industriesShort.map((ind, i) => <IndustryTile key={ind.to} {...ind} delay={i * 40} />)}
          </div>
          <Link to="/industries" className="link-arrow">{t('sec_industries_all')} <Icon name="ArrowRight" size={15} /></Link>
        </div>
      </Section>

      {/* How it works */}
      <Section bg="base">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-16)' }}>
          <SectionHeader tag={t('sec_how_tag')} title={t('sec_how_title')} description={t('sec_how_desc')} />
          <div className="grid-3 steps" style={{ width: '100%' }}>
            {DATA.steps.map((s, i) => <StepCard key={i} {...s} isLast={i === DATA.steps.length - 1} delay={i * 80} />)}
          </div>
        </div>
      </Section>

      {/* Pricing */}

      <FinalCTA tagKey="cta_free_tag" titleKey="cta_free_title" bodyKey="cta_free_body" primaryKey="cta_free_btn" />

      <style>{`
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
        .grid-industries { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr 1fr; } .grid-3.steps { grid-template-columns: 1fr; } .step-line { display: none; } .grid-industries { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .grid-3 { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

/* ---- Reusable final CTA (translation-key driven) ---- */
function FinalCTA({ tagKey, titleKey, bodyKey, primaryKey, bg = 'accent' }) {
  const { t } = useApp();
  return (
    <Section bg={bg} style={{ borderTop: '1px solid var(--line)' }}>
      <Reveal style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Eyebrow tone="gold" dot>{t(tagKey)}</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: '22ch' }}>{t(titleKey)}</h2>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '48ch' }}>{t(bodyKey)}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <RequestProposalButton size="md" />
          <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
        </div>
      </Reveal>
    </Section>
  );
}

Object.assign(window, { Home, FinalCTA, scrollToId });
