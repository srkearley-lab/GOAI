/* ============================================================
   GO AI — WhatsApp link helper.
   Replaces the legacy WHATSAPP='#/contact' placeholder.
   Number from NEXT_PUBLIC_WHATSAPP_NUMBER (digits only).
   Falls back to /contact when unset.
   ============================================================ */
const NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^\d]/g, '');

export function buildWhatsAppLink(text?: string): string {
  if (!NUMBER) return '/contact';
  const base = `https://wa.me/${NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Default WhatsApp href used by chrome/CTAs. */
export const WHATSAPP = buildWhatsAppLink();
