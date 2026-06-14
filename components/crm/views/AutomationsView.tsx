'use client';
/* ============================================================
   GO AI — CRM demo · Automations view.
   A list of automation "recipes" (trigger → action) each with a
   live on/off toggle. Dense, premium SaaS styling using global
   design tokens + reused .card / .glass-badge classes.
   ============================================================ */
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { AUTOMATIONS } from '@/components/crm/crm-data';

export function AutomationsView() {
  const { tr } = useApp();
  const L = (en: string, gr: string) => tr({ EN: en, GR: gr });

  const [state, setState] = useState<Record<string, boolean>>(
    () => Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a.on])),
  );
  const toggle = (id: string) => setState((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="cv-auto-">
      <div className="cv-auto-head">
        <div className="cv-auto-head-text">
          <h3 className="cv-auto-title">{L('Automations', 'Αυτοματισμοί')}</h3>
          <p className="cv-auto-sub">
            {L('Rules that run in the background, 24/7.', 'Κανόνες που τρέχουν στο παρασκήνιο, 24/7.')}
          </p>
        </div>
        <button type="button" className="cv-auto-new">
          <Icon name="Plus" size={14} stroke={2.5} />
          {L('New automation', 'Νέος αυτοματισμός')}
        </button>
      </div>

      <div className="cv-auto-list">
        {AUTOMATIONS.map((a) => {
          const on = state[a.id];
          return (
            <div key={a.id} className={'card cv-auto-row' + (on ? '' : ' cv-auto-off')}>
              <span className="glass-badge" style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                <Icon name="Zap" size={16} />
              </span>

              <div className="cv-auto-body">
                <div className="cv-auto-name">{tr(a.name)}</div>
                <div className="cv-auto-flow">
                  <span className="cv-auto-trigger">{tr(a.trigger)}</span>
                  <Icon name="ArrowRight" size={12} stroke={2.5} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
                  <span className="cv-auto-action">{tr(a.action)}</span>
                </div>
              </div>

              <div className="cv-auto-runs">
                <span className="cv-auto-runs-n">{a.runs}</span>
                <span className="cv-auto-runs-l">{L('runs', 'εκτελέσεις')}</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => toggle(a.id)}
                className={'cv-auto-switch' + (on ? ' cv-auto-switch-on' : '')}
              >
                <span className="cv-auto-knob" />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        .cv-auto- { width: 100%; min-height: 360px; display: flex; flex-direction: column; gap: 12px; }

        .cv-auto-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
        .cv-auto-head-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cv-auto-title { margin: 0; font-size: 15px; font-weight: 800; letter-spacing: -0.01em; color: var(--ink); line-height: 1.2; }
        .cv-auto-sub { margin: 0; font-size: 11.5px; color: var(--ink-3); line-height: 1.4; }

        .cv-auto-new {
          display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
          padding: 7px 12px; border-radius: var(--radius-full);
          background: var(--brand); color: #fff; border: 1px solid var(--brand-strong);
          font-size: 12px; font-weight: 700; letter-spacing: -0.01em; cursor: pointer;
          box-shadow: var(--shadow-xs); transition: background 0.15s ease, transform 0.15s ease;
        }
        .cv-auto-new:hover { background: var(--brand-strong); transform: translateY(-1px); }

        .cv-auto-list { display: flex; flex-direction: column; gap: 8px; }

        .cv-auto-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: var(--radius-md);
          transition: opacity 0.15s ease, background 0.15s ease;
        }
        .cv-auto-row:hover { background: var(--surface-2); }
        .cv-auto-off { opacity: 0.62; }

        .cv-auto-body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .cv-auto-name { font-size: 13px; font-weight: 700; color: var(--ink); letter-spacing: -0.01em; line-height: 1.2; }
        .cv-auto-flow { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font-size: 11.5px; color: var(--ink-3); line-height: 1.4; }
        .cv-auto-trigger, .cv-auto-action { white-space: normal; }

        .cv-auto-runs { display: flex; flex-direction: column; align-items: flex-end; gap: 0; flex-shrink: 0; text-align: right; }
        .cv-auto-runs-n { font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--ink-2); line-height: 1.1; }
        .cv-auto-runs-l { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-3); }

        .cv-auto-switch {
          position: relative; flex-shrink: 0; width: 38px; height: 22px;
          border-radius: var(--radius-full); border: 1px solid var(--line-2);
          background: var(--surface-2); cursor: pointer; padding: 0;
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .cv-auto-switch-on { background: var(--brand); border-color: var(--brand-strong); }
        .cv-auto-knob {
          position: absolute; top: 2px; left: 2px; width: 16px; height: 16px;
          border-radius: var(--radius-full); background: #fff;
          box-shadow: var(--shadow-xs); transition: transform 0.18s ease;
        }
        .cv-auto-switch-on .cv-auto-knob { transform: translateX(16px); }

        @media (max-width: 760px) {
          .cv-auto-head { flex-direction: column; align-items: stretch; }
          .cv-auto-new { align-self: flex-start; }
          .cv-auto-row { flex-wrap: wrap; row-gap: 8px; padding: 11px 12px; }
          .cv-auto-body { flex-basis: calc(100% - 46px); }
          .cv-auto-runs { margin-left: 46px; align-items: flex-start; text-align: left; flex-direction: row; gap: 5px; align-items: baseline; }
          .cv-auto-switch { margin-left: auto; }
        }
      `}</style>
    </div>
  );
}
