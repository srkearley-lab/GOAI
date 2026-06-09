import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

export function PageHero({
  tag,
  title,
  description,
  children,
}: {
  tag?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden', paddingTop: 140, paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(60% 60% at 50% -10%, color-mix(in srgb, var(--brand) 11%, transparent), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, transparent 50%, var(--bg) 100%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {tag && <Eyebrow dot>{tag}</Eyebrow>}
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.035em', color: 'var(--ink)', maxWidth: '20ch' }}>{title}</h1>
          {description && <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '58ch' }}>{description}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
