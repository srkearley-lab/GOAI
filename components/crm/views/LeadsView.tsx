'use client';
/* ============================================================
   GO AI — CRM demo: Lead Capture view (incoming leads).
   Source filter chips + a dense list of incoming leads, each with
   a channel-tinted source chip, time, status pill and a visual
   "Add to pipeline" action. Scoped <style>, prefix cv-leads-.
   ============================================================ */
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { LEADS, CHANNEL_ICON } from '@/components/crm/crm-data';

export function LeadsView() {
  const { tr } = useApp();
  const L = (en: string, gr: string) => tr({ EN: en, GR: gr });

  // Distinct source labels (translated), preserving first-seen order.
  const sources: string[] = [];
  for (const lead of LEADS) {
    const s = tr(lead.source);
    if (!sources.includes(s)) sources.push(s);
  }

  const ALL = L('All', 'Όλα');
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? LEADS : LEADS.filter((l) => tr(l.source) === active);
  const newCount = LEADS.filter((l) => l.status === 'new').length;

  return (
    <div className="cv-leads-">
      {/* Header */}
      <div className="cv-leads-head">
        <div className="cv-leads-head-text">
          <h3 className="cv-leads-title">{L('Incoming leads', 'Εισερχόμενα leads')}</h3>
          <span className="cv-leads-count">
            {newCount} {L('new', 'νέα')}
          </span>
        </div>
        <span className="chip chip-mini">
          <Icon name="Inbox" size={12} /> {LEADS.length}
        </span>
      </div>

      {/* Source filter chips */}
      <div className="cv-leads-filters">
        {[ALL, ...sources].map((s) => {
          const on = s === active;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setActive(s)}
              className={on ? 'chip chip-brand' : 'chip'}
              aria-pressed={on}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Leads list */}
      <div className="cv-leads-list">
        {filtered.map((lead) => {
          const isNew = lead.status === 'new';
          return (
            <div key={lead.id} className="cv-leads-row">
              <span className="cv-leads-avatar" aria-hidden="true">
                {lead.name.charAt(0)}
              </span>

              <div className="cv-leads-main">
                <div className="cv-leads-name">
                  {lead.name} <span className="cv-leads-biz">· {lead.biz}</span>
                </div>
                <div className="cv-leads-meta">
                  <span className="chip chip-mini cv-leads-source">
                    <Icon name={CHANNEL_ICON[lead.channel]} size={11} /> {tr(lead.source)}
                  </span>
                  <span className="cv-leads-time">
                    <Icon name="Clock" size={11} /> {lead.time}
                  </span>
                </div>
              </div>

              <span className={isNew ? 'cv-leads-pill cv-leads-pill-new' : 'cv-leads-pill cv-leads-pill-done'}>
                {isNew ? L('New', 'Νέο') : L('Contacted', 'Επικοινωνία')}
              </span>

              <button type="button" className="chip chip-brand chip-mini cv-leads-add">
                <Icon name="Plus" size={12} />
                <span className="cv-leads-add-label">{L('Add to pipeline', 'Στο pipeline')}</span>
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        .cv-leads- {
          width: 100%;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cv-leads-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .cv-leads-head-text {
          display: flex;
          align-items: baseline;
          gap: 8px;
          min-width: 0;
        }
        .cv-leads-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0;
        }
        .cv-leads-count {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink-3);
        }
        .cv-leads-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cv-leads-filters .chip {
          cursor: pointer;
          border: none;
          font: inherit;
        }
        .cv-leads-list {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
          overflow: hidden;
        }
        .cv-leads-row {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border-bottom: 1px solid var(--line);
          transition: background 0.15s ease;
        }
        .cv-leads-row:last-child { border-bottom: none; }
        .cv-leads-row:hover { background: var(--surface-2); }
        .cv-leads-avatar {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: var(--radius-full);
          background: var(--brand-soft);
          color: var(--brand-ink);
          font-size: 12.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cv-leads-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cv-leads-name {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cv-leads-biz {
          font-weight: 500;
          color: var(--ink-2);
        }
        .cv-leads-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cv-leads-source {
          gap: 4px;
        }
        .cv-leads-time {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          color: var(--ink-3);
        }
        .cv-leads-pill {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 3px 7px;
          border-radius: var(--radius-full);
          border: 1px solid transparent;
          white-space: nowrap;
        }
        .cv-leads-pill-new {
          background: var(--brand-soft);
          color: var(--brand-ink);
          border-color: var(--brand-line);
        }
        .cv-leads-pill-done {
          background: var(--surface-2);
          color: var(--ink-3);
          border-color: var(--line-2);
        }
        .cv-leads-add {
          flex-shrink: 0;
          cursor: pointer;
          border: none;
          font: inherit;
          gap: 4px;
        }
        @media (max-width: 760px) {
          .cv-leads-row {
            flex-wrap: wrap;
            row-gap: 8px;
          }
          .cv-leads-pill {
            order: 3;
          }
          .cv-leads-add {
            order: 4;
            margin-left: auto;
          }
          .cv-leads-add-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
