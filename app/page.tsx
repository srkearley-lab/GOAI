import { pageMeta } from '@/lib/seo';
import HomeView from './HomeView';

export const metadata = pageMeta({
  title: 'GO AI — Ιστοσελίδες & Αυτοματισμοί AI για επιχειρήσεις',
  description: 'Premium ιστοσελίδες, WhatsApp bots και email αυτοματισμοί για επιχειρήσεις στην Ελλάδα — έτοιμα σε λίγες ημέρες. Διαχειριστείτε τα πάντα από το κινητό σας.',
  path: '/',
  absoluteTitle: true,
});

export default function Page() {
  return <HomeView />;
}
