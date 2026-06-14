'use client';
/* ============================================================
   GO AI — CRM demo: Communication Inbox (unified WhatsApp/Email).
   2-pane: thread list (left) + selected conversation (right).
   All user-facing strings via tr(...) / L(...). Pure TSX + scoped <style>.
   ============================================================ */
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { THREADS, CHANNEL_ICON } from '@/components/crm/crm-data';

export function InboxView() {
  const { tr } = useApp();
  const L = (en: string, gr: string) => tr({ EN: en, GR: gr });

  const [selected, setSelected] = useState<string>(THREADS[0].id);
  const active = THREADS.find((t) => t.id === selected) ?? THREADS[0];

  return (
    <div className="cv-inbox-">
      <div className="cv-inbox-grid">
        {/* LEFT — thread list */}
        <aside className="cv-inbox-list">
          <div className="cv-inbox-list-head">
            <span className="cv-inbox-list-title">{L('Inbox', 'Εισερχόμενα')}</span>
            <span className="chip chip-mini">{THREADS.length}</span>
          </div>
          <div className="cv-inbox-list-scroll">
            {THREADS.map((t) => {
              const on = t.id === selected;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelected(t.id)}
                  className={`cv-inbox-thread${on ? ' cv-inbox-thread-on' : ''}`}
                >
                  <span className="cv-inbox-avatar">{t.name.charAt(0)}</span>
                  <span className="cv-inbox-thread-body">
                    <span className="cv-inbox-thread-top">
                      <span className="cv-inbox-thread-name">
                        {t.name}
                        <Icon name={CHANNEL_ICON[t.channel]} size={12} style={{ color: 'var(--ink-3)' }} />
                      </span>
                      <span className="cv-inbox-thread-time">{t.time}</span>
                    </span>
                    <span className="cv-inbox-thread-bottom">
                      <span className="cv-inbox-thread-preview">{tr(t.preview)}</span>
                      {t.unread > 0 && <span className="cv-inbox-unread">{t.unread}</span>}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT — conversation */}
        <section className="cv-inbox-conv">
          <header className="cv-inbox-conv-head">
            <span className="cv-inbox-avatar">{active.name.charAt(0)}</span>
            <span className="cv-inbox-conv-head-body">
              <span className="cv-inbox-conv-name">{active.name}</span>
              <span className="cv-inbox-conv-channel">
                <Icon name={CHANNEL_ICON[active.channel]} size={12} style={{ color: 'var(--brand-ink)' }} />
                {tr({ EN: active.channel, GR: active.channel })}
              </span>
            </span>
          </header>

          <div className="cv-inbox-messages">
            {active.messages.map((m, i) => {
              const us = m.from === 'us';
              return (
                <div key={i} className={`cv-inbox-row${us ? ' cv-inbox-row-us' : ''}`}>
                  <div className={`cv-inbox-bubble${us ? ' cv-inbox-bubble-us' : ''}`}>
                    <span className="cv-inbox-bubble-text">{tr(m.text)}</span>
                    <span className="cv-inbox-bubble-time">{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cv-inbox-reply">
            <div className="cv-inbox-input">{L('Type a reply…', 'Γράψτε απάντηση…')}</div>
            <button type="button" className="cv-inbox-send" aria-label={L('Send', 'Αποστολή')}>
              <Icon name="Send" size={15} stroke={2.25} style={{ color: '#fff' }} />
            </button>
          </div>
        </section>
      </div>

      <style>{`
        .cv-inbox- { width: 100%; }
        .cv-inbox-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 14px;
          min-height: 360px;
          align-items: stretch;
        }

        /* ---- LEFT list ---- */
        .cv-inbox-list {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
          overflow: hidden;
          min-height: 0;
        }
        .cv-inbox-list-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-bottom: 1px solid var(--line);
          background: var(--surface-2);
        }
        .cv-inbox-list-title { font-size: 13px; font-weight: 800; color: var(--ink); letter-spacing: -0.01em; }
        .cv-inbox-list-scroll {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
          max-height: 420px;
          padding: 4px;
        }
        .cv-inbox-thread {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          width: 100%;
          text-align: left;
          padding: 10px;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          background: transparent;
          cursor: pointer;
          transition: background 0.12s ease, border-color 0.12s ease;
          font: inherit;
        }
        .cv-inbox-thread:hover { background: var(--surface-2); }
        .cv-inbox-thread-on {
          background: var(--brand-soft);
          border-color: var(--brand-line);
        }
        .cv-inbox-thread-on:hover { background: var(--brand-soft); }

        .cv-inbox-avatar {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--brand-soft);
          color: var(--brand-ink);
          font-weight: 800;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cv-inbox-thread-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .cv-inbox-thread-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .cv-inbox-thread-name {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink);
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cv-inbox-thread-time { flex-shrink: 0; font-size: 10.5px; color: var(--ink-3); font-variant-numeric: tabular-nums; }
        .cv-inbox-thread-bottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .cv-inbox-thread-preview {
          font-size: 11.5px;
          color: var(--ink-2);
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cv-inbox-unread {
          flex-shrink: 0;
          min-width: 17px;
          height: 17px;
          padding: 0 5px;
          border-radius: var(--radius-full);
          background: var(--brand);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          line-height: 17px;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }

        /* ---- RIGHT conversation ---- */
        .cv-inbox-conv {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
          overflow: hidden;
          min-height: 0;
        }
        .cv-inbox-conv-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--line);
          background: var(--surface-2);
        }
        .cv-inbox-conv-head-body { display: flex; flex-direction: column; gap: 1px; }
        .cv-inbox-conv-name { font-size: 13.5px; font-weight: 800; color: var(--ink); letter-spacing: -0.01em; }
        .cv-inbox-conv-channel {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink-3);
        }

        .cv-inbox-messages {
          flex: 1;
          min-height: 220px;
          max-height: 360px;
          overflow-y: auto;
          padding: 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--surface);
        }
        .cv-inbox-row { display: flex; justify-content: flex-start; }
        .cv-inbox-row-us { justify-content: flex-end; }
        .cv-inbox-bubble {
          max-width: 78%;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 8px 11px 6px;
          border-radius: 12px 12px 12px 3px;
          background: var(--surface-2);
          border: 1px solid var(--line);
        }
        .cv-inbox-bubble-us {
          border-radius: 12px 12px 3px 12px;
          background: var(--brand-soft);
          border-color: var(--brand-line);
        }
        .cv-inbox-bubble-text { font-size: 12.5px; line-height: 1.5; color: var(--ink); word-break: break-word; }
        .cv-inbox-bubble-time { font-size: 10px; color: var(--ink-3); align-self: flex-end; font-variant-numeric: tabular-nums; }

        .cv-inbox-reply {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          border-top: 1px solid var(--line);
          background: var(--surface-2);
        }
        .cv-inbox-input {
          flex: 1;
          height: 36px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          border-radius: var(--radius-full);
          background: var(--surface);
          border: 1px solid var(--line-2);
          font-size: 12px;
          color: var(--ink-3);
        }
        .cv-inbox-send {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--brand);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: background 0.12s ease;
        }
        .cv-inbox-send:hover { background: var(--brand-strong); }

        @media (max-width: 760px) {
          .cv-inbox-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .cv-inbox-list-scroll {
            max-height: 200px;
          }
          .cv-inbox-messages {
            min-height: 180px;
            max-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
