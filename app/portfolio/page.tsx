import { pageMeta } from '@/lib/seo';
import PortfolioView from './PortfolioView';

export const metadata = pageMeta({
  title: 'Δείγματα εργασιών & demo ιστοσελίδες',
  description: 'Demo ιστοσελίδες και έργα για επιχειρήσεις σε όλη την Ελλάδα — δείτε παραδείγματα του σχεδιασμού, των ιστοσελίδων και των αυτοματισμών μας.',
  path: '/portfolio',
});

export default function Page() {
  return <PortfolioView />;
}
