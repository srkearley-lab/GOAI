'use client';
import { Fragment } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { WIZARD_STEPS } from './steps';

export function WizardProgress({ step, setStep }: { step: number; setStep: (n: number) => void }) {
  const { t } = useApp();
  return (
    <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'var(--nav-bg)', backdropFilter: 'blur(14px) saturate(1.4)', WebkitBackdropFilter: 'blur(14px) saturate(1.4)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ padding: '14px var(--space-8)' }}>
        <div className="jprog" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {WIZARD_STEPS.map((s, i) => {
            const done = s.n < step, cur = s.n === step;
            return (
              <Fragment key={s.n}>
                <button onClick={() => setStep(s.n)} data-action="wizard-step" aria-current={cur}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', padding: '4px 6px', borderRadius: 'var(--radius-full)', flexShrink: 0 }}>
                  <span style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800,
                    background: cur ? 'var(--brand)' : done ? 'var(--brand-soft)' : 'var(--surface-2)',
                    color: cur ? '#fff' : done ? 'var(--brand-ink)' : 'var(--ink-3)',
                    border: '1px solid ' + (cur ? 'var(--brand)' : done ? 'var(--brand-line)' : 'var(--line)'),
                    transition: 'background 200ms ease, color 200ms ease, border-color 200ms ease' }}>
                    {done ? <Icon name="Check" size={13} stroke={3} /> : s.n}
                  </span>
                  <span className="jprog-label" style={{ fontSize: 'var(--text-sm)', fontWeight: cur ? 700 : 600, color: cur ? 'var(--ink)' : 'var(--ink-3)', whiteSpace: 'nowrap' }}>{t(s.shortKey)}</span>
                </button>
                {i < WIZARD_STEPS.length - 1 && <span className="jprog-line" style={{ flex: 1, height: 2, minWidth: 8, background: s.n < step ? 'var(--brand-line)' : 'var(--line)', borderRadius: 2, transition: 'background 240ms ease' }} />}
              </Fragment>
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
