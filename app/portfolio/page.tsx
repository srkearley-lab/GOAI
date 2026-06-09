'use client';

/* ============================================================
   GO AI — Portfolio page (bilingual)
   ============================================================ */

import { useState, useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { useApp } from '@/lib/store';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Bilingual } from '@/types';

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

function BrowserMockup({ item }: { item: PortfolioItem }) {
  return (
    <div style={{ background: 'var(--surface-3)', overflow: 'hidden' }}>
      <div style={{ height: 30, background: 'var(--surface-2)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, height: 18, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 5, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{item.url}</span>
        </div>
      </div>
      <div style={{ height: 210, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, height: 142 }}>
          <img src={item.heroImage} alt="" aria-hidden="true" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,12,24,0.4)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
            <div style={{ width: 40, height: 6, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: 6 }}>{[22, 18, 22, 26].map((w, i) => <div key={i} style={{ width: w, height: 4, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />)}</div>
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ width: 120, height: 8, background: 'rgba(255,255,255,0.95)', borderRadius: 2 }} />
            <div style={{ width: 84, height: 5, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
            <div style={{ marginTop: 3, width: 56, height: 18, background: item.accentColor, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 30, height: 4, background: 'rgba(255,255,255,0.9)', borderRadius: 2 }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 68, background: 'var(--surface)', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', gap: 6 }}>{[1, 2, 3].map((i) => <div key={i} style={{ flex: 1, height: 30, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 5 }} />)}</div>
          <div style={{ width: '55%', height: 4, background: 'var(--line-2)', borderRadius: 2 }} />
          <div style={{ width: '38%', height: 4, background: 'var(--line)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ item, delay }: { item: PortfolioItem; delay: number }) {
  const { tr, t } = useApp();
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay} className="card" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform .22s cubic-bezier(.16,1,.3,1), box-shadow .22s ease', transform: hover ? 'translateY(-4px)' : 'none', boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ position: 'relative' }}>
        <BrowserMockup item={item} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,12,24,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hover ? 1 : 0, transition: 'opacity .18s ease', pointerEvents: 'none' }}>
          <span className="btn btn-primary btn-sm">{t('pf_viewdemo')} <Icon name="ArrowUpRight" size={15} /></span>
        </div>
      </div>
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{item.name}</h3>
          <span className="chip chip-brand chip-mini" style={{ flexShrink: 0 }}>{tr(item.industry)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}><Icon name="MapPin" size={12} /> {tr(item.location)}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}><Icon name="Clock" size={12} /> {tr(item.deliveredIn)}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {item.services.map((s) => <span key={s} className="chip chip-mini" style={{ background: 'var(--surface-2)' }}>{s}</span>)}
        </div>
      </div>
    </Reveal>
  );
}

/* ---- Reusable final CTA (translation-key driven) ---- */
function FinalCTA({ tagKey, titleKey, bodyKey, bg = 'accent' }: { tagKey: string; titleKey: string; bodyKey: string; primaryKey?: string; bg?: string }) {
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

export default function Portfolio() {
  const { t, tr } = useApp();
  const industryList = useMemo<Bilingual[]>(() => {
    const seen: Bilingual[] = []; (DATA.portfolio as unknown as PortfolioItem[]).forEach((i) => { if (!seen.find((x) => x.EN === i.industry.EN)) seen.push(i.industry); });
    return seen;
  }, []);
  const [activeEN, setActiveEN] = useState('ALL');
  const portfolio = DATA.portfolio as unknown as PortfolioItem[];
  const filtered = activeEN === 'ALL' ? portfolio : portfolio.filter((i) => i.industry.EN === activeEN);

  return (
    <main>
      <PageHero tag={t('pf_tag')} title={t('pf_title')} description={t('pf_desc')} />

      <Section bg="base">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
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

          <div className="grid-3" key={activeEN} style={{ width: '100%' }}>
            {filtered.map((item, i) => <PortfolioCard key={item.id} item={item} delay={i * 40} />)}
          </div>
        </div>
      </Section>

      <Section bg="alt" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-8)' }}>
          {(DATA.portfolioStats as unknown as PortfolioStat[]).map((s, i) => (
            <Reveal key={i} delay={i * 60} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1 }}>{tr(s.stat)}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.5 }}>{tr(s.label)}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA tagKey="pf_cta_tag" titleKey="pf_cta_title" bodyKey="pf_cta_body" primaryKey="pf_cta_btn" bg="base" />

      <style>{`
        @media (max-width: 900px) { .stats-grid { grid-template-columns: 1fr 1fr !important; gap: var(--space-6) !important; } }
        @media (max-width: 460px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
