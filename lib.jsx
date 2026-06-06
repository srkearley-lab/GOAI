/* ============================================================
   GO AI — shared lib: Icon, routing, primitives, reveal
   Exposes everything on window for cross-file <script> sharing.
   ============================================================ */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------- Icon (Lucide UMD) ---------- */
const SVG_ATTRS = {
  xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
};
function toReactAttrs(a = {}) {
  const map = { 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray',
    'fill-rule': 'fillRule', 'clip-rule': 'clipRule' };
  const out = {};
  for (const k in a) out[map[k] || k] = a[k];
  return out;
}
function renderNode(node, key) {
  if (!Array.isArray(node)) return null;
  const [tag, attrs, children] = node;
  if (tag === 'svg') return (children || []).map((c, i) => renderNode(c, i));
  const kids = Array.isArray(children) ? children.map((c, i) => renderNode(c, i)) : null;
  return React.createElement(tag, { key, ...toReactAttrs(attrs) }, kids);
}
function Icon({ name, size = 20, stroke = 2, color, style, className }) {
  const lib = window.lucide;
  const data = lib && lib.icons ? (lib.icons[name] || lib.icons[name + 'Icon']) : null;
  let children = null;
  if (Array.isArray(data)) {
    children = data[0] === 'svg' ? renderNode(data) : data.map((n, i) => renderNode(n, i));
  }
  return React.createElement('svg', {
    ...SVG_ATTRS, width: size, height: size, strokeWidth: stroke,
    style: { ...style, color, flexShrink: 0, display: 'block' }, className,
    'aria-hidden': true,
  }, children);
}

/* ---------- Routing (hash) ---------- */
function useHashRoute() {
  const [path, setPath] = useState(() => window.location.hash.replace(/^#/, '') || '/');
  useEffect(() => {
    const on = () => { setPath(window.location.hash.replace(/^#/, '') || '/'); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
}
function navigate(to) {
  const cur = window.location.hash.replace(/^#/, '');
  if (cur !== to) window.location.hash = to;
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
function Link({ to, children, className, style, onClick, ...rest }) {
  return (
    <a href={'#' + to} className={className} style={style}
       onClick={(e) => { e.preventDefault(); onClick && onClick(e); navigate(to); }} {...rest}>
      {children}
    </a>
  );
}

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, as = 'div', delay = 0, className = '', style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
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
  }, []);
  // Transform-only reveal — opacity stays 1 so content is always visible.
  const animStyle = animate
    ? { transform: shown ? 'none' : 'translateY(16px)', transition: 'transform .6s cubic-bezier(.16,1,.3,1)' }
    : {};
  return React.createElement(as, { ref, className: ('reveal ' + className).trim(), style: { ...animStyle, ...style }, ...rest }, children);
}

/* ---------- Primitives ---------- */
function Eyebrow({ children, tone = 'brand', dot = false, style }) {
  return (
    <span className={'eyebrow ' + (tone === 'gold' ? 'gold' : tone === 'muted' ? 'muted' : '')} style={style}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

function Button({ to, href, variant = 'primary', size = 'md', icon, iconRight, children, onClick, className = '', style }) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''} ${className}`.trim();
  const inner = (
    <>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 15 : 17} />}
    </>
  );
  if (to) return <Link to={to} className={cls} style={style} onClick={onClick}>{inner}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls} style={style} onClick={onClick}>{inner}</a>;
  return <button className={cls} style={style} onClick={onClick}>{inner}</button>;
}

function SectionHeader({ tag, title, description, align = 'center', tone = 'brand' }) {
  return (
    <Reveal className={'section-head ' + (align === 'center' ? 'center' : '')}>
      {tag && <Eyebrow tone={tone} dot>{tag}</Eyebrow>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

/* Section wrapper with rhythm + optional alt background */
function Section({ children, bg, className = '', style, id, wide = false }) {
  const bgMap = {
    base: 'var(--bg)', surface: 'var(--surface)', alt: 'var(--surface-2)',
    accent: 'var(--surface-accent)', ink: 'var(--ink)',
  };
  return (
    <section id={id} className={className}
      style={{ padding: 'var(--section-y) 0', background: bg ? (bgMap[bg] || bg) : undefined, ...style }}>
      <div className={wide ? 'container-wide' : 'container'}>{children}</div>
    </section>
  );
}

/* WhatsApp placeholder link target */
const WHATSAPP = '#/contact';

Object.assign(window, {
  useState, useEffect, useRef, useMemo, useCallback,
  Icon, useHashRoute, navigate, Link, Reveal,
  Eyebrow, Button, SectionHeader, Section, WHATSAPP,
});
