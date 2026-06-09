import { pageMeta } from '@/lib/seo';
import AutomationView from './AutomationView';

export const metadata = pageMeta({
  title: 'AI Αυτοματισμοί & WhatsApp Bots',
  description: 'Απαντήστε σε κάθε αίτημα άμεσα με WhatsApp bots, email flows και AI αυτοματισμούς. Βάλτε την επιχείρησή σας στον αυτόματο πιλότο — χωρίς κόπο.',
  path: '/automation',
});

export default function Page() {
  return <AutomationView />;
}
