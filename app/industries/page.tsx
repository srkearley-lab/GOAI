import { pageMeta } from '@/lib/seo';
import IndustriesView from './IndustriesView';

export const metadata = pageMeta({
  title: 'Κλάδοι που εξυπηρετούμε',
  description: 'Εξειδικευμένες λύσεις ιστοσελίδων & αυτοματισμών για βίλες, εστιατόρια, γυμναστήρια, καφετέριες, κομμωτήρια και τουριστικές επιχειρήσεις στην Ελλάδα.',
  path: '/industries',
});

export default function Page() {
  return <IndustriesView />;
}
