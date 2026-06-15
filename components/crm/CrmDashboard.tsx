'use client';
/* ============================================================
   GO AI — large sample CRM dashboard (demo) shell.
   Sidebar with grouped modules; an enhanced drag-and-drop pipeline
   (stage totals, lost stage, follow-up, deal age, priority filter,
   quick actions); a slide-over Customer Profile; plus Dashboard,
   Contacts, Tasks, Reports, Settings here and the peripheral module
   views (Inbox, Leads, Calendar, Automations, Deals, Team) imported.
   Hand-coded with the design tokens. Bilingual.
   ============================================================ */
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import type { Bilingual } from '@/types';
import {
  CONTACTS, STAGES, TASKS, REVENUE, money, toneStyle, CHANNEL_ICON, ACT_ICON, PROPOSAL_LABEL,
  type Stage, type Tone, type Contact,
} from '@/components/crm/crm-data';
import { InboxView } from '@/components/crm/views/InboxView';
import { LeadsView } from '@/components/crm/views/LeadsView';
import { CalendarView } from '@/components/crm/views/CalendarView';
import { AutomationsView } from '@/components/crm/views/AutomationsView';
import { DealsView } from '@/components/crm/views/DealsView';
import { TeamView } from '@/components/crm/views/TeamView';

type View = 'dashboard' | 'inbox' | 'calendar' | 'pipeline' | 'deals' | 'contacts' | 'leads' | 'automations' | 'tasks' | 'reports' | 'team' | 'settings';

const NAV: { group: Bilingual; items: { icon: string; label: Bilingual; view: View }[] }[] = [
  { group: { EN: 'Workspace', GR: 'Χώρος' }, items: [
    { icon: 'LayoutDashboard', label: { EN: 'Dashboard', GR: 'Πίνακας' }, view: 'dashboard' },
    { icon: 'Inbox', label: { EN: 'Inbox', GR: 'Inbox' }, view: 'inbox' },
    { icon: 'Calendar', label: { EN: 'Calendar', GR: 'Ημερολόγιο' }, view: 'calendar' },
  ] },
  { group: { EN: 'Sales', GR: 'Πωλήσεις' }, items: [
    { icon: 'Kanban', label: { EN: 'Pipeline', GR: 'Pipeline' }, view: 'pipeline' },
    { icon: 'FileText', label: { EN: 'Deals', GR: 'Συμφωνίες' }, view: 'deals' },
    { icon: 'Users', label: { EN: 'Contacts', GR: 'Επαφές' }, view: 'contacts' },
    { icon: 'UserPlus', label: { EN: 'Leads', GR: 'Leads' }, view: 'leads' },
  ] },
  { group: { EN: 'Automate', GR: 'Αυτοματισμοί' }, items: [
    { icon: 'Workflow', label: { EN: 'Automations', GR: 'Αυτοματισμοί' }, view: 'automations' },
    { icon: 'ListTodo', label: { EN: 'Tasks', GR: 'Εργασίες' }, view: 'tasks' },
  ] },
  { group: { EN: 'Insights', GR: 'Στατιστικά' }, items: [
    { icon: 'ChartColumn', label: { EN: 'Reports', GR: 'Αναφορές' }, view: 'reports' },
  ] },
  { group: { EN: 'Manage', GR: 'Διαχείριση' }, items: [
    { icon: 'UsersRound', label: { EN: 'Team', GR: 'Ομάδα' }, view: 'team' },
    { icon: 'Settings', label: { EN: 'Settings', GR: 'Ρυθμίσεις' }, view: 'settings' },
  ] },
];
const TITLES: Record<View, Bilingual> = {
  dashboard: { EN: 'Dashboard', GR: 'Πίνακας' }, inbox: { EN: 'Inbox', GR: 'Inbox' }, calendar: { EN: 'Calendar', GR: 'Ημερολόγιο' },
  pipeline: { EN: 'Sales Pipeline', GR: 'Pipeline Πωλήσεων' }, deals: { EN: 'Deals', GR: 'Συμφωνίες' }, contacts: { EN: 'Contacts', GR: 'Επαφές' },
  leads: { EN: 'Leads', GR: 'Leads' }, automations: { EN: 'Automations', GR: 'Αυτοματισμοί' }, tasks: { EN: 'Tasks', GR: 'Εργασίες' },
  reports: { EN: 'Reports', GR: 'Αναφορές' }, team: { EN: 'Team', GR: 'Ομάδα' }, settings: { EN: 'Settings', GR: 'Ρυθμίσεις' },
};
const FILTERS: { key: Tone | 'all'; label: Bilingual }[] = [
  { key: 'all', label: { EN: 'All', GR: 'Όλα' } }, { key: 'hot', label: { EN: 'Hot', GR: 'Ζεστά' } },
  { key: 'warm', label: { EN: 'Warm', GR: 'Χλιαρά' } }, { key: 'cold', label: { EN: 'Cold', GR: 'Κρύα' } },
];

export function CrmDashboard() {
  const { tr } = useApp();
  const L = (EN: string, GR: string) => tr({ EN, GR });
  const [view, setView] = useState<View>('dashboard');
  const [deals, setDeals] = useState<Contact[]>(CONTACTS);
  const [filter, setFilter] = useState<Tone | 'all'>('all');
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({ t6: true });
  const profile = deals.find((d) => d.id === profileId) || null;
  const stageLabel = (s: Stage) => tr(STAGES.find((x) => x.key === s)!.label);

  const Avatar = ({ name, size = 32 }: { name: string; size?: number }) => (
    <span style={{ flexShrink: 0, width: size, height: size, borderRadius: '50%', background: 'var(--brand-soft)', color: 'var(--brand-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, fontWeight: 800 }}>{name[0]}</span>
  );
  const Pill = ({ t }: { t: Tone }) => { const s = toneStyle(t); const lab = t === 'hot' ? L('Hot', 'Ζεστό') : t === 'warm' ? L('Warm', 'Χλιαρό') : L('Cold', 'Κρύο'); return <span style={{ flexShrink: 0, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', padding: '1px 6px', borderRadius: 5, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{lab}</span>; };
  const Panel = ({ title, children, action }: { title: string; children: React.ReactNode; action?: string }) => (
    <div className="card cd-panel"><div className="cd-panel-h"><span>{title}</span>{action && <span className="cd-panel-a">{action}</span>}</div>{children}</div>
  );
  const Bars = ({ data }: { data: { m: Bilingual; v: number }[] }) => { const max = Math.max(...data.map((d) => d.v)); return (
    <div className="cd-bars">{data.map((d, i) => (
      <div key={i} className="cd-barcol"><span className="cd-barval">€{d.v}k</span><div className="cd-bartrack"><div className="cd-bar" style={{ height: `${Math.round((d.v / max) * 100)}%`, opacity: i === data.length - 1 ? 1 : 0.55 }} /></div><span className="cd-barlbl">{tr(d.m)}</span></div>
    ))}</div>
  ); };

  /* ---------------- Dashboard ---------------- */
  const recent = CONTACTS.flatMap((ct) => ct.acts.map((a) => ({ a, ct }))).slice(0, 5);
  const renderDashboard = () => (
    <>
      <div className="cd-kpis">
        {[{ icon: 'Inbox', v: '12', l: L('Open leads', 'Ανοιχτά leads') }, { icon: 'CircleCheck', v: '8', l: L('Won this month', 'Κερδισμένα μήνα') }, { icon: 'TrendingUp', v: '€7.4k', l: L('Pipeline value', 'Αξία pipeline') }, { icon: 'CalendarClock', v: '5', l: L('Tasks due', 'Εκκρεμότητες') }].map((k) => (
          <div key={k.l} className="cd-kpi"><span className="icon-badge sm" style={{ width: 30, height: 30, borderRadius: 8 }}><Icon name={k.icon} size={15} /></span><span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05, minWidth: 0 }}><strong style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{k.v}</strong><span style={{ fontSize: 10.5, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.l}</span></span></div>
        ))}
      </div>
      <div className="cd-dash">
        <Panel title={L('Revenue · last 6 months', 'Έσοδα · τελευταίοι 6 μήνες')} action="+38%"><Bars data={REVENUE} /></Panel>
        <Panel title={L('Recent activity', 'Πρόσφατη δραστηριότητα')}>
          <div className="cd-feed">{recent.map(({ a, ct }, i) => (
            <div key={i} className="cd-feeditem"><span className="cd-act-ico"><Icon name={ACT_ICON[a.type]} size={12} /></span><span style={{ minWidth: 0 }}><span style={{ display: 'block', fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.4 }}>{tr(a.text)}</span><span style={{ fontSize: 10, color: 'var(--ink-3)' }}>{ct.biz} · {a.time} {L('ago', 'πριν')}</span></span></div>
          ))}</div>
        </Panel>
        <Panel title={L('Deals by stage', 'Συμφωνίες ανά στάδιο')}>
          <div className="cd-stagebars">{STAGES.map((s) => { const n = CONTACTS.filter((d) => d.stage === s.key).length; return (
            <div key={s.key} className="cd-sb"><span className="cd-sb-l">{tr(s.label)}</span><span className="cd-sb-track"><span className="cd-sb-fill" style={{ width: `${Math.round((n / 3) * 100)}%` }} /></span><span className="cd-sb-n">{n}</span></div>
          ); })}</div>
        </Panel>
        <Panel title={L('Tasks due', 'Εκκρεμότητες')} action={L('View all', 'Όλες')}>
          <div className="cd-feed">{TASKS.slice(0, 4).map((t) => (
            <div key={t.id} className="cd-minitask"><Icon name={done[t.id] ? 'CircleCheck' : 'Circle'} size={15} style={{ color: done[t.id] ? 'var(--success)' : 'var(--ink-3)', flexShrink: 0 }} /><span style={{ flex: 1, minWidth: 0, fontSize: 11.5, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: done[t.id] ? 'line-through' : 'none', opacity: done[t.id] ? 0.5 : 1 }}>{tr(t.title)}</span><span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: 'var(--ink-3)' }}>{tr(t.due)}</span></div>
          ))}</div>
        </Panel>
      </div>
    </>
  );

  /* ---------------- Pipeline (enhanced) ---------------- */
  const QA: { icon: string; t: Bilingual }[] = [
    { icon: 'Phone', t: { EN: 'Call', GR: 'Κλήση' } }, { icon: 'Mail', t: { EN: 'Email', GR: 'Email' } },
    { icon: 'MessageCircle', t: { EN: 'WhatsApp', GR: 'WhatsApp' } }, { icon: 'ListPlus', t: { EN: 'Add task', GR: 'Εργασία' } },
  ];
  const renderPipeline = () => {
    const shown = deals.filter((d) => filter === 'all' || d.tone === filter);
    return (
      <>
        <div className="cd-filters">
          <span className="cd-fl-ico"><Icon name="Filter" size={13} /> {L('Filter', 'Φίλτρο')}</span>
          {FILTERS.map((f) => (
            <button key={f.key} type="button" onClick={() => setFilter(f.key)} className="cd-fchip" data-active={filter === f.key ? '1' : undefined}>{tr(f.label)}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-3)' }}>{shown.length} {L('deals', 'συμφωνίες')}</span>
        </div>
        <div className="cd-board">
          {STAGES.map((s) => {
            const ds = shown.filter((d) => d.stage === s.key);
            const total = ds.reduce((sum, d) => sum + d.value, 0);
            return (
              <div key={s.key} className="cd-col" data-over={overStage === s.key ? '1' : undefined}
                onDragOver={(e) => { e.preventDefault(); setOverStage(s.key); }}
                onDragLeave={() => setOverStage((cur) => (cur === s.key ? null : cur))}
                onDrop={() => { if (dragId) setDeals((prev) => prev.map((d) => (d.id === dragId ? { ...d, stage: s.key } : d))); setDragId(null); setOverStage(null); }}>
                <div className="cd-col-head"><span className="cd-col-name">{tr(s.label)}<span className="cd-count">{ds.length}</span></span><span className="cd-col-total">{money(total)}</span></div>
                <div className="cd-col-body">
                  {ds.map((d) => (
                    <div key={d.id} className="cd-card" draggable data-active={d.id === profileId ? '1' : undefined}
                      onDragStart={() => setDragId(d.id)} onDragEnd={() => { setDragId(null); setOverStage(null); }}
                      onClick={() => setProfileId(d.id)} role="button" tabIndex={0}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.biz}</span><span style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand-ink)', flexShrink: 0 }}>{money(d.value)}</span></span>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 6 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: 'var(--ink-3)', minWidth: 0 }}><Icon name={CHANNEL_ICON[d.channel]} size={11} /> {d.name}</span><Pill t={d.tone} /></span>
                      <span className="cd-cardmeta"><span><Icon name="CalendarClock" size={11} /> {tr(d.followUp)}</span><span><Icon name="Clock" size={11} /> {d.ageDays}d</span></span>
                      <span className="cd-qa">{QA.map((q) => (<button key={q.icon} type="button" title={tr(q.t)} onClick={(e) => { e.stopPropagation(); }} className="cd-qabtn"><Icon name={q.icon} size={12} /></button>))}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  /* ---------------- Contacts ---------------- */
  const renderContacts = () => (
    <div className="cd-table">
      <div className="cd-tr cd-th"><span>{L('Contact', 'Επαφή')}</span><span>{L('Stage', 'Στάδιο')}</span><span style={{ textAlign: 'right' }}>{L('Value', 'Αξία')}</span></div>
      {deals.map((d) => (
        <button key={d.id} type="button" onClick={() => setProfileId(d.id)} className="cd-tr cd-row" data-active={d.id === profileId ? '1' : undefined}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}><Avatar name={d.name} size={28} /><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name} · {d.biz}</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: 'var(--ink-3)' }}><Icon name={CHANNEL_ICON[d.channel]} size={11} /> {tr(d.last)}</span></span></span>
          <span><span className="cd-stage">{stageLabel(d.stage)}</span></span>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--brand-ink)', textAlign: 'right' }}>{money(d.value)}</span>
        </button>
      ))}
    </div>
  );

  /* ---------------- Tasks ---------------- */
  const renderTasks = () => (
    <div className="cd-tasklist">{TASKS.map((t) => (
      <button key={t.id} type="button" onClick={() => setDone((p) => ({ ...p, [t.id]: !p[t.id] }))} className="cd-task">
        <Icon name={done[t.id] ? 'CircleCheck' : 'Circle'} size={18} style={{ color: done[t.id] ? 'var(--success)' : 'var(--ink-3)', flexShrink: 0 }} />
        <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textDecoration: done[t.id] ? 'line-through' : 'none', opacity: done[t.id] ? 0.5 : 1 }}>{tr(t.title)}</span><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{t.who}</span></span>
        <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: 'var(--ink-2)' }}><Icon name="Calendar" size={13} style={{ color: 'var(--ink-3)' }} /> {tr(t.due)}</span>
        <Pill t={t.tone} />
      </button>
    ))}</div>
  );

  /* ---------------- Reports ---------------- */
  const renderReports = () => (
    <div className="cd-reports">
      <div className="cd-kpis">{[{ icon: 'Percent', v: '68%', l: L('Win rate', 'Ποσοστό νίκης') }, { icon: 'Trophy', v: '8', l: L('Deals won', 'Κερδισμένες') }, { icon: 'Coins', v: '€1.2k', l: L('Avg deal', 'Μ.Ο. συμφωνίας') }, { icon: 'TrendingUp', v: '€29k', l: L('Revenue (Q)', 'Έσοδα (3μηνο)') }].map((k) => (
        <div key={k.l} className="cd-kpi"><span className="icon-badge sm" style={{ width: 30, height: 30, borderRadius: 8 }}><Icon name={k.icon} size={15} /></span><span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05, minWidth: 0 }}><strong style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{k.v}</strong><span style={{ fontSize: 10.5, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.l}</span></span></div>
      ))}</div>
      <Panel title={L('Revenue · last 6 months', 'Έσοδα · τελευταίοι 6 μήνες')}><Bars data={REVENUE} /></Panel>
    </div>
  );

  /* ---------------- Settings ---------------- */
  const renderSettings = () => { const integ = [{ icon: 'MessageCircle', name: 'WhatsApp', on: true }, { icon: 'Mail', name: 'Email', on: true }, { icon: 'Calendar', name: 'Google Calendar', on: false }]; return (
    <div className="cd-settings">
      <Panel title={L('Workspace', 'Χώρος εργασίας')}><div className="cd-setrow"><Avatar name="GO" size={34} /><span style={{ flex: 1 }}><strong style={{ display: 'block', fontSize: 12.5, color: 'var(--ink)' }}>GO AI</strong><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>owner@go-ai.gr</span></span><span className="cd-stage">{L('Owner', 'Ιδιοκτήτης')}</span></div></Panel>
      <Panel title={L('Integrations', 'Ενσωματώσεις')}><div className="cd-feed">{integ.map((it) => (
        <div key={it.name} className="cd-setrow"><span className="icon-badge sm" style={{ width: 30, height: 30, borderRadius: 8 }}><Icon name={it.icon} size={15} /></span><span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>{it.name}</span>{it.on ? <span className="cd-conn"><Icon name="Check" size={12} /> {L('Connected', 'Συνδεδεμένο')}</span> : <span className="cd-stage">{L('Connect', 'Σύνδεση')}</span>}</div>
      ))}</div></Panel>
      <Panel title={L('Plan', 'Πλάνο')}><div className="cd-setrow"><span className="glass-badge" style={{ width: 30, height: 30, borderRadius: 8 }}><Icon name="Users" size={15} /></span><span style={{ flex: 1 }}><strong style={{ display: 'block', fontSize: 12.5, color: 'var(--ink)' }}>GO AI CRM</strong><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>€50/{L('month', 'μήνα')} · {L('+€20/licence', '+€20/άδεια')}</span></span><span className="cd-conn"><Icon name="Check" size={12} /> {L('Active', 'Ενεργό')}</span></div></Panel>
    </div>
  ); };

  return (
    <div className="cd-wrap" aria-label="GO AI CRM — sample dashboard">
      <div className="cd-chrome">
        {['#ff5f57', '#febc2e', '#28c840'].map((x) => <span key={x} style={{ width: 10, height: 10, borderRadius: '50%', background: x }} />)}
        <span className="cd-url"><Icon name="Lock" size={10} /> app.go-ai.gr</span>
      </div>

      <div className="cd-shell">
        <aside className="cd-side">
          <span className="cd-brand"><span className="glass-badge" style={{ width: 26, height: 26, borderRadius: 8 }}><Icon name="Users" size={14} /></span> GO AI CRM</span>
          <nav className="cd-nav">
            {NAV.map((g) => (
              <div key={tr(g.group)} className="cd-navgroup">
                <span className="cd-navlabel">{tr(g.group)}</span>
                {g.items.map((n) => (
                  <button key={n.view} type="button" onClick={() => setView(n.view)} className="cd-navitem" data-active={view === n.view ? '1' : undefined}><Icon name={n.icon} size={16} /> <span>{tr(n.label)}</span></button>
                ))}
              </div>
            ))}
          </nav>
          <span className="cd-side-foot"><Avatar name="GO" size={26} /><span style={{ minWidth: 0 }}><strong style={{ display: 'block', fontSize: 11.5, color: 'var(--ink)' }}>GO AI</strong><span style={{ fontSize: 10, color: 'var(--ink-3)' }}>{L('Owner', 'Ιδιοκτήτης')}</span></span></span>
        </aside>

        <div className="cd-main">
          <div className="cd-top">
            <strong style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>{tr(TITLES[view])}</strong>
            <span className="cd-search"><Icon name="Search" size={13} /> {L('Search…', 'Αναζήτηση…')}</span>
            <span className="cd-new"><Icon name="Plus" size={14} /> {L('New', 'Νέο')}</span>
          </div>
          <div className="cd-view">
            {view === 'dashboard' && renderDashboard()}
            {view === 'pipeline' && renderPipeline()}
            {view === 'contacts' && renderContacts()}
            {view === 'tasks' && renderTasks()}
            {view === 'reports' && renderReports()}
            {view === 'settings' && renderSettings()}
            {view === 'inbox' && <InboxView />}
            {view === 'leads' && <LeadsView />}
            {view === 'calendar' && <CalendarView />}
            {view === 'automations' && <AutomationsView />}
            {view === 'deals' && <DealsView />}
            {view === 'team' && <TeamView />}
          </div>
        </div>

        {profile && (
          <>
            <button type="button" className="cd-ovl" aria-label="Close" onClick={() => setProfileId(null)} />
            <aside className="cd-profile">
              <div className="cd-prof-top"><Avatar name={profile.name} size={44} /><span style={{ flex: 1, minWidth: 0 }}><strong style={{ display: 'block', fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>{profile.name}</strong><span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{profile.biz}</span></span><button type="button" className="cd-prof-x" onClick={() => setProfileId(null)}><Icon name="X" size={16} /></button></div>
              <div className="cd-prof-qa">{QA.map((q) => (<button key={q.icon} type="button" className="cd-prof-qabtn"><Icon name={q.icon} size={15} /><span>{tr(q.t)}</span></button>))}</div>
              <div className="cd-fields">
                <div><Icon name="Mail" size={12} /> <span>{profile.email}</span></div>
                <div><Icon name="Phone" size={12} /> <span>{profile.phone}</span></div>
                <div><Icon name="MapPin" size={12} /> <span>{tr(profile.location)}</span></div>
                <div><Icon name="CircleDot" size={12} /> <span>{stageLabel(profile.stage)} · {tr(PROPOSAL_LABEL[profile.proposal])}</span></div>
                <div><Icon name="Euro" size={12} /> <span>{money(profile.value)} {L('deal', 'συμφωνία')} · {profile.ageDays}d</span></div>
                <div><Icon name="User" size={12} /> <span>{L('Owner', 'Owner')}: {profile.owner}</span></div>
              </div>
              <div className="cd-acts">
                <span className="cd-acts-title">{L('Activity', 'Δραστηριότητα')}</span>
                {profile.acts.map((a, i) => (
                  <div key={i} className="cd-act"><span className="cd-act-ico"><Icon name={ACT_ICON[a.type]} size={12} /></span><span style={{ minWidth: 0 }}><span style={{ display: 'block', fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.4 }}>{tr(a.text)}</span><span style={{ fontSize: 10, color: 'var(--ink-3)' }}>{a.time} {L('ago', 'πριν')}</span></span></div>
                ))}
              </div>
            </aside>
          </>
        )}
      </div>

      <style>{`
        .cd-wrap { position: relative; width: 100%; background: var(--surface); border: 1px solid var(--line-2); border-radius: var(--radius-2xl); box-shadow: var(--shadow-lg); overflow: hidden; }
        .cd-chrome { display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 16px; background: var(--surface-2); border-bottom: 1px solid var(--line); }
        .cd-url { margin-left: 8px; display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 14px; font-size: 11px; font-family: var(--font-mono); color: var(--ink-3); background: var(--surface); border: 1px solid var(--line); border-radius: 999px; }
        .cd-shell { display: grid; grid-template-columns: 210px 1fr; min-height: 560px; }
        .cd-side { border-right: 1px solid var(--line); background: var(--surface-2); padding: 16px 12px; display: flex; flex-direction: column; gap: 12px; }
        .cd-brand { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 800; color: var(--ink); padding: 0 4px 4px; }
        .cd-nav { display: flex; flex-direction: column; gap: 12px; }
        .cd-navgroup { display: flex; flex-direction: column; gap: 2px; }
        .cd-navlabel { font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: var(--ink-3); padding: 0 10px 4px; }
        .cd-navitem { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; border: none; background: none; cursor: pointer; font-size: 12.5px; font-weight: 600; color: var(--ink-2); padding: 8px 10px; border-radius: var(--radius-sm); transition: background .15s ease, color .15s ease; }
        .cd-navitem:hover { background: var(--surface-3); color: var(--ink); }
        .cd-navitem[data-active] { background: var(--brand-soft); color: var(--brand-ink); font-weight: 700; }
        .cd-side-foot { margin-top: auto; display: flex; align-items: center; gap: 8px; padding: 10px 4px 0; border-top: 1px solid var(--line); }
        .cd-main { display: flex; flex-direction: column; min-width: 0; }
        .cd-top { display: flex; align-items: center; gap: 10px; padding: 14px 18px; border-bottom: 1px solid var(--line); }
        .cd-search { flex: 1; max-width: 280px; display: inline-flex; align-items: center; gap: 7px; font-size: 11.5px; color: var(--ink-3); background: var(--surface-2); border: 1px solid var(--line); border-radius: 999px; padding: 7px 12px; }
        .cd-new { margin-left: auto; display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: #fff; background: var(--brand); border-radius: var(--radius-sm); padding: 7px 13px; }
        .cd-view { padding: 18px; min-width: 0; }
        .cd-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
        .cd-kpi { display: flex; align-items: center; gap: 9px; padding: 11px 12px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-md); min-width: 0; }
        .cd-dash { display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; }
        .cd-panel { padding: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: var(--shadow-xs); }
        .cd-panel-h { display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 800; color: var(--ink); }
        .cd-panel-a { font-size: 11px; font-weight: 700; color: var(--brand-ink); }
        .cd-bars { display: flex; align-items: flex-end; gap: 10px; height: 150px; }
        .cd-barcol { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; height: 100%; justify-content: flex-end; }
        .cd-barval { font-size: 9.5px; font-weight: 700; color: var(--ink-3); }
        .cd-bartrack { width: 100%; flex: 1; display: flex; align-items: flex-end; }
        .cd-bar { width: 100%; border-radius: 6px 6px 3px 3px; background: linear-gradient(180deg, var(--brand), var(--brand-strong)); min-height: 6px; }
        .cd-barlbl { font-size: 10px; color: var(--ink-3); font-weight: 600; }
        .cd-feed { display: flex; flex-direction: column; gap: 11px; }
        .cd-feeditem, .cd-act { display: flex; gap: 9px; }
        .cd-act-ico { flex-shrink: 0; width: 24px; height: 24px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; background: var(--brand-soft); color: var(--brand-ink); }
        .cd-stagebars { display: flex; flex-direction: column; gap: 11px; }
        .cd-sb { display: flex; align-items: center; gap: 10px; }
        .cd-sb-l { width: 96px; flex-shrink: 0; font-size: 11.5px; color: var(--ink-2); }
        .cd-sb-track { flex: 1; height: 8px; background: var(--surface-2); border-radius: 999px; overflow: hidden; }
        .cd-sb-fill { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--brand), var(--brand-strong)); }
        .cd-sb-n { width: 16px; text-align: right; font-size: 11.5px; font-weight: 800; color: var(--ink); }
        .cd-minitask { display: flex; align-items: center; gap: 9px; }
        .cd-filters { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
        .cd-fl-ico { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--ink-3); }
        .cd-fchip { border: 1px solid var(--line); background: var(--surface-2); cursor: pointer; font-size: 11px; font-weight: 700; color: var(--ink-2); padding: 4px 11px; border-radius: 999px; }
        .cd-fchip[data-active] { background: var(--brand-soft); color: var(--brand-ink); border-color: var(--brand-line); }
        .cd-board { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .cd-col { display: flex; flex-direction: column; gap: 8px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 8px; transition: background .15s ease, border-color .15s ease; }
        .cd-col[data-over] { background: var(--brand-soft); border-color: var(--brand-line); }
        .cd-col-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 2px 4px; }
        .cd-col-name { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-2); }
        .cd-count { font-size: 10px; font-weight: 700; color: var(--ink-3); background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 0 6px; }
        .cd-col-total { font-size: 11px; font-weight: 800; color: var(--brand-ink); }
        .cd-col-body { display: flex; flex-direction: column; gap: 8px; min-height: 40px; }
        .cd-card { position: relative; cursor: grab; display: block; padding: 9px 10px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-xs); transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease; }
        .cd-card:hover { border-color: var(--line-2); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
        .cd-card[data-active] { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-soft); }
        .cd-cardmeta { display: flex; align-items: center; gap: 12px; margin-top: 7px; }
        .cd-cardmeta span { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; color: var(--ink-3); font-weight: 600; }
        .cd-qa { display: flex; gap: 6px; margin-top: 9px; padding-top: 8px; border-top: 1px dashed var(--line); opacity: 0; max-height: 0; overflow: hidden; transition: opacity .15s ease, max-height .15s ease, margin-top .15s ease, padding-top .15s ease; }
        .cd-card:hover .cd-qa { opacity: 1; max-height: 40px; }
        .cd-qabtn { flex: 1; display: inline-flex; align-items: center; justify-content: center; height: 26px; border-radius: 6px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--brand-ink); cursor: pointer; }
        .cd-qabtn:hover { background: var(--brand-soft); }
        .cd-table { display: flex; flex-direction: column; }
        .cd-tr { display: grid; grid-template-columns: 1fr 120px 90px; align-items: center; gap: 10px; }
        .cd-th { padding: 4px 8px 9px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-3); border-bottom: 1px solid var(--line); }
        .cd-row { width: 100%; text-align: left; cursor: pointer; background: none; border: none; border-bottom: 1px solid var(--line); padding: 10px 8px; transition: background .15s ease; }
        .cd-row:hover { background: var(--surface-2); }
        .cd-row[data-active] { background: var(--brand-soft); }
        .cd-stage { font-size: 10.5px; font-weight: 700; color: var(--ink-2); background: var(--surface-2); border: 1px solid var(--line); border-radius: 999px; padding: 2px 9px; white-space: nowrap; }
        .cd-tasklist { display: flex; flex-direction: column; }
        .cd-task { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; cursor: pointer; background: none; border: none; border-bottom: 1px solid var(--line); padding: 12px 8px; transition: background .15s ease; }
        .cd-task:hover { background: var(--surface-2); }
        .cd-reports, .cd-settings { display: flex; flex-direction: column; gap: 14px; }
        .cd-settings .cd-panel { gap: 10px; }
        .cd-setrow { display: flex; align-items: center; gap: 10px; }
        .cd-conn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px; font-size: 10.5px; font-weight: 800; color: var(--success); background: color-mix(in srgb, var(--success) 12%, transparent); border: 1px solid color-mix(in srgb, var(--success) 28%, transparent); border-radius: 999px; padding: 2px 9px; }
        .cd-ovl { position: absolute; inset: 42px 0 0 0; background: rgba(8,12,24,0.28); border: none; cursor: pointer; z-index: 4; animation: cdFade .18s ease; }
        .cd-profile { position: absolute; top: 42px; right: 0; bottom: 0; width: 340px; max-width: 86%; z-index: 5; background: var(--surface); border-left: 1px solid var(--line-2); box-shadow: var(--shadow-lg); padding: 18px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; animation: cdSlide .2s cubic-bezier(.16,1,.3,1); }
        .cd-prof-top { display: flex; align-items: center; gap: 10px; }
        .cd-prof-x { flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .cd-prof-qa { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        .cd-prof-qabtn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 9px 4px; border-radius: var(--radius-sm); border: 1px solid var(--line); background: var(--surface-2); color: var(--brand-ink); cursor: pointer; font-size: 9.5px; font-weight: 700; transition: background .15s ease; }
        .cd-prof-qabtn:hover { background: var(--brand-soft); border-color: var(--brand-line); }
        .cd-prof-qabtn span { color: var(--ink-2); }
        .cd-fields { display: flex; flex-direction: column; gap: 9px; padding: 12px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .cd-fields div { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--ink-2); }
        .cd-fields div span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cd-fields svg { color: var(--ink-3); flex-shrink: 0; }
        .cd-acts { display: flex; flex-direction: column; gap: 11px; }
        .cd-acts-title { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-3); }
        @keyframes cdSlide { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes cdFade { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 980px) {
          .cd-shell { grid-template-columns: 1fr; min-height: 0; }
          .cd-side { flex-direction: row; align-items: center; gap: 4px; border-right: none; border-bottom: 1px solid var(--line); padding: 8px 10px; overflow-x: auto; }
          .cd-brand, .cd-navlabel, .cd-side-foot { display: none; }
          .cd-nav { flex-direction: row; gap: 4px; }
          .cd-navgroup { flex-direction: row; gap: 4px; }
          .cd-navitem span { display: none; }
          .cd-navitem { padding: 9px; }
          .cd-dash { grid-template-columns: 1fr; }
          .cd-board { grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: 150px; overflow-x: auto; }
          .cd-profile { width: 88%; }
        }
        @media (prefers-reduced-motion: reduce) { .cd-profile, .cd-ovl { animation: none; } }
        @media (max-width: 600px) { .cd-kpis { grid-template-columns: 1fr 1fr; } .cd-search { display: none; } }
      `}</style>
    </div>
  );
}
