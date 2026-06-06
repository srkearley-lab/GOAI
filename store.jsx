/* ============================================================
   GO AI — App store: language + Proposal (proposal-only).
   No basket / cart. CATALOG + helpers live in catalog.jsx.
   ============================================================ */
const { createContext, useContext } = React;

const WEBSITE_IDS = GROUPS.website;

function catalogLabel(id, lang) { return catLabel(id, lang); }
function catalogPrice(id, lang) { return catPrice(id, lang); }

const AppContext = createContext(null);
const LS_LANG = 'goai_lang';
const LS_ITEMS = 'goai_proposal';

function readArr(key) { try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }

function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { const v = localStorage.getItem(LS_LANG); if (v === 'EN' || v === 'GR') return v; } catch (e) {}
    return 'GR';
  });
  const [items, setItems] = useState(() => readArr(LS_ITEMS));
  // one-time cleanup of any legacy basket storage
  useEffect(() => { try { localStorage.removeItem('goai_basket'); } catch (e) {} }, []);

  useEffect(() => {
    try { localStorage.setItem(LS_LANG, lang); } catch (e) {}
    document.documentElement.setAttribute('lang', lang === 'GR' ? 'el' : 'en');
  }, [lang]);
  useEffect(() => { try { localStorage.setItem(LS_ITEMS, JSON.stringify(items)); } catch (e) {} }, [items]);

  const setLang = useCallback((l) => setLangState(l), []);

  const toggleItem = useCallback((id) => setItems((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]), []);
  const addItem = useCallback((id) => setItems((p) => p.includes(id) ? p : [...p, id]), []);
  const removeItem = useCallback((id) => setItems((p) => p.filter((x) => x !== id)), []);
  const hasItem = useCallback((id) => items.includes(id), [items]);
  const clearItems = useCallback(() => setItems([]), []);
  // single-select website: replaces any previously chosen website
  const selectWebsite = useCallback((id) => setItems((p) => {
    const withoutWebsites = p.filter((x) => !WEBSITE_IDS.includes(x));
    return p.includes(id) ? withoutWebsites : [...withoutWebsites, id];
  }), []);
  const selectedWebsite = items.find((x) => WEBSITE_IDS.includes(x)) || null;

  const t = useCallback((key) => (T[lang] && T[lang][key] !== undefined ? T[lang][key] : (T.EN[key] !== undefined ? T.EN[key] : key)), [lang]);
  const tr = useCallback((obj) => {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] ?? obj.EN ?? obj.en ?? '';
  }, [lang]);

  const value = {
    lang, setLang,
    items, toggleItem, addItem, removeItem, hasItem, clearItems, count: items.length,
    selectWebsite, selectedWebsite,
    t, tr,
    labelOf: (id) => catLabel(id, lang), priceOf: (id) => catPrice(id, lang),
    amountOf: (id) => catAmount(id), recurringOf: (id) => catRecurring(id),
  };
  return React.createElement(AppContext.Provider, { value }, children);
}

function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

/* ---------- Language switcher ---------- */
function LangSwitcher({ compact }) {
  const { lang, setLang } = useApp();
  return (
    <div role="group" aria-label="Language"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 2, padding: 3, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-full)' }}>
      {['GR', 'EN'].map((o) => {
        const on = lang === o;
        return (
          <button key={o} onClick={() => setLang(o)} data-action="language-switch" data-lang={o} aria-pressed={on}
            style={{ appearance: 'none', border: 'none', cursor: 'pointer', height: compact ? 28 : 30, minWidth: compact ? 34 : 38, padding: '0 10px',
              borderRadius: 'var(--radius-full)', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.02em',
              background: on ? 'var(--surface)' : 'transparent', color: on ? 'var(--brand-ink)' : 'var(--ink-3)',
              boxShadow: on ? 'var(--shadow-xs)' : 'none', transition: 'all 140ms ease' }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Add to Proposal ---------- */
function AddToProposalButton({ id, size = 'md', full = false, style }) {
  const { hasItem, toggleItem, t } = useApp();
  const added = hasItem(id);
  const sm = size === 'sm';
  return (
    <button onClick={() => toggleItem(id)} data-action={added ? 'added-to-proposal' : 'add-to-proposal'} data-item={id} aria-pressed={added}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: full ? '100%' : undefined,
        height: sm ? 40 : 46, padding: '0 16px', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '-0.01em',
        borderRadius: 'var(--radius-full)', cursor: 'pointer', whiteSpace: 'nowrap',
        border: '1px solid ' + (added ? 'var(--brand)' : 'transparent'),
        background: added ? 'var(--brand-soft)' : 'var(--brand)', color: added ? 'var(--brand-ink)' : '#fff',
        boxShadow: added ? 'none' : 'var(--shadow-brand)',
        transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease', ...style }}>
      <Icon name={added ? 'Check' : 'Plus'} size={sm ? 14 : 16} stroke={added ? 3 : 2.5} />
      {added ? t('added_to_proposal') : t('add_to_proposal')}
    </button>
  );
}

/* ---------- Select Website (single-select, Step 1) ---------- */
function SelectWebsiteButton({ id, full = true }) {
  const { selectedWebsite, selectWebsite, t } = useApp();
  const on = selectedWebsite === id;
  return (
    <button onClick={() => selectWebsite(id)} data-action={on ? 'website-selected' : 'select-website'} data-item={id} aria-pressed={on}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: full ? '100%' : undefined,
        height: 46, padding: '0 16px', fontSize: 'var(--text-sm)', fontWeight: 600, borderRadius: 'var(--radius-full)', cursor: 'pointer', whiteSpace: 'nowrap',
        border: '1px solid ' + (on ? 'var(--brand)' : 'transparent'),
        background: on ? 'var(--brand-soft)' : 'var(--brand)', color: on ? 'var(--brand-ink)' : '#fff',
        boxShadow: on ? 'none' : 'var(--shadow-brand)', transition: 'all 160ms ease' }}>
      <Icon name={on ? 'CheckCircle2' : 'Plus'} size={16} stroke={on ? 2.5 : 2.5} />
      {on ? t('website_selected') : t('select_website')}
    </button>
  );
}

/* proposal-only action row (kept name for existing call sites) */
function ProposalBasketActions({ id, size = 'sm' }) {
  return <AddToProposalButton id={id} size={size} full />;
}

Object.assign(window, {
  AppProvider, useApp, AppContext, LangSwitcher,
  AddToProposalButton, SelectWebsiteButton, ProposalBasketActions,
  WEBSITE_IDS, catalogLabel, catalogPrice,
});
