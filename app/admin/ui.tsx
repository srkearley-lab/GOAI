/* GO AI — /admin shared presentational bits (server components). */
import type { AdminLead } from '@/lib/adminData';

export const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  queued: { bg: 'var(--brand-soft)', fg: 'var(--brand-ink)', label: 'Queued' },
  building: { bg: 'var(--brand-soft)', fg: 'var(--brand-strong)', label: 'Building' },
  ready: { bg: '#e7f5ec', fg: 'var(--success)', label: 'Ready' },
  failed: { bg: '#fdecec', fg: '#b91c1c', label: 'Failed' },
  lead: { bg: 'var(--surface-3)', fg: 'var(--ink-3)', label: 'Lead' },
};

export function StatusChip({ status }: { status: string | undefined }) {
  const s = STATUS_STYLE[status || 'lead'] || STATUS_STYLE.lead;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: s.bg, color: s.fg, fontSize: 'var(--text-xs)', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {s.label}
    </span>
  );
}

export function fmtDate(isoStr: string | null | undefined): string {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Athens' });
}

export function estimate(lead: AdminLead): string {
  const parts: string[] = [];
  if (lead.estOneoff) parts.push(`€${lead.estOneoff.toLocaleString('el-GR')}`);
  if (lead.estMonthly) parts.push(`€${lead.estMonthly.toLocaleString('el-GR')}/mo`);
  return parts.join(' + ') || '—';
}
