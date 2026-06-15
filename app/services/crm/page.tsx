import { pageMeta } from '@/lib/seo';
import CrmView from './CrmView';

export const metadata = pageMeta({
  title: 'Πλατφόρμα CRM — όλα τα leads σε ένα σημείο',
  description: 'Ένα απλό CRM για τοπικές επιχειρήσεις — κάθε lead, πελάτης και συνομιλία σε ένα σημείο, συνδεδεμένο με WhatsApp & email. Από €350 + €50/μήνα, στημένο σε ημέρες.',
  path: '/services/crm',
});

export default function Page() {
  return <CrmView />;
}
