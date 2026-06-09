/* ============================================================
   GO AI — Service category route: /services/[category]
   Server wrapper (static params + per-category metadata) →
   delegates to the client ServiceCategoryView for i18n.
   ============================================================ */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICE_CATEGORIES, isCategorySlug, CATEGORY_SLUGS } from '@/data/serviceCategories';
import { ServiceCategoryView } from '@/components/services/ServiceCategoryView';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = SERVICE_CATEGORIES[category];
  if (!c) return {};
  return { title: c.seoTitle.EN, description: c.seoDesc.EN };
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();
  return <ServiceCategoryView slug={category} />;
}
