'use client';
/* ============================================================
   GO AI — Services page (catalogue, categories, prices, dual CTAs)
   ============================================================ */

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { useApp } from '@/lib/store';
import { ProposalBasketActions } from '@/components/proposal/AddToProposalButton';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { cat, catFeatures, GROUPS, GROUP_ORDER, GROUP_TITLES, GROUP_ICONS } from '@/lib/catalog';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Group, Diff } from '@/types';

const GROUP_ANCHOR_KEY: Record<Group, string> = { website: 'svc_anchor_websites', digital: 'svc_anchor_digital', automation: 'svc_anchor_ai', support: 'svc_anchor_support' };

function MoreDetails({ id }: { id: string }) {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const feats = catFeatures(id, lang);
  if (!feats) return null;
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} data-action="see-more" data-item={id}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-ink)', fontSize: 'var(--text-xs)', fontWeight: 700, padding: '2px 0' }}>
        {open ? t('see_less') : t('see_more')} <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={13} />
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .22s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          <ul style={{ listStyle: 'none', padding: '8px 0 0', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {feats.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <Icon name="Check" size={12} stroke={3} style={{ color: 'var(--brand-ink)', flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-2)', lineHeight: 1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CatalogCard({ id, delay }: { id: string; delay: number }) {
  const { tr, t, hasItem } = useApp();
  const c = cat(id);
  if (!c) return null;
  const selected = hasItem(id);
  return (
    <Reveal delay={delay} className="card" style={{
      padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      border: '1.5px solid ' + (selected ? 'var(--brand)' : 'var(--line)'),
      background: selected ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 55%)' : 'var(--surface)',
      transition: 'border-color 180ms ease, background 180ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <span className="icon-badge"><Icon name={c.icon} size={22} /></span>
        <span className="chip chip-mini" style={{ background: 'var(--surface-2)', color: 'var(--ink-3)' }}>{t(GROUP_ANCHOR_KEY[c.group])}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{tr(c.label)}</h3>
        <p style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--brand-ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>{tr(c.price)}</p>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)', flex: 1 }}>{tr(c.desc)}</p>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 700, color: 'var(--ink-2)' }}>{t('best_for')} </span>{tr(c.best)}
      </p>
      <MoreDetails id={id} />
      <ProposalBasketActions id={id} />
    </Reveal>
  );
}

function ServicesAnchors() {
  const { t } = useApp();
  const scrollTo = (id: string) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' }); };
  return (
    <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'var(--nav-bg)', backdropFilter: 'blur(14px) saturate(1.4)', WebkitBackdropFilter: 'blur(14px) saturate(1.4)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px var(--space-8)' }}>
        {GROUP_ORDER.map((g) => (
          <button key={g} onClick={() => scrollTo('svc-' + g)} className="chip" style={{ cursor: 'pointer', background: 'var(--surface)' }}>
            <Icon name={GROUP_ICONS[g]} size={13} /> {t(GROUP_ANCHOR_KEY[g])}
          </button>
        ))}
      </div>
    </div>
  );
}

function ServiceGroupSection({ group, index }: { group: Group; index: number }) {
  const { t, tr } = useApp();
  const isAlt = index % 2 !== 0;
  return (
    <section id={'svc-' + group} style={{ padding: 'var(--section-y) 0', background: isAlt ? 'var(--surface-2)' : 'var(--bg)', borderBottom: '1px solid var(--line)', scrollMarginTop: 130 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '60ch' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="icon-badge"><Icon name={GROUP_ICONS[group]} size={22} /></span>
            <Eyebrow dot>{t(GROUP_ANCHOR_KEY[group])}</Eyebrow>
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr(GROUP_TITLES[group])}</h2>
          {group === 'automation' && <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t('ai_sub')}</p>}
          {group === 'website' && <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t('svc_websites_desc')}</p>}
        </Reveal>

        <div className="svc-grid">
          {GROUPS[group].map((id, i) => <CatalogCard key={id} id={id} delay={i * 40} />)}
        </div>

        {group === 'automation' && (
          <Reveal className="card" style={{ padding: 'var(--space-6) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', background: 'var(--surface-accent)', border: '1px solid var(--brand-line)' }}>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink)' }}>{t('ai_note_1')}</p>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--ink-2)', fontWeight: 600 }}>{t('ai_note_2')}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default function Services() {
  const { t } = useApp();
  return (
    <main>
      <PageHero tag={t('svc_tag')} title={t('svc_intro_title')} description={t('svc_intro_sub')} />
      <ServicesAnchors />

      {GROUP_ORDER.map((g, i) => <ServiceGroupSection key={g} group={g} index={i} />)}

      {/* Why GO AI */}
      <Section bg="accent" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
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
      </Section>

      <FinalCTA tagKey="cta_free_tag" titleKey="cta_free_title" bodyKey="cta_free_body" primaryKey="cta_free_btn" bg="base" />

      <style>{`
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); align-items: stretch; }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
        @media (max-width: 980px) { .svc-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr; } }
        @media (max-width: 620px) { .svc-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
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
