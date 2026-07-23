'use client';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { WHATSAPP } from '@/lib/whatsapp';
import type { ProposalRequestInput } from '@/types';

export function WizardConfirmation({ payload, onRestart }: { payload: ProposalRequestInput | null; onRestart: () => void }) {
  const { t, tr } = useApp();
  const router = useRouter();
  return (
    <div className="container" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-12)' }}>
      <Reveal className="card" style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', border: '1.5px solid var(--brand-line)', background: 'linear-gradient(180deg, var(--brand-soft), var(--surface) 50%)' }}>
        <span className="glass-badge" style={{ width: 60, height: 60, borderRadius: 'var(--radius-full)' }}><Icon name="Check" size={26} stroke={2.5} /></span>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('success_title')}</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--ink-2)', maxWidth: '46ch', lineHeight: 1.6 }}>{t('success_body')}</p>
        {payload?.email && process.env.NEXT_PUBLIC_GENERATION_ENABLED === 'true' && (
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--brand-ink)', fontWeight: 600, background: 'var(--brand-soft)', border: '1px solid var(--brand-line)', borderRadius: 'var(--radius-2xl)', padding: '10px 18px', maxWidth: '48ch', lineHeight: 1.55, textAlign: 'left' }}>
            <Icon name="Sparkles" size={16} style={{ flexShrink: 0 }} /> {tr({ EN: 'Thanks so much for requesting a proposal! We’re putting it together now — it’ll land in your inbox within the next few minutes. If you don’t see it, please check your spam folder.', GR: 'Ευχαριστούμε πολύ για το αίτημά σας! Ετοιμάζουμε την πρότασή σας — θα φτάσει στο email σας μέσα στα επόμενα λεπτά. Αν δεν τη δείτε, ελέγξτε τον φάκελο spam.' })}
          </p>
        )}
        {payload && payload.selectedProposalItems.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 4 }}>
            {payload.selectedProposalItems.map((s) => <span key={s.id} className="chip chip-brand chip-mini">{s.label}</span>)}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 'var(--space-3)' }}>
          <button onClick={() => router.push('/')} data-action="home" className="btn btn-primary"><Icon name="Home" size={17} /> {t('home_cta')}</button>
          <button onClick={onRestart} data-action="restart" className="btn btn-secondary"><Icon name="RotateCcw" size={16} /> {t('success_another')}</button>
          <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa"><Icon name="MessageCircle" size={17} /> {t('cta_whatsapp')}</a>
        </div>
      </Reveal>
    </div>
  );
}
