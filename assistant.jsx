/* ============================================================
   GO AI — guided AI Assistant (memory) + WhatsApp toggle.
   Front-end preset decision rules. Only resets on Start over.
   ============================================================ */

const A_GOALS = [
  { id: 'website',   icon: 'Globe',         label: { EN: 'I need a website', GR: 'Θέλω ιστοσελίδα' } },
  { id: 'enquiries', icon: 'TrendingUp',    label: { EN: 'I want more enquiries', GR: 'Θέλω περισσότερα αιτήματα' } },
  { id: 'whatsapp',  icon: 'MessageSquare', label: { EN: 'I want WhatsApp automation', GR: 'Θέλω WhatsApp αυτοματισμό' } },
  { id: 'chatbot',   icon: 'Bot',           label: { EN: 'I want an AI chatbot', GR: 'Θέλω AI chatbot' } },
  { id: 'automation',icon: 'Workflow',      label: { EN: 'I want automation', GR: 'Θέλω αυτοματισμούς' } },
  { id: 'unsure',    icon: 'Sparkles',      label: { EN: 'I’m not sure yet', GR: 'Δεν είμαι σίγουρος/η ακόμα' } },
];
const A_HAVESITE = [
  { id: 'no',        label: { EN: 'No, I need a new one', GR: 'Όχι, χρειάζομαι νέα' } },
  { id: 'improve',   label: { EN: 'Yes, but it needs improving', GR: 'Ναι, αλλά θέλει βελτίωση' } },
  { id: 'addauto',   label: { EN: 'Yes, and I want to add automation', GR: 'Ναι, και θέλω αυτοματισμούς' } },
  { id: 'notsure',   label: { EN: 'I’m not sure', GR: 'Δεν είμαι σίγουρος/η' } },
];
const A_BUSINESS = [
  { id: 'villa',      label: { EN: 'Villa / accommodation', GR: 'Βίλα / κατάλυμα' } },
  { id: 'restaurant', label: { EN: 'Restaurant / cafe', GR: 'Εστιατόριο / καφέ' } },
  { id: 'gym',        label: { EN: 'Gym / fitness', GR: 'Γυμναστήριο / fitness' } },
  { id: 'salon',      label: { EN: 'Salon / clinic', GR: 'Κομμωτήριο / κλινική' } },
  { id: 'tourism',    label: { EN: 'Tourism / boat hire', GR: 'Τουρισμός / ενοικίαση σκαφών' } },
  { id: 'local',      label: { EN: 'Local service', GR: 'Τοπική υπηρεσία' } },
  { id: 'other',      label: { EN: 'Other', GR: 'Άλλο' } },
];

/* preset decision rules → { website, automation, support } catalog ids */
function recommend(mem) {
  const r = { website: null, automation: [], support: [] };
  const g = mem.goal;
  if (g === 'website' || g === 'unsure') {
    if (mem.haveSite === 'improve' || mem.haveSite === 'addauto') r.website = 'business-website';
    else if (mem.haveSite === 'no') r.website = 'business-website';
    else r.website = 'business-website';
    if (mem.haveSite === 'addauto') r.automation.push('whatsapp-automation');
    r.support.push('hosting-care');
  } else if (g === 'enquiries') {
    r.website = 'business-website'; r.automation.push('whatsapp-automation', 'local-seo' );
  } else if (g === 'whatsapp') {
    r.automation.push('whatsapp-automation'); r.website = 'business-website';
  } else if (g === 'chatbot') {
    r.automation.push('ai-chatbot'); r.website = 'premium-ai-website';
  } else if (g === 'automation') {
    r.automation.push('whatsapp-automation', 'ai-chatbot', 'email-automation');
  }
  // business nudges
  if (['restaurant', 'gym', 'salon'].includes(mem.business) && !r.automation.includes('local-seo') && cat('local-seo')) r.support.push('local-seo');
  // de-dupe & valid
  r.automation = [...new Set(r.automation)].filter((id) => cat(id));
  r.support = [...new Set(r.support)].filter((id) => cat(id));
  return r;
}

function ARecItem({ id }) {
  const { labelOf, priceOf, hasItem, addItem, t } = useApp();
  const on = hasItem(id);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)' }}>{labelOf(id)}</p>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--brand-ink)' }}>{priceOf(id)}</p>
      </div>
      <button onClick={() => addItem(id)} disabled={on} data-action="add-to-proposal" data-item={id}
        className="chip" style={{ cursor: on ? 'default' : 'pointer', fontWeight: 700, flexShrink: 0, background: on ? 'var(--brand-soft)' : 'var(--brand)', color: on ? 'var(--brand-ink)' : '#fff', borderColor: 'transparent' }}>
        <Icon name={on ? 'Check' : 'Plus'} size={12} stroke={3} /> {on ? t('added_to_proposal') : t('add_to_proposal')}
      </button>
    </div>
  );
}

function Bubble({ children }) {
  return <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '4px 14px 14px 14px', padding: '10px 12px' }}><p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', lineHeight: 1.5 }}>{children}</p></div>;
}
function OptBtn({ icon, children, onClick }) {
  return (
    <button onClick={onClick} data-action="assistant-pick" style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', cursor: 'pointer', padding: '10px 12px', border: '1px solid var(--line-2)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--ink)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
      {icon && <span className="icon-badge sm" style={{ width: 28, height: 28 }}><Icon name={icon} size={14} /></span>}
      <span style={{ flex: 1 }}>{children}</span>
    </button>
  );
}

function AIAssistant() {
  const { t, tr, lang, amountOf, recurringOf } = useApp();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState('goal');
  const [mem, setMem] = useState({ goal: null, haveSite: null, business: null });

  const reset = () => { setStage('goal'); setMem({ goal: null, haveSite: null, business: null }); };
  const pickGoal = (id) => { setMem((m) => ({ ...m, goal: id })); setStage((id === 'website' || id === 'unsure') ? 'havesite' : 'business'); };
  const pickHave = (id) => { setMem((m) => ({ ...m, haveSite: id })); setStage('business'); };
  const pickBiz = (id) => { setMem((m) => ({ ...m, business: id })); setStage('rec'); };

  const goJourney = () => { setOpen(false); navigate('/journey'); };
  const goProposal = () => { setOpen(false); navigate('/contact'); setTimeout(() => { const el = document.getElementById('proposal-form'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }, 160); };

  const rec = stage === 'rec' ? recommend(mem) : null;
  const recIds = rec ? [rec.website, ...rec.automation, ...rec.support].filter(Boolean) : [];
  const recOneoff = recIds.filter((id) => !recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);
  const recMonthly = recIds.filter((id) => recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);

  return (
    <div style={{ position: 'fixed', right: 'max(16px, env(safe-area-inset-right))', bottom: 'max(16px, env(safe-area-inset-bottom))', zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div role="dialog" aria-label={t('assistant_title')} style={{ width: 'min(348px, calc(100vw - 32px))', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'var(--brand)', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="Sparkles" size={16} /></span>
              <p style={{ fontSize: 13, fontWeight: 800 }}>{t('assistant_title')}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', padding: 4, opacity: 0.9 }}><Icon name="X" size={18} /></button>
          </div>

          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 'min(64vh, 500px)', overflowY: 'auto' }}>
            {stage === 'goal' && (
              <>
                <Bubble>{t('a_intro')}</Bubble>
                {A_GOALS.map((g) => <OptBtn key={g.id} icon={g.icon} onClick={() => pickGoal(g.id)}>{tr(g.label)}</OptBtn>)}
              </>
            )}

            {stage === 'havesite' && (
              <>
                <Bubble>{t('a_q_havesite')}</Bubble>
                {A_HAVESITE.map((o) => <OptBtn key={o.id} onClick={() => pickHave(o.id)}>{tr(o.label)}</OptBtn>)}
                <button onClick={() => setStage('goal')} style={{ border: 'none', background: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: 600, alignSelf: 'flex-start' }}>← {t('a_back')}</button>
              </>
            )}

            {stage === 'business' && (
              <>
                <Bubble>{t('a_q_business')}</Bubble>
                {A_BUSINESS.map((o) => <OptBtn key={o.id} onClick={() => pickBiz(o.id)}>{tr(o.label)}</OptBtn>)}
                <button onClick={() => setStage(mem.goal === 'website' || mem.goal === 'unsure' ? 'havesite' : 'goal')} style={{ border: 'none', background: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: 600, alignSelf: 'flex-start' }}>← {t('a_back')}</button>
              </>
            )}

            {stage === 'rec' && (
              <>
                <Bubble>{t('a_rec_intro')}</Bubble>
                {rec.website && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)' }}>{t('a_rec_website')}</p>
                    <ARecItem id={rec.website} />
                  </div>
                )}
                {rec.automation.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)' }}>{t('a_rec_automation')}</p>
                    {rec.automation.map((id) => <ARecItem key={id} id={id} />)}
                  </div>
                )}
                {rec.support.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)' }}>{t('a_rec_support')}</p>
                    {rec.support.map((id) => <ARecItem key={id} id={id} />)}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--ink-2)', padding: '4px 2px' }}>
                  <span>{t('j_est_oneoff')}: <b style={{ color: 'var(--ink)' }}>€{recOneoff.toLocaleString('el-GR')}</b></span>
                  <span>{t('j_est_monthly')}: <b style={{ color: 'var(--ink)' }}>€{recMonthly.toLocaleString('el-GR')}{lang === 'GR' ? '/μήνα' : '/mo'}</b></span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
                  <button onClick={goJourney} data-action="assistant-journey" className="btn btn-primary btn-sm full">{t('a_viewjourney')}</button>
                  <button onClick={goProposal} data-action="assistant-proposal" className="btn btn-secondary btn-sm full">{t('assistant_proposal')}</button>
                  <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-sm full"><Icon name="MessageCircle" size={15} /> {t('cta_whatsapp')}</a>
                  <button onClick={reset} style={{ border: 'none', background: 'transparent', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: 600, padding: 4 }}>{t('assistant_restart')}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        <a href={WHATSAPP} data-action="whatsapp-contact" aria-label={t('wa_help')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: 'var(--radius-full)', background: 'var(--whatsapp)', color: '#fff', fontWeight: 700, fontSize: 'var(--text-sm)', boxShadow: 'var(--shadow-md)', textDecoration: 'none' }}>
          <Icon name="MessageCircle" size={18} /> <span className="wa-label">{t('wa_help')}</span>
        </a>
        <button onClick={() => setOpen((o) => !o)} data-action="open-assistant" aria-label={t('assistant_title')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 48, padding: '0 18px', borderRadius: 'var(--radius-full)', background: 'var(--brand)', color: '#fff', fontWeight: 700, fontSize: 'var(--text-sm)', boxShadow: 'var(--shadow-brand)', cursor: 'pointer', border: 'none' }}>
          <Icon name={open ? 'X' : 'Sparkles'} size={18} /> {!open && <span className="asst-label">{t('assistant_open')}</span>}
        </button>
      </div>

      <style>{`@media (max-width: 520px) { .asst-label, .wa-label { display: none; } }`}</style>
    </div>
  );
}

Object.assign(window, { AIAssistant });
