/* GO AI — /admin/[id]: one lead in full (brief, generation, event timeline). */
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession, ADMIN_COOKIE } from '@/lib/adminAuth';
import { fetchLead } from '@/lib/adminData';
import { StatusChip, fmtDate, estimate } from '../ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'GO AI — Admin · Lead',
  robots: { index: false, follow: false },
};

function Row({ k, v }: { k: string; v?: string }) {
  if (!v) return null;
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
      <span style={{ width: 110, flexShrink: 0, fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)' }}>{k}</span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', wordBreak: 'break-word' }}>{v}</span>
    </div>
  );
}

export default async function AdminLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authed = verifySession((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!authed) redirect('/admin');

  const lead = await fetchLead(id);
  if (lead === null) redirect('/admin');
  if (!lead) {
    return (
      <main style={{ padding: '120px 0 64px' }}>
        <div className="container"><div className="card" style={{ padding: 'var(--space-6)' }}>Lead not found. <Link href="/admin" style={{ color: 'var(--brand-ink)', fontWeight: 600 }}>Back to dashboard</Link></div></div>
      </main>
    );
  }
  const g = lead.generation;

  return (
    <main style={{ padding: '110px 0 64px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 900 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link href="/admin" style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', fontWeight: 600 }}>‹ All leads</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{lead.businessName || '(no name)'}</h1>
            <StatusChip status={g?.status} />
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>Received {fmtDate(lead.createdAt)} · id {lead.id}</span>
        </div>

        <div className="adm-grid">
          {/* Lead brief */}
          <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--ink)' }}>Lead</h2>
            <Row k="Contact" v={[lead.firstName, lead.lastName].filter(Boolean).join(' ')} />
            <Row k="Email" v={lead.email} />
            <Row k="WhatsApp" v={lead.phoneWhatsapp} />
            <Row k="Type" v={lead.businessType} />
            <Row k="Location" v={lead.location} />
            <Row k="Language" v={lead.language} />
            <Row k="Existing site" v={lead.existingWebsiteUrl} />
            <Row k="Needs" v={lead.needsHelp} />
            <Row k="Message" v={lead.message} />
            <Row k="Estimate" v={estimate(lead)} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {lead.items.length
                ? lead.items.map((i) => <span key={i.id} className="chip chip-brand chip-mini">{i.label}</span>)
                : <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>No services selected — wants a recommendation.</span>}
            </div>
          </div>

          {/* Generation */}
          <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--ink)' }}>Sample build</h2>
            {!g ? (
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>No generation was queued for this lead (agent disabled at the time).</p>
            ) : (
              <>
                <Row k="Status" v={g.status} />
                <Row k="Proposal" v={g.proposalSent ? `emailed ${fmtDate(g.proposalSentAt)}` : 'not sent'} />
                <Row k="Updated" v={fmtDate(g.updatedAt)} />
                {g.error && <Row k="Error" v={g.error} />}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                  {g.sampleUrl && <a className="btn btn-primary" style={{ padding: '9px 18px', fontSize: 14 }} href={g.sampleUrl} target="_blank" rel="noreferrer">Open sample ↗</a>}
                  {g.repoUrl && <a className="btn btn-ghost" style={{ padding: '9px 18px', fontSize: 14 }} href={g.repoUrl} target="_blank" rel="noreferrer">GitHub repo ↗</a>}
                </div>
                {g.events.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <h3 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: 10 }}>Agent timeline</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {g.events.map((e, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, position: 'relative', paddingBottom: i === g.events.length - 1 ? 0 : 14 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 10, flexShrink: 0 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)', marginTop: 5 }} />
                            {i < g.events.length - 1 && <span style={{ flex: 1, width: 2, background: 'var(--line-2)', marginTop: 2 }} />}
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', lineHeight: 1.45 }}>{e.message}</div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{fmtDate(e.at)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .adm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); align-items: start; }
        @media (max-width: 820px) { .adm-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
