/* ============================================================
   GO AI — App shell: routing, theme tweaks, panel
   ============================================================ */

const ACCENTS = {
  indigo:  { label: 'Electric Indigo', brand: '#4f46e5', strong: '#4338ca', inkDark: '#a5abff' },
  blue:    { label: 'Aegean Blue',     brand: '#1f6fd6', strong: '#195bb0', inkDark: '#8fb8f5' },
  emerald: { label: 'Emerald',         brand: '#0f9d6b', strong: '#0c7f56', inkDark: '#5fe0a6' },
  violet:  { label: 'Violet',          brand: '#7c3aed', strong: '#6d28d9', inkDark: '#c4a6fb' },
};

const FONTS = {
  Manrope:           { label: 'Manrope',     stack: "'Manrope', sans-serif" },
  'Space Grotesk':   { label: 'Space Grotesk', stack: "'Space Grotesk', sans-serif" },
  'Instrument Serif':{ label: 'Serif display', stack: "'Instrument Serif', Georgia, serif" },
};

const DENSITY = {
  compact: { y: '64px',                    pad: '24px' },
  regular: { y: 'clamp(80px, 9vw, 132px)', pad: '32px' },
  comfy:   { y: 'clamp(108px, 12vw, 168px)', pad: '40px' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "indigo",
  "displayFont": "Manrope",
  "density": "regular",
  "dark": false
}/*EDITMODE-END*/;

const PAGES = {
  '/': Home, '/services': Services, '/industries': Industries,
  '/portfolio': Portfolio, '/automation': Automation, '/contact': Contact, '/journey': Journey,
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const path = useHashRoute();

  useEffect(() => {
    const root = document.documentElement;
    const dark = !!t.dark;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');

    const a = ACCENTS[t.accent] || ACCENTS.indigo;
    root.style.setProperty('--brand', a.brand);
    root.style.setProperty('--brand-strong', a.strong);
    root.style.setProperty('--brand-soft', `color-mix(in srgb, ${a.brand} ${dark ? '18%' : '10%'}, transparent)`);
    root.style.setProperty('--brand-line', `color-mix(in srgb, ${a.brand} ${dark ? '34%' : '26%'}, transparent)`);
    root.style.setProperty('--brand-ink', dark ? a.inkDark : a.brand);

    const f = FONTS[t.displayFont] || FONTS.Manrope;
    root.style.setProperty('--font-display', f.stack);

    const d = DENSITY[t.density] || DENSITY.regular;
    root.style.setProperty('--section-y', d.y);
    root.style.setProperty('--card-pad', d.pad);
  }, [t.accent, t.displayFont, t.density, t.dark]);

  const Page = PAGES[path] || Home;

  return (
    <>
      <Navbar />
      <div key={path} data-screen-label={path === '/' ? 'Home' : path.slice(1)}><Page /></div>
      <Footer />
      <AIAssistant />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={ACCENTS[t.accent].brand}
          options={Object.values(ACCENTS).map((a) => a.brand)}
          onChange={(hex) => {
            const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].brand === hex) || 'indigo';
            setTweak('accent', key);
          }} />
        <TweakSection label="Typography" />
        <TweakRadio label="Headings" value={t.displayFont}
          options={Object.keys(FONTS)} onChange={(v) => setTweak('displayFont', v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
          options={['compact', 'regular', 'comfy']} onChange={(v) => setTweak('density', v)} />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider><App /></AppProvider>
);
