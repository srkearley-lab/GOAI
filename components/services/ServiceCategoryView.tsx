'use client';
/* ============================================================
   GO AI — Service CATEGORY deep-dive page (premium template).
   Driven by SERVICE_CATEGORIES + the catalog. Used by
   app/services/[category]/page.tsx for all 4 categories.
   ============================================================ */
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { ContinueWithService } from '@/components/services/ContinueWithService';
import { cat, catFeatures, GROUPS } from '@/lib/catalog';
import { SERVICE_CATEGORIES, type ServiceCategorySlug } from '@/data/serviceCategories';
import { WHATSAPP } from '@/lib/whatsapp';

function ServiceDeepDive({ id, index }: { id: string; index: number }) {
  const { tr, t, lang } = useApp();
  const c = cat(id);
  if (!c) return null;
  const feats = catFeatures(id, lang);
  const alt = index % 2 === 1;
  return (
    <section style={{ padding: 'var(--section-y) 0', background: alt ? 'var(--surface-2)' : 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal className="svc-deep">
          <div className="svc-deep-copy">
            <span className="glass-badge"><Icon name={c.icon} size={26} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr(c.label)}</h2>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--brand-ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>{tr(c.price)}</p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--ink-2)' }}>{tr(c.desc)}</p>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: 'var(--ink-2)' }}>{t('best_for')} </span>{tr(c.best)}
            </p>
            <div><ContinueWithService id={id} size="md" /></div>
          </div>

          {feats && feats.length > 0 && (
            <div className="card svc-deep-incl">
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{t('svc_whats_included')}</p>
              <ul style={{ listStyle: 'none', margin: 'var(--space-4) 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {feats.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 20, height: 20, marginTop: 1, borderRadius: '50%', background: 'var(--brand-soft)', border: '1px solid var(--brand-line)', color: 'var(--brand-ink)', display: 'grid', placeItems: 'center' }}><Icon name="Check" size={11} stroke={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCategoryView({ slug }: { slug: ServiceCategorySlug }) {
  const { tr, t } = useApp();
  const content = SERVICE_CATEGORIES[slug];
  const ids = GROUPS[content.group];

  return (
    <main>
      {/* Hero — homepage premium kit: grid + drifting aurora */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 132, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: '52ch' }}>
            <Link to="/services" className="link-arrow" style={{ alignSelf: 'flex-start', color: 'var(--ink-3)' }}>
              <Icon name="ArrowLeft" size={14} /> {t('svc_tag')}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <span className="glass-badge"><Icon name={content.icon} size={26} /></span>
              <Eyebrow dot>{tr(content.eyebrow)}</Eyebrow>
            </div>
            <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em', color: 'var(--ink)' }}>{tr(content.headline)}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '52ch' }}>{tr(content.intro)}</p>
            <div className="hero-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <RequestProposalButton size="md" />
              {content.group === 'automation' && (
                <Link to="/automation" className="link-arrow">{t('svc_see_in_action')} <Icon name="ArrowRight" size={15} /></Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why this category */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="cat-why">
            {content.whyPoints.map((w, i) => (
              <Reveal key={i} delay={i * 70} className="cat-why-item">
                <span className="icon-badge"><Icon name={w.icon} size={22} /></span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{tr(w.title)}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr(w.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Per-service deep-dives */}
      {ids.map((id, i) => <ServiceDeepDive key={id} id={id} index={i} />)}

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
        .cat-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-8); }
        .cat-why-item { display: flex; align-items: flex-start; gap: var(--space-4); }
        .svc-deep { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: var(--space-12); align-items: center; }
        .svc-deep-copy { display: flex; flex-direction: column; gap: var(--space-5); }
        .svc-deep-incl { padding: var(--space-8); }
        @media (max-width: 900px) {
          .cat-why { grid-template-columns: 1fr; gap: var(--space-6); }
          .svc-deep { grid-template-columns: 1fr; gap: var(--space-8); }
        }
      `}</style>
    </main>
  );
}
