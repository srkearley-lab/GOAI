'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { GROUPS } from '@/lib/catalog';
import { WIZARD_STEPS } from './steps';
import { WizardProgress } from './WizardProgress';
import { WizardServiceCard } from './WizardServiceCard';
import { WizardReview } from './WizardReview';
import { BusinessDetailsForm } from './BusinessDetailsForm';
import { WizardConfirmation } from './WizardConfirmation';
import type { ProposalRequestInput } from '@/types';

const LS_STEP = 'goai_cstep';

export function ProposalWizard() {
  const { t, count } = useApp();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStepState] = useState(1);
  const [done, setDone] = useState(false);
  const [payload, setPayload] = useState<ProposalRequestInput | null>(null);

  // The wizard is fully client-interactive and reads selection/step from
  // localStorage. Render it only after mount so the SSR output and the first
  // client render are identical (an empty placeholder) — this avoids any
  // hydration/DOM-reconciliation mismatch when the persisted state loads in.
  useEffect(() => {
    setMounted(true);
    try {
      const v = parseInt(localStorage.getItem(LS_STEP) || '1', 10);
      if (v >= 1 && v <= 6) setStepState(v);
    } catch {}
  }, []);

  const setStep = (n: number) => {
    const v = Math.max(1, Math.min(6, n));
    setStepState(v);
    try { localStorage.setItem(LS_STEP, String(v)); } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pre-mount placeholder (matches SSR exactly → clean hydration).
  if (!mounted) {
    return <div style={{ minHeight: '70vh' }} aria-hidden="true" />;
  }

  if (done) {
    return <WizardConfirmation payload={payload} onRestart={() => { setDone(false); setStep(1); }} />;
  }

  const meta = WIZARD_STEPS[step - 1];

  return (
    <div style={{ paddingBottom: 'var(--space-16)', minHeight: '60vh' }}>
      <WizardProgress step={step} setStep={setStep} />

      <div className="container" style={{ paddingTop: 'var(--space-12)' }}>
        {/* step header */}
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '62ch', marginBottom: 'var(--space-10)' }}>
          <Eyebrow dot>{t('step_label')} {step} / 6</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{t(meta.titleKey)}</h2>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t(meta.whyKey)}</p>
        </Reveal>

        {/* step body (re-keyed for the entrance transition) */}
        <div key={step} className="wizard-step">
          {meta.group && (
            <div className="jcards">
              {GROUPS[meta.group].map((id) => <WizardServiceCard key={id} id={id} single={!!meta.single} />)}
            </div>
          )}
          {meta.group === 'automation' && (
            <div className="card" style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', background: 'var(--surface-accent)', border: '1px solid var(--brand-line)' }}>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink)' }}>{t('ai_note_1')}</p>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink-2)', fontWeight: 600 }}>{t('ai_note_2')}</p>
            </div>
          )}
          {step === 5 && <WizardReview setStep={setStep} />}
          {step === 6 && (
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div className="card" style={{ padding: 'var(--space-8)' }}>
                <BusinessDetailsForm onDone={(p) => { setPayload(p); setDone(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
              </div>
            </div>
          )}
        </div>

        {/* nav */}
        <div style={{ marginTop: 'var(--space-12)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', borderTop: '1px solid var(--line)', paddingTop: 'var(--space-6)' }}>
          <div>
            {step > 1
              ? <button onClick={() => setStep(step - 1)} data-action="wizard-back" className="btn btn-ghost"><Icon name="ArrowLeft" size={16} /> {t('nav_back')}</button>
              : <button onClick={() => router.push('/')} data-action="wizard-exit" className="btn btn-ghost"><Icon name="Home" size={16} /> {t('j_exit')}</button>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {meta.group && (
              <button onClick={() => setStep(step + 1)} data-action="wizard-continue-without" className="btn btn-secondary">{t('j_continue_without')}</button>
            )}
            {step <= 5 && (
              <button onClick={() => setStep(step + 1)} data-action="wizard-continue" className="btn btn-primary">
                {t('nav_continue')} <Icon name="ArrowRight" size={16} />
                {count > 0 && step >= 4 && <span style={{ marginLeft: 4, minWidth: 20, height: 20, padding: '0 6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.25)', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{count}</span>}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .jcards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); align-items: stretch; }
        @media (max-width: 980px) { .jcards { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 620px) { .jcards { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
