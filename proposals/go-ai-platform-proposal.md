# GO AI Platform — Autonomous Sample-Site Generation & Operations

**Client proposal · Phase 2**

| | |
|---|---|
| **Prepared for** | Shane Kearley |
| **Prepared by** | AI Agents Plus · ai-agentsplus.com · hello@ai-agentsplus.com |
| **Date** | June 2026 |
| **Proposal ref** | AAP-PROP-2026-015 |
| **Investment** | **$3,500** (fixed, across 3 milestones) |

> *Note (internal): branding/parties carried over from the original `go-ai-hermes.pdf`. Adjust the "from/to" if this should go out under the GO AI name instead.*

---

## 01 · Executive summary

The GO AI website is now **live** — and it already does the first half of the original vision: a prospect completes a guided six-step brief, and a personalised proposal is captured and emailed to the team automatically. This phase adds the part that makes GO AI genuinely autonomous:

**Every enquiry is turned into a real, on-brand sample website — built, deployed live, and emailed to the prospect as a working link — with a single internal dashboard tracking every lead, proposal and build.**

If the prospect likes their sample, GO AI takes that draft and finishes it to a premium standard by hand. The principle stays the same as day one: **AI for speed, a human for quality.** A person signs off and finishes every site a customer actually pays for — the sample is the hook, not the final product.

**At a glance**
- Enquiry → personalised, hosted **sample website** → live link emailed to the prospect, automatically
- Built only from an **approved template library** (premium, never "generated")
- Each site lives in its **own GitHub repo and auto-deploys to Vercel** — so the team can take over and finish any site instantly
- **Operations dashboard** tracking every lead, proposal, build and status in one place
- Generation powered by the **Hermes agent loop running Kimi K2.6**, kept model-swappable
- Built **on top of the existing go-ai.gr stack** — no rebuild, no second platform

---

## 02 · What's already in place (Phase 1, delivered)

The current site already covers three of the eight original modules, at no further cost in this phase:
- **Structured intake** — the live six-step quote wizard captures business type, location, package, services, brand context and contact details.
- **Proposal capture** — a clean, validated brief is assembled from each submission.
- **Automated email delivery** — every enquiry is emailed to the team via Resend, with a Firebase record.

This proposal is therefore the **generation + operations layer** that sits on top — modules 4 through 8 of the original plan.

---

## 03 · What we'll build

| | Module | What it does |
|---|---|---|
| 01 | **Hermes generation agent (Kimi K2.6)** | On each brief, the agent generates the copy and section content for a personalised sample site. Model routed via AI Gateway, so it stays swappable. |
| 02 | **Approved template & design library** | A curated set of premium templates built from GO AI's existing design system — the layer that keeps every output on-brand and away from the generic "AI look." |
| 03 | **GitHub + Vercel auto-deploy** | Each sample is committed to its **own GitHub repo** and **auto-deploys to Vercel**, producing a live preview link. |
| 04 | **Automated sample email** | The live link is emailed to the prospect via Resend — "a free AI draft of your site; reply and we'll finish it." |
| 05 | **Human review & finish gate** | Samples are clearly labelled drafts; any site a customer wants is finished and published by hand. Quality is never automated away. |
| 06 | **Operations dashboard** | One control centre tracking every lead, proposal, sample link, build status and customer — with the agent reporting its actions back. |

---

## 04 · How it works

```
Prospect completes the 6-step brief on go-ai.gr
        │
        ▼  (the brief is already captured + emailed today)
Generation agent  ── Hermes loop · Kimi K2.6 ──┐
        │   1. Brief → on-brand content (EN/GR) │
        │   2. Fill an approved premium template │
        │   3. Build & validate in a sandbox      │ (only proceed if it builds)
        ▼                                          │
Push to a per-customer GitHub repo  ───────────────┘
        │
        ▼  Vercel auto-deploys on push
Live sample URL  →  emailed to the prospect (Resend)
        │
        ▼
Operations dashboard logs the lead, link & build status
        │
        ▼
Prospect likes it → GO AI clones the repo, finishes & publishes the paid site
```

**On deployment (the key mechanic):** Vercel auto-deploys any repo connected to it — every push to a branch produces a live preview URL automatically. So each sample gets its **own GitHub repository**; the agent commits the generated site, Vercel builds and hosts it, and the link is sent. This is deliberate: when a prospect says yes, the developer simply **clones that repo and keeps working** — every push redeploys, no migration, no re-import. The generated code is built and validated in an isolated sandbox first, so only a working site is ever pushed.

---

## 05 · Technical approach

A modern, scalable stack — and almost all of it is already running.

- **Application & dashboard** — Next.js · React · TypeScript (the existing site + a new internal `/admin` area)
- **Generation agent** — Hermes agent loop running **Kimi K2.6** (via AI Gateway / OpenRouter), kept model-swappable
- **Design system** — GO AI's existing tokenised components, so every output is premium and consistent
- **Build & deploy** — Vercel (isolated build sandbox + per-repo auto-deploy, preview URLs, SSL)
- **Source control** — GitHub: a `goai-sites` organisation with one base template repo and a per-customer repo for each build
- **Data & dashboard** — Firebase (the existing store), extended with build status and an agent event log
- **Email** — Resend (already configured for proposal email)

---

## 06 · How I'll implement it

Three milestones, each ending in something you can review and sign off before the next begins.

**Milestone 1 — Generation engine + first live sample**
Stand up the agent loop (Hermes + Kimi K2.6) and one curated premium template. Wire it to the existing brief so a real enquiry produces a personalised sample that builds, deploys to Vercel and emails a live link.
*Reviewable: one real brief → a live, on-brand sample site in your inbox.*

**Milestone 2 — Template library, tiering & auto-deploy pipeline**
Expand to a small library keyed to the chosen package and business type; per-customer GitHub repos + Vercel auto-deploy; bilingual (EN/GR) output; build validation, retries and a safe fallback; the human review/finish gate.
*Reviewable: varied briefs reliably produce on-brand samples, each in its own auto-deploying repo.*

**Milestone 3 — Operations dashboard + hardening & handover**
The internal dashboard: every lead, proposal, sample link, build status and the agent's event log, behind team login. Final hardening, documentation and handover.
*Reviewable: production-ready pipeline + dashboard, fully documented.*

**Timeline:** approximately **3 weeks** end to end (faster than a from-scratch build because intake, proposal and email already exist).

---

## 07 · Quality, security & ownership

- **Premium, never generated** — the agent only fills approved templates; it never invents layout or styling. Every paid site is finished by a human.
- **Security** — all API tokens server-side only, least-privilege Vercel/GitHub access, no credentials in source control, generated code built in isolation.
- **Privacy** — GDPR principles by default; the brief data stays in your own Firebase.
- **Ownership & handover** — full source code, the template library, and runbooks transferred to you. No lock-in.

---

## 08 · Investment

A fixed price for the full Phase-2 build, paid per milestone on sign-off.

| Milestone | Scope | Price |
|---|---|---|
| 01 | Generation engine + first live sample | $1,500 |
| 02 | Template library, tiering & auto-deploy pipeline | $1,200 |
| 03 | Operations dashboard + hardening & handover | $800 |
| | **Total** | **$3,500** |

*Per-site finishing (the manual premium build for customers who buy) and ongoing hosting are operational and handled separately, as agreed. Generation running costs (LLM + build) are low and pay-as-you-go.*

---

## 09 · What I'll need from you

- **Vercel** team access (the deployment target for generated sites)
- **GitHub** access to create the `goai-sites` organisation and per-customer repos
- An **AI Gateway / Kimi (Moonshot or OpenRouter)** API key — or I provision and bill it through
- **Resend** — already configured ✓
- **Brand assets + one seed template design** to anchor the approved library
- A single **decision-maker** for milestone sign-off

---

## 10 · Next steps

1. **Review** — share any adjustments so the scope fits exactly.
2. **Sign-off** — confirm the engagement against the three milestones.
3. **Kick-off** — finalise access (Vercel, GitHub) and the seed template.
4. **Build & deliver** — milestone by milestone, each reviewed before the next begins.

*AI Agents Plus · AI development & automation · Proposal AAP-PROP-2026-015 · June 2026 · Confidential*
