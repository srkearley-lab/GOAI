import type { Metadata } from 'next';

/* ============================================================
   GO AI — SEO helpers. Single source of truth for per-page
   metadata: canonical URL + Open Graph + Twitter card, with
   consistent site-wide defaults (Greek locale).
   The 1200x630 share image is provided site-wide by
   app/opengraph-image.tsx (file convention) — not set here.
   ============================================================ */
export const SITE_NAME = 'GO AI';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'el_GR',
      url: path,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
