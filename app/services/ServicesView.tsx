'use client';
/* ============================================================
   GO AI — Services hub: premium overview that routes into the
   4 category deep-dive pages (/services/[category]).
   ============================================================ */
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useApp } from '@/lib/store';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { cat, GROUPS, GROUP_TITLES } from '@/lib/catalog';
import { SERVICE_CATEGORIES, CATEGORY_SLUGS } from '@/data/serviceCategories';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Diff, StepItem } from '@/types';

function CategoryHubCard({ slug, delay }: { slug: string; delay: number }) {
  const { tr, t } = useApp();
  const content = SERVICE_CATEGORIES[slug];
  const ids = GROUPS[content.group];
  const examples = ids.slice(0, 4);
  return (
    <Reveal delay={delay} style={{ display: 'flex' }}>
      <Link to={'/services/' + slug} className="card cat-card">
        <div className="cat-card-head">
          <span className="glass-badge"><Icon name={content.icon} size={24} /></span>
          <span className="cat-card-arrow"><Icon name="ArrowUpRight" size={18} /></span>
        </div>
        <h3>{tr(GROUP_TITLES[content.group])}</h3>
        <p className="cat-card-tag">{tr(content.headline)}</p>
        <ul className="cat-card-list">
          {examples.map((id) => {
            const c = cat(id);
            return c ? (
              <li key={id}><Icon name="Check" size={12} stroke={3} /> {tr(c.label)}</li>
            ) : null;
          })}
        </ul>
        <div className="cat-card-foot">
          <span className="chip chip-brand chip-mini">{tr({ EN: ids.length + ' services', GR: ids.length + ' υπηρεσίες' })}</span>
          <span className="link-arrow">{t('svc_explore')} <Icon name="ArrowRight" size={15} /></span>
        </div>
      </Link>
    </Reveal>
  );
}

function StepCard({ s }: { s: StepItem }) {
  const { tr } = useApp();
  return (
    <div className="how-step">
      <span className="how-icon">
        <span className="glass-badge"><Icon name={s.icon || 'Circle'} size={28} /></span>
        <span className="how-num">{s.number}</span>
      </span>
      <h3>{tr(s.title)}</h3>
      <p>{tr(s.description)}</p>
    </div>
  );
}

function DiffText({ d }: { d: Diff }) {
  const { tr } = useApp();
  return (
    <>
      <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>{tr(d.title)}</h3>
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr(d.body)}</p>
    </>
  );
}

export default function Services() {
  const { t, tr } = useApp();
  return (
    <main>
      {/* Hero — split: copy left, video right */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal className="hero-copy">
            <Eyebrow dot>{t('svc_tag')}</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t('svc_intro_title')}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '40ch' }}>{t('svc_hero_sub')}</p>
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
              <img src="/services-hero.png" alt="" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 category cards (rich) */}
      <section style={{ padding: 'var(--section-y) 0', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('svc_tag')} title={t('svc_title')} description={t('svc_intro_sub')} />
          <div className="cat-grid">
            {CATEGORY_SLUGS.map((slug, i) => <CategoryHubCard key={slug} slug={slug} delay={i * 60} />)}
          </div>
          <Reveal>
            <Link to="/services/crm" className="card crm-feature">
              <span className="glass-badge"><Icon name="Users" size={26} /></span>
              <div className="crm-feature-copy">
                <div className="crm-feature-head">
                  <h3>{tr({ EN: 'CRM Platform', GR: 'Πλατφόρμα CRM' })}</h3>
                  <span className="chip chip-brand chip-mini">{tr({ EN: 'New', GR: 'Νέο' })}</span>
                </div>
                <p>{tr({ EN: 'Keep every lead, customer and conversation in one place — for a flat €50/month.', GR: 'Κρατήστε κάθε lead, πελάτη και συνομιλία σε ένα σημείο — με σταθερά €50/μήνα.' })}</p>
              </div>
              <div className="crm-feature-foot">
                <span className="chip chip-brand chip-mini">€50/{tr({ EN: 'mo', GR: 'μήνα' })}</span>
                <span className="link-arrow">{t('svc_explore')} <Icon name="ArrowRight" size={15} /></span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--section-y) 0', borderBottom: '1px solid var(--line)' }}>
        <div className="how-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('sec_how_tag')} title={t('sec_how_title')} description={t('sec_how_desc')} />
          <div className="how-steps">
            {DATA.steps.map((s, i) => <StepCard key={i} s={s} />)}
          </div>
        </div>
      </section>

      {/* Why GO AI */}
      <section style={{ padding: 'var(--section-y) 0', background: 'var(--surface-accent)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Eyebrow dot>{t('why_tag')}</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: '24ch' }}>{t('why_title')}</h2>
          </Reveal>
          <div className="why-grid">
            {DATA.diffs.map((d, i) => (
              <Reveal key={d.number} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--brand-ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>0{d.number}</span>
                <DiffText d={d} />
              </Reveal>
            ))}
          </div>
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
        .svc-hero-glow { position: absolute; inset: -12% -6% -16% -6%; z-index: 0; pointer-events: none; filter: blur(46px); opacity: 0.5; background: radial-gradient(60% 70% at 58% 32%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 70%); }
        .svc-hero-media { position: relative; z-index: 1; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); background: var(--surface); animation: heroFloat 7s ease-in-out infinite; will-change: transform; }
        .svc-hero-media img { display: block; width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
        @media (prefers-reduced-motion: reduce) { .svc-hero-media { animation: none; } }
        @media (max-width: 900px) { .svc-hero-media { max-width: 560px; margin: 0 auto; } .svc-hero-media img { aspect-ratio: 16 / 9; } }
        .cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); align-items: stretch; }
        .cat-card { width: 100%; display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-8); text-decoration: none; transition: transform .24s cubic-bezier(.16,1,.3,1), box-shadow .24s ease, border-color .24s ease; }
        .cat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: var(--brand-line); }
        .cat-card:hover .glass-badge { transform: rotate(-6deg) scale(1.05); }
        .cat-card:hover .cat-card-arrow { opacity: 1; transform: translateX(0); color: var(--brand-ink); }
        .cat-card-head { display: flex; align-items: flex-start; justify-content: space-between; }
        .cat-card-arrow { color: var(--ink-3); opacity: 0; transform: translateX(-6px); transition: opacity .24s ease, transform .24s ease, color .24s ease; }
        .cat-card h3 { font-size: var(--text-lg); font-weight: 800; color: var(--ink); letter-spacing: -0.02em; }
        .cat-card-tag { font-size: var(--text-sm); line-height: 1.5; color: var(--ink-2); }
        .cat-card-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px var(--space-5); }
        .cat-card-list li { display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); font-weight: 600; color: var(--ink-2); }
        .cat-card-list li svg { color: var(--brand-ink); flex-shrink: 0; }
        .cat-card-foot { margin-top: auto; padding-top: var(--space-2); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
        @media (max-width: 860px) { .cat-grid { grid-template-columns: 1fr; } .why-grid { grid-template-columns: 1fr; } .cat-card-list { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .cat-card-list { grid-template-columns: 1fr; } }
        /* featured CRM card */
        .crm-feature { display: flex; align-items: center; gap: var(--space-6); padding: var(--space-6) var(--space-8); text-decoration: none; }
        .crm-feature .glass-badge { flex-shrink: 0; }
        .crm-feature-copy { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
        .crm-feature-head { display: flex; align-items: center; gap: 10px; }
        .crm-feature-head h3 { font-size: var(--text-lg); font-weight: 800; color: var(--ink); letter-spacing: -0.02em; }
        .crm-feature-copy p { font-size: var(--text-sm); color: var(--ink-2); line-height: 1.55; }
        .crm-feature-foot { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
        .crm-feature:hover { box-shadow: var(--shadow-lg); border-color: var(--brand-line); transform: translateY(-3px); }
        @media (max-width: 640px) { .crm-feature { flex-direction: column; align-items: flex-start; } .crm-feature-foot { flex-direction: row; align-self: stretch; justify-content: space-between; align-items: center; } }
      `}</style>
    </main>
  );
}
