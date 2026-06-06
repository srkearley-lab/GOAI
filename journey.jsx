/* ============================================================
   GO AI — guided multi-step proposal Journey (/journey)
   Step 1 website (single-select) → 2 digital → 3 automation
   → 4 support → 5 review → 6 request. Proposal-only.
   ============================================================ */

const J_STEPS = [
  { n: 1, group: 'website', titleKey: 'j_step1', whyKey: 'j_why1', shortKey: 'j_short1', single: true,  skip: true },
  { n: 2, group: 'digital', titleKey: 'j_step2', whyKey: 'j_why2', shortKey: 'j_short2', single: false, skip: true },
  { n: 3, group: 'automation', titleKey: 'j_step3', whyKey: 'j_why3', shortKey: 'j_short3', single: false, skip: true },
  { n: 4, group: 'support', titleKey: 'j_step4', whyKey: 'j_why4', shortKey: 'j_short4', single: false, skip: true },
  { n: 5, group: null, titleKey: 'j_step5', whyKey: 'j_why5', shortKey: 'j_short5' },
  { n: 6, group: null, titleKey: 'j_step6', whyKey: 'j_why6', shortKey: 'j_short6' },
];

function JFeatures({ id }) {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const feats = catFeatures(id, lang);
  if (!feats) return null;
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} data-action="see-more" data-item={id}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-ink)', fontSize: 'var(--text-xs)', fontWeight: 700, padding: '2px 0' }}>
        {open ? t('see_less') : t('see_more')} <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={13} />
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .22s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          <ul style={{ listStyle: 'none', padding: '8px 0 0', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {feats.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <Icon name="Check" size={12} stroke={3} style={{ color: 'var(--brand-ink)', flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-2)', lineHeight: 1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function JourneyServiceCard({ id, single }) {
  const { tr, t, hasItem, selectedWebsite } = useApp();
  const c = cat(id);
  if (!c) return null;
  const selected = single ? selectedWebsite === id : hasItem(id);
  return (
    <div className="card" style={{
      padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      border: '1.5px solid ' + (selected ? 'var(--brand)' : 'var(--line)'),
      background: selected ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 55%)' : 'var(--surface)',
      transition: 'border-color 160ms ease, background 160ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <span className="icon-badge"><Icon name={c.icon} size={22} /></span>
        {selected && <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="Check" size={14} stroke={3} /></span>}
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{tr(c.label)}</h3>
        <p style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--brand-ink)', letterSpacing: '-0.02em', marginTop: 4 }}>{tr(c.price)}</p>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)', flex: 1 }}>{tr(c.desc)}</p>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 700, color: 'var(--ink-2)' }}>{t('best_for')} </span>{tr(c.best)}
      </p>
      <JFeatures id={id} />
      {single ? <SelectWebsiteButton id={id} /> : <AddToProposalButton id={id} full />}
    </div>
  );
}

/* progress indicator */
function JourneyProgress({ step, setStep }) {
  const { t } = useApp();
  return (
    <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'var(--nav-bg)', backdropFilter: 'blur(14px) saturate(1.4)', WebkitBackdropFilter: 'blur(14px) saturate(1.4)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ padding: '14px var(--space-8)' }}>
        <div className="jprog" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {J_STEPS.map((s, i) => {
            const done = s.n < step, cur = s.n === step;
            return (
              <React.Fragment key={s.n}>
                <button onClick={() => setStep(s.n)} data-action="journey-step" aria-current={cur}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', padding: '4px 6px', borderRadius: 'var(--radius-full)', flexShrink: 0 }}>
                  <span style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800,
                    background: cur ? 'var(--brand)' : done ? 'var(--brand-soft)' : 'var(--surface-2)',
                    color: cur ? '#fff' : done ? 'var(--brand-ink)' : 'var(--ink-3)',
                    border: '1px solid ' + (cur ? 'var(--brand)' : done ? 'var(--brand-line)' : 'var(--line)') }}>
                    {done ? <Icon name="Check" size={13} stroke={3} /> : s.n}
                  </span>
                  <span className="jprog-label" style={{ fontSize: 'var(--text-sm)', fontWeight: cur ? 700 : 600, color: cur ? 'var(--ink)' : 'var(--ink-3)', whiteSpace: 'nowrap' }}>{t(s.shortKey)}</span>
                </button>
                {i < J_STEPS.length - 1 && <span className="jprog-line" style={{ flex: 1, height: 2, minWidth: 8, background: s.n < step ? 'var(--brand-line)' : 'var(--line)', borderRadius: 2 }} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .jprog-label { display: none; }
          .jprog { justify-content: space-between; }
          .jprog-line { min-width: 6px; }
        }
      `}</style>
    </div>
  );
}

/* review step */
function JourneyReview({ setStep }) {
  const { items, t, lang, labelOf, priceOf, removeItem, amountOf, recurringOf, selectedWebsite } = useApp();
  const groupsToShow = ['website', 'digital', 'automation', 'support'];
  const oneoff = items.filter((id) => !recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);
  const monthly = items.filter((id) => recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);
  const empty = items.length === 0;

  if (empty) {
    return (
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
        <span className="icon-badge lg round" style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', color: 'var(--ink-3)' }}><Icon name="ClipboardList" size={26} /></span>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)' }}>{t('prop_summary_empty')}</h3>
        <button onClick={() => setStep(1)} className="btn btn-primary">{t('j_step1')}</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 'var(--width-md)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {groupsToShow.map((g) => {
        const ids = items.filter((id) => cat(id) && cat(id).group === g);
        if (ids.length === 0) return null;
        return (
          <div key={g} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{tr_group(g, lang)}</p>
              {g === 'website' && <button onClick={() => setStep(1)} data-action="edit-website" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--brand-ink)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>{t('j_edit_website')}</button>}
            </div>
            {ids.map((id) => (
              <div key={id} className="card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <span className="icon-badge sm" style={{ flexShrink: 0 }}><Icon name={cat(id).icon} size={16} /></span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>{labelOf(id)}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--brand-ink)' }}>{priceOf(id)}</span>
                  <button onClick={() => removeItem(id)} aria-label="remove" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--line-2)', borderRadius: 'var(--radius-md)', color: 'var(--ink-3)', cursor: 'pointer' }}><Icon name="X" size={15} /></button>
                </span>
              </div>
            ))}
          </div>
        );
      })}

      <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', background: 'var(--surface-accent)', border: '1px solid var(--brand-line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('j_est_oneoff')}</span><span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)' }}>€{oneoff.toLocaleString('el-GR')}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('j_est_monthly')}</span><span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)' }}>€{monthly.toLocaleString('el-GR')}<span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 600 }}>{lang === 'GR' ? '/μήνα' : '/mo'}</span></span></div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5, marginTop: 4 }}>{t('prop_price_note')}</p>
      </div>
    </div>
  );
}
function tr_group(g, lang) { return (GROUP_TITLES[g] || {})[lang] || g; }

/* final stage — Review & Complete (no Back; Home alternative) */
function JourneyComplete({ setStep }) {
  const { t } = useApp();
  const goForm = () => { navigate('/contact'); setTimeout(() => { const el = document.getElementById('proposal-form'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }, 160); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
      <JourneyReview setStep={setStep} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <button onClick={goForm} data-action="request-proposal" className="btn btn-primary btn-lg">{t('j_finish')}</button>
        <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
        <button onClick={() => navigate('/')} data-action="home" className="btn btn-secondary btn-lg"><Icon name="Home" size={17} /> {t('home_cta')}</button>
      </div>
    </div>
  );
}

function Journey() {
  const { t, count, selectedWebsite } = useApp();
  const [step, setStepState] = useState(() => { try { const v = parseInt(localStorage.getItem('goai_jstep') || '1', 10); return v >= 1 && v <= 6 ? v : 1; } catch (e) { return 1; } });
  const setStep = (n) => { const v = Math.max(1, Math.min(6, n)); setStepState(v); try { localStorage.setItem('goai_jstep', String(v)); } catch (e) {} window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const meta = J_STEPS[step - 1];

  return (
    <main style={{ paddingTop: 72, paddingBottom: 'var(--space-24)', minHeight: '100vh' }}>
      <JourneyProgress step={step} setStep={setStep} />

      <div className="container" style={{ paddingTop: 'var(--space-12)' }}>
        {/* step header */}
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '62ch', marginBottom: 'var(--space-10)' }}>
          <Eyebrow dot>{t('step_label')} {step} / 6</Eyebrow>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{t(meta.titleKey)}</h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t(meta.whyKey)}</p>
        </Reveal>

        {/* step body */}
        {meta.group && (
          <div className="jcards" key={step}>
            {GROUPS[meta.group].map((id) => <JourneyServiceCard key={id} id={id} single={meta.single} />)}
          </div>
        )}
        {meta.group === 'automation' && (
          <div className="card" style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', background: 'var(--surface-accent)', border: '1px solid var(--brand-line)' }}>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink)' }}>{t('ai_note_1')}</p>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink-2)', fontWeight: 600 }}>{t('ai_note_2')}</p>
          </div>
        )}
        {step === 5 && <JourneyReview setStep={setStep} />}
        {step === 6 && <JourneyComplete setStep={setStep} />}

        {/* nav (hidden on final stage) */}
        {step < 6 && (
        <div style={{ marginTop: 'var(--space-12)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', borderTop: '1px solid var(--line)', paddingTop: 'var(--space-6)' }}>
          <button onClick={() => navigate('/')} data-action="journey-exit" className="btn btn-ghost"><Icon name="Home" size={16} /> {t('j_exit')}</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {meta.group && (
              <button onClick={() => setStep(step + 1)} data-action="journey-continue-without" className="btn btn-secondary">{t('j_continue_without')}</button>
            )}
            <button onClick={() => setStep(step + 1)} data-action="journey-continue" className="btn btn-primary">
              {t('nav_continue')} <Icon name="ArrowRight" size={16} />
              {count > 0 && step >= 4 && <span style={{ marginLeft: 4, minWidth: 20, height: 20, padding: '0 6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.25)', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{count}</span>}
            </button>
          </div>
        </div>
        )}
      </div>

      <style>{`
        .jcards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); align-items: stretch; }
        @media (max-width: 980px) { .jcards { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 620px) { .jcards { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

Object.assign(window, { Journey });
