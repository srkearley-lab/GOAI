'use client';
import type { CSSProperties } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';

export function AddToProposalButton({
  id,
  size = 'md',
  full = false,
  style,
}: {
  id: string;
  size?: 'sm' | 'md';
  full?: boolean;
  style?: CSSProperties;
}) {
  const { hasItem, toggleItem, t } = useApp();
  const added = hasItem(id);
  const sm = size === 'sm';
  return (
    <button onClick={() => toggleItem(id)} data-action={added ? 'added-to-proposal' : 'add-to-proposal'} data-item={id} aria-pressed={added}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: full ? '100%' : undefined,
        height: sm ? 40 : 46, padding: '0 16px', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '-0.01em',
        borderRadius: 'var(--radius-full)', cursor: 'pointer', whiteSpace: 'nowrap',
        border: '1px solid ' + (added ? 'var(--brand)' : 'transparent'),
        background: added ? 'var(--brand-soft)' : 'var(--brand)', color: added ? 'var(--brand-ink)' : '#fff',
        boxShadow: added ? 'none' : 'var(--shadow-brand)',
        transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease', ...style }}>
      <Icon name={added ? 'Check' : 'Plus'} size={sm ? 14 : 16} stroke={added ? 3 : 2.5} />
      <span>{added ? t('added_to_proposal') : t('add_to_proposal')}</span>
    </button>
  );
}

/* proposal-only action row (kept name for existing call sites) */
export function ProposalBasketActions({ id, size = 'sm' }: { id: string; size?: 'sm' | 'md' }) {
  return <AddToProposalButton id={id} size={size} full />;
}
