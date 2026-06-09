import './globals.css';
import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/lib/theme';
import { AppProvider } from '@/lib/store';
import { Navbar } from '@/components/chrome/Navbar';
import { Footer } from '@/components/chrome/Footer';
import { AIAssistant } from '@/components/assistant/AIAssistant';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'GO AI — AI-powered websites & automation for businesses in Greece',
    template: '%s · GO AI',
  },
  description:
    'From beautiful websites to WhatsApp bots and email flows — we build your entire digital presence in under 7 days. You manage everything from your phone.',
  icons: { icon: '/favicon.svg' },
  // The site has its own EN/GR switcher; disable browser auto-translation,
  // which mutates the DOM and crashes React (insertBefore NotFoundError).
  other: { google: 'notranslate' },
};

// Pre-paint: apply persisted theme/accent before hydration to avoid FOUC.
const THEME_SCRIPT = `(function(){try{var r=localStorage.getItem('goai_tweaks');if(!r)return;var t=JSON.parse(r);var R=document.documentElement;var d=!!t.dark;R.setAttribute('data-theme',d?'dark':'light');var A={indigo:{brand:'#4f46e5',strong:'#4338ca',inkDark:'#a5abff'},blue:{brand:'#1f6fd6',strong:'#195bb0',inkDark:'#8fb8f5'},emerald:{brand:'#0f9d6b',strong:'#0c7f56',inkDark:'#5fe0a6'},violet:{brand:'#7c3aed',strong:'#6d28d9',inkDark:'#c4a6fb'}};var a=A[t.accent]||A.indigo;R.style.setProperty('--brand',a.brand);R.style.setProperty('--brand-strong',a.strong);R.style.setProperty('--brand-soft','color-mix(in srgb, '+a.brand+' '+(d?'18%':'10%')+', transparent)');R.style.setProperty('--brand-line','color-mix(in srgb, '+a.brand+' '+(d?'34%':'26%')+', transparent)');R.style.setProperty('--brand-ink',d?a.inkDark:a.brand);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" translate="no" className={fontVariables} data-theme="light" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <ThemeProvider>
          <AppProvider>
            <Navbar />
            {children}
            <Footer />
            <AIAssistant />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
