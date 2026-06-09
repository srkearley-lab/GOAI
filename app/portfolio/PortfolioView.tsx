'use client';
/* ============================================================
   GO AI — Portfolio (premium redesign, matches /services + /industries)
   Split image hero · industry filter · image-forward 3-up grid ·
   stats strip · Santorini-wash CTA.
   ============================================================ */
import { useState, useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { useApp } from '@/lib/store';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Bilingual } from '@/types';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80';

interface PortfolioItem {
  id: number;
  name: string;
  url: string;
  industry: Bilingual;
  location: Bilingual;
  deliveredIn: Bilingual;
  services: string[];
  heroImage: string;
  accentColor: string;
}

interface PortfolioStat {
  stat: Bilingual;
  label: Bilingual;
}

const DOTS = ['#ff5f57', '#febc2e', '#28c840'];
const STAT_ICONS = ['Rocket', 'Building2', 'Sparkles', 'MessageCircle'];

function PortfolioCard({ item, delay }: { item: PortfolioItem; delay: number }) {
  const { tr, t } = useApp();
  return (
    <Reveal delay={delay} className="card pf-card">
      <div className="pf-shot">
        <span className="pf-accent" style={{ background: item.accentColor }} />
        <div className="pf-bar">
          {DOTS.map((c) => <span key={c} className="pf-dot" style={{ background: c }} />)}
          <span className="pf-url">{item.url}</span>
        </div>
        <div className="pf-img">
          <img src={item.heroImage} alt={item.name + ' — ' + tr(item.industry)} loading="lazy" />
        </div>
        <div className="pf-shot-overlay">
          <span className="btn btn-primary btn-sm">{t('pf_viewdemo')} <Icon name="ArrowUpRight" size={15} /></span>
        </div>
      </div>
      <div className="pf-body">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{item.name}</h3>
          <span className="chip chip-brand chip-mini" style={{ flexShrink: 0 }}>{tr(item.industry)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}><Icon name="MapPin" size={12} /> {tr(item.location)}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}><Icon name="Clock" size={12} /> {tr(item.deliveredIn)}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
          {item.services.map((s) => <span key={s} className="chip chip-mini" style={{ background: 'var(--surface-2)' }}>{s}</span>)}
        </div>
      </div>
    </Reveal>
  );
}

export default function Portfolio() {
  const { t, tr } = useApp();
  const portfolio = DATA.portfolio as unknown as PortfolioItem[];
  const industryList = useMemo<Bilingual[]>(() => {
    const seen: Bilingual[] = [];
    portfolio.forEach((i) => { if (!seen.find((x) => x.EN === i.industry.EN)) seen.push(i.industry); });
    return seen;
  }, [portfolio]);
  const [activeEN, setActiveEN] = useState('ALL');
  const filtered = activeEN === 'ALL' ? portfolio : portfolio.filter((i) => i.industry.EN === activeEN);

  return (
    <main>
      {/* Hero — split: copy left, curated image right */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal className="hero-copy">
            <Eyebrow dot>{t('pf_tag')}</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t('pf_title')}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '42ch' }}>{t('pf_hero_sub')}</p>
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
            <div className="pf-hero-glow" aria-hidden="true" />
            <div className="pf-hero-media">
              <img src={HERO_IMAGE} alt="" aria-hidden="true" />
            </div>
            <span className="pf-fc fc-top"><Icon name="LayoutGrid" size={13} /> {tr({ EN: portfolio.length + ' projects', GR: portfolio.length + ' έργα' })}</span>
            <span className="pf-fc fc-bot"><Icon name="Zap" size={13} /> {t('pf_hero_chip2')}</span>
          </Reveal>
        </div>
      </section>

      {/* Work — filter + image-forward grid */}
      <Section bg="base">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
          <Reveal style={{ maxWidth: '64ch' }}>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t('pf_desc')}</p>
          </Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => setActiveEN('ALL')} className="chip" style={{ cursor: 'pointer', fontWeight: 600, background: activeEN === 'ALL' ? 'var(--brand)' : 'var(--surface)', color: activeEN === 'ALL' ? '#fff' : 'var(--ink-2)', borderColor: activeEN === 'ALL' ? 'var(--brand)' : 'var(--line)' }}>{t('pf_all')}</button>
              {industryList.map((ind) => {
                const on = activeEN === ind.EN;
                return (
                  <button key={ind.EN} onClick={() => setActiveEN(ind.EN)} className="chip" style={{ cursor: 'pointer', fontWeight: 600, background: on ? 'var(--brand)' : 'var(--surface)', color: on ? '#fff' : 'var(--ink-2)', borderColor: on ? 'var(--brand)' : 'var(--line)' }}>{tr(ind)}</button>
                );
              })}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{filtered.length} {filtered.length !== 1 ? t('pf_projects') : t('pf_project')}</span>
          </div>

          <div className="pf-grid" key={activeEN}>
            {filtered.map((item, i) => <PortfolioCard key={item.id} item={item} delay={i * 40} />)}
          </div>
        </div>
      </Section>

      {/* Stats strip — cards */}
      <Section bg="alt" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="stats-grid">
          {(DATA.portfolioStats as unknown as PortfolioStat[]).map((s, i) => (
            <Reveal key={i} delay={i * 60} className="card stat-card">
              <span className="glass-badge"><Icon name={STAT_ICONS[i] || 'Sparkles'} size={24} /></span>
              <div>
                <span className="stat-num">{tr(s.stat)}</span>
                <span className="stat-label">{tr(s.label)}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Final CTA — Santorini wash */}
      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true" />
        <div className="container">
          <Reveal className="cta-content">
            <div className="cta-head">
              <Eyebrow tone="gold" dot>{t('pf_cta_tag')}</Eyebrow>
              <h2>{t('pf_cta_title')}</h2>
              <p>{t('pf_cta_body')}</p>
            </div>
            <div className="cta-actions">
              <RequestProposalButton size="md" />
              <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        /* hero image frame + glow (parity with /services video frame) */
        .pf-hero-glow { position: absolute; inset: -12% -6% -16% -6%; z-index: 0; pointer-events: none; filter: blur(46px); opacity: 0.5; background: radial-gradient(60% 70% at 58% 32%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 70%); }
        .pf-hero-media { position: relative; z-index: 1; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); background: var(--surface); animation: heroFloat 7s ease-in-out infinite; will-change: transform; }
        .pf-hero-media img { display: block; width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
        .pf-fc { position: absolute; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; font-size: var(--text-xs); font-weight: 700; color: var(--ink); background: color-mix(in srgb, var(--surface) 90%, transparent); border: 1px solid var(--line-2); border-radius: var(--radius-full); box-shadow: var(--shadow-md); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: heroFloat 6.5s ease-in-out infinite; }
        .pf-fc svg { color: var(--brand-ink); }
        .pf-fc.fc-top { top: 18px; left: -12px; }
        .pf-fc.fc-bot { bottom: 20px; right: -12px; animation-delay: -3s; }

        /* project grid + cards */
        .pf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); align-items: stretch; }
        .pf-card { overflow: hidden; display: flex; flex-direction: column; transition: transform .24s cubic-bezier(.16,1,.3,1), box-shadow .24s ease, border-color .24s ease; }
        .pf-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: var(--brand-line); }
        .pf-shot { position: relative; }
        .pf-accent { display: block; height: 4px; width: 100%; }
        .pf-bar { display: flex; align-items: center; gap: 7px; height: 30px; padding: 0 12px; background: var(--surface-2); border-bottom: 1px solid var(--line); }
        .pf-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .pf-url { flex: 1; height: 18px; margin-left: 6px; padding: 0 8px; display: flex; align-items: center; background: var(--surface); border: 1px solid var(--line); border-radius: 5px; font-size: 10px; color: var(--ink-3); font-family: var(--font-mono); overflow: hidden; white-space: nowrap; }
        .pf-img { height: 190px; overflow: hidden; }
        .pf-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .pf-card:hover .pf-img img { transform: scale(1.04); }
        .pf-shot-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(8,12,24,0.55); opacity: 0; transition: opacity .18s ease; pointer-events: none; }
        .pf-card:hover .pf-shot-overlay { opacity: 1; }
        .pf-body { padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-3); flex: 1; }

        /* stats strip — cards */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); align-items: stretch; }
        .stat-card { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); transition: transform .24s cubic-bezier(.16,1,.3,1), box-shadow .24s ease, border-color .24s ease; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: var(--brand-line); }
        .stat-card:hover .glass-badge { transform: rotate(-6deg) scale(1.05); }
        .stat-num { display: block; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; letter-spacing: -0.03em; color: var(--ink); line-height: 1; }
        .stat-label { display: block; margin-top: 6px; font-size: var(--text-sm); color: var(--ink-2); line-height: 1.5; }

        @media (prefers-reduced-motion: reduce) {
          .pf-hero-media, .pf-fc { animation: none; }
          .pf-img img, .pf-card:hover .pf-img img { transition: none; transform: none; }
          .stat-card:hover, .stat-card:hover .glass-badge { transform: none; }
        }
        @media (max-width: 900px) {
          .pf-hero-media { max-width: 560px; margin: 0 auto; }
          .pf-hero-media img { aspect-ratio: 16 / 9; }
          .pf-fc { display: none; }
          .pf-grid { grid-template-columns: 1fr 1fr; }
          .stats-grid { grid-template-columns: 1fr 1fr; gap: var(--space-6); }
        }
        @media (max-width: 560px) { .pf-grid { grid-template-columns: 1fr; } }
        @media (max-width: 460px) { .stats-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
