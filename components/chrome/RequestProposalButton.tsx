'use client';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';

export function RequestProposalButton({
  size = 'sm',
  full = false,
  onNavigate,
}: {
  size?: 'sm' | 'md';
  full?: boolean;
  onNavigate?: () => void;
}) {
  const { t, count } = useApp();
  const router = useRouter();
  const go = (e?: MouseEvent) => {
    e?.preventDefault();
    onNavigate?.();
    router.push('/contact');
  };
  return (
    <button onClick={go} data-action="request-proposal" data-count={count}
      className={'btn btn-primary ' + (size === 'sm' ? 'btn-sm' : '') + (full ? ' full' : '')}
      style={{ position: 'relative', overflow: 'visible' }}>
      {t('request_proposal')}
      {count > 0 && (
        <span aria-label={count + ' selected'} style={{
          position: 'absolute', top: -7, right: -7, minWidth: 22, height: 22, padding: '0 6px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--gold)', color: '#1a1206', borderRadius: 'var(--radius-full)',
          fontSize: 12, fontWeight: 800, lineHeight: 1, border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
        }}>{count}</span>
      )}
    </button>
  );
}
