'use client';
/* ============================================================
   GO AI — Automation page (bilingual + Add to Proposal)
   ============================================================ */
import type { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PageHero } from '@/components/ui/PageHero';
import { useApp } from '@/lib/store';
import { AddToProposalButton } from '@/components/proposal/AddToProposalButton';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Bilingual } from '@/types';

/* ---- local data shapes (richer than the shared @/types interfaces) ---- */
interface ChatMessageData { from: 'user' | 'bot'; text: Bilingual; time?: string; }
interface EmailStepData { day: Bilingual; label: Bilingual; subject: Bilingual; preview: Bilingual; }
interface FlowStepData { icon: string; label: Bilingual; sub: Bilingual; }
interface AutoSectionData { cid: string; tag: Bilingual; title: Bilingual; description: Bilingual; points: Bilingual[]; visual: string; flip: boolean; }
interface SupportCardData { cid: string; icon: string; title: Bilingual; description: Bilingual; points: Bilingual[]; }

/* proposal-only action row (preserves the legacy call sites) */
function ProposalBasketActions({ id, size = 'sm' }: { id: string; size?: 'sm' | 'md'; stack?: boolean }) {
  return <AddToProposalButton id={id} size={size} full />;
}

function ChatBubble({ msg, tr }: { msg: ChatMessageData; tr: (obj: Bilingual | string | null | undefined) => string }) {
  const isUser = msg.from === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{ maxWidth: '80%', background: isUser ? '#dcf8c6' : '#fff', borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px', padding: '7px 10px 5px', boxShadow: '0 1px 1px rgba(0,0,0,0.12)' }}>
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: '#111', margin: 0, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{tr(msg.text)}</p>
        {msg.time && <p style={{ fontSize: 10, color: '#9aa', textAlign: 'right', margin: '2px 0 0' }}>{msg.time} ✓✓</p>}
      </div>
    </div>
  );
}
function WhatsAppMockup() {
  const { tr } = useApp();
  return (
    <div style={{ width: 290, background: '#e5ddd5', borderRadius: 22, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '8px solid #0e1411' }}>
      <div style={{ background: '#075e54', padding: '8px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 15, color: '#fff', fontWeight: 800 }}>V</span></div>
        <div><p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>Villa Mila</p><p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', margin: 0 }}>🤖 GO AI</p></div>
      </div>
      <div style={{ padding: '12px 9px', display: 'flex', flexDirection: 'column', gap: 7, background: '#e5ddd5', maxHeight: 360, overflowY: 'auto' }}>
        {(DATA.chatMessages as ChatMessageData[]).map((m, i) => <ChatBubble key={i} msg={m} tr={tr} />)}
      </div>
      <div style={{ background: '#f0f0f0', padding: '7px 9px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ flex: 1, height: 32, background: '#fff', borderRadius: 16, border: '1px solid #ddd' }} />
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#075e54' }} />
      </div>
    </div>
  );
}

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

function AutoSection({ section, bg }: { section: AutoSectionData; bg: string }) {
  const { tr, priceOf } = useApp();
  const Visual = VISUALS[section.visual];
  const flip = section.flip;
  return (
    <Section bg={bg} style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="auto-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', order: flip ? 2 : 1 }} className="auto-text">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Eyebrow dot>{tr(section.tag)}</Eyebrow>
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
          <div><ProposalBasketActions id={section.cid} size="md" /></div>
        </Reveal>
        <Reveal delay={80} style={{ display: 'flex', justifyContent: 'center', order: flip ? 1 : 2 }} className="auto-visual"><Visual /></Reveal>
      </div>
    </Section>
  );
}

function SupportCard({ card, delay }: { card: SupportCardData; delay: number }) {
  const { tr, priceOf } = useApp();
  return (
    <Reveal delay={delay} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <span className="icon-badge"><Icon name={card.icon} size={20} /></span>
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
      <div style={{ marginTop: 'auto' }}><ProposalBasketActions id={card.cid} stack /></div>
    </Reveal>
  );
}

function SystemFlow() {
  const { tr } = useApp();
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: 'max-content', padding: '0 var(--space-2)', justifyContent: 'center' }}>
        {(DATA.flowSteps as FlowStepData[]).map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <Reveal delay={i * 70} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', width: 124 }}>
              <span className="icon-badge lg round" style={{ background: i === 0 ? 'var(--brand)' : 'var(--surface)', borderColor: i === 0 ? 'var(--brand)' : 'var(--line-2)', color: i === 0 ? '#fff' : 'var(--brand-ink)', boxShadow: 'var(--shadow-sm)' }}><Icon name={step.icon} size={22} /></span>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 2px' }}>{tr(step.label)}</p>
                <p style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.4, margin: 0 }}>{tr(step.sub)}</p>
              </div>
            </Reveal>
            {i < DATA.flowSteps.length - 1 && <div style={{ color: 'var(--line-2)', marginBottom: 38, flexShrink: 0 }}><Icon name="ChevronRight" size={18} /></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalCTA({ tagKey, titleKey, bodyKey, primaryKey, bg = 'accent' }: { tagKey: string; titleKey: string; bodyKey: string; primaryKey?: string; bg?: string }) {
  const { t } = useApp();
  const router = useRouter();
  return (
    <Section bg={bg} style={{ borderTop: '1px solid var(--line)' }}>
      <Reveal style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Eyebrow tone="gold" dot>{t(tagKey)}</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: '22ch' }}>{t(titleKey)}</h2>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '48ch' }}>{t(bodyKey)}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => router.push('/contact')} data-action="request-proposal" className="btn btn-primary btn-lg">{t(primaryKey || 'request_proposal')}</button>
          <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
        </div>
      </Reveal>
    </Section>
  );
}

export default function Automation() {
  const { t } = useApp();
  return (
    <main>
      <PageHero tag={t('auto_tag')} title={t('auto_title')} description={t('auto_desc')} />

      {(DATA.autoSections as AutoSectionData[]).map((s, i) => <AutoSection key={s.cid} section={s} bg={i % 2 === 0 ? 'alt' : 'base'} />)}

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

      <Section bg="accent" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('auto_flow_tag')} title={t('auto_flow_title')} description={t('auto_flow_desc')} />
          <SystemFlow />
        </div>
      </Section>

      <FinalCTA tagKey="auto_cta_tag" titleKey="auto_cta_title" bodyKey="auto_cta_body" primaryKey="auto_cta_btn" bg="base" />

      <style>{`
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); align-items: stretch; }
        @media (max-width: 1000px) { .grid-4 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .grid-4 { grid-template-columns: 1fr; } }
        @media (max-width: 860px) {
          .auto-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; }
          .auto-text { order: 1 !important; } .auto-visual { order: 2 !important; }
        }
      `}</style>
    </main>
  );
}
