'use client';
import NextLink from 'next/link';
import type { ComponentProps } from 'react';

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & { to: string };

/** Thin wrapper preserving the legacy `<Link to="/path">` API on top of next/link. */
export function Link({ to, ...rest }: LinkProps) {
  return <NextLink href={to} {...rest} />;
}
