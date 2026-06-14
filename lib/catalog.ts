/* ============================================================
   GO AI — service CATALOG (single source of truth)
   Launch pricing. Groups: website | digital | automation | support
   unit: 'oneoff' | 'month'
   Loaded BEFORE store.jsx.
   ============================================================ */

import type { CatalogItem, Group, Bilingual, IconName, Lang } from '@/types';
import { T } from '@/lib/i18n';

export const CATALOG: Record<string, CatalogItem> = {
  /* ---------------- WEBSITES (one-off) — 3 packages ---------------- */
  'basic-launch-website': { group: 'website', icon: 'Rocket', amount: 450, recurring: false, unit: 'oneoff',
    label: { EN: 'Starter Website', GR: 'Starter Ιστοσελίδα' }, price: { EN: 'From €450 one-off', GR: 'Από €450 εφάπαξ' },
    best: { EN: 'Small local businesses, cafés, salons, trades and early-stage businesses', GR: 'Μικρές τοπικές επιχειρήσεις, καφέ, κομμωτήρια, μάστορες και νέες επιχειρήσεις' },
    desc: { EN: 'A clean, professional website for small businesses that need to get online quickly and look credible.', GR: 'Μια καθαρή, επαγγελματική ιστοσελίδα για μικρές επιχειρήσεις που θέλουν να μπουν online γρήγορα και αξιόπιστα.' } },
  'business-website': { group: 'website', icon: 'LayoutTemplate', amount: 750, recurring: false, unit: 'oneoff', popular: true,
    label: { EN: 'Business Website', GR: 'Business Ιστοσελίδα' }, price: { EN: 'From €750 one-off', GR: 'Από €750 εφάπαξ' },
    best: { EN: 'Villas, restaurants, gyms, clinics, tourism businesses and growing local businesses', GR: 'Βίλες, εστιατόρια, γυμναστήρια, κλινικές, τουριστικές και αναπτυσσόμενες τοπικές επιχειρήσεις' },
    desc: { EN: 'A stronger business website with better structure, more content sections, an enquiry flow, and room to add automation or marketing support.', GR: 'Μια πιο δυνατή επαγγελματική ιστοσελίδα με καλύτερη δομή, περισσότερες ενότητες, ροή αιτημάτων και χώρο για αυτοματισμούς ή marketing.' } },
  'premium-ai-website': { group: 'website', icon: 'Sparkles', amount: 1500, recurring: false, unit: 'oneoff',
    label: { EN: 'Premium AI-Ready Website', GR: 'Premium AI-Ready Ιστοσελίδα' }, price: { EN: 'From €1,500+ one-off', GR: 'Από €1.500+ εφάπαξ' },
    best: { EN: 'Businesses that want a higher-end website, AI automation, proposal journeys and WhatsApp flows', GR: 'Επιχειρήσεις που θέλουν premium ιστοσελίδα, AI αυτοματισμούς, διαδρομές προτάσεων και ροές WhatsApp' },
    desc: { EN: 'A more advanced website with premium design, a stronger customer journey, AI assistant support and automation-ready sections for scalable growth.', GR: 'Μια πιο προηγμένη ιστοσελίδα με premium σχεδιασμό, ισχυρότερη διαδρομή πελάτη, υποστήριξη AI βοηθού και έτοιμες ενότητες αυτοματισμού για κλιμακούμενη ανάπτυξη.' } },

  /* ---------------- DIGITAL SERVICES ---------------- */
  'landing-page': { group: 'digital', icon: 'FileText', amount: 100, recurring: false, unit: 'oneoff',
    label: { EN: 'Landing Page Design', GR: 'Σχεδιασμός Landing Page' }, price: { EN: 'From €100 one-off', GR: 'Από €100 εφάπαξ' },
    best: { EN: 'Offers, bookings & seasonal campaigns', GR: 'Προσφορές, κρατήσεις & εποχικές καμπάνιες' },
    desc: { EN: 'A focused single page for a specific offer, booking push or lead-generation campaign.', GR: 'Μία εστιασμένη σελίδα για συγκεκριμένη προσφορά, κράτηση ή καμπάνια lead generation.' } },
  'extra-page': { group: 'digital', icon: 'Plus', amount: 75, recurring: false, unit: 'oneoff',
    label: { EN: 'Extra Website Page', GR: 'Επιπλέον Σελίδα' }, price: { EN: 'From €75 one-off', GR: 'Από €75 εφάπαξ' },
    best: { EN: 'Adding pages to an existing site', GR: 'Προσθήκη σελίδων σε υπάρχον site' },
    desc: { EN: 'An additional designed and written page added to your website.', GR: 'Μια επιπλέον σχεδιασμένη και γραμμένη σελίδα στο site σας.' } },
  'brand-identity': { group: 'digital', icon: 'Palette', amount: 150, recurring: false, unit: 'oneoff',
    label: { EN: 'Brand Identity Starter Pack', GR: 'Brand Identity Starter Pack' }, price: { EN: 'From €150 one-off', GR: 'Από €150 εφάπαξ' },
    best: { EN: 'New businesses & rebrands', GR: 'Νέες επιχειρήσεις & rebranding' },
    desc: { EN: 'Logo, colours, typography and visual direction to look more professional.', GR: 'Λογότυπο, χρώματα, τυπογραφία και οπτική κατεύθυνση για πιο επαγγελματική εικόνα.' } },
  'local-seo': { group: 'digital', icon: 'Search', amount: 40, recurring: true, unit: 'month',
    label: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, price: { EN: 'From €40/month', GR: 'Από €40/μήνα' },
    best: { EN: 'All local businesses', GR: 'Όλες οι τοπικές επιχειρήσεις' },
    desc: { EN: 'Improve your visibility for local and location-based searches across Google.', GR: 'Βελτιώνει την προβολή σας σε τοπικές αναζητήσεις στο Google.' } },
  'gbp-support': { group: 'digital', icon: 'MapPin', amount: 30, recurring: true, unit: 'month',
    label: { EN: 'Google Business Profile Support', GR: 'Υποστήριξη Google Business Profile' }, price: { EN: 'From €30/month', GR: 'Από €30/μήνα' },
    best: { EN: 'Restaurants, cafés, salons, gyms', GR: 'Εστιατόρια, καφετέριες, κομμωτήρια, γυμναστήρια' },
    desc: { EN: 'Keep your Google profile optimised with photos, posts and up-to-date info.', GR: 'Κρατά το προφίλ Google βελτιστοποιημένο με φωτογραφίες, posts και ενημερωμένες πληροφορίες.' } },
  'google-ads': { group: 'digital', icon: 'MousePointerClick', amount: 100, recurring: true, unit: 'month',
    label: { EN: 'Local Google Ads Management', GR: 'Διαχείριση Τοπικών Google Ads' }, price: { EN: 'From €100/month', GR: 'Από €100/μήνα' },
    best: { EN: 'Tourism, car & boat hire, villas', GR: 'Τουρισμός, ενοικιάσεις αυτοκινήτων & σκαφών, βίλες' },
    desc: { EN: 'Set up and manage local campaigns that drive enquiries, bookings and calls. Ad spend not included.', GR: 'Στήσιμο και διαχείριση τοπικών καμπανιών για αιτήματα, κρατήσεις και κλήσεις. Δεν περιλαμβάνεται διαφημιστική δαπάνη.' } },
  'social-video': { group: 'digital', icon: 'Video', amount: 75, recurring: true, unit: 'month',
    label: { EN: 'Social / Video Content Support', GR: 'Υποστήριξη Social / Video Περιεχομένου' }, price: { EN: 'From €75/month', GR: 'Από €75/μήνα' },
    best: { EN: 'Restaurants, salons, tourism, villas', GR: 'Εστιατόρια, κομμωτήρια, τουρισμός, βίλες' },
    desc: { EN: 'Scripted, edited short-form videos and social content posted for you.', GR: 'Σύντομα βίντεο με σενάριο και μοντάζ και περιεχόμενο social, δημοσιευμένα για εσάς.' } },
  'analytics-reporting': { group: 'digital', icon: 'BarChart3', amount: 40, recurring: true, unit: 'month',
    label: { EN: 'Analytics & Reporting', GR: 'Analytics & Αναφορές' }, price: { EN: 'From €40/month', GR: 'Από €40/μήνα' },
    best: { EN: 'All industries', GR: 'Όλοι οι κλάδοι' },
    desc: { EN: 'Track visits, enquiries and conversions so you can see what is working.', GR: 'Παρακολουθεί επισκέψεις, αιτήματα και μετατροπές για να βλέπετε τι αποδίδει.' } },

  /* ---------------- AI AUTOMATION (monthly) ---------------- */
  'whatsapp-automation': { group: 'automation', icon: 'MessageSquare', amount: 50, recurring: true, unit: 'month',
    label: { EN: 'WhatsApp Automation', GR: 'WhatsApp Αυτοματισμός' }, price: { EN: 'From €50/month', GR: 'Από €50/μήνα' },
    best: { EN: 'Villas, restaurants, salons, gyms, tourism', GR: 'Βίλες, εστιατόρια, κομμωτήρια, γυμναστήρια, τουρισμός' },
    desc: { EN: 'Structured WhatsApp enquiry flows, pre-filled messages, quick replies and lead capture.', GR: 'Δομημένες ροές αιτημάτων WhatsApp, προ-συμπληρωμένα μηνύματα, γρήγορες απαντήσεις και λήψη leads.' } },
  'ai-chatbot': { group: 'automation', icon: 'Bot', amount: 75, recurring: true, unit: 'month',
    label: { EN: 'AI Chatbot', GR: 'AI Chatbot' }, price: { EN: 'From €75/month', GR: 'Από €75/μήνα' },
    best: { EN: 'Villas, restaurants, gyms, tourism', GR: 'Βίλες, εστιατόρια, γυμναστήρια, τουρισμός' },
    desc: { EN: 'Guide visitors, answer common questions and push them to WhatsApp, booking or proposal.', GR: 'Καθοδηγεί επισκέπτες, απαντά σε ερωτήσεις και τους οδηγεί σε WhatsApp, κράτηση ή πρόταση.' } },
  'ai-proposal-generation': { group: 'automation', icon: 'FileText', amount: 75, recurring: true, unit: 'month',
    label: { EN: 'AI Proposal Generation', GR: 'Δημιουργία AI Προτάσεων' }, price: { EN: 'From €75/month', GR: 'Από €75/μήνα' },
    best: { EN: 'Tourism, villas, boat & car hire', GR: 'Τουρισμός, βίλες, ενοικιάσεις σκαφών & αυτοκινήτων' },
    desc: { EN: 'Automatically create tailored proposals from selected services and customer answers.', GR: 'Αυτόματη δημιουργία εξατομικευμένων προτάσεων από επιλεγμένες υπηρεσίες και απαντήσεις πελάτη.' } },
  'email-automation': { group: 'automation', icon: 'Mail', amount: 50, recurring: true, unit: 'month',
    label: { EN: 'Email Automation', GR: 'Email Αυτοματισμός' }, price: { EN: 'From €50/month', GR: 'Από €50/μήνα' },
    best: { EN: 'Villas, gyms, salons, tourism', GR: 'Βίλες, γυμναστήρια, κομμωτήρια, τουρισμός' },
    desc: { EN: 'Automate follow-ups, enquiry confirmations, reminders and nurture emails.', GR: 'Αυτοματοποιεί follow-up, επιβεβαιώσεις αιτημάτων, υπενθυμίσεις και emails καλλιέργειας.' } },
  'simple-automation': { group: 'automation', icon: 'Workflow', amount: 50, recurring: true, unit: 'month',
    label: { EN: 'Simple Business Automation', GR: 'Απλός Επιχειρηματικός Αυτοματισμός' }, price: { EN: 'From €50/month', GR: 'Από €50/μήνα' },
    best: { EN: 'Any business with manual admin', GR: 'Κάθε επιχείρηση με χειροκίνητο admin' },
    desc: { EN: 'Connect forms, emails and WhatsApp enquiries so you stop copying and chasing information.', GR: 'Συνδέει φόρμες, emails και αιτήματα WhatsApp ώστε να σταματήσετε την αντιγραφή και το κυνήγι πληροφοριών.' } },
  'ai-customer-journey': { group: 'automation', icon: 'Route', amount: 75, recurring: true, unit: 'month',
    label: { EN: 'AI Customer Journey', GR: 'AI Διαδρομή Πελάτη' }, price: { EN: 'From €75/month', GR: 'Από €75/μήνα' },
    best: { EN: 'Businesses wanting end-to-end flow', GR: 'Επιχειρήσεις που θέλουν ολοκληρωμένη ροή' },
    desc: { EN: 'A smarter journey from website visit to enquiry, proposal, follow-up and conversion.', GR: 'Μια εξυπνότερη διαδρομή από την επίσκεψη στο site έως το αίτημα, την πρόταση, το follow-up και τη μετατροπή.' } },
  'crm-platform': { group: 'automation', icon: 'Users', amount: 50, recurring: true, unit: 'month',
    label: { EN: 'CRM Platform', GR: 'Πλατφόρμα CRM' }, price: { EN: 'From €50/month', GR: 'Από €50/μήνα' },
    best: { EN: 'Any local business juggling leads across WhatsApp, calls and email', GR: 'Κάθε τοπική επιχείρηση που διαχειρίζεται leads σε WhatsApp, κλήσεις και email' },
    desc: { EN: 'A simple CRM that keeps every lead, customer and deal in one place — so nothing slips through the cracks. Flat €50/month.', GR: 'Ένα απλό CRM που κρατά κάθε lead, πελάτη και συμφωνία σε ένα σημείο — για να μη χάνεται τίποτα. Σταθερά €50/μήνα.' } },

  /* ---------------- SUPPORT & GROWTH ---------------- */
  'hosting-care': { group: 'support', icon: 'ShieldCheck', amount: 20, recurring: true, unit: 'month',
    label: { EN: 'Hosting & Website Care', GR: 'Φιλοξενία & Συντήρηση' }, price: { EN: '€20/month', GR: '€20/μήνα' },
    best: { EN: 'Most businesses', GR: 'Οι περισσότερες επιχειρήσεις' },
    desc: { EN: 'Hosting, security, backups and basic updates fully managed for you.', GR: 'Φιλοξενία, ασφάλεια, backups και βασικές ενημερώσεις, πλήρως διαχειριζόμενα.' } },
  'extra-storage': { group: 'support', icon: 'Database', amount: 10, recurring: true, unit: 'month',
    label: { EN: 'Extra Storage', GR: 'Επιπλέον Αποθηκευτικός Χώρος' }, price: { EN: '€10/month', GR: '€10/μήνα' },
    best: { EN: 'Image & media-heavy sites', GR: 'Sites με πολλές εικόνες & media' },
    desc: { EN: 'Additional storage for media-rich websites and galleries.', GR: 'Επιπλέον χώρος για sites με πολλά media και gallery.' } },
  'priority-updates': { group: 'support', icon: 'Zap', amount: 25, recurring: true, unit: 'month',
    label: { EN: 'Priority Updates', GR: 'Ενημερώσεις Προτεραιότητας' }, price: { EN: '€25/month', GR: '€25/μήνα' },
    best: { EN: 'Businesses that change often', GR: 'Επιχειρήσεις με συχνές αλλαγές' },
    desc: { EN: 'Faster turnaround on website content changes and requests.', GR: 'Ταχύτερη εξυπηρέτηση σε αλλαγές και αιτήματα περιεχομένου.' } },
  'content-refresh': { group: 'support', icon: 'PenLine', amount: 40, recurring: true, unit: 'month',
    label: { EN: 'Monthly Content Refresh', GR: 'Μηνιαία Ανανέωση Περιεχομένου' }, price: { EN: '€40/month', GR: '€40/μήνα' },
    best: { EN: 'Seasonal & active businesses', GR: 'Εποχικές & ενεργές επιχειρήσεις' },
    desc: { EN: 'Regular content updates to keep your website current and relevant.', GR: 'Τακτικές ενημερώσεις για να μένει το site σας επίκαιρο.' } },
  'website-health-check': { group: 'support', icon: 'Activity', amount: 40, recurring: false, unit: 'oneoff',
    label: { EN: 'Website Health Check', GR: 'Έλεγχος Υγείας Ιστοσελίδας' }, price: { EN: '€40 one-off', GR: '€40 εφάπαξ' },
    best: { EN: 'Existing websites', GR: 'Υπάρχουσες ιστοσελίδες' },
    desc: { EN: 'A full review of speed, SEO and conversion with clear recommendations.', GR: 'Πλήρης έλεγχος ταχύτητας, SEO και μετατροπών με ξεκάθαρες προτάσεις.' } },
  'domain-connection': { group: 'support', icon: 'Globe', amount: 30, recurring: false, unit: 'oneoff',
    label: { EN: 'Domain Connection', GR: 'Σύνδεση Domain' }, price: { EN: 'From €30 one-off', GR: 'Από €30 εφάπαξ' },
    best: { EN: 'New website launches', GR: 'Νέες εκκινήσεις ιστοσελίδων' },
    desc: { EN: 'Connect and configure your domain correctly with your new website.', GR: 'Σύνδεση και σωστή ρύθμιση του domain σας με το νέο site.' } },
  'business-email': { group: 'support', icon: 'AtSign', amount: 40, recurring: false, unit: 'oneoff',
    label: { EN: 'Business Email Setup', GR: 'Στήσιμο Επαγγελματικού Email' }, price: { EN: 'From €40 one-off', GR: 'Από €40 εφάπαξ' },
    best: { EN: 'Professional communication', GR: 'Επαγγελματική επικοινωνία' },
    desc: { EN: 'Set up professional business email on your own domain.', GR: 'Στήσιμο επαγγελματικού email στο δικό σας domain.' } },
  'tracking-setup': { group: 'support', icon: 'LineChart', amount: 40, recurring: false, unit: 'oneoff',
    label: { EN: 'Tracking Setup', GR: 'Στήσιμο Tracking' }, price: { EN: 'From €40 one-off', GR: 'Από €40 εφάπαξ' },
    best: { EN: 'Businesses running ads', GR: 'Επιχειρήσεις που τρέχουν διαφημίσεις' },
    desc: { EN: 'Analytics and conversion tracking set up so every enquiry is measured.', GR: 'Στήσιμο analytics και conversion tracking ώστε να μετριέται κάθε αίτημα.' } },
};

export const NOT_SURE = 'not-sure';

export const GROUP_ORDER: Group[] = ['website', 'digital', 'automation', 'support'];
export const GROUPS: Record<Group, string[]> = { website: [], digital: [], automation: [], support: [] };
Object.keys(CATALOG).forEach((id) => { GROUPS[CATALOG[id].group].push(id); });

export const GROUP_TITLES: Record<Group, Bilingual> = {
  website:    { EN: 'Website Design & Build', GR: 'Σχεδιασμός & Κατασκευή Ιστοσελίδων' },
  digital:    { EN: 'Digital Services', GR: 'Ψηφιακές Υπηρεσίες' },
  automation: { EN: 'AI Automation', GR: 'AI Αυτοματισμοί' },
  support:    { EN: 'Support & Growth', GR: 'Υποστήριξη & Ανάπτυξη' },
};
export const GROUP_ICONS: Record<Group, IconName> = { website: 'Layout', digital: 'LayoutTemplate', automation: 'Bot', support: 'ShieldCheck' };

/* optional feature lists for "See more" */
export const FEATURES: Record<string, { EN: string[]; GR: string[] }> = {
  'basic-launch-website': { EN: ['Professional one/multi-page site', 'Mobile responsive design', 'Contact form or WhatsApp CTA', 'Basic SEO setup'], GR: ['Επαγγελματικό site', 'Responsive σχεδιασμός', 'Φόρμα ή WhatsApp CTA', 'Βασικό SEO'] },
  'business-website': { EN: ['Multi-page structure', 'Lead / enquiry flow', 'FAQ & content sections', 'Improved SEO structure', 'Automation-ready'], GR: ['Δομή πολλών σελίδων', 'Ροή αιτημάτων', 'FAQ & ενότητες περιεχομένου', 'Βελτιωμένο SEO', 'Έτοιμο για αυτοματισμούς'] },
  'premium-ai-website': { EN: ['Premium custom design', 'Stronger customer journey', 'AI assistant support', 'Automation-ready sections', 'Scalable growth setup'], GR: ['Premium custom σχεδιασμός', 'Ισχυρότερη διαδρομή πελάτη', 'Υποστήριξη AI βοηθού', 'Έτοιμες ενότητες αυτοματισμού', 'Κλιμακούμενη ανάπτυξη'] },
  'whatsapp-automation': { EN: ['WhatsApp click-to-chat setup', 'Pre-filled enquiry messages', 'Customer question flow', 'Basic automated replies', 'Lead capture and handover', 'Booking / proposal routing'], GR: ['Στήσιμο click-to-chat WhatsApp', 'Προ-συμπληρωμένα μηνύματα', 'Ροή ερωτήσεων πελάτη', 'Βασικές αυτόματες απαντήσεις', 'Λήψη & παράδοση leads', 'Δρομολόγηση κράτησης / πρότασης'] },
  'ai-chatbot': { EN: ['Website chatbot', 'FAQ handling', 'Lead qualification', 'Service recommendation', 'WhatsApp / email handover', 'Booking enquiry support'], GR: ['Chatbot ιστοσελίδας', 'Διαχείριση FAQ', 'Αξιολόγηση leads', 'Πρόταση υπηρεσιών', 'Παράδοση σε WhatsApp / email', 'Υποστήριξη αιτημάτων κράτησης'] },
  'ai-proposal-generation': { EN: ['Auto-generated proposals', 'Personalised per client', 'Pricing table included', 'Sent via WhatsApp or email'], GR: ['Αυτόματες προτάσεις', 'Εξατομίκευση ανά πελάτη', 'Πίνακας τιμών', 'Αποστολή μέσω WhatsApp ή email'] },
  'email-automation': { EN: ['Welcome sequence', 'Follow-ups & reminders', 'Review requests', 'Newsletter template'], GR: ['Ακολουθία καλωσορίσματος', 'Follow-up & υπενθυμίσεις', 'Αιτήματα αξιολόγησης', 'Πρότυπο newsletter'] },
  'local-seo': { EN: ['Google Business optimisation', 'Local keyword targeting', 'Technical SEO', 'Monthly reporting'], GR: ['Βελτιστοποίηση Google Business', 'Στόχευση τοπικών λέξεων', 'Τεχνικό SEO', 'Μηνιαία αναφορά'] },
  'hosting-care': { EN: ['Reliable hosting', 'Security & backups', 'Basic updates', 'Managed for you'], GR: ['Αξιόπιστη φιλοξενία', 'Ασφάλεια & backups', 'Βασικές ενημερώσεις', 'Διαχείριση από εμάς'] },

  /* ---- digital ---- */
  'landing-page': { EN: ['One focused, conversion-optimised page', 'Strong headline and call-to-action', 'Enquiry or booking form', 'Fast load on mobile'], GR: ['Μία εστιασμένη σελίδα για μετατροπές', 'Δυνατός τίτλος και call-to-action', 'Φόρμα αιτήματος ή κράτησης', 'Γρήγορη φόρτωση σε κινητά'] },
  'extra-page': { EN: ['Designed to match your site', 'Written, on-brand copy', 'Mobile responsive', 'SEO basics included'], GR: ['Σχεδιασμός στο ύφος του site σας', 'Γραμμένο, on-brand κείμενο', 'Responsive σε κινητά', 'Βασικό SEO'] },
  'brand-identity': { EN: ['Logo design (3 concepts)', 'Colour palette & typography', 'Social media profile kit', 'Brand guidelines PDF'], GR: ['Σχεδιασμός λογότυπου (3 προτάσεις)', 'Παλέτα χρωμάτων & τυπογραφία', 'Kit προφίλ social media', 'Brand guidelines σε PDF'] },
  'gbp-support': { EN: ['Profile setup & optimisation', 'Regular posts & photos', 'Up-to-date hours & info', 'Review monitoring'], GR: ['Στήσιμο & βελτιστοποίηση προφίλ', 'Τακτικά posts & φωτογραφίες', 'Ενημερωμένες ώρες & πληροφορίες', 'Παρακολούθηση κριτικών'] },
  'google-ads': { EN: ['Campaign strategy & setup', 'Keyword research & ad copy', 'Conversion tracking setup', 'Weekly optimisation', 'Monthly performance report'], GR: ['Στρατηγική & στήσιμο καμπάνιας', 'Έρευνα λέξεων & κείμενα διαφημίσεων', 'Στήσιμο conversion tracking', 'Εβδομαδιαία βελτιστοποίηση', 'Μηνιαία αναφορά απόδοσης'] },
  'social-video': { EN: ['Scripted by our team', 'Professional editing', 'Subtitles in English & Greek', 'Optimised 9:16 and 1:1', 'Posted and scheduled for you'], GR: ['Σενάριο από την ομάδα μας', 'Επαγγελματικό μοντάζ', 'Υπότιτλοι στα Αγγλικά & Ελληνικά', 'Βελτιστοποίηση 9:16 και 1:1', 'Δημοσίευση & προγραμματισμός'] },
  'analytics-reporting': { EN: ['Google Analytics 4 setup', 'Monthly PDF report', 'Visitor source breakdown', 'Enquiry tracking', 'Action recommendations'], GR: ['Στήσιμο Google Analytics 4', 'Μηνιαία αναφορά σε PDF', 'Ανάλυση πηγών επισκεπτών', 'Παρακολούθηση αιτημάτων', 'Προτάσεις ενεργειών'] },

  /* ---- automation ---- */
  'simple-automation': { EN: ['Connect forms, email & WhatsApp', 'Auto-route new enquiries', 'No more manual copy-paste', 'No-code, managed for you'], GR: ['Σύνδεση φορμών, email & WhatsApp', 'Αυτόματη δρομολόγηση αιτημάτων', 'Τέλος στο χειροκίνητο copy-paste', 'No-code, διαχείριση από εμάς'] },
  'ai-customer-journey': { EN: ['Visit → enquiry → proposal flow', 'Automated follow-ups', 'WhatsApp & email touchpoints', 'End-to-end conversion tracking'], GR: ['Ροή επίσκεψη → αίτημα → πρόταση', 'Αυτόματα follow-up', 'Σημεία επαφής WhatsApp & email', 'Παρακολούθηση μετατροπών end-to-end'] },
  'crm-platform': { EN: ['Every lead & contact in one place', 'Simple visual deal pipeline', 'WhatsApp & email history per contact', 'Reminders & follow-up tasks', 'Works on phone & desktop', 'Flat €50/month — unlimited team'], GR: ['Κάθε lead & επαφή σε ένα σημείο', 'Απλό οπτικό pipeline συμφωνιών', 'Ιστορικό WhatsApp & email ανά επαφή', 'Υπενθυμίσεις & εργασίες follow-up', 'Λειτουργεί σε κινητό & desktop', 'Σταθερά €50/μήνα — απεριόριστη ομάδα'] },

  /* ---- support & growth ---- */
  'extra-storage': { EN: ['Additional media storage', 'For galleries & video', 'Fast delivery (CDN)', 'Scales as you grow'], GR: ['Επιπλέον χώρος για media', 'Για gallery & βίντεο', 'Γρήγορη παράδοση (CDN)', 'Κλιμακώνεται με την ανάπτυξη'] },
  'priority-updates': { EN: ['Faster turnaround on changes', 'Priority request queue', 'Content & image updates', 'Ongoing support'], GR: ['Ταχύτερη εξυπηρέτηση αλλαγών', 'Προτεραιότητα στα αιτήματα', 'Ενημερώσεις περιεχομένου & εικόνων', 'Συνεχής υποστήριξη'] },
  'content-refresh': { EN: ['Regular content updates', 'Seasonal banners & offers', 'New photos & sections', 'Keeps your site current'], GR: ['Τακτικές ενημερώσεις περιεχομένου', 'Εποχικά banners & προσφορές', 'Νέες φωτογραφίες & ενότητες', 'Κρατά το site σας επίκαιρο'] },
  'website-health-check': { EN: ['Speed & performance review', 'SEO audit', 'Conversion review', 'Clear, prioritised recommendations'], GR: ['Έλεγχος ταχύτητας & απόδοσης', 'Έλεγχος SEO', 'Έλεγχος μετατροπών', 'Ξεκάθαρες, ιεραρχημένες προτάσεις'] },
  'domain-connection': { EN: ['Domain connected correctly', 'DNS configured', 'SSL / HTTPS enabled', 'www & redirects set up'], GR: ['Σωστή σύνδεση domain', 'Ρύθμιση DNS', 'Ενεργοποίηση SSL / HTTPS', 'Ρύθμιση www & ανακατευθύνσεων'] },
  'business-email': { EN: ['Professional email on your domain', 'Setup on all your devices', 'Spam protection', 'Up to 3 mailboxes'], GR: ['Επαγγελματικό email στο domain σας', 'Στήσιμο σε όλες τις συσκευές σας', 'Προστασία spam', 'Έως 3 λογαριασμοί'] },
  'tracking-setup': { EN: ['Analytics installed', 'Conversion & event tracking', 'Form & call tracking', 'Ad pixels configured'], GR: ['Εγκατάσταση analytics', 'Παρακολούθηση μετατροπών & events', 'Tracking φορμών & κλήσεων', 'Ρύθμιση ad pixels'] },
};
export function catFeatures(id: string, lang: Lang): string[] | null { const f = FEATURES[id]; return f ? (f[lang] || f.EN) : null; }

export function cat(id: string): CatalogItem | null { return CATALOG[id] || null; }
export function catLabel(id: string, lang: Lang): string { if (id === NOT_SURE) { const ns = T[lang] && T[lang].not_sure; return typeof ns === 'string' ? ns : 'Not sure yet'; } const c = CATALOG[id]; return c ? c.label[lang] : id; }
export function catPrice(id: string, lang: Lang): string { const c = CATALOG[id]; return c ? c.price[lang] : ''; }
export function catAmount(id: string): number { const c = CATALOG[id]; return c ? c.amount : 0; }
export function catRecurring(id: string): boolean { const c = CATALOG[id]; return c ? !!c.recurring : false; }
