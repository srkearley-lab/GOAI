'use client';
import { useState, useEffect } from 'react';

/**
 * Typewriter that cycles a list of words (type → hold → erase → next).
 * SSR-safe: renders words[0] on the server and the first client render,
 * then starts the timer after mount. Honors prefers-reduced-motion.
 *
 * Layout-stable: every candidate word is rendered invisibly, stacked in the
 * same grid cell (.rotor), so the word area is always sized to the tallest
 * option and the animated text overlays it — the headline never reflows
 * (no vertical jump of the page or the showcase beside it).
 */
export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const [text, setText] = useState(words[0] ?? '');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      setAnimate(false);
      return;
    }
    setAnimate(true);

    const TYPE = 75, ERASE = 40, HOLD = 1500, BETWEEN = 260;
    let wordIdx = 0;
    let charIdx = words[0].length; // start fully typed on words[0]
    let phase: 'hold' | 'erase' | 'type' = 'hold';
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === 'hold') {
        phase = 'erase';
        timer = setTimeout(tick, HOLD);
        return;
      }
      if (phase === 'erase') {
        charIdx = Math.max(0, charIdx - 1);
        setText(words[wordIdx].slice(0, charIdx));
        if (charIdx === 0) {
          wordIdx = (wordIdx + 1) % words.length;
          phase = 'type';
          timer = setTimeout(tick, BETWEEN);
        } else {
          timer = setTimeout(tick, ERASE);
        }
        return;
      }
      // type
      const next = words[wordIdx];
      charIdx = Math.min(next.length, charIdx + 1);
      setText(next.slice(0, charIdx));
      if (charIdx === next.length) {
        phase = 'hold';
        timer = setTimeout(tick, HOLD);
      } else {
        timer = setTimeout(tick, TYPE);
      }
    };

    timer = setTimeout(tick, HOLD); // hold words[0], then erase
    return () => clearTimeout(timer);
  }, [words.join('|')]);

  return (
    <span className="rotor">
      {/* invisible sizers reserve the tallest/widest word → no headline reflow */}
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="rotor-ghost">{w}</span>
      ))}
      <span className={'rotor-live' + (className ? ' ' + className : '')}>
        {text}
        {animate && <span aria-hidden="true" className="type-caret">|</span>}
      </span>
    </span>
  );
}
