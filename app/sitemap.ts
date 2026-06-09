import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/industries', '/portfolio', '/automation', '/contact'];
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
