'use client';
/* Shared CRM pricing tiers: €350 one-off setup + €50/month maintenance
   + €20/month per additional licence. Used on /services/crm and the home CRM section. */
import { useApp } from '@/lib/store';

export function CrmPriceTiers() {
  const { t, lang } = useApp();
  const mo = lang === 'GR' ? '/μήνα' : '/mo';
  const tiers = [
    { amt: '€350', sub: '', lbl: t('crm_price_setup'), lead: true },
    { amt: '€50', sub: mo, lbl: t('crm_price_maint'), lead: false },
    { amt: '+€20', sub: mo, lbl: t('crm_price_licence'), lead: false },
  ];
  return (
    <div className="crm-tiers">
      {tiers.map((ti, i) => (
        <div key={i} className="crm-tier" data-lead={ti.lead ? '1' : undefined}>
          <span className="crm-tier-amt">{ti.amt}{ti.sub && <small>{ti.sub}</small>}</span>
          <span className="crm-tier-lbl">{ti.lbl}</span>
        </div>
      ))}
      <style>{`
        .crm-tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; }
        .crm-tier { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 14px 12px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-md); }
        .crm-tier[data-lead] { background: var(--brand-soft); border-color: var(--brand-line); }
        .crm-tier-amt { font-family: var(--font-display); font-size: clamp(1.45rem, 3.2vw, 1.9rem); font-weight: 800; letter-spacing: -0.03em; color: var(--ink); line-height: 1; }
        .crm-tier[data-lead] .crm-tier-amt { color: var(--brand-ink); }
        .crm-tier-amt small { font-size: var(--text-sm); font-weight: 600; color: var(--ink-3); letter-spacing: 0; margin-left: 1px; }
        .crm-tier-lbl { font-size: var(--text-xs); color: var(--ink-3); font-weight: 600; }
        @media (max-width: 480px) { .crm-tiers { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
