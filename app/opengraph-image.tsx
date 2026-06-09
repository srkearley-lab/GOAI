import { ImageResponse } from 'next/og';

/* Site-wide 1200x630 share card, generated at build (no binary asset needed).
   Applies to og:image + (via twitter-image re-export) twitter:image on every route. */
export const alt = 'GO AI — AI-powered websites & automation for businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px',
          background: 'linear-gradient(135deg, #0b0b14 0%, #1b1740 55%, #4f46e5 145%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', color: '#c7c9ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 14, background: '#4f46e5', fontSize: 30, fontWeight: 900, color: '#ffffff' }}>G</div>
          GO AI
        </div>
        <div style={{ display: 'flex', marginTop: 38, fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 940 }}>
          AI-powered websites &amp; automation for businesses
        </div>
        <div style={{ display: 'flex', marginTop: 30, fontSize: 31, color: '#b9bce0', maxWidth: 900 }}>
          Websites, WhatsApp bots &amp; email flows — live in days.
        </div>
      </div>
    ),
    { ...size },
  );
}
