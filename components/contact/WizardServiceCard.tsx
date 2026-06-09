'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { cat, catFeatures } from '@/lib/catalog';
import { SelectWebsiteButton } from '@/components/proposal/SelectWebsiteButton';
import { AddToProposalButton } from '@/components/proposal/AddToProposalButton';

function WizardFeatures({ id }: { id: string }) {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const feats = catFeatures(id, lang);
  if (!feats) return null;
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} data-action="see-more" data-item={id}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-ink)', fontSize: 'var(--text-xs)', fontWeight: 700, padding: '2px 0' }}>
        {open ? t('see_less') : t('see_more')} <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={13} />
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .22s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          <ul style={{ listStyle: 'none', padding: '8px 0 0', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {feats.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <Icon name="Check" size={12} stroke={3} style={{ color: 'var(--brand-ink)', flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-2)', lineHeight: 1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function WizardServiceCard({ id, single }: { id: string; single: boolean }) {
  const { tr, t, hasItem, selectedWebsite } = useApp();
  const c = cat(id);
  if (!c) return null;
  const selected = single ? selectedWebsite === id : hasItem(id);
  return (
    <div className="card" style={{
      padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      border: '1.5px solid ' + (selected ? 'var(--brand)' : 'var(--line)'),
      background: selected ? 'linear-gradient(180deg, var(--brand-soft), var(--surface) 55%)' : 'var(--surface)',
      boxShadow: selected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'border-color 160ms ease, background 160ms ease, box-shadow 160ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <span className="icon-badge"><Icon name={c.icon} size={22} /></span>
        {selected && <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="Check" size={14} stroke={3} /></span>}
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{tr(c.label)}</h3>
        <p style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--brand-ink)', letterSpacing: '-0.02em', marginTop: 4 }}>{tr(c.price)}</p>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--ink-2)', flex: 1 }}>{tr(c.desc)}</p>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 700, color: 'var(--ink-2)' }}>{t('best_for')} </span>{tr(c.best)}
      </p>
      <WizardFeatures id={id} />
      {single ? <SelectWebsiteButton id={id} /> : <AddToProposalButton id={id} full />}
    </div>
  );
}
