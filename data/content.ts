/* ============================================================
   GO AI — all site content, bilingual {EN, GR}.  (ported)
   Merged from legacy data.jsx + data2.jsx. Icons by Lucide name.
   ============================================================ */
import type { SiteData } from '@/types';

const DATA: Record<string, unknown> = {};
/* ============================================================
   GO AI — all site content, bilingual {EN, GR}.
   Render via tr() from useApp(). Icons by Lucide name.
   Catalog ids (cid) link cards to the proposal store.
   ============================================================ */
/* ---------------- HOME — services (What we do) ---------------- */
DATA.services = [
  { icon: 'Globe',         to: '/services/websites', title: { EN: 'Websites', GR: 'Ιστοσελίδες' },        description: { EN: 'Fast, mobile-first websites designed to convert visitors into bookings and enquiries — built in under 7 days.', GR: 'Γρήγορες, mobile-first ιστοσελίδες σχεδιασμένες να μετατρέπουν επισκέπτες σε κρατήσεις και αιτήματα — έτοιμες σε λιγότερο από 7 ημέρες.' },
    features: [{ EN: 'Modern & Responsive', GR: 'Σύγχρονες & Responsive' }, { EN: 'Conversion Focused', GR: 'Εστίαση στη μετατροπή' }, { EN: 'SEO Ready', GR: 'Έτοιμες για SEO' }] },
  { icon: 'FileText',      to: '/services/automation', title: { EN: 'AI Proposals', GR: 'AI Προτάσεις' },    description: { EN: 'Professional proposals generated in minutes and sent directly to your clients — personalised, polished, on brand.', GR: 'Επαγγελματικές προτάσεις σε λίγα λεπτά, που στέλνονται απευθείας στους πελάτες σας — εξατομικευμένες και άρτιες.' },
    features: [{ EN: 'AI Proposal Builder', GR: 'Δημιουργός AI Προτάσεων' }, { EN: 'Custom Templates', GR: 'Custom Πρότυπα' }, { EN: 'Instant Delivery', GR: 'Άμεση Παράδοση' }] },
  { icon: 'Search',        to: '/services/digital', title: { EN: 'Local SEO', GR: 'Τοπικό SEO' },         description: { EN: 'Get found on Google by people searching in your area. We handle keywords, schema, maps and monthly reporting.', GR: 'Σας βρίσκουν στο Google οι πελάτες της περιοχής σας. Αναλαμβάνουμε λέξεις-κλειδιά, schema, χάρτες και μηνιαίες αναφορές.' },
    features: [{ EN: 'Google Business Profile', GR: 'Google Business Profile' }, { EN: 'Local Keyword Targeting', GR: 'Στόχευση τοπικών λέξεων' }, { EN: 'Reviews & Reputation', GR: 'Κριτικές & Φήμη' }] },
  { icon: 'Mail',          to: '/services/automation', title: { EN: 'Email Automation', GR: 'Email Αυτοματισμοί' }, description: { EN: 'Welcome flows, follow-up sequences, and seasonal campaigns — all automated so you never miss a lead.', GR: 'Ροές καλωσορίσματος, ακολουθίες follow-up και εποχικές καμπάνιες — όλα αυτόματα, ώστε να μην χάνετε ποτέ ένα lead.' },
    features: [{ EN: 'Automated Workflows', GR: 'Αυτόματες ροές' }, { EN: 'Smart Segmentation', GR: 'Έξυπνη τμηματοποίηση' }, { EN: 'Performance Analytics', GR: 'Αναλύσεις απόδοσης' }] },
  { icon: 'Video',         to: '/services/digital', title: { EN: 'Video Ads', GR: 'Video Διαφημίσεις' }, description: { EN: 'Short-form video content for Instagram and TikTok — scripted, edited and optimised to drive local enquiries.', GR: 'Σύντομα βίντεο για Instagram και TikTok — με σενάριο, μοντάζ και βελτιστοποίηση που φέρνει τοπικά αιτήματα.' },
    features: [{ EN: 'Creative Scripting', GR: 'Δημιουργικό σενάριο' }, { EN: 'Professional Editing', GR: 'Επαγγελματικό μοντάζ' }, { EN: 'Platform Optimisation', GR: 'Βελτιστοποίηση πλατφόρμας' }] },
  { icon: 'MessageCircle', to: '/services/automation', title: { EN: 'WhatsApp Control', GR: 'WhatsApp Control' }, description: { EN: 'Manage bookings, send automated replies and track enquiries — all from your WhatsApp, from anywhere.', GR: 'Διαχειριστείτε κρατήσεις, στείλτε αυτόματες απαντήσεις και παρακολουθήστε αιτήματα — όλα από το WhatsApp σας, από παντού.' },
    features: [{ EN: 'Auto Replies & FAQs', GR: 'Αυτόματες απαντήσεις & FAQ' }, { EN: 'Booking & Reminders', GR: 'Κρατήσεις & Υπενθυμίσεις' }, { EN: 'Enquiry Tracking', GR: 'Παρακολούθηση αιτημάτων' }] },
];

DATA.industriesShort = [
  { icon: 'House',           to: 'villa-rentals', label: { EN: 'Villa Rentals', GR: 'Βίλες' },                       tagline: { EN: 'Direct bookings, fewer middlemen', GR: 'Άμεσες κρατήσεις, λιγότεροι μεσάζοντες' } },
  { icon: 'Dumbbell',        to: 'gyms-fitness',  label: { EN: 'Gyms & Fitness', GR: 'Γυμναστήρια' },                tagline: { EN: 'Fill classes, keep members', GR: 'Γεμάτα μαθήματα, πιστά μέλη' } },
  { icon: 'UtensilsCrossed', to: 'restaurants',   label: { EN: 'Restaurants', GR: 'Εστιατόρια' },                    tagline: { EN: 'Tables booked, reviews up', GR: 'Γεμάτα τραπέζια, καλές κριτικές' } },
  { icon: 'Coffee',          to: 'cafes',         label: { EN: 'Cafés', GR: 'Καφετέριες' },                          tagline: { EN: 'Become the local favourite', GR: 'Γίνετε το αγαπημένο στέκι' } },
  { icon: 'Scissors',        to: 'hair-beauty',   label: { EN: 'Hair & Beauty', GR: 'Κομμωτήρια & Beauty' },         tagline: { EN: 'Full calendar, fewer no-shows', GR: 'Γεμάτο πρόγραμμα, λιγότερες ακυρώσεις' } },
  { icon: 'Map',             to: 'tourism',       label: { EN: 'Tourism Companies', GR: 'Τουριστικές Επιχειρήσεις' }, tagline: { EN: 'More tours, less admin', GR: 'Περισσότερες εκδρομές, λιγότερο admin' } },
  { icon: 'Car',             to: 'car-hire',      label: { EN: 'Car Hire', GR: 'Ενοικιάσεις Αυτοκινήτων' },          tagline: { EN: 'Bookings on autopilot', GR: 'Κρατήσεις στον αυτόματο' } },
  { icon: 'Anchor',          to: 'boat-hire',     label: { EN: 'Boat Hire', GR: 'Ενοικιάσεις Σκαφών' },              tagline: { EN: 'Charters booked seamlessly', GR: 'Ναυλώσεις χωρίς κόπο' } },
];

DATA.steps = [
  { icon: 'MessageSquare', number: 1, title: { EN: 'Tell us about your business', GR: 'Πείτε μας για την επιχείρησή σας' }, description: { EN: "Fill in our short form or message us on WhatsApp. We'll ask a few quick questions about your goals and current setup.", GR: 'Συμπληρώστε τη σύντομη φόρμα ή στείλτε μας μήνυμα στο WhatsApp. Θα κάνουμε λίγες γρήγορες ερωτήσεις για τους στόχους σας.' } },
  { icon: 'Zap',           number: 2, title: { EN: 'We build everything', GR: 'Τα φτιάχνουμε όλα' }, description: { EN: 'Your website, content, SEO and automation flows — done within 7 days. No meetings, no back-and-forth.', GR: 'Ιστοσελίδα, περιεχόμενο, SEO και αυτοματισμοί — έτοιμα σε 7 ημέρες. Χωρίς συναντήσεις, χωρίς καθυστερήσεις.' } },
  { icon: 'MessageCircle', number: 3, title: { EN: 'You manage via WhatsApp', GR: 'Διαχειρίζεστε μέσω WhatsApp' }, description: { EN: 'Control bookings, review reports and request updates directly from your phone. No dashboards to learn.', GR: 'Ελέγξτε κρατήσεις, δείτε αναφορές και ζητήστε αλλαγές απευθείας από το κινητό σας. Χωρίς περίπλοκα dashboards.' } },
];

DATA.packages = [
  { cid: 'basic-launch-website', name: { EN: 'Starter Website', GR: 'Starter Ιστοσελίδα' }, price: { EN: 'From €450', GR: 'Από €450' }, unit: { EN: 'one-off', GR: 'εφάπαξ' }, popular: false, badge: null,
    description: { EN: 'A clean, professional website for small businesses that need to get online quickly and look credible.', GR: 'Μια καθαρή, επαγγελματική ιστοσελίδα για μικρές επιχειρήσεις που θέλουν να μπουν online γρήγορα και αξιόπιστα.' },
    bestFor: { EN: 'Small local businesses, cafés, salons, trades and early-stage businesses.', GR: 'Μικρές τοπικές επιχειρήσεις, καφέ, κομμωτήρια, μάστορες και νέες επιχειρήσεις.' } },
  { cid: 'business-website', name: { EN: 'Business Website', GR: 'Business Ιστοσελίδα' }, price: { EN: 'From €750', GR: 'Από €750' }, unit: { EN: 'one-off', GR: 'εφάπαξ' }, popular: true, badge: { EN: 'Most Popular', GR: 'Πιο Δημοφιλές' },
    description: { EN: 'A stronger business website with better structure, more content sections, an enquiry flow, and room to add automation or marketing support.', GR: 'Μια πιο δυνατή επαγγελματική ιστοσελίδα με καλύτερη δομή, περισσότερες ενότητες, ροή αιτημάτων και χώρο για αυτοματισμούς ή marketing.' },
    bestFor: { EN: 'Villas, restaurants, gyms, clinics, tourism businesses and growing local businesses.', GR: 'Βίλες, εστιατόρια, γυμναστήρια, κλινικές, τουριστικές και αναπτυσσόμενες τοπικές επιχειρήσεις.' } },
  { cid: 'premium-ai-website', name: { EN: 'Premium AI-Ready Website', GR: 'Premium AI-Ready Ιστοσελίδα' }, price: { EN: 'From €1,500+', GR: 'Από €1.500+' }, unit: { EN: 'one-off', GR: 'εφάπαξ' }, popular: false, badge: { EN: 'Premium', GR: 'Premium' },
    description: { EN: 'A more advanced website with premium design, a stronger customer journey, AI assistant support and automation-ready sections for scalable growth.', GR: 'Μια πιο προηγμένη ιστοσελίδα με premium σχεδιασμό, ισχυρότερη διαδρομή πελάτη, υποστήριξη AI βοηθού και έτοιμες ενότητες αυτοματισμού για κλιμακούμενη ανάπτυξη.' },
    bestFor: { EN: 'Businesses that want a higher-end website, AI automation, proposal journeys and WhatsApp flows.', GR: 'Επιχειρήσεις που θέλουν premium ιστοσελίδα, AI αυτοματισμούς, διαδρομές προτάσεων και ροές WhatsApp.' } },
];

DATA.heroProofKeys = ['proof_1', 'proof_2', 'proof_3', 'proof_4'];

/* ---------------- SERVICES — website foundation cards ---------------- */
DATA.websiteCards = [
  { cid: 'basic-launch-website', icon: 'Rocket',
    title: { EN: 'Starter Website', GR: 'Starter Ιστοσελίδα' },
    price: { EN: 'From €450 one-off', GR: 'Από €450 εφάπαξ' },
    description: { EN: 'A clean, professional one-page website for small businesses that need a fast, simple online presence.', GR: 'Μια καθαρή, επαγγελματική one-page ιστοσελίδα για μικρές επιχειρήσεις που χρειάζονται γρήγορη και απλή online παρουσία.' },
    included: [
      { EN: 'One-page website', GR: 'One-page ιστοσελίδα' },
      { EN: 'Mobile responsive design', GR: 'Responsive σχεδιασμός για κινητά' },
      { EN: 'Contact form or WhatsApp CTA', GR: 'Φόρμα επικοινωνίας ή WhatsApp CTA' },
      { EN: 'Basic SEO setup', GR: 'Βασικό στήσιμο SEO' },
      { EN: 'Ideal for new businesses or businesses without a website', GR: 'Ιδανικό για νέες επιχειρήσεις ή χωρίς ιστοσελίδα' },
    ] },
  { cid: 'business-website', icon: 'LayoutTemplate',
    title: { EN: 'Business Website', GR: 'Business Ιστοσελίδα' },
    price: { EN: 'From €750 one-off', GR: 'Από €750 εφάπαξ' },
    description: { EN: 'A more complete website for businesses that need multiple pages, stronger credibility, and a clearer customer journey.', GR: 'Μια πιο ολοκληρωμένη ιστοσελίδα για επιχειρήσεις που χρειάζονται περισσότερες σελίδες, μεγαλύτερη αξιοπιστία και πιο ξεκάθαρη διαδρομή πελάτη.' },
    included: [
      { EN: 'Up to 5 pages', GR: 'Έως 5 σελίδες' },
      { EN: 'Home, Services, About, Contact, and one extra page', GR: 'Αρχική, Υπηρεσίες, Σχετικά, Επικοινωνία και μία επιπλέον σελίδα' },
      { EN: 'Lead form or booking CTA', GR: 'Φόρμα lead ή CTA κράτησης' },
      { EN: 'FAQ section', GR: 'Ενότητα συχνών ερωτήσεων' },
      { EN: 'Improved SEO structure', GR: 'Βελτιωμένη δομή SEO' },
      { EN: 'Better for established businesses that want to generate enquiries', GR: 'Ιδανικό για καθιερωμένες επιχειρήσεις που θέλουν να φέρουν αιτήματα' },
    ] },
];

/* growth service cards (Services page + map to catalog) */
DATA.growthCards = [
  { cid: 'whatsapp-automation', icon: 'MessageSquare', title: { EN: 'WhatsApp Automation', GR: 'WhatsApp Αυτοματισμός' }, description: { EN: 'Structured WhatsApp enquiry flows, quick replies and lead capture.', GR: 'Δομημένες ροές αιτημάτων WhatsApp, γρήγορες απαντήσεις και λήψη leads.' } },
  { cid: 'ai-chatbot', icon: 'Bot', title: { EN: 'AI Chatbot', GR: 'AI Chatbot' }, description: { EN: 'Answer questions and capture leads on your website 24/7.', GR: 'Απαντά σε ερωτήσεις και συλλέγει leads στο site σας 24/7.' } },
  { cid: 'local-seo', icon: 'Search', title: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, description: { EN: 'Rank at the top of Google for searches in your area, with monthly reporting.', GR: 'Ανεβείτε στην κορυφή του Google για αναζητήσεις στην περιοχή σας, με μηνιαία αναφορά.' } },
  { cid: 'email-automation', icon: 'Mail', title: { EN: 'Email Automation', GR: 'Email Αυτοματισμοί' }, description: { EN: 'Automated sequences that nurture leads and drive repeat business — hands-free.', GR: 'Αυτόματες ακολουθίες που καλλιεργούν leads και φέρνουν επαναλαμβανόμενες πωλήσεις — χωρίς κόπο.' } },
  { cid: 'social-video', icon: 'Video', title: { EN: 'Social / Video Content', GR: 'Social / Video Περιεχόμενο' }, description: { EN: 'Scroll-stopping short videos for Instagram and TikTok, scripted and edited for you.', GR: 'Σύντομα βίντεο που τραβούν το βλέμμα για Instagram και TikTok, με σενάριο και μοντάζ από εμάς.' } },
];

/* ---------------- SERVICES — detailed categories ---------------- */
DATA.categories = [
  { label: { EN: 'Digital Presence', GR: 'Ψηφιακή Παρουσία' }, description: { EN: 'We design and build your online foundation — fast, professional, and built to convert.', GR: 'Σχεδιάζουμε και χτίζουμε το online θεμέλιό σας — γρήγορα, επαγγελματικά και με στόχο τη μετατροπή.' },
    services: [
      { icon: 'Globe', title: { EN: 'Website Design & Development', GR: 'Σχεδιασμός & Ανάπτυξη Ιστοσελίδων' }, description: { EN: 'A fast, mobile-first website tailored to your industry. Built in under 7 days and optimised to turn visitors into enquiries and bookings.', GR: 'Μια γρήγορη, mobile-first ιστοσελίδα προσαρμοσμένη στον κλάδο σας. Έτοιμη σε λιγότερο από 7 ημέρες και βελτιστοποιημένη για αιτήματα και κρατήσεις.' },
        included: [
          { EN: 'Custom design — no templates', GR: 'Custom σχεδιασμός — χωρίς έτοιμα templates' },
          { EN: 'Mobile-responsive on all devices', GR: 'Responsive σε όλες τις συσκευές' },
          { EN: 'Contact forms and WhatsApp button', GR: 'Φόρμες επικοινωνίας και κουμπί WhatsApp' },
          { EN: 'Basic on-page SEO setup', GR: 'Βασικό on-page SEO' },
          { EN: 'Google Analytics integration', GR: 'Ενσωμάτωση Google Analytics' },
          { EN: 'Hosting setup and domain connection', GR: 'Στήσιμο hosting και σύνδεση domain' },
        ], bestFor: { EN: ['Villas', 'Restaurants', 'Gyms', 'Salons'], GR: ['Βίλες', 'Εστιατόρια', 'Γυμναστήρια', 'Κομμωτήρια'] } },
      { icon: 'LayoutTemplate', title: { EN: 'Landing Page Design', GR: 'Σχεδιασμός Landing Page' }, description: { EN: 'A single, high-converting page for a specific campaign, season, or offer. Ideal for promotions, events, or driving direct bookings.', GR: 'Μία μοναδική σελίδα υψηλής μετατροπής για συγκεκριμένη καμπάνια, σεζόν ή προσφορά. Ιδανική για προωθήσεις, events ή απευθείας κρατήσεις.' },
        included: [
          { EN: 'One focused, conversion-optimised page', GR: 'Μία εστιασμένη σελίδα βελτιστοποιημένη για μετατροπές' },
          { EN: 'Strong headline and call-to-action', GR: 'Δυνατός τίτλος και call-to-action' },
          { EN: 'Enquiry or booking form', GR: 'Φόρμα αιτήματος ή κράτησης' },
          { EN: 'Integrated with your existing site or standalone', GR: 'Ενσωματωμένη στην ιστοσελίδα σας ή αυτόνομη' },
          { EN: 'Fast load on mobile', GR: 'Γρήγορη φόρτωση σε κινητά' },
        ], bestFor: { EN: ['Tourism', 'Car Hire', 'Boat Hire', 'Cafés'], GR: ['Τουρισμός', 'Ενοικιάσεις Αυτοκινήτων', 'Ενοικιάσεις Σκαφών', 'Καφετέριες'] } },
      { icon: 'Palette', title: { EN: 'Brand Identity', GR: 'Εταιρική Ταυτότητα' }, description: { EN: 'Logo, colours, fonts and brand guidelines — a consistent visual identity your business can use across every channel.', GR: 'Λογότυπο, χρώματα, γραμματοσειρές και brand guidelines — μια συνεπής οπτική ταυτότητα για κάθε κανάλι.' },
        included: [
          { EN: 'Logo design (3 concepts)', GR: 'Σχεδιασμός λογότυπου (3 προτάσεις)' },
          { EN: 'Colour palette and typography system', GR: 'Παλέτα χρωμάτων και σύστημα τυπογραφίας' },
          { EN: 'Business card design', GR: 'Σχεδιασμός επαγγελματικής κάρτας' },
          { EN: 'Social media profile kit', GR: 'Kit προφίλ social media' },
          { EN: 'Brand guidelines PDF', GR: 'Brand guidelines σε PDF' },
        ], bestFor: { EN: ['New businesses', 'Rebrands', 'All industries'], GR: ['Νέες επιχειρήσεις', 'Rebranding', 'Όλοι οι κλάδοι'] } },
    ] },
  { label: { EN: 'Automation', GR: 'Αυτοματισμοί' }, description: { EN: 'Let AI handle the repetitive work — so you can focus on running your business.', GR: 'Αφήστε το AI να αναλάβει τις επαναλαμβανόμενες εργασίες — για να εστιάσετε στην επιχείρησή σας.' },
    services: [
      { icon: 'MessageSquare', title: { EN: 'WhatsApp Automation', GR: 'WhatsApp Αυτοματισμός' }, description: { EN: 'An intelligent WhatsApp bot that replies to enquiries, sends booking confirmations, collects reviews and forwards leads — all automatically, 24/7.', GR: 'Ένα έξυπνο WhatsApp bot που απαντά σε αιτήματα, στέλνει επιβεβαιώσεις κρατήσεων, συλλέγει αξιολογήσεις και προωθεί leads — αυτόματα, 24/7.' },
        included: [
          { EN: 'Automated enquiry responses', GR: 'Αυτόματες απαντήσεις σε αιτήματα' },
          { EN: 'Booking confirmation messages', GR: 'Μηνύματα επιβεβαίωσης κράτησης' },
          { EN: 'Review request sequences', GR: 'Ακολουθίες αιτημάτων αξιολόγησης' },
          { EN: 'Lead routing to your phone', GR: 'Δρομολόγηση leads στο κινητό σας' },
          { EN: 'Seasonal message templates', GR: 'Εποχικά πρότυπα μηνυμάτων' },
          { EN: 'No-code dashboard to update replies', GR: 'No-code dashboard για ενημέρωση απαντήσεων' },
        ], bestFor: { EN: ['Villas', 'Restaurants', 'Salons', 'Tourism'], GR: ['Βίλες', 'Εστιατόρια', 'Κομμωτήρια', 'Τουρισμός'] } },
      { icon: 'Mail', title: { EN: 'Email Automation', GR: 'Email Αυτοματισμός' }, description: { EN: 'Automated email sequences that nurture leads, re-engage past customers and drive repeat business — running continuously without your involvement.', GR: 'Αυτόματες ακολουθίες email που καλλιεργούν leads, επανενεργοποιούν παλιούς πελάτες και φέρνουν επαναλαμβανόμενες πωλήσεις — συνεχώς, χωρίς δική σας εμπλοκή.' },
        included: [
          { EN: 'Welcome and onboarding sequence', GR: 'Ακολουθία καλωσορίσματος και onboarding' },
          { EN: 'Post-visit follow-up and review request', GR: 'Follow-up μετά την επίσκεψη και αίτημα αξιολόγησης' },
          { EN: 'Seasonal offers and promotions', GR: 'Εποχικές προσφορές και προωθήσεις' },
          { EN: 'Abandoned enquiry re-engagement', GR: 'Επανενεργοποίηση εγκαταλελειμμένων αιτημάτων' },
          { EN: 'Monthly newsletter template', GR: 'Πρότυπο μηνιαίου newsletter' },
          { EN: 'Mailchimp or Brevo setup included', GR: 'Στήσιμο σε Mailchimp ή Brevo' },
        ], bestFor: { EN: ['Villas', 'Gyms', 'Salons', 'Tourism'], GR: ['Βίλες', 'Γυμναστήρια', 'Κομμωτήρια', 'Τουρισμός'] } },
      { icon: 'FileText', title: { EN: 'AI Proposal Generation', GR: 'Δημιουργία AI Προτάσεων' }, description: { EN: 'Polished, personalised proposals generated in minutes using AI — and sent directly to your prospects via email or WhatsApp.', GR: 'Άρτιες, εξατομικευμένες προτάσεις σε λίγα λεπτά με AI — που στέλνονται απευθείας στους υποψήφιους πελάτες μέσω email ή WhatsApp.' },
        included: [
          { EN: 'Custom proposal template per industry', GR: 'Custom πρότυπο πρότασης ανά κλάδο' },
          { EN: 'AI-generated personalised content', GR: 'Εξατομικευμένο περιεχόμενο με AI' },
          { EN: 'Pricing table and package options', GR: 'Πίνακας τιμών και επιλογές πακέτων' },
          { EN: 'Digital signature support', GR: 'Υποστήριξη ψηφιακής υπογραφής' },
          { EN: 'Sent via WhatsApp or email', GR: 'Αποστολή μέσω WhatsApp ή email' },
          { EN: 'Follow-up reminder automation', GR: 'Αυτόματες υπενθυμίσεις follow-up' },
        ], bestFor: { EN: ['Tourism', 'Car Hire', 'Boat Hire', 'Villas'], GR: ['Τουρισμός', 'Ενοικιάσεις Αυτοκινήτων', 'Ενοικιάσεις Σκαφών', 'Βίλες'] } },
      { icon: 'Bot', title: { EN: 'AI Chatbot (Website)', GR: 'AI Chatbot (Ιστοσελίδα)' }, description: { EN: 'An intelligent chatbot embedded on your website that answers common questions, qualifies leads and collects visitor details — day and night.', GR: 'Ένα έξυπνο chatbot στην ιστοσελίδα σας που απαντά σε συχνές ερωτήσεις, αξιολογεί leads και συλλέγει στοιχεία επισκεπτών — μέρα και νύχτα.' },
        included: [
          { EN: 'Trained on your business and services', GR: 'Εκπαιδευμένο στην επιχείρηση και τις υπηρεσίες σας' },
          { EN: 'Answers FAQs automatically', GR: 'Απαντά αυτόματα σε συχνές ερωτήσεις' },
          { EN: 'Collects name, email and enquiry', GR: 'Συλλέγει όνομα, email και αίτημα' },
          { EN: 'Sends leads to your WhatsApp instantly', GR: 'Στέλνει leads στο WhatsApp σας άμεσα' },
          { EN: 'Supports English and Greek', GR: 'Υποστηρίζει Αγγλικά και Ελληνικά' },
          { EN: 'Embedded on any page of your site', GR: 'Ενσωματώνεται σε κάθε σελίδα του site σας' },
        ], bestFor: { EN: ['Villas', 'Restaurants', 'Gyms', 'Tourism'], GR: ['Βίλες', 'Εστιατόρια', 'Γυμναστήρια', 'Τουρισμός'] } },
    ] },
  { label: { EN: 'Marketing', GR: 'Marketing' }, description: { EN: 'Get found, drive traffic and convert it into paying customers.', GR: 'Σας βρίσκουν, φέρνουμε επισκεψιμότητα και τη μετατρέπουμε σε πελάτες.' },
    services: [
      { icon: 'Search', title: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, description: { EN: 'Get your business to the top of Google for searches in your area. We handle technical SEO, content, Google Business Profile and monthly reporting.', GR: 'Ανεβάστε την επιχείρησή σας στην κορυφή του Google για τοπικές αναζητήσεις. Αναλαμβάνουμε τεχνικό SEO, περιεχόμενο, Google Business Profile και μηνιαίες αναφορές.' },
        included: [
          { EN: 'Google Business Profile optimisation', GR: 'Βελτιστοποίηση Google Business Profile' },
          { EN: 'Local keyword research and targeting', GR: 'Έρευνα και στόχευση τοπικών λέξεων-κλειδιών' },
          { EN: 'On-page and technical SEO audit', GR: 'Έλεγχος on-page και τεχνικού SEO' },
          { EN: 'Schema markup for local business', GR: 'Schema markup για τοπική επιχείρηση' },
          { EN: 'Monthly ranking and traffic report', GR: 'Μηνιαία αναφορά κατάταξης και επισκεψιμότητας' },
          { EN: 'Competitor gap analysis', GR: 'Ανάλυση ανταγωνισμού' },
        ], bestFor: { EN: ['Restaurants', 'Salons', 'Gyms', 'All local businesses'], GR: ['Εστιατόρια', 'Κομμωτήρια', 'Γυμναστήρια', 'Όλες οι τοπικές επιχειρήσεις'] } },
      { icon: 'MousePointerClick', title: { EN: 'Google Ads Management', GR: 'Διαχείριση Google Ads' }, description: { EN: 'Paid search campaigns that target people actively looking for what you offer in Greece. We set up, run and optimise — you get the leads.', GR: 'Καμπάνιες paid search που στοχεύουν όσους ψάχνουν ενεργά αυτό που προσφέρετε στην Ελλάδα. Στήνουμε, τρέχουμε και βελτιστοποιούμε — εσείς παίρνετε τα leads.' },
        included: [
          { EN: 'Campaign strategy and setup', GR: 'Στρατηγική και στήσιμο καμπάνιας' },
          { EN: 'Keyword research and ad copywriting', GR: 'Έρευνα λέξεων-κλειδιών και κείμενα διαφημίσεων' },
          { EN: 'Landing page recommendation', GR: 'Πρόταση landing page' },
          { EN: 'Conversion tracking setup', GR: 'Στήσιμο conversion tracking' },
          { EN: 'Weekly optimisation', GR: 'Εβδομαδιαία βελτιστοποίηση' },
          { EN: 'Monthly performance report', GR: 'Μηνιαία αναφορά απόδοσης' },
        ], bestFor: { EN: ['Tourism', 'Car Hire', 'Boat Hire', 'Villas'], GR: ['Τουρισμός', 'Ενοικιάσεις Αυτοκινήτων', 'Ενοικιάσεις Σκαφών', 'Βίλες'] } },
      { icon: 'BarChart3', title: { EN: 'Analytics & Reporting', GR: 'Analytics & Αναφορές' }, description: { EN: 'A clear, monthly dashboard showing how your website, SEO and campaigns are performing — in plain language, not jargon.', GR: 'Ένα ξεκάθαρο μηνιαίο dashboard που δείχνει πώς αποδίδουν ιστοσελίδα, SEO και καμπάνιες — σε απλή γλώσσα, χωρίς ορολογίες.' },
        included: [
          { EN: 'Google Analytics 4 setup', GR: 'Στήσιμο Google Analytics 4' },
          { EN: 'Monthly PDF performance report', GR: 'Μηνιαία αναφορά απόδοσης σε PDF' },
          { EN: 'Visitor source breakdown', GR: 'Ανάλυση πηγών επισκεπτών' },
          { EN: 'Top pages and enquiry tracking', GR: 'Κορυφαίες σελίδες και παρακολούθηση αιτημάτων' },
          { EN: 'Competitor traffic benchmarking', GR: 'Σύγκριση επισκεψιμότητας με ανταγωνισμό' },
          { EN: 'Action recommendations each month', GR: 'Προτάσεις ενεργειών κάθε μήνα' },
        ], bestFor: { EN: ['All industries'], GR: ['Όλοι οι κλάδοι'] } },
    ] },
  { label: { EN: 'Content', GR: 'Περιεχόμενο' }, description: { EN: 'Content that builds trust, drives traffic and keeps your brand visible.', GR: 'Περιεχόμενο που χτίζει εμπιστοσύνη, φέρνει επισκεψιμότητα και κρατά το brand σας ορατό.' },
    services: [
      { icon: 'Video', title: { EN: 'Short-Form Video Ads', GR: 'Σύντομες Video Διαφημίσεις' }, description: { EN: 'Professionally edited, scroll-stopping videos for Instagram Reels and TikTok — scripted, subtitled and optimised for your target audience in Greece.', GR: 'Επαγγελματικά βίντεο που τραβούν το βλέμμα για Instagram Reels και TikTok — με σενάριο, υπότιτλους και βελτιστοποίηση για το κοινό σας στην Ελλάδα.' },
        included: [
          { EN: '2 videos per month', GR: '2 βίντεο τον μήνα' },
          { EN: 'Script written by our team', GR: 'Σενάριο από την ομάδα μας' },
          { EN: 'Subtitles in English and Greek', GR: 'Υπότιτλοι στα Αγγλικά και Ελληνικά' },
          { EN: 'Branded intro and outro', GR: 'Branded intro και outro' },
          { EN: 'Optimised aspect ratios (9:16 and 1:1)', GR: 'Βελτιστοποιημένες αναλογίες (9:16 και 1:1)' },
          { EN: 'Posted and scheduled for you', GR: 'Δημοσίευση και προγραμματισμός από εμάς' },
        ], bestFor: { EN: ['Restaurants', 'Salons', 'Tourism', 'Villas'], GR: ['Εστιατόρια', 'Κομμωτήρια', 'Τουρισμός', 'Βίλες'] } },
      { icon: 'PenLine', title: { EN: 'AI Blog & Content Writing', GR: 'AI Blog & Συγγραφή Περιεχομένου' }, description: { EN: "SEO-optimised blog posts and website copy written by AI and edited by our team — building authority, improving rankings and answering your customers' questions.", GR: 'Άρθρα blog και κείμενα ιστοσελίδας βελτιστοποιημένα για SEO, γραμμένα με AI και επιμελημένα από την ομάδα μας — χτίζουν κύρος, βελτιώνουν την κατάταξη και απαντούν στις ερωτήσεις των πελατών σας.' },
        included: [
          { EN: '4 blog posts per month (800–1200 words)', GR: '4 άρθρα blog τον μήνα (800–1200 λέξεις)' },
          { EN: 'Targeted to local search queries', GR: 'Στοχευμένα σε τοπικές αναζητήσεις' },
          { EN: 'Published directly to your website', GR: 'Δημοσίευση απευθείας στην ιστοσελίδα σας' },
          { EN: 'Meta descriptions and headings optimised', GR: 'Βελτιστοποιημένα meta descriptions και τίτλοι' },
          { EN: 'Internal linking strategy', GR: 'Στρατηγική εσωτερικών συνδέσμων' },
          { EN: 'Topic calendar planned one month ahead', GR: 'Ημερολόγιο θεμάτων έναν μήνα μπροστά' },
        ], bestFor: { EN: ['Tourism', 'Villas', 'Restaurants', 'Gyms'], GR: ['Τουρισμός', 'Βίλες', 'Εστιατόρια', 'Γυμναστήρια'] } },
    ] },
];

DATA.diffs = [
  { number: 1, title: { EN: 'Built for Greek businesses specifically', GR: 'Φτιαγμένο ειδικά για ελληνικές επιχειρήσεις' }, body: { EN: 'Every template, automation and copy block is built around how local businesses in Greece operate — tourist seasons, Greek-speaking customers, local search intent and WhatsApp-first communication.', GR: 'Κάθε πρότυπο, αυτοματισμός και κείμενο είναι φτιαγμένο γύρω από τον τρόπο που λειτουργούν οι τοπικές επιχειρήσεις στην Ελλάδα — τουριστικές σεζόν, ελληνόφωνοι πελάτες, τοπικές αναζητήσεις και επικοινωνία με προτεραιότητα στο WhatsApp.' } },
  { number: 2, title: { EN: 'Live in 7 days, managed via WhatsApp', GR: 'Online σε 7 ημέρες, διαχείριση μέσω WhatsApp' }, body: { EN: 'No long project timelines, no dashboards to learn. Your website goes live within a week, and every update, report or request goes through a single WhatsApp message.', GR: 'Χωρίς μεγάλα χρονοδιαγράμματα, χωρίς περίπλοκα dashboards. Η ιστοσελίδα σας βγαίνει online μέσα σε μία εβδομάδα και κάθε ενημέρωση, αναφορά ή αίτημα γίνεται με ένα μήνυμα WhatsApp.' } },
  { number: 3, title: { EN: 'AI-powered at a fraction of the agency cost', GR: 'Με τη δύναμη του AI, στο κλάσμα του κόστους ενός agency' }, body: { EN: 'By using AI to handle writing, design and automation, we deliver the quality of a full-service agency at a price that makes sense for a local business with real margins.', GR: 'Χρησιμοποιώντας AI για κείμενα, σχεδιασμό και αυτοματισμούς, προσφέρουμε ποιότητα full-service agency σε τιμή που βγάζει νόημα για μια τοπική επιχείρηση.' } },
];

/* ============================================================
   GO AI — content part 2 (Industries, Portfolio, Automation,
   Contact), bilingual {EN, GR}. Extends window.DATA.
   ============================================================ */
/* ---------------- INDUSTRIES (detailed) ---------------- */
DATA.industries = [
  { id: 'villa-rentals', icon: 'House', label: { EN: 'Villa Rentals', GR: 'Βίλες' },
    tagline: { EN: 'Turn direct enquiries into confirmed bookings — automatically', GR: 'Μετατρέψτε τα απευθείας αιτήματα σε επιβεβαιωμένες κρατήσεις — αυτόματα' },
    description: { EN: "Villa owners in Greece face a flood of enquiries during peak season across WhatsApp, email and Instagram simultaneously. Bookings slip through the cracks, guests expect instant responses, and most villa websites haven't been updated in years.", GR: 'Οι ιδιοκτήτες βιλών στην Ελλάδα δέχονται καταιγισμό αιτημάτων στην peak σεζόν ταυτόχρονα σε WhatsApp, email και Instagram. Κρατήσεις χάνονται, οι επισκέπτες περιμένουν άμεση απάντηση και οι περισσότερες ιστοσελίδες βιλών δεν έχουν ανανεωθεί εδώ και χρόνια.' },
    painPoint: { EN: '"We get 40 WhatsApp messages a day in July. Half of them never get a proper reply because we\'re busy with guests already staying."', GR: '«Τον Ιούλιο δεχόμαστε 40 μηνύματα WhatsApp την ημέρα. Τα μισά δεν παίρνουν ποτέ σωστή απάντηση γιατί είμαστε απασχολημένοι με τους επισκέπτες που ήδη μένουν.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Booking-ready website', GR: 'Ιστοσελίδα έτοιμη για κρατήσεις' }, detail: { EN: 'Availability calendar, photo gallery, rates and instant enquiry form', GR: 'Ημερολόγιο διαθεσιμότητας, gallery, τιμές και άμεση φόρμα αιτήματος' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp enquiry bot', GR: 'WhatsApp bot αιτημάτων' }, detail: { EN: 'Instant automated responses with pricing and availability 24/7', GR: 'Άμεσες αυτόματες απαντήσεις με τιμές και διαθεσιμότητα 24/7' } },
      { icon: 'Mail', label: { EN: 'Email follow-up sequence', GR: 'Ακολουθία email follow-up' }, detail: { EN: 'Nurture cold enquiries into confirmed bookings automatically', GR: 'Μετατρέπει τα ψυχρά αιτήματα σε κρατήσεις αυτόματα' } },
      { icon: 'FileText', label: { EN: 'AI group booking proposals', GR: 'AI προτάσεις για ομαδικές κρατήσεις' }, detail: { EN: 'Professional proposals for families and corporate groups in minutes', GR: 'Επαγγελματικές προτάσεις για οικογένειες και groups σε λίγα λεπτά' } },
      { icon: 'Search', label: { EN: 'Local SEO for villa searches', GR: 'Τοπικό SEO για αναζητήσεις βιλών' }, detail: { EN: 'Rank for "villa rental Mykonos", "villa Crete with pool" etc.', GR: 'Κατάταξη για «villa rental Mykonos», «βίλα Κρήτη με πισίνα» κ.ά.' } },
      { icon: 'Star', label: { EN: 'Review request automation', GR: 'Αυτοματισμός αιτημάτων αξιολόγησης' }, detail: { EN: 'Post-stay email and WhatsApp sequence to collect 5-star reviews', GR: 'Ακολουθία email και WhatsApp μετά τη διαμονή για 5άστερες αξιολογήσεις' } },
    ] },
  { id: 'gyms-fitness', icon: 'Dumbbell', label: { EN: 'Gyms & Fitness', GR: 'Γυμναστήρια' },
    tagline: { EN: 'Fill every class and keep members coming back', GR: 'Γεμίστε κάθε τμήμα και κρατήστε τα μέλη σας' },
    description: { EN: "Gym owners pour money into Instagram but can't track what converts. Trial memberships start strong then drop off. Members leave quietly and nobody follows up. The front desk is too busy to chase leads manually.", GR: 'Οι ιδιοκτήτες γυμναστηρίων ξοδεύουν στο Instagram αλλά δεν ξέρουν τι αποδίδει. Οι δοκιμαστικές συνδρομές ξεκινούν δυνατά και μετά χάνονται. Τα μέλη φεύγουν αθόρυβα και κανείς δεν κάνει follow-up. Η ρεσεψιόν δεν προλαβαίνει να κυνηγά leads.' },
    painPoint: { EN: '"We sign up 20 trial members a month. Maybe 6 convert to full membership. We never find out why the others left."', GR: '«Γράφουμε 20 δοκιμαστικά μέλη τον μήνα. Ίσως 6 γίνουν κανονικά. Δεν μαθαίνουμε ποτέ γιατί έφυγαν τα υπόλοιπα.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Class schedule website', GR: 'Ιστοσελίδα με πρόγραμμα τμημάτων' }, detail: { EN: 'Live timetable, trainer profiles, membership options and online signup', GR: 'Ζωντανό πρόγραμμα, προφίλ προπονητών, συνδρομές και online εγγραφή' } },
      { icon: 'Mail', label: { EN: 'Trial member nurture flow', GR: 'Ροή για δοκιμαστικά μέλη' }, detail: { EN: 'Automated emails from day 1 through week 4 to convert trials to members', GR: 'Αυτόματα email από την 1η ημέρα έως την 4η εβδομάδα για μετατροπή σε μέλη' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp class reminders', GR: 'Υπενθυμίσεις τμημάτων στο WhatsApp' }, detail: { EN: 'Automated booking confirmations and pre-class reminders via WhatsApp', GR: 'Αυτόματες επιβεβαιώσεις και υπενθυμίσεις πριν το μάθημα μέσω WhatsApp' } },
      { icon: 'Search', label: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, detail: { EN: 'Rank for "gym [city]", "personal trainer [area]", "CrossFit near me"', GR: 'Κατάταξη για «γυμναστήριο [πόλη]», «personal trainer [περιοχή]»' } },
      { icon: 'Video', label: { EN: 'Short-form video ads', GR: 'Σύντομες video διαφημίσεις' }, detail: { EN: 'Instagram and TikTok content showing your gym, classes and results', GR: 'Περιεχόμενο Instagram και TikTok με το γυμναστήριο, τα τμήματα και τα αποτελέσματα' } },
      { icon: 'TrendingUp', label: { EN: 'Monthly performance report', GR: 'Μηνιαία αναφορά απόδοσης' }, detail: { EN: "Track leads, signups, retention and what's working each month", GR: 'Παρακολούθηση leads, εγγραφών, διατήρησης και τι αποδίδει κάθε μήνα' } },
    ] },
  { id: 'restaurants', icon: 'UtensilsCrossed', label: { EN: 'Restaurants', GR: 'Εστιατόρια' },
    tagline: { EN: 'More covers, more reviews, more regulars', GR: 'Περισσότερα τραπέζια, αξιολογήσεις και σταθεροί πελάτες' },
    description: { EN: "Restaurants in Greek tourist areas are fully booked in summer but struggle mid-week and shoulder season. Tourists can't find them on Google. Menus online are outdated. Negative reviews go unanswered.", GR: 'Τα εστιατόρια σε τουριστικές περιοχές γεμίζουν το καλοκαίρι αλλά δυσκολεύονται μεσοβδόμαδα και εκτός σεζόν. Οι τουρίστες δεν τα βρίσκουν στο Google. Τα μενού online είναι ξεπερασμένα. Οι αρνητικές κριτικές μένουν αναπάντητες.' },
    painPoint: { EN: '"We have 40 empty covers on Tuesday nights in May while the tourist traps down the road are full — even though our food is much better."', GR: '«Έχουμε 40 άδεια τραπέζια τις Τρίτες τον Μάιο, ενώ οι τουριστικές παγίδες δίπλα είναι γεμάτες — παρότι το φαγητό μας είναι πολύ καλύτερο.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Restaurant website with menu', GR: 'Ιστοσελίδα εστιατορίου με μενού' }, detail: { EN: 'Digital menu, photo gallery, reservation form and Google Maps integration', GR: 'Ψηφιακό μενού, gallery, φόρμα κράτησης και ενσωμάτωση Google Maps' } },
      { icon: 'Search', label: { EN: 'Google Business optimisation', GR: 'Βελτιστοποίηση Google Business' }, detail: { EN: 'Photos, hours, menu items and keyword-rich description for local search', GR: 'Φωτογραφίες, ώρες, πιάτα και περιγραφή με λέξεις-κλειδιά για τοπικές αναζητήσεις' } },
      { icon: 'Star', label: { EN: 'Review growth automation', GR: 'Αυτοματισμός ανάπτυξης αξιολογήσεων' }, detail: { EN: 'Post-meal WhatsApp message asking happy diners for a Google review', GR: 'Μήνυμα WhatsApp μετά το γεύμα που ζητά αξιολόγηση στο Google' } },
      { icon: 'MessageSquare', label: { EN: 'Reservation confirmation bot', GR: 'Bot επιβεβαίωσης κρατήσεων' }, detail: { EN: 'WhatsApp confirmations, reminders and post-visit follow-up', GR: 'Επιβεβαιώσεις, υπενθυμίσεις και follow-up μέσω WhatsApp' } },
      { icon: 'Mail', label: { EN: 'Loyalty email campaigns', GR: 'Email καμπάνιες πιστότητας' }, detail: { EN: 'Monthly specials and seasonal menus sent to your email list', GR: 'Μηνιαία specials και εποχικά μενού στη λίστα email σας' } },
      { icon: 'Video', label: { EN: 'Food & atmosphere reels', GR: 'Reels φαγητού & ατμόσφαιρας' }, detail: { EN: 'Monthly video content showing dishes, ambience and chef behind the scenes', GR: 'Μηνιαίο video περιεχόμενο με πιάτα, ατμόσφαιρα και τον σεφ στα παρασκήνια' } },
    ] },
  { id: 'cafes', icon: 'Coffee', label: { EN: 'Cafés', GR: 'Καφετέριες' },
    tagline: { EN: 'Build a loyal local following — and get found by tourists too', GR: 'Χτίστε πιστό τοπικό κοινό — και βρεθείτε και από τους τουρίστες' },
    description: { EN: 'Cafés live and die by foot traffic and word of mouth. But tourists in Greece increasingly check Google before they walk in, and a café with no online presence or poor photos loses covers to competitors every single day.', GR: 'Οι καφετέριες ζουν από την κίνηση και το από στόμα σε στόμα. Όμως οι τουρίστες ελέγχουν όλο και περισσότερο το Google πριν μπουν, και μια καφετέρια χωρίς online παρουσία ή με κακές φωτογραφίες χάνει πελάτες κάθε μέρα.' },
    painPoint: { EN: '"Someone walked in and said they almost didn\'t come because our Google photos look nothing like the café does now."', GR: '«Κάποιος μπήκε και είπε ότι παραλίγο να μην έρθει, γιατί οι φωτογραφίες μας στο Google δεν έχουν καμία σχέση με το πώς είναι τώρα.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Brand-forward website', GR: 'Ιστοσελίδα με έμφαση στο brand' }, detail: { EN: 'Story, menu, gallery and opening hours — clean and mobile-first', GR: 'Ιστορία, μενού, gallery και ωράριο — καθαρά και mobile-first' } },
      { icon: 'Search', label: { EN: 'Google Business profile', GR: 'Προφίλ Google Business' }, detail: { EN: 'Fresh photos, category tags and regular posts to dominate local search', GR: 'Φρέσκες φωτογραφίες, κατηγορίες και τακτικά posts για τοπική κυριαρχία' } },
      { icon: 'Star', label: { EN: 'Review collection flow', GR: 'Ροή συλλογής αξιολογήσεων' }, detail: { EN: 'QR code or WhatsApp follow-up to build your star rating consistently', GR: 'QR code ή WhatsApp follow-up για σταθερή αύξηση αστεριών' } },
      { icon: 'Mail', label: { EN: 'Loyalty email list', GR: 'Λίστα email πιστότητας' }, detail: { EN: 'Monthly specials, new menu items and seasonal updates to regulars', GR: 'Μηνιαία specials, νέα πιάτα και εποχικές ενημερώσεις στους σταθερούς' } },
      { icon: 'Video', label: { EN: 'Instagram content', GR: 'Περιεχόμενο Instagram' }, detail: { EN: 'Weekly short-form videos — coffee craft, seasonal drinks, team moments', GR: 'Εβδομαδιαία σύντομα βίντεο — καφές, εποχικά ροφήματα, στιγμές ομάδας' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp order enquiries', GR: 'Αιτήματα παραγγελιών στο WhatsApp' }, detail: { EN: 'Automated replies for catering and large order enquiries', GR: 'Αυτόματες απαντήσεις για catering και μεγάλες παραγγελίες' } },
    ] },
  { id: 'hair-beauty', icon: 'Scissors', label: { EN: 'Hair & Beauty', GR: 'Κομμωτήρια & Beauty' },
    tagline: { EN: 'Keep your calendar full without chasing a single client', GR: 'Κρατήστε το ημερολόγιό σας γεμάτο χωρίς να κυνηγάτε κανέναν πελάτη' },
    description: { EN: "Salons lose revenue to no-shows, last-minute cancellations and clients who forget to rebook. The quality of work is high but the online presence — Instagram, Google, website — doesn't reflect it.", GR: 'Τα κομμωτήρια χάνουν έσοδα από no-shows, ακυρώσεις τελευταίας στιγμής και πελάτες που ξεχνούν να ξανακλείσουν. Η ποιότητα είναι υψηλή, αλλά η online παρουσία — Instagram, Google, ιστοσελίδα — δεν το δείχνει.' },
    painPoint: { EN: '"I spend the first hour of every Monday chasing people about their appointments for the week. I should be doing hair."', GR: '«Κάθε Δευτέρα χάνω την πρώτη ώρα κυνηγώντας τους πελάτες για τα ραντεβού της εβδομάδας. Θα έπρεπε να κάνω μαλλιά.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Portfolio website', GR: 'Ιστοσελίδα portfolio' }, detail: { EN: 'Services, pricing, before-and-after gallery and online booking link', GR: 'Υπηρεσίες, τιμές, gallery πριν/μετά και link online κράτησης' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp appointment reminders', GR: 'Υπενθυμίσεις ραντεβού στο WhatsApp' }, detail: { EN: '48-hour and 2-hour reminders that cut no-shows by up to 60%', GR: 'Υπενθυμίσεις 48 ωρών και 2 ωρών που μειώνουν τα no-shows έως 60%' } },
      { icon: 'Mail', label: { EN: 'Rebooking automation', GR: 'Αυτοματισμός επαναληπτικών ραντεβού' }, detail: { EN: 'Post-appointment email and WhatsApp nudging clients to book their next visit', GR: 'Email και WhatsApp μετά το ραντεβού που προτρέπουν για το επόμενο' } },
      { icon: 'Star', label: { EN: 'Review request sequence', GR: 'Ακολουθία αιτημάτων αξιολόγησης' }, detail: { EN: 'Automated ask for a Google review 24 hours after each appointment', GR: 'Αυτόματο αίτημα για αξιολόγηση Google 24 ώρες μετά το ραντεβού' } },
      { icon: 'Search', label: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, detail: { EN: 'Rank for "hair salon [city]", "balayage [area]", "nail bar near me"', GR: 'Κατάταξη για «κομμωτήριο [πόλη]», «balayage [περιοχή]», «nails κοντά μου»' } },
      { icon: 'Video', label: { EN: 'Before-and-after content', GR: 'Περιεχόμενο πριν/μετά' }, detail: { EN: 'Short-form video ads showcasing your best work for Instagram and TikTok', GR: 'Σύντομα video που αναδεικνύουν τη δουλειά σας για Instagram και TikTok' } },
    ] },
  { id: 'tourism', icon: 'Map', label: { EN: 'Tourism Companies', GR: 'Τουριστικές Επιχειρήσεις' },
    tagline: { EN: 'Sell more tours and automate the booking process end to end', GR: 'Πουλήστε περισσότερες εκδρομές και αυτοματοποιήστε όλη τη διαδικασία κρατήσεων' },
    description: { EN: 'Tour operators in Greece spend hours answering the same questions, writing custom proposals and chasing payment confirmations. OTAs take 20–25% commission on every booking. Direct booking should be easier.', GR: 'Οι tour operators στην Ελλάδα χάνουν ώρες απαντώντας στις ίδιες ερωτήσεις, γράφοντας προτάσεις και κυνηγώντας επιβεβαιώσεις πληρωμών. Τα OTAs παίρνουν 20–25% προμήθεια σε κάθε κράτηση. Η απευθείας κράτηση πρέπει να γίνει πιο εύκολη.' },
    painPoint: { EN: '"Every group enquiry means 10 emails back and forth before we even confirm the price. We need that time for operations, not sales admin."', GR: '«Κάθε ομαδικό αίτημα σημαίνει 10 email πέρα-δώθε πριν καν επιβεβαιώσουμε τιμή. Χρειαζόμαστε αυτόν τον χρόνο για τη λειτουργία, όχι για admin πωλήσεων.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Tour booking website', GR: 'Ιστοσελίδα κρατήσεων εκδρομών' }, detail: { EN: 'Full tour listing, availability, group pricing and direct booking form', GR: 'Λίστα εκδρομών, διαθεσιμότητα, ομαδικές τιμές και φόρμα απευθείας κράτησης' } },
      { icon: 'FileText', label: { EN: 'AI group proposals', GR: 'AI ομαδικές προτάσεις' }, detail: { EN: 'Custom proposals generated and sent in minutes for any group size', GR: 'Custom προτάσεις σε λίγα λεπτά για κάθε μέγεθος group' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp booking bot', GR: 'WhatsApp bot κρατήσεων' }, detail: { EN: 'Answers FAQs, sends availability, confirms bookings automatically', GR: 'Απαντά σε ερωτήσεις, στέλνει διαθεσιμότητα, επιβεβαιώνει κρατήσεις αυτόματα' } },
      { icon: 'Mail', label: { EN: 'Pre-tour email sequence', GR: 'Ακολουθία email πριν την εκδρομή' }, detail: { EN: 'Confirmation, packing list, meeting point and excitement-building emails', GR: 'Επιβεβαίωση, λίστα αποσκευών, σημείο συνάντησης και email προσμονής' } },
      { icon: 'Search', label: { EN: 'International SEO', GR: 'Διεθνές SEO' }, detail: { EN: 'Rank for "[tour type] Greece", "[island] tours", "day trip from [city]"', GR: 'Κατάταξη για «[εκδρομή] Greece», «[νησί] tours», «day trip from [πόλη]»' } },
      { icon: 'Video', label: { EN: 'Destination video ads', GR: 'Video διαφημίσεις προορισμών' }, detail: { EN: 'Short highlight reels of your tours for Instagram and paid social', GR: 'Σύντομα highlight reels των εκδρομών για Instagram και paid social' } },
    ] },
  { id: 'car-hire', icon: 'Car', label: { EN: 'Car Hire', GR: 'Ενοικιάσεις Αυτοκινήτων' },
    tagline: { EN: 'Fill your fleet every day of the season with direct bookings', GR: 'Γεμίστε τον στόλο σας κάθε μέρα της σεζόν με απευθείας κρατήσεις' },
    description: { EN: "Car hire companies in Greece compete head-to-head with OTAs and aggregators that dominate Google. The companies winning direct bookings have fast websites, instant quote tools and smart follow-up — most don't.", GR: 'Οι εταιρείες ενοικίασης αυτοκινήτων στην Ελλάδα ανταγωνίζονται απευθείας OTAs και aggregators που κυριαρχούν στο Google. Όσες κερδίζουν απευθείας κρατήσεις έχουν γρήγορα sites, εργαλεία άμεσης προσφοράς και έξυπνο follow-up — οι περισσότερες όχι.' },
    painPoint: { EN: '"We match the big companies on price and our cars are newer. But tourists book with them because they show up first on Google."', GR: '«Έχουμε ίδιες τιμές με τις μεγάλες και πιο καινούργια αυτοκίνητα. Όμως οι τουρίστες κλείνουν σε εκείνες γιατί βγαίνουν πρώτες στο Google.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Direct booking website', GR: 'Ιστοσελίδα απευθείας κρατήσεων' }, detail: { EN: 'Fleet listing, instant pricing calculator and online reservation form', GR: 'Στόλος, υπολογιστής άμεσης τιμής και φόρμα online κράτησης' } },
      { icon: 'Search', label: { EN: 'Google Ads for high-intent searches', GR: 'Google Ads για στοχευμένες αναζητήσεις' }, detail: { EN: '"car hire [island]", "rent a car [airport]" — targeted paid search', GR: '«car hire [νησί]», «rent a car [αεροδρόμιο]» — στοχευμένο paid search' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp booking confirmation', GR: 'Επιβεβαίωση κράτησης στο WhatsApp' }, detail: { EN: 'Instant confirmations, pickup reminders and return-day messages', GR: 'Άμεσες επιβεβαιώσεις, υπενθυμίσεις παραλαβής και μηνύματα επιστροφής' } },
      { icon: 'Mail', label: { EN: 'Seasonal email campaigns', GR: 'Εποχικές email καμπάνιες' }, detail: { EN: 'Early-season offers and loyalty discounts to past customers', GR: 'Προσφορές πρώιμης σεζόν και εκπτώσεις πιστότητας σε παλιούς πελάτες' } },
      { icon: 'Search', label: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, detail: { EN: 'Organic ranking for location-based car hire searches year-round', GR: 'Οργανική κατάταξη για τοπικές αναζητήσεις ενοικίασης όλο τον χρόνο' } },
      { icon: 'TrendingUp', label: { EN: 'Conversion tracking', GR: 'Παρακολούθηση μετατροπών' }, detail: { EN: 'Know exactly which channel sends bookings and which wastes budget', GR: 'Μάθετε ποιο κανάλι φέρνει κρατήσεις και ποιο σπαταλά budget' } },
    ] },
  { id: 'boat-hire', icon: 'Anchor', label: { EN: 'Boat Hire', GR: 'Ενοικιάσεις Σκαφών' },
    tagline: { EN: 'More charters, more direct bookings, less commission', GR: 'Περισσότερα charters, απευθείας κρατήσεις, λιγότερες προμήθειες' },
    description: { EN: 'Boat hire and charter businesses in Greece pay 20–30% to platforms for every booking. Direct bookings should dominate — but most operators have outdated websites, slow enquiry responses and no follow-up system.', GR: 'Οι επιχειρήσεις ενοικίασης σκαφών στην Ελλάδα πληρώνουν 20–30% στις πλατφόρμες για κάθε κράτηση. Οι απευθείας κρατήσεις θα έπρεπε να κυριαρχούν — αλλά οι περισσότεροι έχουν παλιές ιστοσελίδες, αργές απαντήσεις και κανένα σύστημα follow-up.' },
    painPoint: { EN: '"GetYourGuide sent us 60% of our bookings last season. We gave away €18,000 in commission. We need to own those customers ourselves."', GR: '«Το GetYourGuide μας έφερε το 60% των κρατήσεων πέρσι. Δώσαμε €18.000 σε προμήθειες. Πρέπει να αποκτήσουμε εμείς αυτούς τους πελάτες.»' },
    builds: [
      { icon: 'Globe', label: { EN: 'Charter booking website', GR: 'Ιστοσελίδα κρατήσεων charter' }, detail: { EN: 'Boat specs, route gallery, capacity, pricing and instant enquiry form', GR: 'Χαρακτηριστικά σκαφών, διαδρομές, χωρητικότητα, τιμές και άμεση φόρμα' } },
      { icon: 'FileText', label: { EN: 'AI charter proposals', GR: 'AI προτάσεις charter' }, detail: { EN: 'Professional proposals for private and group charters sent in minutes', GR: 'Επαγγελματικές προτάσεις για ιδιωτικά και ομαδικά charters σε λίγα λεπτά' } },
      { icon: 'MessageSquare', label: { EN: 'WhatsApp charter automation', GR: 'Αυτοματισμός charter στο WhatsApp' }, detail: { EN: 'Instant replies to enquiries with availability, pricing and booking link', GR: 'Άμεσες απαντήσεις με διαθεσιμότητα, τιμές και link κράτησης' } },
      { icon: 'Video', label: { EN: 'Charter highlight reels', GR: 'Highlight reels charter' }, detail: { EN: 'Stunning short-form video content of your boats and routes for social', GR: 'Εντυπωσιακά σύντομα βίντεο των σκαφών και διαδρομών για τα social' } },
      { icon: 'Search', label: { EN: 'International SEO', GR: 'Διεθνές SEO' }, detail: { EN: 'Rank for "boat hire [island]", "private charter [destination]"', GR: 'Κατάταξη για «boat hire [νησί]», «private charter [προορισμός]»' } },
      { icon: 'Mail', label: { EN: 'Post-charter review flow', GR: 'Ροή αξιολόγησης μετά το charter' }, detail: { EN: 'Automated sequence collecting reviews and nudging repeat bookings', GR: 'Αυτόματη ακολουθία που συλλέγει αξιολογήσεις και προτρέπει επαναλήψεις' } },
    ] },
];

/* ---------------- PORTFOLIO ---------------- */
DATA.portfolio = [
  { id: 1, name: 'Santorini Dream Villas', url: 'santorindreamvillas.gr', industry: { EN: 'Villa Rentals', GR: 'Βίλες' }, location: { EN: 'Santorini', GR: 'Σαντορίνη' }, deliveredIn: { EN: '6 days', GR: '6 ημέρες' }, services: ['Website', 'WhatsApp Bot', 'Email Automation', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80', accentColor: '#3a8fb5' },
  { id: 2, name: 'Pita & Soul', url: 'pitaandsoul.gr', industry: { EN: 'Restaurants', GR: 'Εστιατόρια' }, location: { EN: 'Athens', GR: 'Αθήνα' }, deliveredIn: { EN: '5 days', GR: '5 ημέρες' }, services: ['Website', 'Google SEO', 'Review Automation'], heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', accentColor: '#c07a38' },
  { id: 3, name: 'Corfu Fitness Club', url: 'corfufitnessclub.gr', industry: { EN: 'Gyms & Fitness', GR: 'Γυμναστήρια' }, location: { EN: 'Corfu', GR: 'Κέρκυρα' }, deliveredIn: { EN: '7 days', GR: '7 ημέρες' }, services: ['Website', 'Email Automation', 'WhatsApp Reminders', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', accentColor: '#4a6cf7' },
  { id: 4, name: 'Blue Bean Café', url: 'blubeancafe.gr', industry: { EN: 'Cafés', GR: 'Καφετέριες' }, location: { EN: 'Thessaloniki', GR: 'Θεσσαλονίκη' }, deliveredIn: { EN: '4 days', GR: '4 ημέρες' }, services: ['Website', 'Google Business', 'Instagram Content'], heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', accentColor: '#7a4f2e' },
  { id: 5, name: 'GLOW Beauty Studio', url: 'glowbeautystudio.gr', industry: { EN: 'Hair & Beauty', GR: 'Κομμωτήρια & Beauty' }, location: { EN: 'Athens', GR: 'Αθήνα' }, deliveredIn: { EN: '5 days', GR: '5 ημέρες' }, services: ['Website', 'WhatsApp Reminders', 'Rebooking Flow', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', accentColor: '#b57b82' },
  { id: 6, name: 'Aegean Discovery Tours', url: 'aegeandiscovery.gr', industry: { EN: 'Tourism', GR: 'Τουρισμός' }, location: { EN: 'Mykonos', GR: 'Μύκονος' }, deliveredIn: { EN: '7 days', GR: '7 ημέρες' }, services: ['Website', 'AI Proposals', 'WhatsApp Bot', 'SEO', 'Video Ads'], heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80', accentColor: '#2a9d8f' },
  { id: 7, name: 'Hellas Wheels', url: 'hellaswheels.gr', industry: { EN: 'Car Hire', GR: 'Ενοικιάσεις Αυτοκινήτων' }, location: { EN: 'Heraklion, Crete', GR: 'Ηράκλειο, Κρήτη' }, deliveredIn: { EN: '6 days', GR: '6 ημέρες' }, services: ['Website', 'Google Ads', 'WhatsApp Booking', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80', accentColor: '#4d6475' },
  { id: 8, name: 'Azure Charters', url: 'azurecharters.gr', industry: { EN: 'Boat Hire', GR: 'Ενοικιάσεις Σκαφών' }, location: { EN: 'Rhodes', GR: 'Ρόδος' }, deliveredIn: { EN: '7 days', GR: '7 ημέρες' }, services: ['Website', 'AI Proposals', 'WhatsApp Bot', 'Video Ads', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', accentColor: '#2c5f8a' },
  { id: 9, name: 'Villa Mila', url: 'villamila.gr', industry: { EN: 'Villa Rentals', GR: 'Βίλες' }, location: { EN: 'Mykonos', GR: 'Μύκονος' }, deliveredIn: { EN: '5 days', GR: '5 ημέρες' }, services: ['Website', 'Email Automation', 'SEO', 'AI Proposals'], heroImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80', accentColor: '#5a8fa8' },
  { id: 10, name: 'The Olive Table', url: 'theolivetable.gr', industry: { EN: 'Restaurants', GR: 'Εστιατόρια' }, location: { EN: 'Chania, Crete', GR: 'Χανιά, Κρήτη' }, deliveredIn: { EN: '4 days', GR: '4 ημέρες' }, services: ['Website', 'Google SEO', 'Video Ads', 'Email Campaigns'], heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80', accentColor: '#8b5e3c' },
  { id: 11, name: 'Body Lab Athens', url: 'bodylabathens.gr', industry: { EN: 'Gyms & Fitness', GR: 'Γυμναστήρια' }, location: { EN: 'Athens', GR: 'Αθήνα' }, deliveredIn: { EN: '6 days', GR: '6 ημέρες' }, services: ['Website', 'Email Automation', 'Video Ads', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80', accentColor: '#3d5a80' },
  { id: 12, name: 'Sunset Sails', url: 'sunsetsails.gr', industry: { EN: 'Boat Hire', GR: 'Ενοικιάσεις Σκαφών' }, location: { EN: 'Santorini', GR: 'Σαντορίνη' }, deliveredIn: { EN: '5 days', GR: '5 ημέρες' }, services: ['Website', 'WhatsApp Bot', 'AI Proposals', 'SEO'], heroImage: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=600&q=80', accentColor: '#c07b4a' },
];

DATA.portfolioStats = [
  { stat: { EN: '7 days', GR: '7 ημέρες' }, label: { EN: 'Average time from brief to live site', GR: 'Μέσος χρόνος από το brief έως το live site' } },
  { stat: { EN: '12+', GR: '12+' }, label: { EN: 'Industries served across Greece', GR: 'Κλάδοι που εξυπηρετούμε σε όλη την Ελλάδα' } },
  { stat: { EN: '100%', GR: '100%' }, label: { EN: 'Custom-built — no templates used', GR: 'Custom — χωρίς έτοιμα templates' } },
  { stat: { EN: '1 msg', GR: '1 μήνυμα' }, label: { EN: 'All updates and reports via WhatsApp', GR: 'Όλες οι ενημερώσεις και αναφορές μέσω WhatsApp' } },
];

/* ---------------- AUTOMATION ---------------- */
DATA.chatMessages = [
  { from: 'user', text: { EN: 'Hi, is the villa available 10–17 August?', GR: 'Γεια σας, η βίλα είναι διαθέσιμη 10–17 Αυγούστου;' } },
  { from: 'bot',  text: { EN: "Hi! 👋 Yes, Villa Mila is free Aug 10–17 — that's 7 nights.\n\nNightly rate: €290. Shall I send the full quote and booking link?", GR: 'Γεια σας! 👋 Ναι, η Villa Mila είναι ελεύθερη 10–17 Αυγ. — 7 διανυκτερεύσεις.\n\nΤιμή/βράδυ: €290. Να στείλω την πλήρη προσφορά και link κράτησης;' }, time: '09:42' },
  { from: 'user', text: { EN: 'Yes please, for 4 guests.', GR: 'Ναι, παρακαλώ, για 4 άτομα.' } },
  { from: 'bot',  text: { EN: "✅ Perfect. Sending your personalised quote now.\n\nYou'll receive a PDF with all details, photos and a secure payment link within 2 minutes.", GR: '✅ Τέλεια. Στέλνω τώρα την εξατομικευμένη προσφορά σας.\n\nΘα λάβετε PDF με όλες τις λεπτομέρειες, φωτογραφίες και ασφαλές link πληρωμής σε 2 λεπτά.' }, time: '09:43' },
  { from: 'bot',  text: { EN: 'Quote sent 📋  Let me know if you have any questions!', GR: 'Η προσφορά στάλθηκε 📋  Πείτε μου αν έχετε ερωτήσεις!' }, time: '09:44' },
];

DATA.emailSteps = [
  { day: { EN: 'Day 1', GR: 'Ημέρα 1' },  label: { EN: 'Welcome', GR: 'Καλωσόρισμα' },     subject: { EN: 'Welcome to Santorini Dream Villas 🌅', GR: 'Καλωσήρθατε στη Santorini Dream Villas 🌅' }, preview: { EN: "Thank you for your enquiry. Here's everything included in your stay...", GR: 'Ευχαριστούμε για το ενδιαφέρον σας. Δείτε τι περιλαμβάνει η διαμονή σας...' } },
  { day: { EN: 'Day 3', GR: 'Ημέρα 3' },  label: { EN: 'Offer', GR: 'Προσφορά' },       subject: { EN: 'Your exclusive early-season rates for 2025', GR: 'Οι αποκλειστικές τιμές πρώιμης σεζόν για το 2025' }, preview: { EN: "We've held your preferred dates. Here's a limited-time offer to confirm...", GR: 'Κρατήσαμε τις ημερομηνίες σας. Μια προσφορά περιορισμένου χρόνου για επιβεβαίωση...' } },
  { day: { EN: 'Day 7', GR: 'Ημέρα 7' },  label: { EN: 'Nurture', GR: 'Καλλιέργεια' },     subject: { EN: 'What past guests are saying about us', GR: 'Τι λένε οι προηγούμενοι επισκέπτες για εμάς' }, preview: { EN: "Don't take our word for it — here's what 47 recent guests shared...", GR: 'Μην το πιστεύετε μόνο από εμάς — δείτε τι μοιράστηκαν 47 πρόσφατοι επισκέπτες...' } },
  { day: { EN: 'Day 14', GR: 'Ημέρα 14' }, label: { EN: 'Follow-up', GR: 'Follow-up' },   subject: { EN: 'Still planning? Your dates are still available', GR: 'Ακόμα σχεδιάζετε; Οι ημερομηνίες σας είναι ακόμα διαθέσιμες' }, preview: { EN: "We noticed you haven't confirmed yet. Can we answer any questions...", GR: 'Είδαμε ότι δεν επιβεβαιώσατε ακόμα. Να απαντήσουμε σε κάποια ερώτηση...' } },
  { day: { EN: 'Day 21', GR: 'Ημέρα 21' }, label: { EN: 'Last chance', GR: 'Τελευταία ευκαιρία' }, subject: { EN: 'Final reminder — availability filling fast', GR: 'Τελευταία υπενθύμιση — η διαθεσιμότητα εξαντλείται' }, preview: { EN: 'August is almost fully booked. These are the last available dates...', GR: 'Ο Αύγουστος έχει σχεδόν γεμίσει. Αυτές είναι οι τελευταίες διαθέσιμες ημερομηνίες...' } },
];

DATA.flowSteps = [
  { icon: 'Globe',         label: { EN: 'Visitor arrives', GR: 'Έρχεται επισκέπτης' },  sub: { EN: 'via Google, social or referral', GR: 'από Google, social ή σύσταση' } },
  { icon: 'MessageCircle', label: { EN: 'Bot qualifies', GR: 'Το bot αξιολογεί' },    sub: { EN: 'instant WhatsApp response', GR: 'άμεση απάντηση WhatsApp' } },
  { icon: 'FileText',      label: { EN: 'Proposal sent', GR: 'Αποστολή πρότασης' },    sub: { EN: 'AI-generated in seconds', GR: 'με AI σε δευτερόλεπτα' } },
  { icon: 'Mail',          label: { EN: 'Sequence starts', GR: 'Ξεκινά η ακολουθία' },  sub: { EN: 'automated email nurture', GR: 'αυτόματη ροή email' } },
  { icon: 'Check',         label: { EN: 'Booking confirmed', GR: 'Επιβεβαίωση κράτησης' }, sub: { EN: 'payment or direct contact', GR: 'πληρωμή ή απευθείας επαφή' } },
  { icon: 'Star',          label: { EN: 'Review requested', GR: 'Αίτημα αξιολόγησης' }, sub: { EN: 'automated post-visit ask', GR: 'αυτόματο αίτημα μετά την επίσκεψη' } },
];

DATA.autoSections = [
  { cid: 'whatsapp-automation', tag: { EN: 'WhatsApp Automation', GR: 'WhatsApp Αυτοματισμός' }, title: { EN: 'Reply to every enquiry instantly — without lifting a finger', GR: 'Απαντήστε σε κάθε αίτημα άμεσα — χωρίς κόπο' },
    description: { EN: "Most businesses in Greece lose bookings because they can't respond to WhatsApp messages fast enough during peak season. Our bots reply within seconds, qualify the lead, and route serious enquiries directly to you.", GR: 'Οι περισσότερες επιχειρήσεις στην Ελλάδα χάνουν κρατήσεις γιατί δεν προλαβαίνουν να απαντήσουν στα μηνύματα WhatsApp στην peak σεζόν. Τα bots μας απαντούν σε δευτερόλεπτα, αξιολογούν το lead και προωθούν τα σοβαρά αιτήματα σε εσάς.' },
    points: [
      { EN: 'Instant automated reply to any incoming WhatsApp message', GR: 'Άμεση αυτόματη απάντηση σε κάθε εισερχόμενο μήνυμα WhatsApp' },
      { EN: 'Answers FAQs about pricing, availability and location', GR: 'Απαντά σε ερωτήσεις για τιμές, διαθεσιμότητα και τοποθεσία' },
      { EN: 'Collects customer name, dates and party size automatically', GR: 'Συλλέγει αυτόματα όνομα, ημερομηνίες και αριθμό ατόμων' },
      { EN: 'Sends booking links and proposal PDFs on request', GR: 'Στέλνει links κράτησης και PDF προτάσεων κατόπιν αιτήματος' },
      { EN: 'Forwards hot leads to your phone with full context', GR: 'Προωθεί τα ζεστά leads στο κινητό σας με όλο το πλαίσιο' },
      { EN: 'Supports Greek and English conversations', GR: 'Υποστηρίζει συνομιλίες στα Ελληνικά και Αγγλικά' },
      { EN: 'No-code dashboard to update replies any time', GR: 'No-code dashboard για ενημέρωση απαντήσεων ανά πάσα στιγμή' },
    ], visual: 'whatsapp', flip: false },
  { cid: 'email-automation', tag: { EN: 'Email Automation', GR: 'Email Αυτοματισμός' }, title: { EN: 'Turn cold enquiries into paying customers — automatically', GR: 'Μετατρέψτε ψυχρά αιτήματα σε πελάτες — αυτόματα' },
    description: { EN: 'Most leads go cold because no one followed up. Our email sequences keep your business in front of potential customers from day one — with the right message at exactly the right time.', GR: 'Τα περισσότερα leads κρυώνουν γιατί κανείς δεν έκανε follow-up. Οι ακολουθίες email μας κρατούν την επιχείρησή σας μπροστά στους υποψήφιους πελάτες από την πρώτη μέρα — με το σωστό μήνυμα τη σωστή στιγμή.' },
    points: [
      { EN: 'Welcome sequence starts the moment someone enquires', GR: 'Η ακολουθία καλωσορίσματος ξεκινά μόλις κάποιος ρωτήσει' },
      { EN: 'Timed follow-ups across 3 weeks with no manual effort', GR: 'Χρονισμένα follow-up σε 3 εβδομάδες χωρίς χειροκίνητη δουλειά' },
      { EN: 'Seasonal offer campaigns sent to your full list', GR: 'Εποχικές καμπάνιες προσφορών σε όλη τη λίστα σας' },
      { EN: 'Post-visit review request sent automatically', GR: 'Αυτόματο αίτημα αξιολόγησης μετά την επίσκεψη' },
      { EN: 'Abandoned enquiry re-engagement after 7 days silence', GR: 'Επανενεργοποίηση εγκαταλελειμμένων αιτημάτων μετά από 7 ημέρες σιωπής' },
      { EN: 'Monthly newsletter template ready to personalise', GR: 'Πρότυπο μηνιαίου newsletter έτοιμο για εξατομίκευση' },
      { EN: 'Built on Mailchimp or Brevo — your data, your list', GR: 'Σε Mailchimp ή Brevo — δικά σας δεδομένα, δική σας λίστα' },
    ], visual: 'email', flip: true },
  { cid: 'ai-proposal-generation', tag: { EN: 'AI Proposals', GR: 'AI Προτάσεις' }, title: { EN: 'Send polished proposals in seconds, not hours', GR: 'Στείλτε άρτιες προτάσεις σε δευτερόλεπτα, όχι ώρες' },
    description: { EN: "Writing a custom proposal for every group enquiry takes time you don't have. Our AI generates a professional, branded proposal — personalised for each client — and sends it automatically via WhatsApp or email.", GR: 'Το να γράφετε custom πρόταση για κάθε ομαδικό αίτημα τρώει χρόνο που δεν έχετε. Το AI μας δημιουργεί μια επαγγελματική, branded πρόταση — εξατομικευμένη για κάθε πελάτη — και τη στέλνει αυτόματα μέσω WhatsApp ή email.' },
    points: [
      { EN: 'Proposal generated from a WhatsApp conversation or form', GR: 'Δημιουργία πρότασης από συνομιλία WhatsApp ή φόρμα' },
      { EN: 'Personalised with client name, dates and requirements', GR: 'Εξατομίκευση με όνομα πελάτη, ημερομηνίες και απαιτήσεις' },
      { EN: 'Professionally designed with your logo and brand colours', GR: 'Επαγγελματικός σχεδιασμός με λογότυπο και χρώματα του brand σας' },
      { EN: 'Includes service breakdown, pricing table and terms', GR: 'Περιλαμβάνει ανάλυση υπηρεσιών, πίνακα τιμών και όρους' },
      { EN: 'Sent instantly via WhatsApp PDF or email link', GR: 'Άμεση αποστολή ως PDF στο WhatsApp ή link email' },
      { EN: 'Digital acceptance tracked — you get notified immediately', GR: 'Παρακολούθηση ψηφιακής αποδοχής — ειδοποιείστε άμεσα' },
      { EN: 'Follow-up reminder sent automatically if no response in 48h', GR: 'Αυτόματη υπενθύμιση αν δεν υπάρξει απάντηση σε 48 ώρες' },
    ], visual: 'proposal', flip: false },
];

DATA.supportCards = [
  { cid: 'local-seo', icon: 'Search', title: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, description: { EN: 'We optimise your site and Google Business profile so you rank for local searches — and stay there.', GR: 'Βελτιστοποιούμε το site και το Google Business profile σας ώστε να κατατάσσεστε σε τοπικές αναζητήσεις — και να παραμένετε.' }, points: [{ EN: 'Google Business optimisation', GR: 'Βελτιστοποίηση Google Business' }, { EN: 'Monthly keyword reporting', GR: 'Μηνιαία αναφορά λέξεων-κλειδιών' }, { EN: 'Schema markup and technical SEO', GR: 'Schema markup και τεχνικό SEO' }, { EN: 'Competitor gap tracking', GR: 'Παρακολούθηση ανταγωνισμού' }] },
  { cid: 'social-video', icon: 'Video', title: { EN: 'Video Ads', GR: 'Video Διαφημίσεις' }, description: { EN: 'Two scripted, edited short-form videos per month — posted to Instagram and TikTok for you.', GR: 'Δύο σύντομα βίντεο τον μήνα με σενάριο και μοντάζ — με δημοσίευση σε Instagram και TikTok από εμάς.' }, points: [{ EN: 'Script written by our team', GR: 'Σενάριο από την ομάδα μας' }, { EN: 'English and Greek subtitles', GR: 'Υπότιτλοι Αγγλικά και Ελληνικά' }, { EN: 'Branded intro and outro', GR: 'Branded intro και outro' }, { EN: 'Optimised for Reels and TikTok', GR: 'Βελτιστοποίηση για Reels και TikTok' }] },
  { cid: 'content-refresh', icon: 'PenLine', title: { EN: 'AI Blog Writing', GR: 'AI Συγγραφή Blog' }, description: { EN: 'Four SEO-optimised blog posts per month, published directly to your website to build ranking and trust.', GR: 'Τέσσερα άρθρα blog τον μήνα βελτιστοποιημένα για SEO, με δημοσίευση απευθείας στο site σας για κατάταξη και εμπιστοσύνη.' }, points: [{ EN: 'Targeted to local search queries', GR: 'Στοχευμένα σε τοπικές αναζητήσεις' }, { EN: 'Published to your site directly', GR: 'Δημοσίευση απευθείας στο site σας' }, { EN: 'Meta descriptions included', GR: 'Περιλαμβάνονται meta descriptions' }, { EN: 'Topic calendar planned ahead', GR: 'Προγραμματισμένο ημερολόγιο θεμάτων' }] },
  { cid: 'analytics-reporting', icon: 'BarChart3', title: { EN: 'Analytics & Reporting', GR: 'Analytics & Αναφορές' }, description: { EN: "A plain-language monthly report showing what's working, what isn't, and what to do next.", GR: 'Μια μηνιαία αναφορά σε απλή γλώσσα που δείχνει τι αποδίδει, τι όχι και τι να κάνετε στη συνέχεια.' }, points: [{ EN: 'Google Analytics 4 setup', GR: 'Στήσιμο Google Analytics 4' }, { EN: 'Monthly PDF report', GR: 'Μηνιαία αναφορά PDF' }, { EN: 'Enquiry source tracking', GR: 'Παρακολούθηση πηγών αιτημάτων' }, { EN: 'Action recommendations', GR: 'Προτάσεις ενεργειών' }] },
];

/* ---------------- CONTACT ---------------- */
DATA.nextSteps = [
  { icon: 'ClipboardList', title: { EN: 'We review your details', GR: 'Εξετάζουμε τα στοιχεία σας' }, body: { EN: 'We look at your business type, location, current website and goals — usually within a few hours of receiving your form.', GR: 'Κοιτάμε τον τύπο της επιχείρησης, την περιοχή, την υπάρχουσα ιστοσελίδα και τους στόχους σας — συνήθως μέσα σε λίγες ώρες.' } },
  { icon: 'Zap', title: { EN: 'We build your free plan', GR: 'Φτιάχνουμε το δωρεάν πλάνο σας' }, body: { EN: "A personalised document outlining exactly what we'd build for your business, which services we'd recommend, and what it would cost.", GR: 'Ένα εξατομικευμένο έγγραφο που περιγράφει τι ακριβώς θα φτιάχναμε, ποιες υπηρεσίες προτείνουμε και πόσο θα κόστιζε.' } },
  { icon: 'Send', title: { EN: 'You receive it on WhatsApp', GR: 'Το λαμβάνετε στο WhatsApp' }, body: { EN: 'Your plan arrives as a PDF via WhatsApp within 24 hours. No sales call required. No commitment to proceed.', GR: 'Το πλάνο σας έρχεται ως PDF μέσω WhatsApp σε 24 ώρες. Χωρίς τηλεφωνική πώληση. Χωρίς δέσμευση.' } },
];

DATA.trustSignals = [
  { EN: 'Free plan — no payment required', GR: 'Δωρεάν πλάνο — χωρίς πληρωμή' },
  { EN: 'Response within 24 hours', GR: 'Απάντηση εντός 24 ωρών' },
  { EN: 'Plan delivered via WhatsApp', GR: 'Παράδοση πλάνου μέσω WhatsApp' },
  { EN: 'No sales call, no obligation', GR: 'Χωρίς τηλεφωνική πώληση, χωρίς υποχρέωση' },
  { EN: 'Custom to your specific business', GR: 'Προσαρμοσμένο στη δική σας επιχείρηση' },
];

DATA.businessTypes = [
  { EN: 'Villa / Holiday Rental', GR: 'Βίλα / Ενοικίαση Διακοπών' },
  { EN: 'Restaurant / Café', GR: 'Εστιατόριο / Καφετέρια' },
  { EN: 'Gym / Fitness', GR: 'Γυμναστήριο / Fitness' },
  { EN: 'Hair & Beauty Salon', GR: 'Κομμωτήριο & Beauty' },
  { EN: 'Tourism Company', GR: 'Τουριστική Επιχείρηση' },
  { EN: 'Car / Boat Hire', GR: 'Ενοικιάσεις Αυτοκινήτων / Σκαφών' },
  { EN: 'Other', GR: 'Άλλο' },
];

DATA.faqs = [
  { q: { EN: 'How long does it take to build my website?', GR: 'Πόσο χρόνο παίρνει η κατασκευή της ιστοσελίδας μου;' }, a: { EN: 'Most websites go live within 7 days of you confirming the brief. Simpler sites — 3 pages, no booking integration — can be live in 4 days. Complex builds with automation and multiple languages take up to 10 days.', GR: 'Οι περισσότερες ιστοσελίδες βγαίνουν online μέσα σε 7 ημέρες από την επιβεβαίωση του brief. Πιο απλά sites — 3 σελίδες, χωρίς κρατήσεις — σε 4 ημέρες. Πιο σύνθετα, με αυτοματισμούς και πολλές γλώσσες, έως 10 ημέρες.' } },
  { q: { EN: 'Do I need to provide photos or write any content?', GR: 'Χρειάζεται να δώσω φωτογραφίες ή να γράψω περιεχόμενο;' }, a: { EN: "No. We handle all content writing using AI, tailored to your specific business and industry. For photos we use high-quality licensed stock images that match your brand. If you have existing photos you're happy with, we'll use those instead. Professional photography is available as an add-on.", GR: 'Όχι. Αναλαμβάνουμε όλο το περιεχόμενο με AI, προσαρμοσμένο στην επιχείρηση και τον κλάδο σας. Για φωτογραφίες χρησιμοποιούμε υψηλής ποιότητας licensed stock που ταιριάζουν στο brand σας. Αν έχετε δικές σας φωτογραφίες, τις χρησιμοποιούμε. Η επαγγελματική φωτογράφιση είναι διαθέσιμη ως πρόσθετο.' } },
  { q: { EN: 'What if I want changes after the website goes live?', GR: 'Τι γίνεται αν θέλω αλλαγές αφού βγει η ιστοσελίδα online;' }, a: { EN: "Growth and Premium plan clients get unlimited updates via WhatsApp — just message us and it's done, usually the same day. Starter plan clients receive one revision round at launch; further changes are available at an hourly rate.", GR: 'Οι πελάτες Growth και Premium έχουν απεριόριστες ενημερώσεις μέσω WhatsApp — απλά στείλτε μήνυμα και γίνεται, συνήθως την ίδια μέρα. Οι πελάτες Starter έχουν έναν γύρο διορθώσεων στην εκκίνηση· περαιτέρω αλλαγές με ωριαία χρέωση.' } },
  { q: { EN: 'Do I need any technical knowledge to manage things?', GR: 'Χρειάζομαι τεχνικές γνώσεις για να τα διαχειρίζομαι;' }, a: { EN: 'None at all. You manage every aspect of your digital presence — website updates, campaign reports, automation changes — through a single WhatsApp message to our team. No dashboards to log into, no software to learn.', GR: 'Καμία απολύτως. Διαχειρίζεστε κάθε πτυχή της ψηφιακής σας παρουσίας — ενημερώσεις, αναφορές, αλλαγές αυτοματισμών — με ένα μήνυμα WhatsApp στην ομάδα μας. Χωρίς dashboards, χωρίς software να μάθετε.' } },
  { q: { EN: 'Is there a minimum contract length?', GR: 'Υπάρχει ελάχιστη διάρκεια συμβολαίου;' }, a: { EN: "Monthly plans (Growth and Premium) have no minimum contract. You can cancel any time with 30 days' notice and keep everything we've built. The Starter plan is a one-time payment with no ongoing obligation.", GR: 'Τα μηνιαία πλάνα (Growth και Premium) δεν έχουν ελάχιστη διάρκεια. Μπορείτε να ακυρώσετε οποτεδήποτε με προειδοποίηση 30 ημερών και κρατάτε ό,τι έχουμε φτιάξει. Το Starter είναι εφάπαξ πληρωμή χωρίς συνεχιζόμενη υποχρέωση.' } },
  { q: { EN: 'Can you improve my existing website instead of building a new one?', GR: 'Μπορείτε να βελτιώσετε την υπάρχουσα ιστοσελίδα μου αντί για νέα;' }, a: { EN: "Yes — if your current site has good bones, we can rebuild or redesign it rather than start from scratch. We'll assess it as part of your free plan and give you an honest recommendation either way.", GR: 'Ναι — αν το υπάρχον site έχει καλή βάση, μπορούμε να το ανακατασκευάσουμε ή να το επανασχεδιάσουμε αντί να ξεκινήσουμε από την αρχή. Θα το αξιολογήσουμε στο δωρεάν πλάνο και θα σας πούμε ειλικρινά την άποψή μας.' } },
  { q: { EN: 'Do you only work with businesses in Greece?', GR: 'Συνεργάζεστε μόνο με επιχειρήσεις στην Ελλάδα;' }, a: { EN: "Our primary focus is businesses operating in Greece — particularly those serving tourists or local Greek customers. If you're based elsewhere but have strong operations in Greece, get in touch and we'll see if we're a good fit.", GR: 'Η κύρια εστίασή μας είναι επιχειρήσεις που λειτουργούν στην Ελλάδα — ιδίως όσες εξυπηρετούν τουρίστες ή τοπικούς πελάτες. Αν είστε αλλού αλλά έχετε ισχυρή δραστηριότητα στην Ελλάδα, επικοινωνήστε και θα δούμε αν ταιριάζουμε.' } },
];

/* ---------------- HERO — rotating audience words ---------------- */
DATA.heroRotate = [
  { EN: 'villas', GR: 'βίλες' },
  { EN: 'restaurants', GR: 'εστιατόρια' },
  { EN: 'gyms', GR: 'γυμναστήρια' },
  { EN: 'salons', GR: 'κομμωτήρια' },
  { EN: 'hotels', GR: 'ξενοδοχεία' },
  { EN: 'tourism', GR: 'τουρισμό' },
];

export const SITE = DATA as unknown as SiteData;
