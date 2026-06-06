/* ============================================================
   GO AI — standalone Request Proposal page (proposal-only)
   Two-column: selector + summary | reassurance. Form below.
   ============================================================ */

function ProposalToggle({ id, label, price }) {
  const { hasItem, toggleItem } = useApp();
  const on = hasItem(id);
  return (
    <button type="button" onClick={() => toggleItem(id)} role="checkbox" aria-checked={on}
      data-action={on ? 'added-to-proposal' : 'add-to-proposal'} data-item={id}
      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: 'pointer',
        padding: '12px 14px', borderRadius: 'var(--radius-md)',
        border: '1.5px solid ' + (on ? 'var(--brand)' : 'var(--line-2)'),
        background: on ? 'var(--brand-soft)' : 'var(--surface)', transition: 'border-color 150ms ease, background 150ms ease' }}>
      <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: on ? 'var(--brand)' : 'transparent', border: on ? 'none' : '1.5px solid var(--ink-3)', color: '#fff' }}>
        {on && <Icon name="Check" size={13} stroke={3} />}
      </span>
      <span style={{ flex: 1, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>{label}</span>
      {price && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--brand-ink)', whiteSpace: 'nowrap' }}>{price}</span>}
    </button>
  );
}

function ToggleGroup({ title, ids }) {
  const { labelOf, priceOf } = useApp();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{title}</p>
      <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
        {ids.map((id) => <ProposalToggle key={id} id={id} label={labelOf(id)} price={priceOf(id)} />)}
      </div>
    </div>
  );
}

function ProposalSummary({ prominent }) {
  const { items, t, lang, labelOf, priceOf, removeItem, amountOf, recurringOf } = useApp();
  const real = items.filter((i) => i !== NOT_SURE);
  const notSure = items.includes(NOT_SURE);
  const empty = items.length === 0;
  const oneoff = real.filter((id) => !recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);
  const monthly = real.filter((id) => recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);

  return (
    <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', border: prominent ? '1.5px solid var(--brand-line)' : undefined, background: prominent ? 'linear-gradient(180deg, var(--surface-accent), var(--surface) 60%)' : undefined, boxShadow: prominent ? 'var(--shadow-md)' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t('prop_summary_title')}</p>
        {!empty && <span className="chip chip-brand chip-mini" style={{ flexShrink: 0 }}>{items.length} {t('prop_count_label')}</span>}
      </div>
      <hr className="divider" />

      {empty && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)' }}>{t('prop_empty_title')}</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', lineHeight: 1.6 }}>{t('prop_empty_text')}</p>
        </div>
      )}

      {!empty && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {real.length > 0 && <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink-2)' }}>{t('prop_summary_have')}</p>}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {real.map((id) => (
              <li key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '8px 10px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
                  <Icon name="Check" size={13} style={{ color: 'var(--brand-ink)', flexShrink: 0 }} stroke={3} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', lineHeight: 1.35 }}>{labelOf(id)}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {priceOf(id) && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--brand-ink)' }}>{priceOf(id)}</span>}
                  <button onClick={() => removeItem(id)} aria-label="remove" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--ink-3)', display: 'flex', padding: 2 }}><Icon name="X" size={14} /></button>
                </span>
              </li>
            ))}
          </ul>
          {(oneoff > 0 || monthly > 0) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 'var(--space-2)', borderTop: '1px solid var(--line)' }}>
              {oneoff > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('j_est_oneoff')}</span><span style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--ink)' }}>€{oneoff.toLocaleString('el-GR')}</span></div>}
              {monthly > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('j_est_monthly')}</span><span style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--ink)' }}>€{monthly.toLocaleString('el-GR')}<span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', fontWeight: 600 }}>{lang === 'GR' ? '/μήνα' : '/mo'}</span></span></div>}
            </div>
          )}
          {notSure && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: 'color-mix(in srgb, var(--gold) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 30%, transparent)', borderRadius: 'var(--radius-sm)' }}>
              <Icon name="Sparkles" size={15} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', lineHeight: 1.5 }}>{t('prop_summary_notsure')}</span>
            </div>
          )}
        </div>
      )}
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5 }}>{t('prop_price_note')}</p>
    </div>
  );
}

function ReassureCard({ icon, title, body, children }) {
  return (
    <div className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="icon-badge sm"><Icon name={icon} size={16} /></span>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)' }}>{title}</p>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{body}</p>
      {children}
    </div>
  );
}

function Field({ id, label, type = 'text', placeholder, value, onChange, required, error, optional }) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}{required && <span className="req">*</span>}{optional && <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}> ({/*opt*/}—)</span>}</label>
      <input className="input" id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={error ? { borderColor: '#dc2626', boxShadow: '0 0 0 3px rgba(220,38,38,0.12)' } : undefined} />
      {error && <span style={{ fontSize: 'var(--text-xs)', color: '#dc2626' }}>{error}</span>}
    </div>
  );
}

function BusinessForm({ onDone }) {
  const { t, lang, items, labelOf } = useApp();
  const [f, setF] = useState({ firstName: '', lastName: '', businessName: '', email: '', phoneWhatsapp: '', businessType: '', location: '', existingWebsiteUrl: '', needsHelp: '', message: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!f.firstName.trim()) er.firstName = t('v_name');
    if (!f.businessName.trim()) er.businessName = t('v_business');
    if (!f.email.trim() && !f.phoneWhatsapp.trim()) er.contact = t('v_contact');
    if (items.length === 0) er.service = t('v_service');
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) { const el = document.querySelector('[data-err="1"]'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' }); return; }
    const payload = {
      language: lang,
      selectedProposalItems: items.map((id) => ({ id, label: labelOf(id) })),
      firstName: f.firstName.trim(), lastName: f.lastName.trim(), businessName: f.businessName.trim(),
      email: f.email.trim(), phoneWhatsapp: f.phoneWhatsapp.trim(), businessType: f.businessType,
      location: f.location.trim(), existingWebsiteUrl: f.existingWebsiteUrl.trim(),
      needsHelp: f.needsHelp.trim(), message: f.message.trim(),
    };
    console.log('[GO AI] proposal-request', payload);
    onDone(payload);
  };

  return (
    <form onSubmit={submit} data-action="send-proposal-request" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('f_details_title')}</h3>
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <div data-err={errors.firstName ? '1' : undefined}><Field id="firstName" label={t('f_first')} placeholder={t('f_first_ph')} value={f.firstName} onChange={set('firstName')} required error={errors.firstName} /></div>
        <Field id="lastName" label={t('f_last')} placeholder={t('f_last_ph')} value={f.lastName} onChange={set('lastName')} />
        <div data-err={errors.businessName ? '1' : undefined}><Field id="businessName" label={t('f_business')} placeholder={t('f_business_ph')} value={f.businessName} onChange={set('businessName')} required error={errors.businessName} /></div>
        <div className="field">
          <label className="label" htmlFor="businessType">{t('f_btype')}</label>
          <select className="input" id="businessType" value={f.businessType} onChange={set('businessType')}>
            <option value="">{t('f_btype_ph')}</option>
            {DATA.businessTypes.map((b, i) => <option key={i} value={b.EN}>{b[lang]}</option>)}
          </select>
        </div>
        <div data-err={errors.contact ? '1' : undefined}><Field id="email" label={t('f_email')} type="email" placeholder={t('f_email_ph')} value={f.email} onChange={set('email')} error={errors.contact} /></div>
        <Field id="phoneWhatsapp" label={t('f_phone')} type="tel" placeholder={t('f_phone_ph')} value={f.phoneWhatsapp} onChange={set('phoneWhatsapp')} error={errors.contact ? ' ' : undefined} />
        <Field id="location" label={t('f_location')} placeholder={t('f_location_ph')} value={f.location} onChange={set('location')} />
        <Field id="existingWebsiteUrl" label={t('f_website')} placeholder={t('f_website_ph')} value={f.existingWebsiteUrl} onChange={set('existingWebsiteUrl')} />
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="needsHelp">{t('f_needs')}</label>
          <input className="input" id="needsHelp" placeholder={t('f_needs_ph')} value={f.needsHelp} onChange={set('needsHelp')} />
        </div>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="message">{t('f_message')}</label>
          <textarea className="input" id="message" rows={4} placeholder={t('f_message_ph')} value={f.message} onChange={set('message')} style={{ minHeight: 110 }} />
        </div>
      </div>

      {errors.service && <span data-err="1" style={{ fontSize: 'var(--text-sm)', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="AlertCircle" size={14} /> {errors.service}</span>}
      {(errors.firstName || errors.businessName || errors.contact || errors.service) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 'var(--radius-md)', color: '#b91c1c' }}>
          <Icon name="AlertCircle" size={16} /> <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{t('v_fix')}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <button type="submit" data-action="send-proposal-request" className="btn btn-primary btn-lg"><Icon name="Send" size={18} /> {t('f_submit')}</button>
        <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('f_whatsapp_btn')}</a>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.6 }}>{t('submit_support')}</p>

      <style>{`@media (max-width: 620px){ .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}

function Confirmation({ payload }) {
  const { t } = useApp();
  return (
    <Reveal className="card" style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', border: '1.5px solid var(--brand-line)', background: 'linear-gradient(180deg, var(--brand-soft), var(--surface) 50%)' }}>
      <span className="icon-badge lg round" style={{ background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' }}><Icon name="Check" size={24} stroke={2.5} /></span>
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('success_title')}</h2>
      <p style={{ fontSize: 'var(--text-md)', color: 'var(--ink-2)', maxWidth: '46ch', lineHeight: 1.6 }}>{t('success_body')}</p>
      {payload && payload.selectedProposalItems.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 4 }}>
          {payload.selectedProposalItems.map((s) => <span key={s.id} className="chip chip-brand chip-mini">{s.label}</span>)}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 'var(--space-3)' }}>
        <button onClick={() => navigate('/')} data-action="home" className="btn btn-primary"><Icon name="Home" size={17} /> {t('home_cta')}</button>
        <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa"><Icon name="MessageCircle" size={17} /> {t('cta_whatsapp')}</a>
      </div>
    </Reveal>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-5) 0', background: 'none', border: 'none', textAlign: 'left' }}>
        <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>{q}</span>
        <span style={{ flexShrink: 0, color: open ? 'var(--brand-ink)' : 'var(--ink-3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease', display: 'flex' }}><Icon name="ChevronDown" size={18} /></span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .24s cubic-bezier(.16,1,.3,1)' }}>
        <div style={{ overflow: 'hidden' }}><p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink-2)', paddingBottom: 'var(--space-5)', maxWidth: '64ch' }}>{a}</p></div>
      </div>
    </div>
  );
}

function Contact() {
  const { t, tr } = useApp();
  const [done, setDone] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <main>
      <PageHero tag={t('prop_tag')} title={t('prop_title')} description={t('prop_intro')}>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '60ch' }}>{t('prop_support')}</p>
      </PageHero>

      <Section bg="base" id="proposal-form" wide>
        {done ? (
          <Confirmation payload={payload} />
        ) : (
          <div className="rp-grid" style={{ display: 'grid', gridTemplateColumns: '1.7fr 0.9fr', gap: 'var(--space-8)', alignItems: 'start' }}>
            {/* MAIN: selector + summary + form */}
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div className="card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('prop_what_included')}</h3>
                <div className="incl-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6) var(--space-8)' }}>
                  {GROUP_ORDER.map((g) => <ToggleGroup key={g} title={tr(GROUP_TITLES[g])} ids={GROUPS[g]} />)}
                </div>
                <ProposalToggle id={NOT_SURE} label={t('not_sure') + ' — ' + t('prop_summary_notsure')} />
              </div>
              <ProposalSummary prominent />
              <div className="card" style={{ padding: 'var(--space-8)' }}>
                <BusinessForm onDone={(p) => { setPayload(p); setDone(true); window.scrollTo({ top: document.getElementById('proposal-form').getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }} />
              </div>
            </Reveal>

            {/* SIDE: reassurance */}
            <Reveal delay={80} className="rp-side" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', position: 'sticky', top: 90 }}>
              <ReassureCard icon="ShieldCheck" title={t('r1_t')} body={t('r1_b')} />
              <ReassureCard icon="Sparkles" title={t('r2_t')} body={t('r2_b')} />
              <div className="card" style={{ padding: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-ink)', marginBottom: 'var(--space-5)' }}>{t('f_details_title')}</p>
                {DATA.nextSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <span className="icon-badge sm"><Icon name={step.icon} size={16} /></span>
                      {i < DATA.nextSteps.length - 1 && <div style={{ width: 2, height: 22, background: 'var(--line)', margin: '4px 0' }} />}
                    </div>
                    <div style={{ paddingBottom: i < DATA.nextSteps.length - 1 ? 'var(--space-5)' : 0 }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{tr(step.title)}</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{tr(step.body)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ReassureCard icon="MessageCircle" title={t('r3_t')} body={t('r3_b')}>
                <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-sm" style={{ alignSelf: 'flex-start' }}><Icon name="MessageCircle" size={16} /> {t('f_whatsapp_btn')}</a>
              </ReassureCard>
            </Reveal>
          </div>
        )}
      </Section>

      <Section bg="alt" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Eyebrow dot>FAQ</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{t('faq_title')}</h2>
            <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-sm" style={{ alignSelf: 'flex-start' }}><Icon name="MessageCircle" size={16} /> {t('ask_whatsapp')}</a>
          </Reveal>
          <Reveal delay={80} style={{ borderTop: '1px solid var(--line)' }}>
            {DATA.faqs.map((f, i) => <FaqItem key={i} q={tr(f.q)} a={tr(f.a)} />)}
          </Reveal>
        </div>
      </Section>

      <style>{`
        @media (max-width: 920px) {
          .rp-grid { grid-template-columns: 1fr !important; }
          .rp-side { position: static !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: var(--space-8) !important; }
        }
        @media (max-width: 560px) { .incl-cols { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

Object.assign(window, { Contact });
