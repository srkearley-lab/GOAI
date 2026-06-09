'use client';
/* ============================================================
   GO AI — Automation page (bilingual + Add to Proposal)
   ============================================================ */
import type { ComponentType } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { useApp } from '@/lib/store';
import { ContinueWithService } from '@/components/services/ContinueWithService';
import { WhatsAppMockup } from '@/components/contact/WhatsAppMockup';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Bilingual } from '@/types';

/* ---- local data shapes (richer than the shared @/types interfaces) ---- */
interface EmailStepData { day: Bilingual; label: Bilingual; subject: Bilingual; preview: Bilingual; }
interface FlowStepData { icon: string; label: Bilingual; sub: Bilingual; }
interface AutoSectionData { cid: string; tag: Bilingual; title: Bilingual; description: Bilingual; points: Bilingual[]; visual: string; flip: boolean; }
interface SupportCardData { cid: string; icon: string; title: Bilingual; description: Bilingual; points: Bilingual[]; }

const HERO_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80';
const SECTION_ICONS: Record<string, string> = { whatsapp: 'MessageSquare', email: 'Mail', proposal: 'FileText' };

function EmailSequenceViz() {
  const { tr } = useApp();
  const colors: Record<string, [string, string, string]> = {
    Welcome: ['var(--brand-soft)', 'var(--brand-ink)', 'var(--brand-line)'],
    Offer: ['color-mix(in srgb, var(--gold) 14%, transparent)', 'var(--gold)', 'color-mix(in srgb, var(--gold) 30%, transparent)'],
    Nurture: ['color-mix(in srgb, var(--success) 14%, transparent)', 'var(--success)', 'color-mix(in srgb, var(--success) 30%, transparent)'],
    'Follow-up': ['var(--surface-2)', 'var(--ink-2)', 'var(--line-2)'],
    'Last chance': ['rgba(220,38,38,0.1)', '#dc2626', 'rgba(220,38,38,0.25)'],
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 440 }}>
      {(DATA.emailSteps as EmailStepData[]).map((step, i) => {
        const [bg, col, bd] = colors[step.label.EN];
        const last = i === DATA.emailSteps.length - 1;
        return (
          <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30, flexShrink: 0 }}>
              <span className="icon-badge sm" style={{ width: 30, height: 30, borderRadius: '50%' }}><Icon name="Mail" size={13} /></span>
              {!last && <div style={{ width: 2, flex: 1, minHeight: 22, background: 'var(--line-2)', marginTop: 2 }} />}
            </div>
            <div className="card" style={{ flex: 1, padding: 'var(--space-3) var(--space-4)', marginBottom: last ? 0 : 'var(--space-3)', boxShadow: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-3)' }}>{tr(step.day)}</span>
                <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: col, background: bg, border: `1px solid ${bd}`, borderRadius: 5, padding: '1px 6px' }}>{tr(step.label)}</span>
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, margin: '0 0 3px' }}>{tr(step.subject)}</p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.4, margin: 0 }}>{tr(step.preview)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProposalMockup() {
  return (
    <div style={{ width: 310, background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ background: 'var(--brand)', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.25)' }} /><div style={{ width: 44, height: 7, background: 'rgba(255,255,255,0.75)', borderRadius: 2 }} /></div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: '0.1em' }}>PROPOSAL</span>
        </div>
        <div style={{ width: '72%', height: 10, background: 'rgba(255,255,255,0.95)', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ width: '46%', height: 6, background: 'rgba(255,255,255,0.55)', borderRadius: 2 }} />
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {[['Day Trip to Delos', '€280'], ['Sunset Cruise (8 pax)', '€440'], ['Private Island Tour', '€650']].map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 9, borderBottom: i < 2 ? '1px solid #f0f0f2' : 'none' }}>
            <div><p style={{ fontSize: 12, fontWeight: 600, color: '#222', margin: 0 }}>{it[0]}</p><div style={{ width: 72, height: 4, background: '#ececf0', borderRadius: 2, marginTop: 4 }} /></div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand)' }}>{it[1]}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '2px solid #f0f0f2' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>Total</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>€1,370</span>
        </div>
        <div style={{ height: 36, background: 'var(--brand)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>Accept proposal</div>
        <p style={{ fontSize: 9, color: '#bbb', textAlign: 'center', margin: '8px 0 0' }}>Powered by GO AI · 48s</p>
      </div>
    </div>
  );
}

const VISUALS: Record<string, ComponentType> = { whatsapp: WhatsAppMockup, email: EmailSequenceViz, proposal: ProposalMockup };

function AutoSection({ section, index, bg }: { section: AutoSectionData; index: number; bg: string }) {
  const { tr, priceOf } = useApp();
  const Visual = VISUALS[section.visual];
  const flip = section.flip;
  return (
    <Section bg={bg} style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="auto-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', order: flip ? 2 : 1 }} className="auto-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <span className="au-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="glass-badge"><Icon name={SECTION_ICONS[section.visual] || 'Sparkles'} size={24} /></span>
            <Eyebrow dot>{tr(section.tag)}</Eyebrow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{tr(section.title)}</h2>
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--brand-ink)', letterSpacing: '-0.02em' }}>{priceOf(section.cid)}</p>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--ink-2)' }}>{tr(section.description)}</p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {section.points.map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--brand-soft)', border: '1px solid var(--brand-line)', color: 'var(--brand-ink)' }}><Icon name="Check" size={11} stroke={3} /></span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', lineHeight: 1.5 }}>{tr(p)}</span>
              </li>
            ))}
          </ul>
          <div><ContinueWithService id={section.cid} size="md" /></div>
        </Reveal>
        <Reveal delay={80} style={{ display: 'flex', justifyContent: 'center', order: flip ? 1 : 2 }} className="auto-visual"><Visual /></Reveal>
      </div>
    </Section>
  );
}

function SupportCard({ card, delay }: { card: SupportCardData; delay: number }) {
  const { tr, priceOf } = useApp();
  return (
    <Reveal delay={delay} className="card au-card">
      <span className="glass-badge"><Icon name={card.icon} size={22} /></span>
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{tr(card.title)}</h3>
        <p style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--brand-ink)', marginBottom: 6 }}>{priceOf(card.cid)}</p>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)' }}>{tr(card.description)}</p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {card.points.map((p, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 15, height: 15, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--brand-soft)', border: '1px solid var(--brand-line)', color: 'var(--brand-ink)' }}><Icon name="Check" size={8} stroke={3} /></span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-2)' }}>{tr(p)}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto' }}><ContinueWithService id={card.cid} size="sm" full /></div>
    </Reveal>
  );
}

function SystemFlow() {
  const { tr } = useApp();
  return (
    <div className="au-flow-wrap">
      <div className="au-flow">
        <div className="au-flow-line" aria-hidden="true" />
        {(DATA.flowSteps as FlowStepData[]).map((step, i) => (
          <Reveal key={i} delay={i * 70} className="au-flow-step">
            <span className="glass-badge"><Icon name={step.icon} size={24} /></span>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 2px' }}>{tr(step.label)}</p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.4, margin: 0 }}>{tr(step.sub)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Automation() {
  const { t, tr } = useApp();
  return (
    <main>
      {/* Hero — split: copy left, curated automation image right */}
      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-aurora" aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 55%, var(--bg) 100%)', pointerEvents: 'none' }} />
        <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal className="hero-copy">
            <Eyebrow dot>{t('auto_tag')}</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t('auto_title')}</h1>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '42ch' }}>{t('auto_hero_sub')}</p>
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
            <div className="au-hero-glow" aria-hidden="true" />
            <div className="au-hero-media">
              <img src={HERO_IMAGE} alt="" aria-hidden="true" />
            </div>
            <span className="au-fc fc-top"><Icon name="MessageCircle" size={13} /> {tr({ EN: '24/7 replies', GR: 'Απαντήσεις 24/7' })}</span>
            <span className="au-fc fc-bot"><Icon name="ShieldCheck" size={13} /> {t('auto_hero_chip2')}</span>
          </Reveal>
        </div>
      </section>

      {(DATA.autoSections as AutoSectionData[]).map((s, i) => <AutoSection key={s.cid} section={s} index={i} bg={i % 2 === 0 ? 'alt' : 'base'} />)}

      <Section bg="base" style={{ borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Eyebrow dot>{t('auto_also_tag')}</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: '30ch' }}>{t('auto_also_title')}</h2>
          </Reveal>
          <div className="grid-4" style={{ width: '100%' }}>
            {(DATA.supportCards as SupportCardData[]).map((c, i) => <SupportCard key={c.cid} card={c} delay={i * 50} />)}
          </div>
        </div>
      </Section>

      <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--section-y) 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="how-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('auto_flow_tag')} title={t('auto_flow_title')} description={t('auto_flow_desc')} />
          <SystemFlow />
        </div>
      </section>

      {/* Final CTA — Santorini wash */}
      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true" />
        <div className="container">
          <Reveal className="cta-content">
            <div className="cta-head">
              <Eyebrow tone="gold" dot>{t('auto_cta_tag')}</Eyebrow>
              <h2>{t('auto_cta_title')}</h2>
              <p>{t('auto_cta_body')}</p>
            </div>
            <div className="cta-actions">
              <RequestProposalButton size="md" />
              <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        /* hero image frame + glow (parity with the other pages) */
        .au-hero-glow { position: absolute; inset: -12% -6% -16% -6%; z-index: 0; pointer-events: none; filter: blur(46px); opacity: 0.5; background: radial-gradient(60% 70% at 58% 32%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 70%); }
        .au-hero-media { position: relative; z-index: 1; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); background: var(--surface); animation: heroFloat 7s ease-in-out infinite; will-change: transform; }
        .au-hero-media img { display: block; width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
        .au-fc { position: absolute; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; font-size: var(--text-xs); font-weight: 700; color: var(--ink); background: color-mix(in srgb, var(--surface) 90%, transparent); border: 1px solid var(--line-2); border-radius: var(--radius-full); box-shadow: var(--shadow-md); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: heroFloat 6.5s ease-in-out infinite; }
        .au-fc svg { color: var(--brand-ink); }
        .au-fc.fc-top { top: 18px; left: -12px; }
        .au-fc.fc-bot { bottom: 20px; right: -12px; animation-delay: -3s; }

        /* deep-dive editorial numeral */
        .au-num { font-family: var(--font-display); font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; color: var(--brand-ink); opacity: 0.85; }

        /* support cards */
        .au-card { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); transition: transform .24s cubic-bezier(.16,1,.3,1), box-shadow .24s ease, border-color .24s ease; }
        .au-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: var(--brand-line); }
        .au-card:hover .glass-badge { transform: rotate(-6deg) scale(1.05); }

        /* connected system flow */
        .au-flow-wrap { overflow-x: auto; }
        .au-flow { position: relative; display: flex; justify-content: center; gap: var(--space-4); width: max-content; min-width: max-content; margin: 0 auto; padding: 4px 0 0; }
        .au-flow-line { position: absolute; top: 31px; left: 67px; right: 67px; height: 2px; border-radius: 2px; z-index: 0; opacity: 0.5; background: linear-gradient(90deg, var(--brand-line), var(--brand), var(--brand-line)); background-size: 200% 100%; animation: trackShimmer 6s linear infinite; }
        .au-flow-step { position: relative; z-index: 1; width: 134px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-3); }

        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); align-items: stretch; }
        @media (max-width: 1000px) { .grid-4 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .grid-4 { grid-template-columns: 1fr; } }
        @media (max-width: 900px) { .au-hero-media { max-width: 560px; margin: 0 auto; } .au-hero-media img { aspect-ratio: 16 / 9; } .au-fc { display: none; } }
        @media (max-width: 860px) {
          .auto-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; }
          .auto-text { order: 1 !important; } .auto-visual { order: 2 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .au-hero-media, .au-fc, .au-flow-line { animation: none; }
          .au-card:hover, .au-card:hover .glass-badge { transform: none; }
        }
      `}</style>
    </main>
  );
}
