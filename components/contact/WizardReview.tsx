'use client';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { cat, GROUP_TITLES } from '@/lib/catalog';
import type { Group } from '@/types';

const GROUPS_TO_SHOW: Group[] = ['website', 'digital', 'automation', 'support'];

export function WizardReview({ setStep }: { setStep: (n: number) => void }) {
  const { items, t, tr, lang, labelOf, priceOf, removeItem, amountOf, recurringOf } = useApp();
  const oneoff = items.filter((id) => !recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);
  const monthly = items.filter((id) => recurringOf(id)).reduce((s, id) => s + amountOf(id), 0);
  const empty = items.length === 0;

  if (empty) {
    return (
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
        <span className="icon-badge lg round" style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', color: 'var(--ink-3)' }}><Icon name="ClipboardList" size={26} /></span>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)' }}>{t('prop_summary_empty')}</h3>
        <button onClick={() => setStep(1)} className="btn btn-primary">{t('j_step1')}</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 'var(--width-md)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {GROUPS_TO_SHOW.map((g) => {
        const ids = items.filter((id) => cat(id)?.group === g);
        if (ids.length === 0) return null;
        return (
          <div key={g} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{tr(GROUP_TITLES[g])}</p>
              {g === 'website' && <button onClick={() => setStep(1)} data-action="edit-website" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--brand-ink)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>{t('j_edit_website')}</button>}
            </div>
            {ids.map((id) => {
              const c = cat(id);
              if (!c) return null;
              return (
                <div key={id} className="card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <span className="icon-badge sm" style={{ flexShrink: 0 }}><Icon name={c.icon} size={16} /></span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>{labelOf(id)}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--brand-ink)' }}>{priceOf(id)}</span>
                    <button onClick={() => removeItem(id)} aria-label="remove" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--line-2)', borderRadius: 'var(--radius-md)', color: 'var(--ink-3)', cursor: 'pointer' }}><Icon name="X" size={15} /></button>
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', background: 'var(--surface-accent)', border: '1px solid var(--brand-line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('j_est_oneoff')}</span><span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)' }}>€{oneoff.toLocaleString('el-GR')}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('j_est_monthly')}</span><span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)' }}>€{monthly.toLocaleString('el-GR')}<span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 600 }}>{lang === 'GR' ? '/μήνα' : '/mo'}</span></span></div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.5, marginTop: 4 }}>{t('prop_price_note')}</p>
      </div>
    </div>
  );
}
