import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Link } from './Link';
import { Icon } from './Icon';

interface ButtonProps {
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'wa';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconRight?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  onClick,
  className = '',
  style,
}: ButtonProps) {
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
