import { icons } from 'lucide-react';
import type { CSSProperties } from 'react';

export interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/** Map legacy Lucide-UMD names to current lucide-react names where they differ. */
const ALIASES: Record<string, string> = {
  Home: 'House',
  BarChart3: 'ChartColumn',
  Layout: 'PanelsTopLeft',
  LineChart: 'ChartLine',
  // renamed circle icons in newer lucide-react
  AlertCircle: 'CircleAlert',
  CheckCircle: 'CircleCheck',
  CheckCircle2: 'CircleCheckBig',
};

/**
 * Preserves the legacy `<Icon name="Rocket" size stroke color />` string-name API
 * (data files store icon names as strings) on top of lucide-react.
 */
export function Icon({ name, size = 20, stroke = 2, color, style, className }: IconProps) {
  const key = (ALIASES[name] || name) as keyof typeof icons;
  const Cmp = icons[key];

  if (!Cmp) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[Icon] Unknown lucide icon name: "${name}"`);
    }
    return (
      <svg width={size} height={size} aria-hidden="true" style={{ ...style, color, flexShrink: 0, display: 'block' }} />
    );
  }

  return (
    <Cmp
      size={size}
      strokeWidth={stroke}
      aria-hidden="true"
      className={className}
      style={{ ...style, color, flexShrink: 0, display: 'block' }}
    />
  );
}
