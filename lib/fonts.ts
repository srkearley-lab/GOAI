import { Manrope, Space_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

// Primary sans / display
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// Alternate display fonts (selectable via the theme tweak)
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// Mono
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const fontVariables = [
  manrope.variable,
  spaceGrotesk.variable,
  instrumentSerif.variable,
  jetbrainsMono.variable,
].join(' ');
