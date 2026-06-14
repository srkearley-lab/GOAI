'use client';
/* ============================================================
   GO AI — Industries page (premium redesign, matches /services)
   Split video hero · industries overview grid · editorial
   per-industry deep-dives · Santorini-wash CTA.
   ============================================================ */
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useApp } from '@/lib/store';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { IndustryItem, IndustryBuild, IndustryShort, Bilingual } from '@/types';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: reduce ? 'auto' : 'smooth' });
  try { history.pushState(null, '', '#' + id); } catch {}
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

function OverviewTile({ item, delay }: { item: IndustryShort; delay: number }) {
  const { tr } = useApp();
  const to = item.to || '';
  return (
    <Reveal delay={delay} style={{ display: 'flex' }}>
      <Link to={'#' + to} onClick={(e) => { e.preventDefault(); scrollToSection(to); }} className="ind-tile" style={{ width: '100%' }}>
        <span className="ind-arrow"><Icon name="ArrowUpRight" size={18} /></span>
        <span className="glass-badge"><Icon name={item.icon} size={24} /></span>
        <span className="ind-label">{tr(item.label)}</span>
        {item.tagline && <span className="ind-tagline">{tr(item.tagline)}</span>}
      </Link>
    </Reveal>
  );
}

function FeatureRow({ b, tr }: { b: IndustryBuild; tr: (obj: Bilingual | string | null | undefined) => string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
      <span className="icon-badge sm"><Icon name={b.icon} size={17} /></span>
      <div>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 3 }}>{tr(b.label)}</p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5 }}>{tr(b.detail)}</p>
      </div>
    </div>
  );
}

function IndustrySection({ industry, index }: { industry: IndustryItem; index: number }) {
  const { tr, t } = useApp();
  const isAlt = index % 2 !== 0;
  const num = String(index + 1).padStart(2, '0');
  return (
    <section id={industry.id} className={isAlt ? 'ind-flip' : ''} style={{ padding: 'var(--section-y) 0', background: isAlt ? 'var(--surface-2)' : 'var(--bg)', borderBottom: '1px solid var(--line)', scrollMarginTop: 100 }}>
      <div className="container industry-grid">
        <Reveal className="ind-feat-copy" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <span className="ind-num">{num}</span>
            <span className="glass-badge"><Icon name={industry.icon} size={24} /></span>
            <Eyebrow>{tr(industry.label)}</Eyebrow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr(industry.tagline)}</h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--ink-2)' }}>{tr(industry.description)}</p>
          </div>
          <figure className="ind-quote">
            <Icon name="Quote" size={22} className="ind-quote-glyph" />
            <p>{tr(industry.painPoint)}</p>
          </figure>
          <Link to="/contact" data-action="request-proposal" className="link-arrow" style={{ alignSelf: 'flex-start' }}>
            {t('ind_getplan')}{tr(industry.label).toLowerCase()} <Icon name="ArrowRight" size={15} />
          </Link>
        </Reveal>

        <Reveal delay={80} className="card card-hover ind-feat-panel" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{t('ind_whatwebuild')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {industry.builds.map((b, i) => <FeatureRow key={i} b={b} tr={tr} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Industries() {
  const { t, tr } = useApp();
  const count = DATA.industriesShort.length;
  return (
    <main>
      {/* Hero — split: copy left, video right (parity with /services) */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal className="hero-copy">
            <Eyebrow dot>{t('ind_tag')}</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t('ind_title')}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '42ch' }}>{t('ind_hero_sub')}</p>
            <div className="hero-row">
              <RequestProposalButton size="md" />
              <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-secondary btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
            </div>
            <div className="hero-proof">
              {DATA.heroProofKeys.map((k) => (
                <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 500 }}>
                  <Icon name="Check" size={15} style={{ color: 'var(--brand-ink)' }} /> {t(k)}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="hero-visual" style={{ position: 'relative' }}>
            <div className="svc-hero-glow" aria-hidden="true" />
            <div className="svc-hero-media">
              <img src="/industries-hero.png" alt="" aria-hidden="true" />
            </div>
            <span className="ind-fc fc-top"><Icon name="Sparkles" size={13} /> {tr({ EN: count + ' industries', GR: count + ' κλάδοι' })}</span>
            <span className="ind-fc fc-bot"><Icon name="MapPin" size={13} /> {t('ind_hero_chip2')}</span>
          </Reveal>
        </div>
      </section>

      {/* Industries overview grid — jump map */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--section-y) 0', borderBottom: '1px solid var(--line)' }}>
        <div className="how-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('ind_overview_tag')} title={t('ind_overview_title')} description={t('ind_overview_desc')} />
          <div className="ind-grid">
            {DATA.industriesShort.map((item, i) => <OverviewTile key={item.to} item={item} delay={i * 50} />)}
          </div>
        </div>
      </section>

      {/* Per-industry editorial deep-dives */}
      {DATA.industries.map((ind, i) => <IndustrySection key={ind.id} industry={ind} index={i} />)}

      {/* Final CTA — Santorini wash */}
      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true" />
        <div className="container">
          <Reveal className="cta-content">
            <div className="cta-head">
              <Eyebrow tone="gold" dot>{t('ind_dontsee_tag')}</Eyebrow>
              <h2>{t('ind_dontsee_title')}</h2>
              <p>{t('ind_dontsee_body')}</p>
            </div>
            <div className="cta-actions">
              <RequestProposalButton size="md" />
              <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        /* video frame + glow (parity with /services) */
        .svc-hero-glow { position: absolute; inset: -12% -6% -16% -6%; z-index: 0; pointer-events: none; filter: blur(46px); opacity: 0.5; background: radial-gradient(60% 70% at 58% 32%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 70%); }
        .svc-hero-media { position: relative; z-index: 1; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); background: var(--surface); animation: heroFloat 7s ease-in-out infinite; will-change: transform; }
        .svc-hero-media img { display: block; width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
        /* floating proof chips over the image */
        .ind-fc { position: absolute; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; font-size: var(--text-xs); font-weight: 700; color: var(--ink); background: color-mix(in srgb, var(--surface) 90%, transparent); border: 1px solid var(--line-2); border-radius: var(--radius-full); box-shadow: var(--shadow-md); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: heroFloat 6.5s ease-in-out infinite; }
        .ind-fc svg { color: var(--brand-ink); }
        .ind-fc.fc-top { top: 18px; left: -12px; }
        .ind-fc.fc-bot { bottom: 20px; right: -12px; animation-delay: -3s; }
        /* editorial deep-dive */
        .industry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16); align-items: center; }
        .ind-num { font-family: var(--font-display); font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; color: var(--brand-ink); opacity: 0.85; }
        .ind-quote { position: relative; margin: 0; padding: var(--space-5); border-left: 3px solid var(--brand-line); border-radius: var(--radius-md); background: var(--brand-soft); display: flex; flex-direction: column; gap: 8px; }
        .ind-quote .ind-quote-glyph { color: var(--brand-ink); opacity: 0.55; }
        .ind-quote p { font-size: var(--text-base); font-style: italic; line-height: 1.6; color: var(--ink); margin: 0; }
        @media (prefers-reduced-motion: reduce) { .svc-hero-media, .ind-fc { animation: none; } }
        @media (min-width: 861px) { .ind-flip .ind-feat-copy { order: 2; } .ind-flip .ind-feat-panel { order: 1; } }
        @media (max-width: 900px) { .svc-hero-media { max-width: 560px; margin: 0 auto; } .svc-hero-media img { aspect-ratio: 16 / 9; } .ind-fc { display: none; } }
        @media (max-width: 860px) { .industry-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; } .ind-flip .ind-feat-copy, .ind-flip .ind-feat-panel { order: 0 !important; } }
      `}</style>
    </main>
  );
}
