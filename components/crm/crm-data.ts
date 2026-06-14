/* ============================================================
   GO AI — sample CRM data + shared helpers for the demo dashboard.
   Pure data/types (no JSX) so every module view shares one source.
   All user-facing strings are Bilingual; render with useApp().tr.
   ============================================================ */
import type { Bilingual } from '@/types';

export type Stage = 'new' | 'talking' | 'proposal' | 'won' | 'lost';
export type Tone = 'hot' | 'warm' | 'cold';
export type Channel = 'WhatsApp' | 'Email' | 'Call' | 'Web' | 'Instagram';
export type ActType = 'whatsapp' | 'email' | 'call' | 'note';
export type ProposalStatus = 'none' | 'draft' | 'sent' | 'accepted';

export interface Activity { type: ActType; text: Bilingual; time: string }
export interface Contact {
  id: string; name: string; biz: string; channel: Channel; stage: Stage;
  value: number; email: string; phone: string; location: Bilingual;
  tone: Tone; followUp: Bilingual; ageDays: number; proposal: ProposalStatus;
  owner: string; last: Bilingual; acts: Activity[];
}
export interface Lead { id: string; name: string; biz: string; source: Bilingual; channel: Channel; time: string; status: 'new' | 'contacted' }
export interface Message { from: 'them' | 'us'; text: Bilingual; time: string }
export interface Thread { id: string; contactId: string; name: string; channel: Channel; preview: Bilingual; time: string; unread: number; messages: Message[] }
export interface Meeting { id: string; title: Bilingual; who: string; dayIdx: number; time: string; kind: 'call' | 'meeting' | 'demo' }
export interface Automation { id: string; name: Bilingual; trigger: Bilingual; action: Bilingual; on: boolean; runs: number }
export interface TeamMember { id: string; name: string; role: Bilingual; email: string; perm: Bilingual; status: 'active' | 'invited' }
export interface Task { id: string; title: Bilingual; who: string; due: Bilingual; tone: Tone }

export const STAGES: { key: Stage; label: Bilingual }[] = [
  { key: 'new', label: { EN: 'New', GR: 'Νέο' } },
  { key: 'talking', label: { EN: 'In touch', GR: 'Σε επικοινωνία' } },
  { key: 'proposal', label: { EN: 'Proposal', GR: 'Πρόταση' } },
  { key: 'won', label: { EN: 'Won', GR: 'Κερδισμένο' } },
  { key: 'lost', label: { EN: 'Lost', GR: 'Χαμένο' } },
];

export const CONTACTS: Contact[] = [
  { id: 'c5', name: 'Sophia M.', biz: 'Bloom Salon', channel: 'Web', stage: 'new', value: 450, email: 'sophia@bloomsalon.gr', phone: '+30 698 1234567', location: { EN: 'Athens', GR: 'Αθήνα' }, tone: 'warm', followUp: { EN: 'Today', GR: 'Σήμερα' }, ageDays: 1, proposal: 'none', owner: 'Maria', last: { EN: 'New website enquiry', GR: 'Νέο αίτημα από το site' },
    acts: [{ type: 'note', text: { EN: 'Submitted the website form', GR: 'Υπέβαλε τη φόρμα του site' }, time: '2h' }] },
  { id: 'c6', name: 'Yiannis T.', biz: 'Kafé Nero', channel: 'WhatsApp', stage: 'new', value: 300, email: 'hello@kafenero.gr', phone: '+30 694 7654321', location: { EN: 'Thessaloniki', GR: 'Θεσσαλονίκη' }, tone: 'cold', followUp: { EN: 'Fri', GR: 'Παρ' }, ageDays: 3, proposal: 'none', owner: 'Alex', last: { EN: 'Asked about opening hours', GR: 'Ρώτησε για ώρες λειτουργίας' },
    acts: [{ type: 'whatsapp', text: { EN: 'Quick question on hours', GR: 'Ερώτηση για ώρες' }, time: '4h' }] },
  { id: 'c3', name: 'Dimitris S.', biz: 'Aegean Tours', channel: 'Call', stage: 'talking', value: 2400, email: 'd.stavrou@aegeantours.gr', phone: '+30 697 2223344', location: { EN: 'Santorini', GR: 'Σαντορίνη' }, tone: 'hot', followUp: { EN: 'Tue 11:00', GR: 'Τρί 11:00' }, ageDays: 5, proposal: 'draft', owner: 'Maria', last: { EN: 'Call back Tuesday 11:00', GR: 'Κλήση την Τρίτη 11:00' },
    acts: [{ type: 'call', text: { EN: 'Discussed tour packages', GR: 'Συζητήσαμε πακέτα' }, time: '1d' }, { type: 'email', text: { EN: 'Sent the brochure', GR: 'Στάλθηκε το brochure' }, time: '2d' }] },
  { id: 'c4', name: 'Elena R.', biz: 'FitZone Gym', channel: 'WhatsApp', stage: 'talking', value: 600, email: 'elena@fitzone.gr', phone: '+30 695 5566778', location: { EN: 'Patras', GR: 'Πάτρα' }, tone: 'warm', followUp: { EN: 'Tomorrow', GR: 'Αύριο' }, ageDays: 2, proposal: 'none', owner: 'Alex', last: { EN: 'Wants the monthly plan', GR: 'Θέλει το μηνιαίο πλάνο' },
    acts: [{ type: 'whatsapp', text: { EN: 'Asked about membership plans', GR: 'Ρώτησε για πλάνα συνδρομής' }, time: '6h' }, { type: 'note', text: { EN: 'Offer 1 free week', GR: 'Προσφορά 1 δωρεάν εβδομάδα' }, time: '1d' }] },
  { id: 'c2', name: 'Nikos P.', biz: 'Olive & Thyme', channel: 'Email', stage: 'proposal', value: 950, email: 'nikos@olivethyme.gr', phone: '+30 698 9988776', location: { EN: 'Athens', GR: 'Αθήνα' }, tone: 'hot', followUp: { EN: 'Tomorrow', GR: 'Αύριο' }, ageDays: 4, proposal: 'sent', owner: 'Maria', last: { EN: 'Proposal sent · awaiting reply', GR: 'Στάλθηκε πρόταση · αναμονή' },
    acts: [{ type: 'email', text: { EN: 'Proposal sent (website + orders)', GR: 'Στάλθηκε πρόταση (site + παραγγελίες)' }, time: '5h' }, { type: 'whatsapp', text: { EN: 'Asked for an online-menu site', GR: 'Ζήτησε site με online menu' }, time: '1d' }, { type: 'note', text: { EN: 'Wants online orders by summer', GR: 'Θέλει online παραγγελίες ως το καλοκαίρι' }, time: '2d' }] },
  { id: 'c1', name: 'Maria K.', biz: 'Villa Mila', channel: 'WhatsApp', stage: 'won', value: 1800, email: 'maria@villamila.gr', phone: '+30 699 1112233', location: { EN: 'Mykonos', GR: 'Μύκονος' }, tone: 'hot', followUp: { EN: '—', GR: '—' }, ageDays: 8, proposal: 'accepted', owner: 'Maria', last: { EN: 'Booked — deposit paid', GR: 'Κράτηση — προκαταβολή' },
    acts: [{ type: 'whatsapp', text: { EN: 'Confirmed booking ✓', GR: 'Επιβεβαίωσε κράτηση ✓' }, time: '2h' }, { type: 'email', text: { EN: 'Sent the invoice', GR: 'Στάλθηκε τιμολόγιο' }, time: '1d' }, { type: 'call', text: { EN: 'Intro call', GR: 'Πρώτη κλήση' }, time: '3d' }] },
  { id: 'c7', name: 'Andreas L.', biz: 'Blue Wave Rentals', channel: 'Email', stage: 'won', value: 1200, email: 'a.lekkas@bluewave.gr', phone: '+30 693 4455667', location: { EN: 'Corfu', GR: 'Κέρκυρα' }, tone: 'hot', followUp: { EN: '—', GR: '—' }, ageDays: 6, proposal: 'accepted', owner: 'Alex', last: { EN: 'Signed — onboarding', GR: 'Υπέγραψε — onboarding' },
    acts: [{ type: 'email', text: { EN: 'Welcome email sent', GR: 'Στάλθηκε email καλωσορίσματος' }, time: '1d' }, { type: 'call', text: { EN: 'Onboarding call', GR: 'Κλήση onboarding' }, time: '2d' }] },
  { id: 'c8', name: 'Petros V.', biz: 'Sunset Bar', channel: 'Instagram', stage: 'lost', value: 500, email: 'petros@sunsetbar.gr', phone: '+30 691 3334455', location: { EN: 'Rhodes', GR: 'Ρόδος' }, tone: 'cold', followUp: { EN: '—', GR: '—' }, ageDays: 14, proposal: 'sent', owner: 'Alex', last: { EN: 'Went with a cheaper option', GR: 'Επέλεξε φθηνότερη λύση' },
    acts: [{ type: 'note', text: { EN: 'Budget too low', GR: 'Χαμηλός προϋπολογισμός' }, time: '6d' }] },
];

export const TASKS: Task[] = [
  { id: 't1', title: { EN: 'Call Dimitris back', GR: 'Κλήση στον Δημήτρη' }, who: 'Aegean Tours', due: { EN: 'Today 11:00', GR: 'Σήμερα 11:00' }, tone: 'hot' },
  { id: 't2', title: { EN: 'Send Olive & Thyme the contract', GR: 'Αποστολή συμβολαίου στο Olive & Thyme' }, who: 'Olive & Thyme', due: { EN: 'Today', GR: 'Σήμερα' }, tone: 'hot' },
  { id: 't3', title: { EN: 'Follow up on FitZone free trial', GR: 'Follow-up δωρεάν δοκιμής FitZone' }, who: 'FitZone Gym', due: { EN: 'Tomorrow', GR: 'Αύριο' }, tone: 'warm' },
  { id: 't4', title: { EN: 'Reply to Bloom Salon enquiry', GR: 'Απάντηση στο αίτημα Bloom Salon' }, who: 'Bloom Salon', due: { EN: 'Tomorrow', GR: 'Αύριο' }, tone: 'warm' },
  { id: 't5', title: { EN: 'Onboard Blue Wave Rentals', GR: 'Onboarding Blue Wave Rentals' }, who: 'Blue Wave Rentals', due: { EN: 'Fri', GR: 'Παρ' }, tone: 'cold' },
  { id: 't6', title: { EN: 'Confirm Villa Mila deposit', GR: 'Επιβεβαίωση προκαταβολής Villa Mila' }, who: 'Villa Mila', due: { EN: 'Done', GR: 'Έγινε' }, tone: 'cold' },
];

export const LEADS: Lead[] = [
  { id: 'l1', name: 'Sophia M.', biz: 'Bloom Salon', source: { EN: 'Website form', GR: 'Φόρμα site' }, channel: 'Web', time: '2h', status: 'new' },
  { id: 'l2', name: 'Yiannis T.', biz: 'Kafé Nero', source: { EN: 'WhatsApp', GR: 'WhatsApp' }, channel: 'WhatsApp', time: '4h', status: 'new' },
  { id: 'l3', name: 'Petros V.', biz: 'Sunset Bar', source: { EN: 'Instagram DM', GR: 'Instagram DM' }, channel: 'Instagram', time: '1d', status: 'contacted' },
  { id: 'l4', name: 'Georgia A.', biz: 'Knot Florals', source: { EN: 'Google Ads', GR: 'Google Ads' }, channel: 'Web', time: '1d', status: 'new' },
  { id: 'l5', name: 'Kostas D.', biz: 'Drive Rentals', source: { EN: 'Referral', GR: 'Σύσταση' }, channel: 'Call', time: '2d', status: 'contacted' },
  { id: 'l6', name: 'Anna P.', biz: 'Aroma Bakery', source: { EN: 'Website form', GR: 'Φόρμα site' }, channel: 'Web', time: '3d', status: 'contacted' },
];

export const THREADS: Thread[] = [
  { id: 'm1', contactId: 'c3', name: 'Dimitris S.', channel: 'WhatsApp', preview: { EN: 'Great, talk Tuesday!', GR: 'Τέλεια, τα λέμε Τρίτη!' }, time: '5m', unread: 2,
    messages: [
      { from: 'them', text: { EN: 'Hi! Do you build sites for tour companies?', GR: 'Γεια! Φτιάχνετε sites για τουριστικά;' }, time: '10:02' },
      { from: 'us', text: { EN: 'We do — villas & tours are our specialty 🙌', GR: 'Ναι — βίλες & τουρισμός είναι η ειδικότητά μας 🙌' }, time: '10:05' },
      { from: 'them', text: { EN: 'Great, talk Tuesday!', GR: 'Τέλεια, τα λέμε Τρίτη!' }, time: '10:06' },
    ] },
  { id: 'm2', contactId: 'c2', name: 'Nikos P.', channel: 'Email', preview: { EN: 'Looks good, reviewing the proposal', GR: 'Φαίνεται καλό, βλέπω την πρόταση' }, time: '5h', unread: 0,
    messages: [
      { from: 'us', text: { EN: 'Sent over the proposal — website + online orders.', GR: 'Έστειλα την πρόταση — site + online παραγγελίες.' }, time: 'Tue' },
      { from: 'them', text: { EN: 'Looks good, reviewing the proposal', GR: 'Φαίνεται καλό, βλέπω την πρόταση' }, time: 'Tue' },
    ] },
  { id: 'm3', contactId: 'c4', name: 'Elena R.', channel: 'WhatsApp', preview: { EN: 'Can I get the monthly price?', GR: 'Μπορώ να μάθω τη μηνιαία τιμή;' }, time: '6h', unread: 1,
    messages: [
      { from: 'them', text: { EN: 'Can I get the monthly price?', GR: 'Μπορώ να μάθω τη μηνιαία τιμή;' }, time: '09:14' },
    ] },
  { id: 'm4', contactId: 'c6', name: 'Yiannis T.', channel: 'WhatsApp', preview: { EN: 'What are your hours?', GR: 'Ποιες είναι οι ώρες σας;' }, time: '4h', unread: 0,
    messages: [
      { from: 'them', text: { EN: 'What are your hours?', GR: 'Ποιες είναι οι ώρες σας;' }, time: '08:40' },
      { from: 'us', text: { EN: 'Mon–Sat, 9:00–18:00 ☕', GR: 'Δευ–Σαβ, 9:00–18:00 ☕' }, time: '08:41' },
    ] },
];

export const MEETINGS: Meeting[] = [
  { id: 'e1', title: { EN: 'Discovery call', GR: 'Discovery call' }, who: 'Aegean Tours', dayIdx: 1, time: '11:00', kind: 'call' },
  { id: 'e2', title: { EN: 'Proposal review', GR: 'Επισκόπηση πρότασης' }, who: 'Olive & Thyme', dayIdx: 2, time: '15:30', kind: 'meeting' },
  { id: 'e3', title: { EN: 'Site demo', GR: 'Demo ιστοσελίδας' }, who: 'FitZone Gym', dayIdx: 3, time: '12:00', kind: 'demo' },
  { id: 'e4', title: { EN: 'Onboarding', GR: 'Onboarding' }, who: 'Blue Wave Rentals', dayIdx: 4, time: '10:00', kind: 'meeting' },
  { id: 'e5', title: { EN: 'Follow-up call', GR: 'Κλήση follow-up' }, who: 'Bloom Salon', dayIdx: 4, time: '16:00', kind: 'call' },
];
export const WEEKDAYS: Bilingual[] = [
  { EN: 'Mon', GR: 'Δευ' }, { EN: 'Tue', GR: 'Τρί' }, { EN: 'Wed', GR: 'Τετ' }, { EN: 'Thu', GR: 'Πέμ' }, { EN: 'Fri', GR: 'Παρ' }, { EN: 'Sat', GR: 'Σάβ' }, { EN: 'Sun', GR: 'Κυρ' },
];

export const AUTOMATIONS: Automation[] = [
  { id: 'a1', name: { EN: 'WhatsApp auto-reply', GR: 'Αυτόματη απάντηση WhatsApp' }, trigger: { EN: 'New WhatsApp message', GR: 'Νέο μήνυμα WhatsApp' }, action: { EN: 'Reply instantly + create lead', GR: 'Άμεση απάντηση + δημιουργία lead' }, on: true, runs: 142 },
  { id: 'a2', name: { EN: 'New lead → deal', GR: 'Νέο lead → συμφωνία' }, trigger: { EN: 'Website form submitted', GR: 'Υποβολή φόρμας site' }, action: { EN: 'Create deal in “New”', GR: 'Δημιουργία συμφωνίας στο “Νέο”' }, on: true, runs: 86 },
  { id: 'a3', name: { EN: 'Proposal follow-up', GR: 'Follow-up πρότασης' }, trigger: { EN: 'Proposal sent · no reply 2d', GR: 'Πρόταση χωρίς απάντηση 2η' }, action: { EN: 'Send reminder email', GR: 'Αποστολή υπενθύμισης email' }, on: true, runs: 37 },
  { id: 'a4', name: { EN: 'Won → review request', GR: 'Κερδισμένο → αίτημα κριτικής' }, trigger: { EN: 'Deal marked Won', GR: 'Συμφωνία “Κερδισμένο”' }, action: { EN: 'Ask for a Google review', GR: 'Αίτημα για κριτική Google' }, on: false, runs: 18 },
  { id: 'a5', name: { EN: 'Missed call → text back', GR: 'Αναπάντητη → SMS' }, trigger: { EN: 'Missed phone call', GR: 'Αναπάντητη κλήση' }, action: { EN: 'Text back + create task', GR: 'Απάντηση SMS + δημιουργία εργασίας' }, on: true, runs: 54 },
];

export const TEAM: TeamMember[] = [
  { id: 'u1', name: 'Maria K.', role: { EN: 'Owner', GR: 'Ιδιοκτήτης' }, email: 'maria@go-ai.gr', perm: { EN: 'Full access', GR: 'Πλήρης πρόσβαση' }, status: 'active' },
  { id: 'u2', name: 'Alex D.', role: { EN: 'Sales', GR: 'Πωλήσεις' }, email: 'alex@go-ai.gr', perm: { EN: 'Deals & contacts', GR: 'Συμφωνίες & επαφές' }, status: 'active' },
  { id: 'u3', name: 'Sofia P.', role: { EN: 'Support', GR: 'Υποστήριξη' }, email: 'sofia@go-ai.gr', perm: { EN: 'Inbox & tasks', GR: 'Inbox & εργασίες' }, status: 'active' },
  { id: 'u4', name: 'Giorgos M.', role: { EN: 'Marketing', GR: 'Marketing' }, email: 'giorgos@go-ai.gr', perm: { EN: 'Reports only', GR: 'Μόνο αναφορές' }, status: 'invited' },
];

export const REVENUE: { m: Bilingual; v: number }[] = [
  { m: { EN: 'Jan', GR: 'Ιαν' }, v: 3.1 }, { m: { EN: 'Feb', GR: 'Φεβ' }, v: 4.0 }, { m: { EN: 'Mar', GR: 'Μάρ' }, v: 3.6 },
  { m: { EN: 'Apr', GR: 'Απρ' }, v: 5.2 }, { m: { EN: 'May', GR: 'Μάι' }, v: 6.1 }, { m: { EN: 'Jun', GR: 'Ιούν' }, v: 7.4 },
];

export const CHANNEL_ICON: Record<Channel, string> = { WhatsApp: 'MessageCircle', Email: 'Mail', Call: 'Phone', Web: 'Globe', Instagram: 'Instagram' };
export const ACT_ICON: Record<ActType, string> = { whatsapp: 'MessageCircle', email: 'Mail', call: 'Phone', note: 'StickyNote' };
export const PROPOSAL_LABEL: Record<ProposalStatus, Bilingual> = {
  none: { EN: '—', GR: '—' }, draft: { EN: 'Draft', GR: 'Πρόχειρο' }, sent: { EN: 'Sent', GR: 'Στάλθηκε' }, accepted: { EN: 'Accepted', GR: 'Αποδεκτή' },
};

export function toneStyle(tone: Tone): { bg: string; color: string; border: string } {
  if (tone === 'hot') return { bg: 'rgba(220,38,38,0.10)', color: '#dc2626', border: 'rgba(220,38,38,0.25)' };
  if (tone === 'warm') return { bg: 'color-mix(in srgb, var(--gold) 14%, transparent)', color: 'var(--gold)', border: 'color-mix(in srgb, var(--gold) 30%, transparent)' };
  return { bg: 'var(--surface-2)', color: 'var(--ink-3)', border: 'var(--line-2)' };
}
export const money = (n: number) => '€' + n.toLocaleString('el-GR');
