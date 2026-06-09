'use client';
/* ============================================================
   GO AI — Industries page (bilingual)
   ============================================================ */
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { Link } from '@/components/ui/Link';
import { useApp } from '@/lib/store';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { IndustryItem, IndustryBuild, Bilingual } from '@/types';

function QuickNav() {
  const { tr } = useApp();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
  };
  return (
    <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'var(--nav-bg)', backdropFilter: 'blur(14px) saturate(1.4)', WebkitBackdropFilter: 'blur(14px) saturate(1.4)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px var(--space-8)' }}>
        {DATA.industries.map((ind) => (
          <button key={ind.id} onClick={() => scrollTo(ind.id)} className="chip" style={{ cursor: 'pointer', background: 'var(--surface)' }}>
            <Icon name={ind.icon} size={13} /> {tr(ind.label)}
          </button>
        ))}
      </div>
    </div>
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
  return (
    <section id={industry.id} style={{ padding: 'var(--section-y) 0', background: isAlt ? 'var(--surface-2)' : 'var(--bg)', borderBottom: '1px solid var(--line)', scrollMarginTop: 130 }}>
      <div className="container industry-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="icon-badge"><Icon name={industry.icon} size={22} /></span>
            <Eyebrow>{tr(industry.label)}</Eyebrow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr(industry.tagline)}</h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--ink-2)' }}>{tr(industry.description)}</p>
          </div>
          <blockquote style={{ margin: 0, borderLeft: '3px solid var(--brand-line)', paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Icon name="Quote" size={18} style={{ color: 'var(--brand-ink)' }} />
            <p style={{ fontSize: 'var(--text-base)', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr(industry.painPoint)}</p>
          </blockquote>
          <Link to="/contact" data-action="request-proposal" className="link-arrow" style={{ alignSelf: 'flex-start' }}>
            {t('ind_getplan')}{tr(industry.label).toLowerCase()} <Icon name="ArrowRight" size={15} />
          </Link>
        </Reveal>

        <Reveal delay={80} className="card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{t('ind_whatwebuild')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {industry.builds.map((b, i) => <FeatureRow key={i} b={b} tr={tr} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Request Proposal button with live count badge */
function RequestProposalButton({ size = 'sm', full = false, onNavigate }: { size?: 'sm' | 'md'; full?: boolean; onNavigate?: () => void }) {
  const { t, count } = useApp();
  const router = useRouter();
  const go = (e?: React.MouseEvent) => {
    e && e.preventDefault();
    onNavigate && onNavigate();
    router.push('/contact');
    setTimeout(() => {
      const el = document.getElementById('proposal-form');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    }, 140);
  };
  return (
    <button onClick={go} data-action="request-proposal" data-count={count}
      className={'btn btn-primary ' + (size === 'sm' ? 'btn-sm' : '') + (full ? ' full' : '')}
      style={{ position: 'relative', overflow: 'visible' }}>
      {t('request_proposal')}
      {count > 0 && (
        <span aria-label={count + ' selected'} style={{
          position: 'absolute', top: -7, right: -7, minWidth: 22, height: 22, padding: '0 6px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--gold)', color: '#1a1206', borderRadius: 'var(--radius-full)',
          fontSize: 12, fontWeight: 800, lineHeight: 1, border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
        }}>{count}</span>
      )}
    </button>
  );
}

/* ---- Reusable final CTA (translation-key driven) ---- */
function FinalCTA({ tagKey, titleKey, bodyKey, primaryKey, bg = 'accent' }: { tagKey: string; titleKey: string; bodyKey: string; primaryKey: string; bg?: string }) {
  const { t } = useApp();
  return (
    <Section bg={bg} style={{ borderTop: '1px solid var(--line)' }}>
      <Reveal style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Eyebrow tone="gold" dot>{t(tagKey)}</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: '22ch' }}>{t(titleKey)}</h2>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '48ch' }}>{t(bodyKey)}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <RequestProposalButton size="md" />
          <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
        </div>
      </Reveal>
    </Section>
  );
}

export default function Industries() {
  const { t } = useApp();
  return (
    <main>
      <PageHero tag={t('ind_tag')} title={t('ind_title')} description={t('ind_desc')} />
      <QuickNav />
      {DATA.industries.map((ind, i) => <IndustrySection key={ind.id} industry={ind} index={i} />)}

      <FinalCTA tagKey="ind_dontsee_tag" titleKey="ind_dontsee_title" bodyKey="ind_dontsee_body" primaryKey="cta_free_btn" />

      <style>{`
        @media (max-width: 860px) { .industry-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; } }
      `}</style>
    </main>
  );
}
