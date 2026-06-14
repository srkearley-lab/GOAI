'use client';
/* ============================================================
   GO AI — /contact: premium split hero + stepped proposal wizard
   (absorbs the old /journey flow) + FAQ.
   ============================================================ */
import { useApp } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { ProposalWizard } from '@/components/contact/ProposalWizard';
import { ContactFaq } from '@/components/contact/ContactFaq';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Bilingual } from '@/types';

export default function ContactPage() {
  const { t, tr } = useApp();
  const scrollToWizard = () => {
    document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <main>
      {/* Hero — split: copy + trust signals left, WhatsApp mockup right */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal className="hero-copy">
            <Eyebrow dot>{t('prop_tag')}</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t('prop_title')}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '46ch' }}>{t('prop_intro')}</p>
            <div className="hero-row">
              <button onClick={scrollToWizard} data-action="scroll-to-wizard" className="btn btn-primary btn-lg">
                {t('prop_start')} <Icon name="ArrowDown" size={18} />
              </button>
              <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-secondary btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
            </div>
            <div className="hero-proof ct-trust">
              {(DATA.trustSignals as unknown as Bilingual[]).map((ts, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 500 }}>
                  <Icon name="Check" size={15} style={{ color: 'var(--brand-ink)' }} /> {tr(ts)}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="hero-visual" style={{ position: 'relative' }}>
            <div className="ct-hero-glow" aria-hidden="true" />
            <div className="ct-hero-media"><img src="/contact-hero.png" alt="" aria-hidden="true" /></div>
            <span className="ct-fc fc-top"><Icon name="MessageCircle" size={13} /> {t('proof_2')}</span>
            <span className="ct-fc fc-bot"><Icon name="ShieldCheck" size={13} /> {t('auto_hero_chip2')}</span>
          </Reveal>
        </div>
      </section>

      <ProposalWizard />

      <ContactFaq />

      <style>{`
        .ct-hero-glow { position: absolute; inset: -14% -10% -16% -10%; z-index: 0; pointer-events: none; filter: blur(46px); opacity: 0.55; background: radial-gradient(58% 65% at 52% 34%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 70%); }
        .ct-hero-media { position: relative; z-index: 1; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); background: var(--surface); animation: heroFloat 7s ease-in-out infinite; will-change: transform; }
        .ct-hero-media img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
        .ct-fc { position: absolute; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; font-size: var(--text-xs); font-weight: 700; color: var(--ink); background: color-mix(in srgb, var(--surface) 90%, transparent); border: 1px solid var(--line-2); border-radius: var(--radius-full); box-shadow: var(--shadow-md); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: heroFloat 6.5s ease-in-out infinite; }
        .ct-fc svg { color: var(--brand-ink); }
        .ct-fc.fc-top { top: 26px; left: -4px; }
        .ct-fc.fc-bot { bottom: 30px; right: -4px; animation-delay: -3s; }
        @media (max-width: 900px) { .ct-fc { display: none; } }
        @media (prefers-reduced-motion: reduce) { .ct-hero-media, .ct-fc { animation: none; } }
      `}</style>
    </main>
  );
}
