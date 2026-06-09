'use client';
/* ============================================================
   GO AI — theming: accent / display font / density / dark mode.
   Ported from legacy app.jsx. Applies CSS custom properties to
   <html>, persists to localStorage. Font tweaks map to the
   next/font CSS variables (literal family stacks won't load).
   ============================================================ */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Accent { label: string; brand: string; strong: string; inkDark: string; }
export interface FontDef { label: string; stack: string; }
export interface DensityDef { y: string; pad: string; }

export const ACCENTS: Record<string, Accent> = {
  indigo:  { label: 'Electric Indigo', brand: '#4f46e5', strong: '#4338ca', inkDark: '#a5abff' },
  blue:    { label: 'Aegean Blue',     brand: '#1f6fd6', strong: '#195bb0', inkDark: '#8fb8f5' },
  emerald: { label: 'Emerald',         brand: '#0f9d6b', strong: '#0c7f56', inkDark: '#5fe0a6' },
  violet:  { label: 'Violet',          brand: '#7c3aed', strong: '#6d28d9', inkDark: '#c4a6fb' },
};

export const FONTS: Record<string, FontDef> = {
  Manrope:            { label: 'Manrope',       stack: "var(--font-manrope), 'Helvetica Neue', Arial, sans-serif" },
  'Space Grotesk':    { label: 'Space Grotesk', stack: 'var(--font-space-grotesk), sans-serif' },
  'Instrument Serif': { label: 'Serif display', stack: 'var(--font-instrument-serif), Georgia, serif' },
};

export const DENSITY: Record<string, DensityDef> = {
  compact: { y: '64px',                     pad: '24px' },
  regular: { y: 'clamp(80px, 9vw, 132px)',  pad: '32px' },
  comfy:   { y: 'clamp(108px, 12vw, 168px)', pad: '40px' },
};

export interface Tweaks {
  accent: string;
  displayFont: string;
  density: string;
  dark: boolean;
}

export const TWEAK_DEFAULTS: Tweaks = {
  accent: 'indigo',
  displayFont: 'Manrope',
  density: 'regular',
  dark: false,
};

const LS_TWEAKS = 'goai_tweaks';

/** Apply the full tweak set to <html> (mirrors the legacy app.jsx effect). */
function applyTweaks(t: Tweaks) {
  const root = document.documentElement;
  const dark = !!t.dark;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');

  const a = ACCENTS[t.accent] || ACCENTS.indigo;
  root.style.setProperty('--brand', a.brand);
  root.style.setProperty('--brand-strong', a.strong);
  root.style.setProperty('--brand-soft', `color-mix(in srgb, ${a.brand} ${dark ? '18%' : '10%'}, transparent)`);
  root.style.setProperty('--brand-line', `color-mix(in srgb, ${a.brand} ${dark ? '34%' : '26%'}, transparent)`);
  root.style.setProperty('--brand-ink', dark ? a.inkDark : a.brand);

  const f = FONTS[t.displayFont] || FONTS.Manrope;
  root.style.setProperty('--font-display', f.stack);

  const d = DENSITY[t.density] || DENSITY.regular;
  root.style.setProperty('--section-y', d.y);
  root.style.setProperty('--card-pad', d.pad);
}

export interface ThemeContextValue {
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
  toggleDark: () => void;
  accents: typeof ACCENTS;
  fonts: typeof FONTS;
  densities: typeof DENSITY;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tweaks, setTweaks] = useState<Tweaks>(TWEAK_DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate persisted tweaks after mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_TWEAKS);
      if (raw) setTweaks({ ...TWEAK_DEFAULTS, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  // Apply + persist whenever tweaks change.
  useEffect(() => {
    applyTweaks(tweaks);
    if (!hydrated) return;
    try { localStorage.setItem(LS_TWEAKS, JSON.stringify(tweaks)); } catch {}
  }, [tweaks, hydrated]);

  const setTweak = useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((p) => ({ ...p, [key]: value }));
  }, []);

  const toggleDark = useCallback(() => setTweaks((p) => ({ ...p, dark: !p.dark })), []);

  const value: ThemeContextValue = { tweaks, setTweak, toggleDark, accents: ACCENTS, fonts: FONTS, densities: DENSITY };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
