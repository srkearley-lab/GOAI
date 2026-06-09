'use client';
import { useApp } from '@/lib/store';
import type { Lang } from '@/types';

export function LangSwitcher({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useApp();
  return (
    <div role="group" aria-label="Language"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 2, padding: 3, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-full)' }}>
      {(['GR', 'EN'] as Lang[]).map((o) => {
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
