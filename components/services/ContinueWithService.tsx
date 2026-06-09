'use client';
/* ============================================================
   GO AI — "Add to proposal & continue" CTA.
   Replaces the inline Add-to-Proposal toggle on the marketing
   pages: selects the service in the store and deep-links into the
   /contact wizard at the matching step (model: PricingContinue).
   ============================================================ */
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { cat } from '@/lib/catalog';
import type { Group } from '@/types';

/* group → wizard step (components/contact/steps.ts):
   1 website · 2 digital · 3 automation · 4 support */
const GROUP_STEP: Record<Group, number> = { website: 1, digital: 2, automation: 3, support: 4 };

export function ContinueWithService({
  id,
  size = 'lg',
  full = false,
}: {
  id: string;
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
}) {
  const { selectWebsite, addItem, t } = useApp();
  const router = useRouter();

  const go = () => {
    const c = cat(id);
    if (!c) return;
    if (c.group === 'website') selectWebsite(id); // single-select (matches wizard step 1)
    else addItem(id); // idempotent add
    try { localStorage.setItem('goai_cstep', String(GROUP_STEP[c.group])); } catch {}
    router.push('/contact');
  };

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'md' ? '' : 'btn-lg';
  return (
    <button
      onClick={go}
      data-action="continue-with-service"
      data-item={id}
      className={'btn btn-primary ' + sizeClass + (full ? ' full' : '')}
    >
      {t('svc_add_continue')} <Icon name="ArrowRight" size={size === 'sm' ? 15 : 18} />
    </button>
  );
}
