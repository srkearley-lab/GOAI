import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/services/websites', '/services/digital', '/services/automation', '/services/support', '/services/crm', '/industries', '/portfolio', '/automation', '/contact'];
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
