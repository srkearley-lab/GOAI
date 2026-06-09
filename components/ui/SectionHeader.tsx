import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

export function SectionHeader({
  tag,
  title,
  description,
  align = 'center',
  tone = 'brand',
}: {
  tag?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'brand' | 'gold' | 'muted';
}) {
  return (
    <Reveal className={'section-head ' + (align === 'center' ? 'center' : '')}>
      {tag && <Eyebrow tone={tone} dot>{tag}</Eyebrow>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
