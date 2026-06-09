# Codex review brief — GO AI website

You are doing an independent, adversarial code + UX review of a marketing website. Your job is to **find real bugs, regressions, edge cases, and quality problems** — and to **independently verify (or refute) a list of issues a previous audit already flagged**, then go deeper than it did. Be concrete: every finding must cite `file:line`, explain the impact, give a reproduction, and propose a fix. Do not rubber-stamp. Prefer fewer, real, verified findings over a long speculative list.

## The project
- **GO AI** — a bilingual (Greek default / English) marketing site for an agency that builds websites + WhatsApp/email automation for small businesses in Greece. The primary CTA channel is WhatsApp.
- **Stack:** Next.js 15.5 App Router, React 19, TypeScript (strict), no CSS framework — styling is a global `app/globals.css` design-system plus per-component scoped `<style>` blocks. Brand is "Electric Indigo"; supports light + `[data-theme="dark"]`.
- **i18n:** a runtime dictionary in `lib/i18n.ts` (a `T` object with `EN` and `GR` blocks) consumed through `useApp().t(key)` and `tr(bilingualObj)` from `lib/store.tsx`. Language + theme persist in `localStorage` (`goai_lang`, `goai_tweaks`). **Every page file is `'use client'`.**
- **Routes:** `app/page.tsx` (home), `app/services/page.tsx` (hub) + `app/services/[category]/page.tsx` (SSG: websites/digital/automation/support), `app/industries/page.tsx`, `app/portfolio/page.tsx`, `app/automation/page.tsx`, `app/contact/page.tsx`. `/contact` hosts a **mount-gated, multi-step proposal wizard** (`components/contact/ProposalWizard.tsx` + `steps.ts`) whose step persists in `localStorage` (`goai_cstep`); `/services` can deep-link into it.
- **Lead capture:** `app/actions/submit-proposal.ts` is a Server Action that does a best-effort Firestore write via `lib/firebaseAdmin.ts` but **always returns success ("bypass mode")** when Firebase env vars are absent — the wizard offers a WhatsApp fallback. Firebase credentials are NOT configured locally.
- **Assets:** `public/intro-video.mp4` (~9 MB) is hotlinked with `preload="auto"` autoplay on the `/services` and `/industries` heroes; portfolio/automation/home heroes hotlink Unsplash images via plain `<img>`; `public/santorini.jpg` is a CSS background wash.
- **Catalog:** `lib/catalog.ts` (`CATALOG` + `FEATURES`) drives services/pricing; `components/ui/Icon.tsx` maps names to `lucide-react` icons (unknown name → empty `<svg>`).

## Environment / how to run (Windows + PowerShell)
- `npm install`
- Typecheck: `npx tsc --noEmit`  (currently passes)
- Build: `npx next build`  (currently passes — 15/15 static pages)
- Dev: `npm run dev` (port 3000). Prod preview: `npx next start`.
- There is no test suite. There is no `.env` (Firebase will be in bypass mode — that's expected).
- Do **not** commit anything or run git write operations. Report findings only.

## TOP-PRIORITY task: reproduce, pinpoint, and fix the mobile hero horizontal overflow
A previous review confirmed via screenshots (Edge headless at 390 px) that **the hero headline is clipped on the right edge on `/services`, `/industries`, `/portfolio`, and `/contact`** (longer headlines), while `/` and `/automation` (shorter headlines) escape it. Suspected root cause: the shared hero (`.hero-split` / `.hero-copy` in `app/globals.css:304-318`). At `≤900px`, `.hero-copy { align-items: center }` with **no `max-width`/`width` constraint on its children**, so the `<h1>`/`<p>` flex items shrink-wrap to content width and a headline wider than the mobile container overflows; the hero `<section>` has inline `overflow:hidden`, which clips the right side. There is also **no global `overflow-x` guard** (`html, body`) anywhere in `globals.css`.

Please:
1. **Reproduce empirically.** Build + serve, open each route at 360/390/414 px (and a real device-emulation mode), and for each page log `document.documentElement.scrollWidth` vs `window.innerWidth`. Identify the *exact* element(s) whose box exceeds the viewport on each page (walk the DOM for `el.scrollWidth > innerWidth` / offsets past `innerWidth`). Don't stop at the hero — check the wizard, the `WizardProgress` bar, `BusinessDetailsForm` grid, the home "What we do" marquee (`.svc-track` duplicated list), the blurred `vw`-sized auroras, and any negative-offset float chips.
2. **State the precise cause** per page with `file:line`.
3. **Propose the minimal robust fix** (e.g. constrain `.hero-copy > *` to `max-width:100%` / `align-self:stretch` on mobile; add a global `overflow-x: hidden`/`clip` guard; cap any `vw` element). Verify the fix removes the overflow on every route at 360–414 px without regressing desktop.

## Independently verify + extend these already-flagged issues
Confirm or refute each (read the cited file), and if real, deepen it. Then look for what this list MISSED.

**SEO**
- No Open Graph / Twitter Card tags anywhere (`app/layout.tsx:10-22`) — WhatsApp/social shares render as a bare URL with no preview. (No 1200×630 share asset exists in `public/`.)
- Six routes are `'use client'` with no `metadata`/`generateMetadata`, so home/services/industries/portfolio/automation/contact all inherit one generic title+description (only `app/services/[category]` has unique tags). Verify and propose the server-wrapper split.
- No JSON-LD (Organization/LocalBusiness). No canonical URLs / hreflang for the EN-GR content. `metadataBase` falls back to `localhost:3000` and `NEXT_PUBLIC_SITE_URL` is undocumented in `.env.example`. Per-category metadata emits English on a `lang="el"` page. Sitemap lacks `lastModified`; robots has no env-gated `disallow` for previews.

**Security**
- `submit-proposal.ts` always returns success even when nothing is persisted → **silent lead loss** if Firebase isn't wired (`:64-72`). Verify the failure path and whether the UI's WhatsApp fallback actually triggers.
- Full PII payload is `console.log`-ed verbatim (`:31`) — data exposure + log injection.
- No security headers in `next.config.ts` (CSP/HSTS/X-Frame-Options/etc.). Server action does no email/URL/phone validation, no rate limiting, trusts client-sent item labels/ids. `components/ui/Button.tsx:39` uses `rel="noreferrer"` without `noopener` and forces `target="_blank"` on all hrefs incl. internal. Inline `<script dangerouslySetInnerHTML>` in layout (`:31`) will fight a future strict CSP.

**Accessibility**
- FAQ accordion (`components/contact/ContactFaq.tsx:15-21`) and the "see more" toggle (`components/contact/WizardServiceCard.tsx:16-31`) lack `aria-expanded`/`aria-controls` and keep collapsed content in the a11y tree.
- `BusinessDetailsForm.tsx` inputs lack `aria-invalid`/`aria-required`/`aria-describedby`; validation errors aren't programmatically linked or announced (`role="alert"`).
- Go further: keyboard operability of the custom step chips/selects, focus management between wizard steps, focus-visible coverage, color contrast of `--ink-3`, and whether reduced-motion is honored by every animation.

**Performance**
- ~9 MB `intro-video.mp4` eagerly downloaded (`preload="auto"`, autoplay, no poster) on TWO hero pages (`app/services/page.tsx:104`, `app/industries/page.tsx:122`) — quantify LCP impact on mobile and propose `preload="metadata"`+`poster`+lazy start.
- `next/image` is configured (`next.config.ts`) but never used — all images are plain `<img>` with no dimensions (CLS) and a fixed `w=1400` served to phones.
- `lucide-react` imported via the full `{ icons }` barrel (`components/ui/Icon.tsx:1`) with no `optimizePackageImports` — risk of shipping the whole icon set; quantify bundle impact.
- All pages `'use client'` (no RSC/streaming). Home marquee duplicates the list and animates a 72 s infinite `translateX` on mobile; large blurred `62vw` auroras animate on every hero. Assess CPU/jank on a low-end phone.

## Dimensions the previous audit could NOT verify — please cover these fresh
- **Functionality / edge cases:** trace the proposal wizard end-to-end — `localStorage` hydration & SSR-safety in `lib/store.tsx`, the `goai_cstep` clamp + the `/services → wizard` deep-link, per-step validation gating, the submit + WhatsApp fallback, and the empty/edge states (no items selected, back/forward, refresh mid-step, corrupt `localStorage`). Verify **all `t()` keys used across the app exist in `T`** (a missing key renders the raw key string) and **all catalog ids / `Icon` names referenced actually resolve** (unknown icon → invisible empty svg). Check every link/anchor and the portfolio demo URLs for dead/placeholder targets. Look for hydration mismatches (client-only values rendered during SSR).
- **i18n parity:** diff the `EN` vs `GR` blocks in `lib/i18n.ts` for **key parity** (any key in one block but not the other), find hardcoded user-facing English in components that should go through `t()`/`tr()`, and sanity-check the recently added keys (`svc_*`, `ind_*`, `pf_*`, `auto_*`, `prop_start`). Confirm `lang="el"` is correct given GR is the default and there's no per-locale routing.

## Output format
Return a single prioritized report:
- **Blockers / High / Medium / Low / Nit**, each entry as: `severity — file:line — one-line title — impact — repro — proposed fix`.
- A short **"what the previous audit missed"** section (new findings).
- A **mobile-overflow root-cause** section with the exact offending element(s) per route and the verified fix.
- Note anything you could NOT verify and why.
