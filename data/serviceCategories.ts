/* ============================================================
   GO AI — service CATEGORY pages content model (bilingual).
   Drives /services/[category] (websites · digital · automation · support).
   The per-service detail (price, description, checklist, best-for) comes
   from the catalog (lib/catalog.ts) — this file only frames each category.
   ============================================================ */
import type { Bilingual, Group, IconName } from '@/types';

export interface CategoryWhyPoint {
  icon: IconName;
  title: Bilingual;
  body: Bilingual;
}

export interface ServiceCategoryContent {
  /** maps the (plural) URL slug to its catalog Group */
  group: Group;
  icon: IconName;
  eyebrow: Bilingual;
  headline: Bilingual;
  intro: Bilingual;
  whyPoints: CategoryWhyPoint[];
  /** optional richer paragraph per catalog id (falls back to cat(id).desc) */
  longDesc?: Record<string, Bilingual>;
  seoTitle: Bilingual;
  seoDesc: Bilingual;
}

export const SERVICE_CATEGORIES: Record<string, ServiceCategoryContent> = {
  websites: {
    group: 'website',
    icon: 'Layout',
    eyebrow: { EN: 'Websites', GR: 'Ιστοσελίδες' },
    headline: { EN: 'Websites that turn visitors into bookings', GR: 'Ιστοσελίδες που μετατρέπουν επισκέπτες σε κρατήσεις' },
    intro: {
      EN: 'Your website is the foundation of everything GO AI builds. Fast, mobile-first and designed to convert — launched in days, not months, and ready to grow with automation and marketing.',
      GR: 'Η ιστοσελίδα σας είναι το θεμέλιο όλων όσων φτιάχνει η GO AI. Γρήγορη, mobile-first και σχεδιασμένη να μετατρέπει — online σε ημέρες, όχι μήνες, και έτοιμη να μεγαλώσει με αυτοματισμούς και marketing.',
    },
    whyPoints: [
      { icon: 'Zap', title: { EN: 'Live in 7 days', GR: 'Online σε 7 ημέρες' }, body: { EN: 'No long timelines or meetings — your site goes live within a week.', GR: 'Χωρίς μεγάλα χρονοδιαγράμματα ή συναντήσεις — online μέσα σε μία εβδομάδα.' } },
      { icon: 'Smartphone', title: { EN: 'Mobile-first', GR: 'Mobile-first' }, body: { EN: 'Designed for the phone first, where your customers actually are.', GR: 'Σχεδιασμένη πρώτα για το κινητό, εκεί που βρίσκονται οι πελάτες σας.' } },
      { icon: 'TrendingUp', title: { EN: 'Built to convert', GR: 'Φτιαγμένη να μετατρέπει' }, body: { EN: 'Clear journeys and CTAs that turn visits into enquiries and bookings.', GR: 'Ξεκάθαρες διαδρομές και CTA που φέρνουν αιτήματα και κρατήσεις.' } },
    ],
    seoTitle: { EN: 'Website Design & Build', GR: 'Σχεδιασμός & Κατασκευή Ιστοσελίδων' },
    seoDesc: { EN: 'Fast, mobile-first websites for Greek local businesses — launched in 7 days and built to convert.', GR: 'Γρήγορες, mobile-first ιστοσελίδες για ελληνικές τοπικές επιχειρήσεις — online σε 7 ημέρες και φτιαγμένες να μετατρέπουν.' },
  },

  digital: {
    group: 'digital',
    icon: 'LayoutTemplate',
    eyebrow: { EN: 'Digital Services', GR: 'Ψηφιακές Υπηρεσίες' },
    headline: { EN: 'Digital services that get you found and chosen', GR: 'Ψηφιακές υπηρεσίες που σας κάνουν να σας βρίσκουν και να σας επιλέγουν' },
    intro: {
      EN: 'Landing pages, branding, local SEO, Google Ads, social video and reporting — the digital building blocks that bring the right people to your business and keep them coming back.',
      GR: 'Landing pages, branding, τοπικό SEO, Google Ads, social video και αναφορές — τα ψηφιακά δομικά στοιχεία που φέρνουν τους σωστούς ανθρώπους στην επιχείρησή σας και τους κρατούν.',
    },
    whyPoints: [
      { icon: 'Search', title: { EN: 'Get found', GR: 'Σας βρίσκουν' }, body: { EN: 'Rank for local searches and show up where customers look.', GR: 'Ανεβείτε σε τοπικές αναζητήσεις και εμφανιστείτε εκεί που ψάχνουν οι πελάτες.' } },
      { icon: 'MousePointerClick', title: { EN: 'Drive traffic', GR: 'Φέρτε επισκεψιμότητα' }, body: { EN: 'Ads and content that bring ready-to-buy local visitors.', GR: 'Διαφημίσεις και περιεχόμενο που φέρνουν τοπικούς επισκέπτες έτοιμους να αγοράσουν.' } },
      { icon: 'BarChart3', title: { EN: 'See what works', GR: 'Δείτε τι αποδίδει' }, body: { EN: 'Clear monthly reporting in plain language, not jargon.', GR: 'Ξεκάθαρη μηνιαία αναφορά σε απλή γλώσσα, χωρίς ορολογίες.' } },
    ],
    seoTitle: { EN: 'Digital Services', GR: 'Ψηφιακές Υπηρεσίες' },
    seoDesc: { EN: 'Local SEO, Google Ads, branding, landing pages and social video for Greek local businesses.', GR: 'Τοπικό SEO, Google Ads, branding, landing pages και social video για ελληνικές τοπικές επιχειρήσεις.' },
  },

  automation: {
    group: 'automation',
    icon: 'Bot',
    eyebrow: { EN: 'AI Automation', GR: 'AI Αυτοματισμοί' },
    headline: { EN: 'Automation that answers, follows up and books — 24/7', GR: 'Αυτοματισμοί που απαντούν, κάνουν follow-up και κλείνουν κρατήσεις — 24/7' },
    intro: {
      EN: 'Let AI handle the repetitive work. WhatsApp flows, website chatbots, AI proposals and email follow-ups respond instantly and turn enquiries into customers — without adding to your workload.',
      GR: 'Αφήστε το AI να αναλάβει τις επαναλαμβανόμενες εργασίες. Ροές WhatsApp, chatbots ιστοσελίδας, AI προτάσεις και email follow-up απαντούν άμεσα και μετατρέπουν τα αιτήματα σε πελάτες — χωρίς να σας προσθέτουν δουλειά.',
    },
    whyPoints: [
      { icon: 'Clock', title: { EN: 'Always on', GR: 'Πάντα ενεργό' }, body: { EN: 'Reply to every enquiry instantly, day or night.', GR: 'Απαντήστε σε κάθε αίτημα άμεσα, μέρα ή νύχτα.' } },
      { icon: 'MessageSquare', title: { EN: 'On WhatsApp', GR: 'Στο WhatsApp' }, body: { EN: 'Meet customers where they already message you.', GR: 'Συναντήστε τους πελάτες εκεί που ήδη σας γράφουν.' } },
      { icon: 'Workflow', title: { EN: 'Less manual work', GR: 'Λιγότερη χειροκίνητη δουλειά' }, body: { EN: 'Automate follow-ups, proposals and everyday admin.', GR: 'Αυτοματοποιήστε follow-up, προτάσεις και καθημερινό admin.' } },
    ],
    seoTitle: { EN: 'AI Automation', GR: 'AI Αυτοματισμοί' },
    seoDesc: { EN: 'WhatsApp automation, AI chatbots, AI proposals and email flows for Greek local businesses.', GR: 'WhatsApp αυτοματισμοί, AI chatbots, AI προτάσεις και ροές email για ελληνικές τοπικές επιχειρήσεις.' },
  },

  support: {
    group: 'support',
    icon: 'ShieldCheck',
    eyebrow: { EN: 'Support & Growth', GR: 'Υποστήριξη & Ανάπτυξη' },
    headline: { EN: 'Support that keeps you live, secure and growing', GR: 'Υποστήριξη που σας κρατά online, ασφαλείς και σε ανάπτυξη' },
    intro: {
      EN: 'Hosting, security, updates and the technical setup behind a healthy website — fully managed, so your site stays fast and reliable while you focus on the business.',
      GR: 'Φιλοξενία, ασφάλεια, ενημερώσεις και το τεχνικό στήσιμο πίσω από μια υγιή ιστοσελίδα — πλήρως διαχειριζόμενα, ώστε το site σας να μένει γρήγορο και αξιόπιστο ενώ εστιάζετε στην επιχείρηση.',
    },
    whyPoints: [
      { icon: 'ShieldCheck', title: { EN: 'Secure & backed up', GR: 'Ασφαλές & με backups' }, body: { EN: 'Hosting, security and backups handled for you.', GR: 'Φιλοξενία, ασφάλεια και backups, διαχειριζόμενα από εμάς.' } },
      { icon: 'Zap', title: { EN: 'Always up to date', GR: 'Πάντα ενημερωμένο' }, body: { EN: 'Fast updates and content changes whenever you need.', GR: 'Γρήγορες ενημερώσεις και αλλαγές περιεχομένου όποτε χρειάζεστε.' } },
      { icon: 'Activity', title: { EN: 'Healthy & measured', GR: 'Υγιές & μετρήσιμο' }, body: { EN: 'Tracking and health checks so nothing slips.', GR: 'Tracking και έλεγχοι υγείας ώστε τίποτα να μην ξεφεύγει.' } },
    ],
    seoTitle: { EN: 'Support & Growth', GR: 'Υποστήριξη & Ανάπτυξη' },
    seoDesc: { EN: 'Managed hosting, security, updates, tracking and email setup that keep your website healthy.', GR: 'Διαχειριζόμενη φιλοξενία, ασφάλεια, ενημερώσεις, tracking και email που κρατούν το site σας υγιές.' },
  },
};

export type ServiceCategorySlug = keyof typeof SERVICE_CATEGORIES;

export function isCategorySlug(s: string): s is ServiceCategorySlug {
  return Object.prototype.hasOwnProperty.call(SERVICE_CATEGORIES, s);
}

/** URL slugs in display order (matches catalog GROUP_ORDER). */
export const CATEGORY_SLUGS: ServiceCategorySlug[] = ['websites', 'digital', 'automation', 'support'];
