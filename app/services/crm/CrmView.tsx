'use client';
/* ============================================================
   GO AI — /services/crm: dedicated CRM service page.
   Hero (static image) + a full interactive CrmDashboard section,
   why-points, a €350 + €50/mo pricing card, and the shared final CTA. Reuses the premium
   hero/cta classes from the other service pages.
   ============================================================ */
import { useApp } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { ContinueWithService } from '@/components/services/ContinueWithService';
import { CrmDashboard } from '@/components/crm/CrmDashboard';
import { CrmPriceTiers } from '@/components/crm/CrmPriceTiers';
import { catFeatures } from '@/lib/catalog';
import { WHATSAPP } from '@/lib/whatsapp';

const WHY = [
  { icon: 'Inbox', t: 'crm_why1_t', b: 'crm_why1_b' },
  { icon: 'MessageCircle', t: 'crm_why2_t', b: 'crm_why2_b' },
  { icon: 'Wallet', t: 'crm_why3_t', b: 'crm_why3_b' },
  { icon: 'Rocket', t: 'crm_why4_t', b: 'crm_why4_b' },
];

export default function CrmView() {
  const { t, tr, lang } = useApp();
  const features = catFeatures('crm-platform', lang) || [];
  const scrollToDemo = () => document.getElementById('crm-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <main>
      {/* Hero — split: copy left, interactive CRM demo right */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal className="hero-copy">
            <Eyebrow dot>{t('crm_eyebrow')}</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t('crm_title')}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '46ch' }}>{t('crm_intro')}</p>
            <div className="hero-row">
              <RequestProposalButton size="md" />
              <button onClick={scrollToDemo} data-action="see-crm-demo" className="btn btn-secondary btn-lg">{t('crm_see_demo')} <Icon name="ArrowDown" size={18} /></button>
            </div>
            <div className="hero-proof">
              {[
                { i: 'Wallet', x: tr({ EN: 'From €350 + €50/mo', GR: 'Από €350 + €50/μήνα' }) },
                { i: 'Users', x: tr({ EN: '+€20/mo per licence', GR: '+€20/μήνα ανά άδεια' }) },
                { i: 'Zap', x: tr({ EN: 'Live in days', GR: 'Έτοιμο σε ημέρες' }) },
              ].map((p) => (
                <span key={p.x} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 500 }}>
                  <Icon name={p.i} size={15} style={{ color: 'var(--brand-ink)' }} /> {p.x}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="hero-visual" style={{ position: 'relative' }}>
            <div className="crm-hero-glow" aria-hidden="true" />
            <div className="crm-hero-media"><img src="/crm-hero.png" alt="" aria-hidden="true" /></div>
          </Reveal>
        </div>
      </section>

      {/* Why a GO AI CRM */}
      <section style={{ padding: 'var(--section-y) 0', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center', textAlign: 'center', maxWidth: '52ch', margin: '0 auto' }}>
            <Eyebrow dot>{tr({ EN: 'Why a GO AI CRM', GR: 'Γιατί CRM από τη GO AI' })}</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr({ EN: 'Built for busy local businesses', GR: 'Φτιαγμένο για πολυάσχολες τοπικές επιχειρήσεις' })}</h2>
          </Reveal>
          <div className="crm-why-grid">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 70} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <span className="glass-badge"><Icon name={w.icon} size={22} /></span>
                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t(w.t)}</h3>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t(w.b)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* See it in action — full CRM dashboard */}
      <section id="crm-demo" style={{ scrollMarginTop: 80, padding: 'var(--section-y) 0', background: 'var(--surface-2)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center', textAlign: 'center', maxWidth: '54ch', margin: '0 auto' }}>
            <Eyebrow dot>{tr({ EN: 'See it in action', GR: 'Δείτε το στην πράξη' })}</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr({ EN: 'Your whole business, in one clear dashboard', GR: 'Όλη η επιχείρησή σας, σε έναν καθαρό πίνακα' })}</h2>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr({ EN: 'Switch between your pipeline and contacts, then open any lead to see its full history. This is a live sample — click around.', GR: 'Εναλλαγή μεταξύ pipeline και επαφών, και ανοίξτε κάθε lead για να δείτε όλο το ιστορικό. Ζωντανό δείγμα — κάντε κλικ.' })}</p>
          </Reveal>
          <Reveal delay={80}><CrmDashboard /></Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-16) 0', borderBottom: '1px solid var(--line)' }}>
        <div className="how-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-10)', alignItems: 'center' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center', textAlign: 'center', maxWidth: '24ch' }}>
            <Eyebrow dot>{t('crm_price_tag')}</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{t('crm_price_title')}</h2>
          </Reveal>
          <Reveal delay={80} className="card crm-price">
            <CrmPriceTiers />
            <ul className="crm-price-list">
              {features.map((f, i) => (
                <li key={i}><Icon name="Check" size={15} stroke={2.5} style={{ color: 'var(--brand-ink)', flexShrink: 0, marginTop: 2 }} /> {f}</li>
              ))}
            </ul>
            <ContinueWithService id="crm-platform" size="lg" full />
            <p className="crm-price-note">{t('crm_price_note')}</p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA — Santorini wash */}
      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true" />
        <div className="container">
          <Reveal className="cta-content">
            <div className="cta-head">
              <Eyebrow tone="gold" dot>{t('cta_free_tag')}</Eyebrow>
              <h2>{t('cta_free_title')}</h2>
              <p>{t('cta_free_body')}</p>
            </div>
            <div className="cta-actions">
              <RequestProposalButton size="md" />
              <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .crm-hero-glow { position: absolute; inset: -12% -8% -16% -8%; z-index: 0; pointer-events: none; filter: blur(46px); opacity: 0.5; background: radial-gradient(60% 70% at 55% 34%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 70%); }
        .crm-hero-media { position: relative; z-index: 1; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); background: var(--surface); }
        .crm-hero-media img { display: block; width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
        @media (max-width: 900px) { .crm-hero-media { max-width: 560px; margin: 0 auto; } .crm-hero-media img { aspect-ratio: 16 / 9; } }
        .crm-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); align-items: stretch; }
        @media (max-width: 900px) { .crm-why-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .crm-why-grid { grid-template-columns: 1fr; } }
        .crm-price { width: 100%; max-width: 480px; padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-5); }
        .crm-price-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3) var(--space-5); }
        @media (max-width: 560px) { .crm-price-list { grid-template-columns: 1fr; } }
        .crm-price-list li { display: flex; align-items: flex-start; gap: 8px; font-size: var(--text-sm); color: var(--ink-2); line-height: 1.5; }
        .crm-price-note { font-size: var(--text-xs); color: var(--ink-3); line-height: 1.6; text-align: center; }
      `}</style>
    </main>
  );
}
