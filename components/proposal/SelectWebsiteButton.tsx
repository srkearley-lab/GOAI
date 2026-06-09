'use client';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';

export function SelectWebsiteButton({ id, full = true }: { id: string; full?: boolean }) {
  const { selectedWebsite, selectWebsite, t } = useApp();
  const on = selectedWebsite === id;
  return (
    <button onClick={() => selectWebsite(id)} data-action={on ? 'website-selected' : 'select-website'} data-item={id} aria-pressed={on}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: full ? '100%' : undefined,
        height: 46, padding: '0 16px', fontSize: 'var(--text-sm)', fontWeight: 600, borderRadius: 'var(--radius-full)', cursor: 'pointer', whiteSpace: 'nowrap',
        border: '1px solid ' + (on ? 'var(--brand)' : 'transparent'),
        background: on ? 'var(--brand-soft)' : 'var(--brand)', color: on ? 'var(--brand-ink)' : '#fff',
        boxShadow: on ? 'none' : 'var(--shadow-brand)', transition: 'all 160ms ease' }}>
      <Icon name={on ? 'CheckCircle2' : 'Plus'} size={16} stroke={2.5} />
      <span>{on ? t('website_selected') : t('select_website')}</span>
    </button>
  );
}
