import type { Group } from '@/types';

export interface WizardStep {
  n: number;
  group: Group | null;
  titleKey: string;
  whyKey: string;
  shortKey: string;
  single?: boolean;
}

/**
 * The stepped /contact flow (absorbs the old /journey wizard):
 * 1 Website (single) → 2 Digital → 3 Automation → 4 Support → 5 Review → 6 Details form.
 */
export const WIZARD_STEPS: WizardStep[] = [
  { n: 1, group: 'website',    titleKey: 'j_step1', whyKey: 'j_why1', shortKey: 'j_short1', single: true },
  { n: 2, group: 'digital',    titleKey: 'j_step2', whyKey: 'j_why2', shortKey: 'j_short2', single: false },
  { n: 3, group: 'automation', titleKey: 'j_step3', whyKey: 'j_why3', shortKey: 'j_short3', single: false },
  { n: 4, group: 'support',    titleKey: 'j_step4', whyKey: 'j_why4', shortKey: 'j_short4', single: false },
  { n: 5, group: null,         titleKey: 'j_step5', whyKey: 'j_why5', shortKey: 'j_short5' },
  { n: 6, group: null,         titleKey: 'j_step6', whyKey: 'j_why6', shortKey: 'j_short6' },
];
