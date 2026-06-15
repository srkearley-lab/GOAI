'use client';
/* ============================================================
   GO AI — Home: hero, Start Your Journey, sections
   ============================================================ */
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Link } from '@/components/ui/Link';
import { useApp } from '@/lib/store';
import { AddToProposalButton } from '@/components/proposal/AddToProposalButton';
import { SelectWebsiteButton } from '@/components/proposal/SelectWebsiteButton';
import { RequestProposalButton } from '@/components/chrome/RequestProposalButton';
import { RotatingWord } from '@/components/home/RotatingWord';
import { CrmDashboard } from '@/components/crm/CrmDashboard';
import { CrmPriceTiers } from '@/components/crm/CrmPriceTiers';
import { SITE as DATA } from '@/data/content';
import { WHATSAPP } from '@/lib/whatsapp';
import type { Bilingual, PackageItem } from '@/types';

/* ---- Browser showcase mockup (hero) — demo visual, copy stays EN ---- */
function HeroShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  // React doesn't reliably set the muted *property* from the attribute — force it
  // so muted autoplay works on load.
  useEffect(() => { if (videoRef.current) videoRef.current.muted = true; }, []);
  const togglePlay = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) void v.play(); else v.pause();
  };
  const toggleSound = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.paused) void v.play(); // unmuting also resumes playback
  };
  return (
    <Reveal delay={120}>
      <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
        <div style={{ position: 'absolute', inset: '-8% 6% -14% 6%', background: 'radial-gradient(60% 70% at 50% 30%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 70%)', filter: 'blur(40px)', opacity: 0.5, pointerEvents: 'none' }} />
        <div className="home-hero-video">
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata" aria-label="GO AI intro"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onVolumeChange={() => { const v = videoRef.current; if (v) setMuted(v.muted); }}
          >
            <source src="/intro-video-greek.mp4" type="video/mp4" />
          </video>
          <div className="hhv-controls">
            <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'} className="hhv-btn">
              <Icon name={playing ? 'Pause' : 'Play'} size={16} />
            </button>
            <button type="button" onClick={toggleSound} aria-label={muted ? 'Unmute video' : 'Mute video'} className="hhv-btn">
              <Icon name={muted ? 'VolumeX' : 'Volume2'} size={16} />
            </button>
          </div>
        </div>
        <div className="float-chip" style={{ position: 'absolute', right: -16, top: 96, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="icon-badge sm" style={{ background: 'color-mix(in srgb, var(--success) 14%, transparent)', borderColor: 'color-mix(in srgb, var(--success) 30%, transparent)', color: 'var(--success)' }}>
            <Icon name="TrendingUp" size={18} />
          </span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>+38%</p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>direct bookings</p>
          </div>
        </div>
        <div className="float-chip float-chip-2" style={{ position: 'absolute', left: -16, bottom: 56, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="icon-badge sm"><Icon name="Zap" size={18} /></span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>7 days</p>
            <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>to launch</p>
          </div>
        </div>
        <style>{`
          .home-hero-video { position: relative; background: var(--surface); border-radius: var(--radius-2xl); border: 1px solid var(--line-2); box-shadow: var(--shadow-lg); overflow: hidden; }
          .home-hero-video video { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
          .hhv-controls { position: absolute; bottom: 12px; right: 12px; z-index: 3; display: flex; gap: 8px; }
          .hhv-btn { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 50%; border: 1px solid color-mix(in srgb, #ffffff 28%, transparent); background: color-mix(in srgb, #0b0b14 52%, transparent); color: #fff; cursor: pointer; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: background .2s ease, transform .2s ease; }
          .hhv-btn:hover { background: color-mix(in srgb, #0b0b14 72%, transparent); transform: translateY(-1px); }
          @media (max-width: 720px) { .float-chip { display: none !important; } }
        `}</style>
      </div>
    </Reveal>
  );
}

function scrollToId(id: string, offset = 90) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

/* ---- Hero (split: copy left, showcase right) ---- */
function Hero() {
  const { t, tr } = useApp();
  const words = DATA.heroRotate.map((w) => tr(w));
  return (
    <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 132, paddingBottom: 'var(--space-24)' }}>
      <div className="hero-aurora" aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 60%, var(--bg) 100%)', pointerEvents: 'none' }} />
      <div className="container hero-split" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-copy">
          <Reveal>
            <span className="chip" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)' }} />
              {t('hero_badge')}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.035em', color: 'var(--ink)' }}>
              {t('hero_headline_a')}<RotatingWord words={words} className="grad-text" />
            </h1>
          </Reveal>
          <Reveal delay={110}>
            <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '46ch' }}>{t('hero_sub')}</p>
          </Reveal>
          <Reveal delay={160} className="hero-row">
            <RequestProposalButton size="md" />
            <button onClick={() => scrollToId('services')} data-action="view-services" className="btn btn-secondary btn-lg">
              {t('view_services')} <Icon name="ArrowDown" size={17} />
            </button>
          </Reveal>
          <Reveal delay={210} className="hero-proof">
            {DATA.heroProofKeys.map((k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 500 }}>
                <Icon name="Check" size={15} style={{ color: 'var(--brand-ink)' }} /> {t(k)}
              </span>
            ))}
          </Reveal>
        </div>
        <div className="hero-visual">
          <HeroShowcase />
        </div>
      </div>

      <div className="scroll-cue-wrap">
        <button onClick={() => scrollToId('start-journey')} data-action="scroll-down" aria-label="Scroll to next section" className="scroll-cue">
          <span className="scroll-mouse"><span className="scroll-mouse-dot" /></span>
          <Icon name="ChevronDown" size={16} className="scroll-chev" />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   START YOUR JOURNEY
   ============================================================ */
const JOURNEY_SUPPORT = [
  { cid: 'hosting-care',          icon: 'ShieldCheck', desc: { EN: 'Hosting, security, backups and updates — fully managed for you.', GR: 'Φιλοξενία, ασφάλεια, backups και ενημερώσεις — πλήρως διαχειριζόμενα.' } },
  { cid: 'ai-proposal-generation', icon: 'FileText',   desc: { EN: 'Auto-generate tailored proposals and send them via WhatsApp or email.', GR: 'Αυτόματη δημιουργία προτάσεων και αποστολή μέσω WhatsApp ή email.' } },
  { cid: 'analytics-reporting',   icon: 'BarChart3',   desc: { EN: 'A clear monthly report on what’s working and what to do next.', GR: 'Ξεκάθαρη μηνιαία αναφορά για το τι αποδίδει και τι ακολουθεί.' } },
  { cid: 'basic-hosting',         icon: 'Server',      desc: { EN: 'Reliable hosting that keeps your website live and maintained.', GR: 'Αξιόπιστη φιλοξενία που κρατά το site σας live και συντηρημένο.' } },
];

function JourneyCard({ cid, icon, title, price, desc, foundation }: { cid: string; icon: string; title: Bilingual | string; price?: Bilingual | string; desc: Bilingual | string; foundation?: boolean }) {
  const { hasItem, tr, t, priceOf } = useApp();
  const added = hasItem(cid);
  const priceLabel = priceOf(cid) || (price ? tr(price) : '');
  return (
    <div className="card" style={{
      position: 'relative', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      border: '1.5px solid ' + (added ? 'var(--brand)' : 'var(--line)'),
      background: added ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 70%)' : 'var(--surface)',
      boxShadow: added ? 'var(--shadow-md)' : 'var(--shadow-sm)', transition: 'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
    }}>
      {added && (
        <span style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name="Check" size={13} stroke={3} />
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="icon-badge"><Icon name={icon} size={22} /></span>
        {foundation && <span className="chip chip-brand chip-mini">{t('foundation_badge')}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{tr(title)}</h3>
          {priceLabel && <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--brand-ink)', whiteSpace: 'nowrap' }}>{priceLabel}</span>}
        </div>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--ink-2)' }}>{tr(desc)}</p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <AddToProposalButton id={cid} full />
      </div>
    </div>
  );
}

function JourneyGroup({ label, note, children }: { label: ReactNode; note?: ReactNode; children?: ReactNode }) {
  return (
    <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{label}</h3>
        {note && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{note}</p>}
      </div>
      {children}
    </Reveal>
  );
}

const JOURNEY_STEP_ICONS = ['Layout', 'LayoutTemplate', 'Bot', 'ShieldCheck', 'ClipboardList', 'Rocket'];

function JourneyLauncher() {
  const { t, count } = useApp();
  const router = useRouter();
  const steps = [t('j_short1'), t('j_short2'), t('j_short3'), t('j_short4'), t('j_short5'), t('j_short6')];
  const go = () => router.push('/contact');
  return (
    <Section id="start-journey" bg="alt" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="journey-glow" aria-hidden="true" />
      <Reveal className="journey-card">
        <Eyebrow tone="gold" dot>{t('j_launch_tag')}</Eyebrow>
        <h2>{t('j_launch_title')}</h2>
        <p>{t('j_launch_sub')}</p>
        <div className="jsteps" role="list">
          {steps.map((s, i) => (
            <div className="jstep" role="listitem" key={i}>
              <span className="jstep-icon">
                <Icon name={JOURNEY_STEP_ICONS[i]} size={22} />
                <span className="jstep-num">{i + 1}</span>
              </span>
              <span className="jstep-label">{s}</span>
            </div>
          ))}
        </div>
        <button onClick={go} data-action="start-journey" className="btn btn-primary btn-lg journey-cta">
          {count > 0 ? t('j_resume') : t('j_start')} <Icon name="ArrowRight" size={18} />
          {count > 0 && <span className="cta-badge">{count}</span>}
        </button>
      </Reveal>
    </Section>
  );
}

/* ---- info cards / tiles ---- */
function ServiceCard({ icon, title, description, features, to, index }: { icon: string; title: Bilingual | string; description: Bilingual | string; features?: Bilingual[]; to?: string; index: number }) {
  const { tr, t } = useApp();
  const num = String(index + 1).padStart(2, '0');
  return (
    <article className="svc-card">
      <div className="svc-card-top">
        <span className="icon-badge"><Icon name={icon} size={22} /></span>
        <span className="svc-num">{num}</span>
      </div>
      <h3>{tr(title)}</h3>
      <p className="svc-desc">{tr(description)}</p>
      {features && features.length > 0 && (
        <ul className="svc-feats">
          {features.map((f, i) => (
            <li key={i}><span className="svc-feat-check"><Icon name="Check" size={11} stroke={3} /></span>{tr(f)}</li>
          ))}
        </ul>
      )}
      <Link to={to ?? '/services'} className="svc-more link-arrow">{t('learn_more')} <Icon name="ArrowRight" size={14} /></Link>
      <span className="svc-deco" aria-hidden="true"><Icon name={icon} size={36} /></span>
    </article>
  );
}

function IndustryTile({ icon, label, tagline, to }: { icon: string; label: Bilingual | string; tagline?: Bilingual; to?: string }) {
  const { tr } = useApp();
  return (
    <Link to={'/industries'} onClick={() => { setTimeout(() => scrollToId(to!, 120), 140); }} className="ind-tile">
      <span className="ind-arrow"><Icon name="ArrowUpRight" size={18} /></span>
      <span className="glass-badge"><Icon name={icon} size={26} /></span>
      <span className="ind-label">{tr(label)}</span>
      {tagline && <span className="ind-tagline">{tr(tagline)}</span>}
    </Link>
  );
}

function StepCard({ number, icon, title, description }: { number: number; icon?: string; title: Bilingual | string; description?: Bilingual | string }) {
  const { tr } = useApp();
  return (
    <div className="how-step">
      <span className="how-icon">
        <span className="glass-badge"><Icon name={icon!} size={28} /></span>
        <span className="how-num">{number}</span>
      </span>
      <h3>{tr(title)}</h3>
      <p>{tr(description)}</p>
    </div>
  );
}

function PackageCard({ pkg, delay }: { pkg: PackageItem; delay?: number }) {
  const { tr, t } = useApp();
  const { popular } = pkg;
  const badge = pkg.badge ? tr(pkg.badge) : null;
  return (
    <Reveal delay={delay} className={'card' + (popular ? '' : ' card-hover')} style={{
      position: 'relative', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
      border: popular ? '2px solid var(--brand)' : undefined, boxShadow: popular ? 'var(--shadow-lg)' : undefined, transform: popular ? 'translateY(-8px)' : undefined,
      background: popular ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 60%)' : undefined,
    }}>
      {badge && <span style={{ position: 'absolute', top: 18, right: 18 }} className={'chip ' + (popular ? 'chip-brand' : '')}>{badge}</span>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, minHeight: '2.4em', paddingRight: badge ? 96 : 0, display: 'flex', alignItems: 'center' }}>{tr(pkg.name)}</h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1 }}>{tr(pkg.price)}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)' }}>{tr(pkg.unit)}</span>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{tr(pkg.description)}</p>
      </div>
      <hr className="divider" />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>{t('best_for')}</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{tr(pkg.bestFor)}</p>
      </div>
      <SelectWebsiteButton id={pkg.cid!} />
    </Reveal>
  );
}

/* Continue bar under the pricing cards → carries the selected website into the /contact wizard */
function PricingContinue() {
  const { selectedWebsite, labelOf, t } = useApp();
  const router = useRouter();
  const go = (step: number) => {
    try { localStorage.setItem('goai_cstep', String(step)); } catch {}
    router.push('/contact');
  };
  return (
    <div className="pricing-continue">
      {selectedWebsite ? (
        <>
          <p className="pc-selected">
            <span className="pc-check"><Icon name="Check" size={12} stroke={3} /></span>
            {t('pricing_selected')}: <b>{labelOf(selectedWebsite)}</b>
          </p>
          <button onClick={() => go(2)} data-action="pricing-continue" className="btn btn-primary btn-lg">
            {t('pricing_continue_add')} <Icon name="ArrowRight" size={18} />
          </button>
        </>
      ) : (
        <>
          <p className="pc-hint">{t('pricing_pick_hint')}</p>
          <button onClick={() => go(1)} data-action="pricing-build" className="btn btn-secondary btn-lg">
            {t('pricing_build_plan')} <Icon name="ArrowRight" size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const { t } = useApp();
  return (
    <main>
      <Hero />
      <JourneyLauncher />

      {/* Pricing — directly under the guided journey */}
      <Section id="pricing" bg="base" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader tag={t('sec_pricing_tag')} title={t('sec_pricing_title')} description={t('sec_pricing_desc')} />
          <div className="grid-3" style={{ width: '100%', alignItems: 'stretch' }}>
            {DATA.packages.map((p, i) => <PackageCard key={i} pkg={p} delay={i * 70} />)}
          </div>
          <PricingContinue />
        </div>
      </Section>

      {/* What we do — premium marquee over the grid backdrop */}
      <section id="services" className="hero-grid svc-section">
        <div className="svc-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionHeader tag={t('sec_whatwedo_tag')} title={t('sec_whatwedo_title')} description={t('sec_whatwedo_desc')} />
        </div>
        <div className="svc-marquee">
          <div className="svc-track">
            {[...DATA.services, ...DATA.services].map((s, i) => <ServiceCard key={i} {...s} index={i % DATA.services.length} />)}
          </div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <Link to="/services" className="link-arrow">{t('view_services')} <Icon name="ArrowRight" size={15} /></Link>
        </div>
      </section>

      {/* Industries */}
      <section className="ind-section">
        <div className="ind-bg" aria-hidden="true" />
        <div className="ind-glow" aria-hidden="true" />
        <div className="container ind-content">
          <SectionHeader tag={t('sec_industries_tag')} title={t('sec_industries_title')} description={t('sec_industries_desc')} />
          <div className="ind-grid">
            {DATA.industriesShort.map((ind) => <IndustryTile key={ind.to} {...ind} />)}
          </div>
          <Link to="/industries" className="link-arrow">{t('sec_industries_all')} <Icon name="ArrowRight" size={15} /></Link>
        </div>
      </section>

      {/* CRM */}
      <section className="hero-grid crm-home" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="how-glow" aria-hidden="true" />
        <div className="container crm-home-content" style={{ position: 'relative', zIndex: 1 }}>
          <SectionHeader tag={t('sec_crm_tag')} title={t('sec_crm_title')} description={t('sec_crm_desc')} />
          <Reveal><CrmDashboard /></Reveal>
          <Reveal className="crm-home-foot">
            <CrmPriceTiers />
            <div className="crm-home-cta">
              <Link to="/services/crm" className="btn btn-primary btn-lg">{t('sec_crm_all')} <Icon name="ArrowRight" size={17} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="hero-grid how-section">
        <div className="how-glow" aria-hidden="true" />
        <div className="container how-content">
          <SectionHeader tag={t('sec_how_tag')} title={t('sec_how_title')} description={t('sec_how_desc')} />
          <div className="how-steps">
            {DATA.steps.map((s, i) => <StepCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}

      <FinalCTA tagKey="cta_free_tag" titleKey="cta_free_title" bodyKey="cta_free_body" primaryKey="cta_free_btn" />

      <style>{`
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .grid-3 { grid-template-columns: 1fr; } }
        .crm-home { padding: var(--section-y) 0; border-bottom: 1px solid var(--line); }
        .crm-home-content { display: flex; flex-direction: column; gap: var(--space-10); }
        .crm-home-foot { display: flex; flex-direction: column; gap: var(--space-6); align-items: center; width: 100%; max-width: 640px; margin: 0 auto; }
        .crm-home-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
      `}</style>
    </main>
  );
}

/* ---- Reusable final CTA (translation-key driven) ---- */
function FinalCTA({ tagKey, titleKey, bodyKey }: { tagKey: string; titleKey: string; bodyKey: string; primaryKey?: string; bg?: string }) {
  const { t } = useApp();
  return (
    <section className="cta-section">
      <div className="cta-bg" aria-hidden="true" />
      <div className="container">
        <Reveal className="cta-content">
          <div className="cta-head">
            <Eyebrow tone="gold" dot>{t(tagKey)}</Eyebrow>
            <h2>{t(titleKey)}</h2>
            <p>{t(bodyKey)}</p>
          </div>
          <div className="cta-actions">
            <RequestProposalButton size="md" />
            <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('cta_whatsapp')}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
