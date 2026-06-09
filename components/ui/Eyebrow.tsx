import type { CSSProperties, ReactNode } from 'react';

export function Eyebrow({
  children,
  tone = 'brand',
  dot = false,
  style,
}: {
  children?: ReactNode;
  tone?: 'brand' | 'gold' | 'muted';
  dot?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span className={'eyebrow ' + (tone === 'gold' ? 'gold' : tone === 'muted' ? 'muted' : '')} style={style}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}
