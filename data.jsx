/* ============================================================
   GO AI — all site content, bilingual {EN, GR}.
   Render via tr() from useApp(). Icons by Lucide name.
   Catalog ids (cid) link cards to the proposal store.
   ============================================================ */

const DATA = {};

/* ---------------- HOME — services (What we do) ---------------- */
DATA.services = [
  { icon: 'Globe',         title: { EN: 'Websites', GR: 'Ιστοσελίδες' },        description: { EN: 'Fast, mobile-first websites designed to convert visitors into bookings and enquiries — built in under 7 days.', GR: 'Γρήγορες, mobile-first ιστοσελίδες σχεδιασμένες να μετατρέπουν επισκέπτες σε κρατήσεις και αιτήματα — έτοιμες σε λιγότερο από 7 ημέρες.' } },
  { icon: 'FileText',      title: { EN: 'AI Proposals', GR: 'AI Προτάσεις' },    description: { EN: 'Professional proposals generated in minutes and sent directly to your clients — personalised, polished, on brand.', GR: 'Επαγγελματικές προτάσεις σε λίγα λεπτά, που στέλνονται απευθείας στους πελάτες σας — εξατομικευμένες και άρτιες.' } },
  { icon: 'Search',        title: { EN: 'Local SEO', GR: 'Τοπικό SEO' },         description: { EN: 'Get found on Google by people searching in your area. We handle keywords, schema, maps and monthly reporting.', GR: 'Σας βρίσκουν στο Google οι πελάτες της περιοχής σας. Αναλαμβάνουμε λέξεις-κλειδιά, schema, χάρτες και μηνιαίες αναφορές.' } },
  { icon: 'Mail',          title: { EN: 'Email Automation', GR: 'Email Αυτοματισμοί' }, description: { EN: 'Welcome flows, follow-up sequences, and seasonal campaigns — all automated so you never miss a lead.', GR: 'Ροές καλωσορίσματος, ακολουθίες follow-up και εποχικές καμπάνιες — όλα αυτόματα, ώστε να μην χάνετε ποτέ ένα lead.' } },
  { icon: 'Video',         title: { EN: 'Video Ads', GR: 'Video Διαφημίσεις' }, description: { EN: 'Short-form video content for Instagram and TikTok — scripted, edited and optimised to drive local enquiries.', GR: 'Σύντομα βίντεο για Instagram και TikTok — με σενάριο, μοντάζ και βελτιστοποίηση που φέρνει τοπικά αιτήματα.' } },
  { icon: 'MessageCircle', title: { EN: 'WhatsApp Control', GR: 'WhatsApp Control' }, description: { EN: 'Manage bookings, send automated replies and track enquiries — all from your WhatsApp, from anywhere.', GR: 'Διαχειριστείτε κρατήσεις, στείλτε αυτόματες απαντήσεις και παρακολουθήστε αιτήματα — όλα από το WhatsApp σας, από παντού.' } },
];

DATA.industriesShort = [
  { icon: 'House',           to: 'villa-rentals', label: { EN: 'Villa Rentals', GR: 'Βίλες' } },
  { icon: 'Dumbbell',        to: 'gyms-fitness',  label: { EN: 'Gyms & Fitness', GR: 'Γυμναστήρια' } },
  { icon: 'UtensilsCrossed', to: 'restaurants',   label: { EN: 'Restaurants', GR: 'Εστιατόρια' } },
  { icon: 'Coffee',          to: 'cafes',         label: { EN: 'Cafés', GR: 'Καφετέριες' } },
  { icon: 'Scissors',        to: 'hair-beauty',   label: { EN: 'Hair & Beauty', GR: 'Κομμωτήρια & Beauty' } },
  { icon: 'Map',             to: 'tourism',       label: { EN: 'Tourism Companies', GR: 'Τουριστικές Επιχειρήσεις' } },
  { icon: 'Car',             to: 'car-hire',      label: { EN: 'Car Hire', GR: 'Ενοικιάσεις Αυτοκινήτων' } },
  { icon: 'Anchor',          to: 'boat-hire',     label: { EN: 'Boat Hire', GR: 'Ενοικιάσεις Σκαφών' } },
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

window.DATA = DATA;
