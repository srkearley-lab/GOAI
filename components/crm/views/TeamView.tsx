'use client';
/* ============================================================
   GO AI — CRM demo · Team & Permissions view.
   Member list with role + permission + status pills.
   Scoped <style> + global design tokens, prefix cv-team-.
   ============================================================ */
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { TEAM } from '@/components/crm/crm-data';

export function TeamView() {
  const { tr } = useApp();
  const L = (en: string, gr: string) => tr({ EN: en, GR: gr });

  return (
    <div className="cv-team-">
      <div className="cv-team-head">
        <div className="cv-team-head-l">
          <span className="glass-badge" style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)' }}>
            <Icon name="Users" size={17} />
          </span>
          <div>
            <h3 className="cv-team-title">{L('Team', 'Ομάδα')}</h3>
            <p className="cv-team-sub">{L('Manage who can access your CRM', 'Διαχειριστείτε ποιος έχει πρόσβαση στο CRM')}</p>
          </div>
        </div>
        <button type="button" className="cv-team-invite">
          <Icon name="Plus" size={15} stroke={2.5} />
          {L('Invite member', 'Πρόσκληση μέλους')}
        </button>
      </div>

      <div className="card cv-team-card">
        <div className="cv-team-list" role="table">
          {TEAM.map((m) => {
            const active = m.status === 'active';
            return (
              <div key={m.id} className="cv-team-row" role="row">
                <span className="cv-team-avatar" aria-hidden="true">{m.name.charAt(0)}</span>

                <div className="cv-team-id">
                  <span className="cv-team-name">{m.name}</span>
                  <span className="chip-brand cv-team-role">{tr(m.role)}</span>
                </div>

                <span className="cv-team-email">{m.email}</span>
                <span className="cv-team-perm">{tr(m.perm)}</span>

                <span className={`cv-team-status ${active ? 'cv-team-status-on' : 'cv-team-status-inv'}`}>
                  <Icon name={active ? 'CircleCheck' : 'Clock'} size={11} stroke={2.5} />
                  {active ? L('Active', 'Ενεργό') : L('Invited', 'Προσκεκλημένο')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="cv-team-note">
        <Icon name="Shield" size={13} />
        {L('Unlimited team members included on your €50/month plan.', 'Απεριόριστα μέλη ομάδας στο πλάνο των €50/μήνα.')}
      </p>

      <style>{`
        .cv-team- { width: 100%; min-height: 360px; display: flex; flex-direction: column; gap: 12px; }
        .cv-team-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .cv-team-head-l { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .cv-team-title { font-size: 15px; font-weight: 800; letter-spacing: -0.01em; color: var(--ink); margin: 0; }
        .cv-team-sub { font-size: 11.5px; color: var(--ink-3); margin: 1px 0 0; }
        .cv-team-invite {
          display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
          padding: 8px 13px; border-radius: var(--radius-md); border: 1px solid var(--brand-strong);
          background: var(--brand); color: #fff; font-size: 12px; font-weight: 700;
          letter-spacing: -0.01em; cursor: pointer; box-shadow: var(--shadow-xs);
          transition: background .15s ease, transform .1s ease;
        }
        .cv-team-invite:hover { background: var(--brand-strong); }
        .cv-team-invite:active { transform: translateY(1px); }

        .cv-team-card { padding: 4px; overflow: hidden; }
        .cv-team-list { display: flex; flex-direction: column; }
        .cv-team-row {
          display: grid;
          grid-template-columns: 28px minmax(150px, 1.3fr) minmax(140px, 1.4fr) minmax(110px, 1fr) auto;
          align-items: center; gap: 12px;
          padding: 11px 12px; border-radius: var(--radius-sm);
          border-bottom: 1px solid var(--line);
          transition: background .12s ease;
        }
        .cv-team-row:last-child { border-bottom: none; }
        .cv-team-row:hover { background: var(--surface-2); }

        .cv-team-avatar {
          width: 28px; height: 28px; border-radius: var(--radius-full);
          background: var(--brand-soft); color: var(--brand-ink);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; flex-shrink: 0;
        }
        .cv-team-id { display: flex; align-items: center; gap: 8px; min-width: 0; flex-wrap: wrap; }
        .cv-team-name { font-size: 13px; font-weight: 700; color: var(--ink); white-space: nowrap; }
        .cv-team-role { flex-shrink: 0; }

        .cv-team-email {
          font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-3);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cv-team-perm { font-size: 12px; color: var(--ink-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .cv-team-status {
          justify-self: end; display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 8px; border-radius: var(--radius-full);
          font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;
          border: 1px solid var(--line-2); white-space: nowrap;
        }
        .cv-team-status-on {
          background: color-mix(in srgb, var(--success) 14%, transparent);
          color: var(--success);
          border-color: color-mix(in srgb, var(--success) 30%, transparent);
        }
        .cv-team-status-inv {
          background: color-mix(in srgb, var(--gold) 14%, transparent);
          color: var(--gold);
          border-color: color-mix(in srgb, var(--gold) 30%, transparent);
        }

        .cv-team-note {
          display: flex; align-items: center; gap: 7px; margin: 0; padding: 2px 4px;
          font-size: 11.5px; color: var(--ink-3); line-height: 1.5;
        }
        .cv-team-note svg { color: var(--brand-ink); flex-shrink: 0; }

        @media (max-width: 760px) {
          .cv-team-card { padding: 4px; overflow-x: auto; }
          .cv-team-list { min-width: 560px; }
        }
      `}</style>
    </div>
  );
}
