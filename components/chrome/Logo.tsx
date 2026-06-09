import { Link } from '@/components/ui/Link';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} aria-label="GO AI home"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: 'var(--brand)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: 17, letterSpacing: '-0.04em', boxShadow: 'var(--shadow-brand)',
      }}>G</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
        GO<span style={{ color: 'var(--brand-ink)' }}>&nbsp;AI</span>
      </span>
    </Link>
  );
}
