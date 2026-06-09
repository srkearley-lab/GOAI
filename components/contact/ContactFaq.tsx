'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { WHATSAPP } from '@/lib/whatsapp';
import { SITE as DATA } from '@/data/content';

function FaqItem({ q, a }: { q: string; a: string }) {
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

export function ContactFaq() {
  const { t, tr } = useApp();
  return (
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
      <style>{`@media (max-width: 920px) { .faq-grid { grid-template-columns: 1fr !important; gap: var(--space-8) !important; } }`}</style>
    </Section>
  );
}
