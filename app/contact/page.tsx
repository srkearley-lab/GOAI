'use client';
/* ============================================================
   GO AI — /contact: premium stepped proposal wizard
   (absorbs the old /journey flow) + FAQ.
   ============================================================ */
import { useApp } from '@/lib/store';
import { PageHero } from '@/components/ui/PageHero';
import { ProposalWizard } from '@/components/contact/ProposalWizard';
import { ContactFaq } from '@/components/contact/ContactFaq';

export default function ContactPage() {
  const { t } = useApp();
  return (
    <main>
      <PageHero tag={t('prop_tag')} title={t('prop_title')} description={t('prop_intro')}>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '60ch' }}>{t('prop_support')}</p>
      </PageHero>

      <ProposalWizard />

      <ContactFaq />
    </main>
  );
}
