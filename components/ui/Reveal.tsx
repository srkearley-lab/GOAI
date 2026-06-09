'use client';
import { useRef, useState, useEffect, createElement } from 'react';
import type { CSSProperties, ReactNode, ElementType } from 'react';

interface RevealProps {
  children?: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

/**
 * Scroll-reveal — transform only (never opacity), so content stays visible
 * even before/without animation. SSR-safe: renders content immediately,
 * applies the transform after mount via IntersectionObserver.
 */
export function Reveal({ children, as = 'div', delay = 0, className = '', style, ...rest }: RevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const [shown, setShown] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    let done = false;
    const r = el.getBoundingClientRect();
    if (r.top < (window.innerHeight || 800) * 0.95) { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done) {
          done = true;
          setAnimate(true);
          requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => setShown(true), delay)));
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle: CSSProperties = animate
    ? { transform: shown ? 'none' : 'translateY(16px)', transition: 'transform .6s cubic-bezier(.16,1,.3,1)' }
    : {};

  return createElement(
    as,
    { ref, className: ('reveal ' + className).trim(), style: { ...animStyle, ...style }, ...rest },
    children,
  );
}
