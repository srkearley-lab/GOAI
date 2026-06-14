import { Link } from '@/components/ui/Link';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} aria-label="GO AI home"
      style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg viewBox="0 0 900 340" role="img" aria-label="GO AI" style={{ height: 30, width: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="goaiGrad" x1="125" y1="170" x2="615" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3B34F0" />
            <stop offset="0.5" stopColor="#5B34E6" />
            <stop offset="1" stopColor="#9B2EE0" />
          </linearGradient>
        </defs>
        <g stroke="url(#goaiGrad)" strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="485" cy="170" r="130" />
          <path d="M329.6 63.5 A130 130 0 1 1 277.6 42" />
          <path d="M196 186 L292 176" strokeWidth={31} />
        </g>
        <g stroke="var(--ink)" strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M672 298 L723 62 L774 298" />
          <path d="M842 62 L842 298" />
        </g>
      </svg>
    </Link>
  );
}
