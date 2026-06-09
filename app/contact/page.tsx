import { pageMeta } from '@/lib/seo';
import ContactView from './ContactView';

export const metadata = pageMeta({
  title: 'Ζητήστε πρόταση',
  description: 'Πείτε μας τι χρειάζεστε και θα ετοιμάσουμε μια εξατομικευμένη πρόταση για ιστοσελίδα, αυτοματισμούς και ανάπτυξη — σε λίγα απλά βήματα.',
  path: '/contact',
});

export default function Page() {
  return <ContactView />;
}
