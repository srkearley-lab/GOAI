'use client';
/* ============================================================
   GO AI — CRM demo: Deals / Proposal management view.
   Open-pipeline summary + proposal-status filter + a dense
   deals table (deal · stage · proposal · owner · value · age).
   Self-contained: shared crm-data + scoped <style>.
   ============================================================ */
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { CONTACTS, STAGES, PROPOSAL_LABEL, money } from '@/components/crm/crm-data';
import type { ProposalStatus } from '@/components/crm/crm-data';

type Filter = 'all' | ProposalStatus;

export function DealsView() {
  const { tr } = useApp();
  const L = (en: string, gr: string) => tr({ EN: en, GR: gr });
  const [filter, setFilter] = useState<Filter>('all');

  const openValue = CONTACTS
    .filter((c) => c.stage !== 'won' && c.stage !== 'lost')
    .reduce((sum, c) => sum + c.value, 0);
  const proposalsSent = CONTACTS.filter((c) => c.proposal === 'sent').length;
  const wonCount = CONTACTS.filter((c) => c.stage === 'won').length;

  const stats = [
    { icon: 'Wallet', label: L('Open pipeline', 'Ανοιχτό pipeline'), value: money(openValue) },
    { icon: 'Send', label: L('Proposals sent', 'Προτάσεις'), value: String(proposalsSent) },
    { icon: 'CircleCheck', label: L('Won', 'Κερδισμένα'), value: String(wonCount) },
  ];

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: L('All', 'Όλα') },
    { key: 'draft', label: tr(PROPOSAL_LABEL.draft) },
    { key: 'sent', label: tr(PROPOSAL_LABEL.sent) },
    { key: 'accepted', label: tr(PROPOSAL_LABEL.accepted) },
  ];

  const rows = CONTACTS.filter((c) => filter === 'all' || c.proposal === filter);

  return (
    <div className="cv-deals-root">
      {/* Summary stat chips */}
      <div className="cv-deals-stats">
        {stats.map((s) => (
          <div key={s.label} className="card cv-deals-stat">
            <span className="icon-badge sm" style={{ width: 32, height: 32 }}><Icon name={s.icon} size={15} /></span>
            <div className="cv-deals-stat-text">
              <span className="cv-deals-stat-val">{s.value}</span>
              <span className="cv-deals-stat-lbl">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Proposal-status filter chips */}
      <div className="cv-deals-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={filter === f.key ? 'chip chip-brand' : 'chip'}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Deals table */}
      <div className="card cv-deals-table">
        <div className="cv-deals-scroll">
          <div className="cv-deals-head">
            <span>{L('Deal', 'Συμφωνία')}</span>
            <span>{L('Stage', 'Στάδιο')}</span>
            <span>{L('Proposal', 'Πρόταση')}</span>
            <span>{L('Owner', 'Υπεύθυνος')}</span>
            <span className="cv-deals-r">{L('Value', 'Αξία')}</span>
            <span className="cv-deals-r">{L('Age', 'Ηλικία')}</span>
          </div>

          {rows.map((c) => {
            const stage = STAGES.find((s) => s.key === c.stage);
            return (
              <div key={c.id} className="cv-deals-row">
                <div className="cv-deals-deal">
                  <span className="cv-deals-avatar">{c.name.charAt(0)}</span>
                  <span className="cv-deals-deal-text">
                    <span className="cv-deals-biz">{c.biz}</span>
                    <span className="cv-deals-name">{c.name}</span>
                  </span>
                </div>
                <div>
                  <span className={`cv-deals-pill cv-deals-stage-${c.stage}`}>
                    {stage ? tr(stage.label) : c.stage}
                  </span>
                </div>
                <div>
                  {c.proposal === 'none' ? (
                    <span className="cv-deals-dash">—</span>
                  ) : (
                    <span className={`cv-deals-pill cv-deals-prop-${c.proposal}`}>
                      {tr(PROPOSAL_LABEL[c.proposal])}
                    </span>
                  )}
                </div>
                <div className="cv-deals-owner">{c.owner}</div>
                <div className="cv-deals-r cv-deals-value">{money(c.value)}</div>
                <div className="cv-deals-r cv-deals-age">{c.ageDays}d</div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cv-deals-root { width: 100%; min-height: 360px; display: flex; flex-direction: column; gap: 14px; }

        /* Stat chips */
        .cv-deals-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cv-deals-stat { padding: 11px 13px; display: flex; align-items: center; gap: 10px; box-shadow: var(--shadow-xs); }
        .cv-deals-stat-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .cv-deals-stat-val { font-size: 16px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; line-height: 1.15; }
        .cv-deals-stat-lbl { font-size: 11px; color: var(--ink-3); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Filter chips */
        .cv-deals-filters { display: flex; flex-wrap: wrap; gap: 7px; }
        .cv-deals-filters .chip { cursor: pointer; font-size: 11.5px; }

        /* Table */
        .cv-deals-table { padding: 0; overflow: hidden; box-shadow: var(--shadow-xs); }
        .cv-deals-scroll { width: 100%; }
        .cv-deals-head,
        .cv-deals-row {
          display: grid;
          grid-template-columns: minmax(180px, 2.2fr) 1.1fr 1.1fr 0.9fr 1fr 0.7fr;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
        }
        .cv-deals-head {
          height: 38px;
          background: var(--surface-2);
          border-bottom: 1px solid var(--line);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ink-3);
        }
        .cv-deals-row {
          min-height: 56px;
          padding-top: 9px;
          padding-bottom: 9px;
          border-bottom: 1px solid var(--line);
          font-size: 12.5px;
          color: var(--ink-2);
          transition: background 0.12s ease;
        }
        .cv-deals-row:last-child { border-bottom: none; }
        .cv-deals-row:hover { background: var(--surface-2); }
        .cv-deals-r { text-align: right; justify-self: end; }

        /* Deal cell */
        .cv-deals-deal { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .cv-deals-avatar {
          width: 28px; height: 28px; flex-shrink: 0;
          border-radius: var(--radius-full);
          background: var(--brand-soft); color: var(--brand-ink);
          font-size: 12px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
        }
        .cv-deals-deal-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .cv-deals-biz { font-size: 12.5px; font-weight: 700; color: var(--ink); line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cv-deals-name { font-size: 11px; color: var(--ink-3); line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Pills */
        .cv-deals-pill {
          display: inline-flex; align-items: center;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          font-size: 9.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.04em;
          border: 1px solid var(--line-2);
          background: var(--surface-2); color: var(--ink-2);
          white-space: nowrap;
        }
        /* Stage pills */
        .cv-deals-stage-new { background: var(--surface-2); color: var(--ink-2); border-color: var(--line-2); }
        .cv-deals-stage-talking { background: var(--brand-soft); color: var(--brand-ink); border-color: var(--brand-line); }
        .cv-deals-stage-proposal {
          background: color-mix(in srgb, var(--gold) 14%, transparent);
          color: var(--gold);
          border-color: color-mix(in srgb, var(--gold) 30%, transparent);
        }
        .cv-deals-stage-won {
          background: color-mix(in srgb, var(--success) 14%, transparent);
          color: var(--success);
          border-color: color-mix(in srgb, var(--success) 32%, transparent);
        }
        .cv-deals-stage-lost {
          background: rgba(220,38,38,0.10);
          color: #dc2626;
          border-color: rgba(220,38,38,0.25);
        }
        /* Proposal pills */
        .cv-deals-prop-accepted {
          background: color-mix(in srgb, var(--success) 14%, transparent);
          color: var(--success);
          border-color: color-mix(in srgb, var(--success) 32%, transparent);
        }
        .cv-deals-prop-sent { background: var(--brand-soft); color: var(--brand-ink); border-color: var(--brand-line); }
        .cv-deals-prop-draft {
          background: color-mix(in srgb, var(--gold) 14%, transparent);
          color: var(--gold);
          border-color: color-mix(in srgb, var(--gold) 30%, transparent);
        }
        .cv-deals-dash { color: var(--ink-3); font-weight: 600; }

        .cv-deals-owner { color: var(--ink-2); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cv-deals-value { font-weight: 800; color: var(--brand-ink); letter-spacing: -0.01em; }
        .cv-deals-age { color: var(--ink-3); font-variant-numeric: tabular-nums; }

        @media (max-width: 760px) {
          .cv-deals-stats { grid-template-columns: 1fr; }
          .cv-deals-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .cv-deals-head,
          .cv-deals-row { min-width: 620px; }
        }
      `}</style>
    </div>
  );
}
