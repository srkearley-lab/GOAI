'use client';
/* ============================================================
   GO AI — App store: language + Proposal selection (proposal-only).
   Ported from legacy store.jsx. SSR-safe: defaults on first render,
   hydrate from localStorage after mount.
   ============================================================ */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Lang, SelectableId, Bilingual } from '@/types';
import { T } from '@/lib/i18n';
import { GROUPS, catLabel, catPrice, catAmount, catRecurring } from '@/lib/catalog';

const LS_LANG = 'goai_lang';
const LS_ITEMS = 'goai_proposal';

const WEBSITE_IDS = GROUPS.website;

function readArr(key: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  items: string[];
  toggleItem: (id: string) => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clearItems: () => void;
  count: number;
  selectWebsite: (id: string) => void;
  selectedWebsite: string | null;
  t: (key: string) => string;
  tr: (obj: Bilingual | string | null | undefined) => string;
  labelOf: (id: string) => string;
  priceOf: (id: string) => string;
  amountOf: (id: string) => number;
  recurringOf: (id: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Defaults render identically on server + first client paint (GR, empty).
  const [lang, setLangState] = useState<Lang>('GR');
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate persisted state after mount (client only).
  useEffect(() => {
    try {
      const v = localStorage.getItem(LS_LANG);
      if (v === 'EN' || v === 'GR') setLangState(v);
    } catch {}
    setItems(readArr(LS_ITEMS));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_LANG, lang); } catch {}
    document.documentElement.setAttribute('lang', lang === 'GR' ? 'el' : 'en');
  }, [lang, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_ITEMS, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const toggleItem = useCallback((id: string) => setItems((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), []);
  const addItem = useCallback((id: string) => setItems((p) => (p.includes(id) ? p : [...p, id])), []);
  const removeItem = useCallback((id: string) => setItems((p) => p.filter((x) => x !== id)), []);
  const hasItem = useCallback((id: string) => items.includes(id), [items]);
  const clearItems = useCallback(() => setItems([]), []);

  // single-select website: replaces any previously chosen website
  const selectWebsite = useCallback((id: string) => setItems((p) => {
    const withoutWebsites = p.filter((x) => !WEBSITE_IDS.includes(x));
    return p.includes(id) ? withoutWebsites : [...withoutWebsites, id];
  }), []);
  const selectedWebsite = items.find((x) => WEBSITE_IDS.includes(x)) || null;

  const t = useCallback((key: string): string => {
    const v = (T[lang] && T[lang][key] !== undefined) ? T[lang][key] : (T.EN[key] !== undefined ? T.EN[key] : key);
    return typeof v === 'string' ? v : key;
  }, [lang]);

  const tr = useCallback((obj: Bilingual | string | null | undefined): string => {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] ?? obj.EN ?? '';
  }, [lang]);

  const value: AppContextValue = {
    lang, setLang,
    items, toggleItem, addItem, removeItem, hasItem, clearItems, count: items.length,
    selectWebsite, selectedWebsite,
    t, tr,
    labelOf: (id: string) => catLabel(id, lang),
    priceOf: (id: string) => catPrice(id, lang),
    amountOf: (id: string) => catAmount(id),
    recurringOf: (id: string) => catRecurring(id),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// Re-export the proposal-store selectable id type for convenience.
export type { SelectableId };
