import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  // Only allow indexing on the real production host. When NEXT_PUBLIC_SITE_URL is
  // unset (local) or this is a Vercel preview deploy, disallow everything so
  // non-production hosts are never indexed.
  const isProd = !!process.env.NEXT_PUBLIC_SITE_URL && process.env.VERCEL_ENV !== 'preview';
  if (!isProd) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
