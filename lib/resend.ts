import 'server-only';
/* ============================================================
   GO AI — minimal Resend REST client (no SDK).
   Shared by the team lead-notification email and the prospect
   sample-site email. Returns true only when Resend accepts.
   ============================================================ */

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html: string;
  /** reply_to address (e.g. the lead's email, or the team inbox). */
  replyTo?: string;
  /** Override the default sender; must be on the verified Resend domain. */
  from?: string;
}

/** HTML-escape user-supplied text for safe interpolation into email bodies. */
export function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch] as string));
}

/** Send one email via the Resend REST API. Returns true on accept, false otherwise. */
export async function sendEmail(msg: EmailMessage): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const from = msg.from || process.env.RESEND_FROM || 'GO AI <leads@updates.go-ai.gr>';
  const body: Record<string, unknown> = {
    from,
    to: Array.isArray(msg.to) ? msg.to : [msg.to],
    subject: msg.subject,
    html: msg.html,
  };
  if (msg.replyTo) body.reply_to = msg.replyTo;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    // eslint-disable-next-line no-console
    if (!res.ok) console.warn('[GO AI] Resend send failed:', res.status);
    return res.ok;
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[GO AI] Resend request failed.');
    return false;
  }
}
