import './globals.css';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/lib/theme';
import { AppProvider } from '@/lib/store';
import { Navbar } from '@/components/chrome/Navbar';
import { Footer } from '@/components/chrome/Footer';
import { ChromeGate } from '@/components/chrome/ChromeGate';
import { AIAssistant } from '@/components/assistant/AIAssistant';

const TITLE_DEFAULT = 'GO AI — Ιστοσελίδες & Αυτοματισμοί AI για επιχειρήσεις';
const DESCRIPTION =
  'Premium ιστοσελίδες, WhatsApp bots και email αυτοματισμοί για επιχειρήσεις στην Ελλάδα — έτοιμα σε λίγες ημέρες. Διαχειριστείτε τα πάντα από το κινητό σας.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE_DEFAULT, template: '%s · GO AI' },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/goai-logo.png',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'el_GR',
    url: '/',
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE_DEFAULT, description: DESCRIPTION },
  // The site has its own EN/GR switcher; disable browser auto-translation,
  // which mutates the DOM and crashes React (insertBefore NotFoundError).
  other: { google: 'notranslate' },
};

// Organization structured data (rich-result / knowledge-panel signals).
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/goai-logo.png`,
  description: DESCRIPTION,
  areaServed: { '@type': 'Country', name: 'Greece' },
  knowsLanguage: ['el', 'en'],
};

// Pre-paint: apply persisted theme/accent before hydration to avoid FOUC.
const THEME_SCRIPT = `(function(){try{var r=localStorage.getItem('goai_tweaks');if(!r)return;var t=JSON.parse(r);var R=document.documentElement;var d=!!t.dark;R.setAttribute('data-theme',d?'dark':'light');var A={indigo:{brand:'#4f46e5',strong:'#4338ca',inkDark:'#a5abff'},blue:{brand:'#1f6fd6',strong:'#195bb0',inkDark:'#8fb8f5'},emerald:{brand:'#0f9d6b',strong:'#0c7f56',inkDark:'#5fe0a6'},violet:{brand:'#7c3aed',strong:'#6d28d9',inkDark:'#c4a6fb'}};var a=A[t.accent]||A.indigo;R.style.setProperty('--brand',a.brand);R.style.setProperty('--brand-strong',a.strong);R.style.setProperty('--brand-soft','color-mix(in srgb, '+a.brand+' '+(d?'18%':'10%')+', transparent)');R.style.setProperty('--brand-line','color-mix(in srgb, '+a.brand+' '+(d?'34%':'26%')+', transparent)');R.style.setProperty('--brand-ink',d?a.inkDark:a.brand);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" translate="no" className={fontVariables} data-theme="light" suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <ThemeProvider>
          <AppProvider>
            <ChromeGate><Navbar /></ChromeGate>
            {children}
            <ChromeGate>
              <Footer />
              <AIAssistant />
            </ChromeGate>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
