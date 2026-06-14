'use client';
/* ============================================================
   GO AI — CRM demo · Calendar / Meetings (week view).
   7-column week grid of meeting chips coloured by kind, with a
   compact "Upcoming" strip. Scoped styles, prefix cv-cal-.
   ============================================================ */
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { MEETINGS, WEEKDAYS, type Meeting } from '@/components/crm/crm-data';

const TODAY_IDX = 2; // Wed = "today"

const KIND_ICON: Record<Meeting['kind'], string> = {
  call: 'Phone',
  meeting: 'Users',
  demo: 'Globe',
};

function kindStyle(kind: Meeting['kind']): { bg: string; color: string; border: string } {
  if (kind === 'call')
    return {
      bg: 'var(--brand-soft)',
      color: 'var(--brand-ink)',
      border: 'var(--brand-line)',
    };
  if (kind === 'meeting')
    return {
      bg: 'color-mix(in srgb, var(--gold) 14%, transparent)',
      color: 'var(--gold)',
      border: 'color-mix(in srgb, var(--gold) 30%, transparent)',
    };
  return {
    bg: 'color-mix(in srgb, var(--success) 12%, transparent)',
    color: 'var(--success)',
    border: 'color-mix(in srgb, var(--success) 28%, transparent)',
  };
}

export function CalendarView() {
  const { tr } = useApp();
  const L = (en: string, gr: string) => tr({ EN: en, GR: gr });

  // Stable chronological order across the whole week for the "Upcoming" strip.
  const ordered = [...MEETINGS].sort((a, b) =>
    a.dayIdx - b.dayIdx || a.time.localeCompare(b.time),
  );
  const upcoming = ordered.slice(0, 3);

  return (
    <div className="cv-cal-">
      {/* Header */}
      <div className="cv-cal-head">
        <div className="cv-cal-head-left">
          <span className="glass-badge" style={{ width: 30, height: 30, borderRadius: 'var(--radius-md)' }}>
            <Icon name="Calendar" size={16} />
          </span>
          <div className="cv-cal-head-text">
            <h3 className="cv-cal-title">{L('This week', 'Αυτή την εβδομάδα')}</h3>
            <span className="cv-cal-sub">
              {MEETINGS.length} {L('meetings', 'συναντήσεις')}
            </span>
          </div>
        </div>
        <span className="chip chip-mini cv-cal-today-chip">
          <Icon name="Circle" size={8} /> {L('Today', 'Σήμερα')} · {tr(WEEKDAYS[TODAY_IDX])}
        </span>
      </div>

      {/* Week grid */}
      <div className="cv-cal-grid card">
        {WEEKDAYS.map((day, i) => {
          const isToday = i === TODAY_IDX;
          const events = ordered.filter((m) => m.dayIdx === i);
          return (
            <div key={i} className={'cv-cal-col' + (isToday ? ' cv-cal-col-today' : '')}>
              <div className={'cv-cal-colhead' + (isToday ? ' cv-cal-colhead-today' : '')}>
                <span className="cv-cal-dow">{tr(day)}</span>
                {events.length > 0 && <span className="cv-cal-dot" />}
              </div>
              <div className="cv-cal-events">
                {events.length === 0 ? (
                  <span className="cv-cal-empty">—</span>
                ) : (
                  events.map((m) => {
                    const s = kindStyle(m.kind);
                    return (
                      <div
                        key={m.id}
                        className="cv-cal-event"
                        style={{ background: s.bg, borderColor: s.border }}
                      >
                        <span className="cv-cal-event-time" style={{ color: s.color }}>
                          {m.time}
                        </span>
                        <span className="cv-cal-event-title">{tr(m.title)}</span>
                        <span className="cv-cal-event-who">{m.who}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming strip */}
      <div className="cv-cal-up">
        <span className="cv-cal-up-label">{L('Upcoming', 'Επόμενα')}</span>
        <div className="cv-cal-up-list">
          {upcoming.map((m) => {
            const s = kindStyle(m.kind);
            return (
              <div key={m.id} className="cv-cal-up-item">
                <span
                  className="icon-badge sm"
                  style={{ background: s.bg, color: s.color }}
                >
                  <Icon name={KIND_ICON[m.kind]} size={13} />
                </span>
                <div className="cv-cal-up-body">
                  <span className="cv-cal-up-top">
                    <span className="cv-cal-up-time">{tr(WEEKDAYS[m.dayIdx])} {m.time}</span>
                    <span className="cv-cal-up-title">{tr(m.title)}</span>
                  </span>
                  <span className="cv-cal-up-who">{m.who}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cv-cal- { display: flex; flex-direction: column; gap: 14px; width: 100%; min-height: 360px; color: var(--ink); }

        .cv-cal-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .cv-cal-head-left { display: flex; align-items: center; gap: 10px; }
        .cv-cal-head-text { display: flex; flex-direction: column; gap: 1px; }
        .cv-cal-title { font-size: 14px; font-weight: 800; letter-spacing: -0.01em; margin: 0; color: var(--ink); }
        .cv-cal-sub { font-size: 11px; font-weight: 600; color: var(--ink-3); }
        .cv-cal-today-chip { display: inline-flex; align-items: center; gap: 5px; color: var(--brand-ink); }
        .cv-cal-today-chip svg { color: var(--brand); }

        .cv-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--line); padding: 1px; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .cv-cal-col { display: flex; flex-direction: column; background: var(--surface); min-height: 0; }
        .cv-cal-col-today { background: color-mix(in srgb, var(--brand) 4%, var(--surface)); }

        .cv-cal-colhead { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 8px 6px; border-bottom: 1px solid var(--line); background: var(--surface-2); }
        .cv-cal-colhead-today { background: var(--brand-soft); border-bottom-color: var(--brand-line); }
        .cv-cal-dow { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-3); }
        .cv-cal-colhead-today .cv-cal-dow { color: var(--brand-ink); }
        .cv-cal-dot { width: 5px; height: 5px; border-radius: var(--radius-full); background: var(--brand); flex-shrink: 0; }

        .cv-cal-events { display: flex; flex-direction: column; gap: 6px; padding: 8px 6px; flex: 1; min-height: 132px; }
        .cv-cal-empty { font-size: 12px; color: var(--ink-3); text-align: center; opacity: 0.5; margin-top: 6px; }

        .cv-cal-event { display: flex; flex-direction: column; gap: 1px; padding: 7px 8px; border-radius: var(--radius-sm); border: 1px solid; cursor: default; transition: transform 0.12s ease; }
        .cv-cal-event:hover { transform: translateY(-1px); }
        .cv-cal-event-time { font-size: 11px; font-weight: 800; letter-spacing: -0.01em; }
        .cv-cal-event-title { font-size: 11.5px; font-weight: 700; color: var(--ink); line-height: 1.25; }
        .cv-cal-event-who { font-size: 10px; font-weight: 500; color: var(--ink-3); line-height: 1.2; }

        .cv-cal-up { display: flex; flex-direction: column; gap: 8px; }
        .cv-cal-up-label { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-3); }
        .cv-cal-up-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .cv-cal-up-item { display: flex; align-items: center; gap: 9px; padding: 9px 11px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-xs); }
        .cv-cal-up-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .cv-cal-up-top { display: flex; align-items: baseline; gap: 7px; min-width: 0; }
        .cv-cal-up-time { font-size: 11px; font-weight: 800; color: var(--brand-ink); white-space: nowrap; }
        .cv-cal-up-title { font-size: 12px; font-weight: 700; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cv-cal-up-who { font-size: 10.5px; font-weight: 500; color: var(--ink-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        @media (max-width: 760px) {
          .cv-cal-grid { grid-template-columns: 1fr; gap: 0; background: var(--surface); padding: 0; border: 1px solid var(--line); }
          .cv-cal-col { border-bottom: 1px solid var(--line); }
          .cv-cal-col:last-child { border-bottom: none; }
          .cv-cal-colhead { justify-content: flex-start; padding: 8px 12px; }
          .cv-cal-events { flex-direction: row; flex-wrap: wrap; min-height: 0; padding: 8px 12px; }
          .cv-cal-events:empty { display: none; }
          .cv-cal-empty { display: none; }
          .cv-cal-event { flex: 1 1 160px; }
          .cv-cal-up-list { grid-template-columns: 1fr; }
          .cv-cal-up-title { white-space: normal; }
        }
      `}</style>
    </div>
  );
}
