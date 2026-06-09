import { pageMeta } from '@/lib/seo';
import ServicesView from './ServicesView';

export const metadata = pageMeta({
  title: 'Ιστοσελίδες, Ψηφιακές Υπηρεσίες & Αυτοματισμοί',
  description: 'Σχεδιασμός & κατασκευή ιστοσελίδων, ψηφιακές υπηρεσίες, AI αυτοματισμοί και υποστήριξη — όλα όσα χρειάζεται η επιχείρησή σας για να αναπτυχθεί online.',
  path: '/services',
});

export default function Page() {
  return <ServicesView />;
}
