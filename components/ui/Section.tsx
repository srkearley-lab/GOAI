import type { CSSProperties, ReactNode } from 'react';

const BG_MAP: Record<string, string> = {
  base: 'var(--bg)',
  surface: 'var(--surface)',
  alt: 'var(--surface-2)',
  accent: 'var(--surface-accent)',
  ink: 'var(--ink)',
};

export function Section({
  children,
  bg,
  className = '',
  style,
  id,
  wide = false,
}: {
  children?: ReactNode;
  bg?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{ padding: 'var(--section-y) 0', background: bg ? (BG_MAP[bg] || bg) : undefined, ...style }}
    >
      <div className={wide ? 'container-wide' : 'container'}>{children}</div>
    </section>
  );
}
