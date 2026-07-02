/* ============================================================
   GO AI — shared TypeScript types
   ============================================================ */

export type Lang = 'EN' | 'GR';

/** Bilingual content object used throughout the site content. */
export interface Bilingual {
  EN: string;
  GR: string;
}

/** Lucide icon name (kept as a string, e.g. 'Rocket'). */
export type IconName = string;

export type Group = 'website' | 'digital' | 'automation' | 'support';
export type Unit = 'oneoff' | 'month';

/* ---------------- Catalog ---------------- */
export interface CatalogItem {
  group: Group;
  icon: IconName;
  amount: number;
  recurring: boolean;
  unit: Unit;
  label: Bilingual;
  price: Bilingual;
  best: Bilingual;
  desc: Bilingual;
  popular?: boolean;
}

export type CatalogId = string;
/** A selectable id in the proposal store: a catalog id or the NOT_SURE marker. */
export type SelectableId = CatalogId;

/* ---------------- Site content (data/content.ts) ---------------- */
export interface ServiceItem { icon: IconName; title: Bilingual; description: Bilingual; features?: Bilingual[]; to?: string; }
export interface IndustryShort { icon: IconName; to?: string; label: Bilingual; tagline?: Bilingual; }
export interface StepItem { icon?: IconName; number: number; title: Bilingual; description?: Bilingual; body?: Bilingual; }
export interface PackageItem {
  cid?: CatalogId; name: Bilingual; price: Bilingual; unit?: Bilingual; period?: Bilingual;
  popular?: boolean; badge?: Bilingual | null; description: Bilingual; bestFor?: Bilingual; features?: Bilingual[];
}
export interface WebsiteCard { cid: CatalogId; icon: IconName; title: Bilingual; price: Bilingual; description: Bilingual; included?: Bilingual[]; }
export interface GrowthCard { cid: CatalogId; icon: IconName; title: Bilingual; description: Bilingual; }
export interface CategoryServiceItem { icon: IconName; title: Bilingual; description: Bilingual; included?: Bilingual[]; bestFor?: Bilingual; }
export interface Category { label: Bilingual; description: Bilingual; services: CategoryServiceItem[]; }
export interface Diff { number: number; title: Bilingual; body: Bilingual; }
export interface IndustryBuild { icon: IconName; label: Bilingual; detail: Bilingual; }
export interface IndustryItem {
  id: string; icon: IconName; label: Bilingual; tagline: Bilingual;
  description: Bilingual; painPoint: Bilingual; builds: IndustryBuild[];
}
export interface PortfolioItem {
  name: string; industry: Bilingual; location: Bilingual; deliveredIn: Bilingual;
  url?: string; heroImage?: string; accentColor?: string;
}
export interface PortfolioStat { label: Bilingual; value: string; }
export interface ChatMessage { from: 'user' | 'bot'; text: Bilingual; time?: string; }
export interface EmailStep { day: Bilingual; label: Bilingual; subject: Bilingual; }
export interface FlowStep { icon?: IconName; label: Bilingual; detail?: Bilingual; }
export interface AutoSection {
  id?: string; icon?: IconName; title: Bilingual; description?: Bilingual;
  visual?: string; bullets?: Bilingual[]; cid?: CatalogId;
}
export interface SupportCard { icon: IconName; title: Bilingual; body?: Bilingual; description?: Bilingual; cid?: CatalogId; }
export interface NextStep { icon?: IconName; number?: number; title: Bilingual; body: Bilingual; }
export interface TrustSignal { icon?: IconName; label: Bilingual; }
export interface Faq { q: Bilingual; a: Bilingual; }

export interface SiteData {
  services: ServiceItem[];
  industriesShort: IndustryShort[];
  steps: StepItem[];
  packages: PackageItem[];
  heroProofKeys: string[];
  heroRotate: Bilingual[];
  websiteCards: WebsiteCard[];
  growthCards: GrowthCard[];
  categories: Category[];
  diffs: Diff[];
  industries: IndustryItem[];
  portfolio: PortfolioItem[];
  portfolioStats: PortfolioStat[];
  chatMessages: ChatMessage[];
  emailSteps: EmailStep[];
  flowSteps: FlowStep[];
  autoSections: AutoSection[];
  supportCards: SupportCard[];
  nextSteps: NextStep[];
  trustSignals: TrustSignal[];
  businessTypes: Bilingual[];
  faqs: Faq[];
}

/* ---------------- Proposal submission ---------------- */
export interface ProposalSelectedItem { id: string; label: string; }

export interface ProposalRequestInput {
  language: Lang;
  selectedProposalItems: ProposalSelectedItem[];
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phoneWhatsapp: string;
  businessType: string;
  location: string;
  existingWebsiteUrl: string;
  needsHelp: string;
  message: string;
}

export type SubmitResult = { ok: true; id: string } | { ok: false; error: string };

/* ---------------- Generation pipeline (Hermes sample sites) ---------------- */
export type GenerationStatus = 'queued' | 'building' | 'ready' | 'failed';

/** The normalized, length-capped lead the wizard produces and the generation
 *  agent consumes as its brief. Mirrors buildLead() in actions/submit-proposal. */
export interface ProposalLead {
  language: Lang;
  selectedProposalItems: ProposalSelectedItem[];
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phoneWhatsapp: string;
  businessType: string;
  location: string;
  existingWebsiteUrl: string;
  needsHelp: string;
  message: string;
  estOneoff: number;
  estMonthly: number;
  source: 'contact-wizard';
}

/** A single timestamped progress note streamed back by the generation agent. */
export interface GenerationEvent { at: string; message: string }

/** Result payload the VPS agent POSTs back to /api/generate/callback. */
export interface GenerationCallback {
  briefId: string;
  status: GenerationStatus;
  sampleUrl?: string;
  repoUrl?: string;
  jobId?: string;
  error?: string;
  /** True when the agent emailed the prospect the proposal (PDF + sample link). */
  proposalSent?: boolean;
  events?: GenerationEvent[];
}

/** One selected service, snapshotted from the live catalog at enqueue time so
 *  the VPS agent can render the proposal PDF without storing prices itself. */
export interface ProposalDataItem {
  id: string;
  label: string;
  priceLabel: string;
  desc: string;
  bestFor: string;
  features: string[];
  amount: number;
  recurring: boolean;
  groupTitle: string;
  note?: string;
}

/** Localized pricing/copy snapshot shipped with each generation job. */
export interface ProposalData {
  items: ProposalDataItem[];
  totals: { oneoff: number; monthly: number };
}
