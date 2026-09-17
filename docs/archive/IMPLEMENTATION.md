# SMC Website Implementation Brief

This document owns technical architecture, validation, checks, and acceptance. Read the files in the order defined by `README.md` before writing code. Do not infer the product from the repository name alone.

## 1. Objective

Build a premium, fast, accessible early-stage website for SMC that:

1. explains the organization within five seconds;
2. sends students to one real next step;
3. gives alumni and practitioners bounded ways to contribute;
4. feels distinctive without fabricating proof;
5. can be maintained by student officers;
6. remains useful when no projects, testimonials, partners, metrics, photos, or confirmed events exist.

The website is not a member portal, CRM, event manager, consulting marketplace, or proof that SMC has relationships with employers.

## 2. Read and privacy boundaries

Required reading:

1. `README.md`
2. `LAUNCH_INPUTS.md`
3. `CONTENT.md`
4. `DESIGN.md`
5. `WIREFRAMES.md`
6. this file

Private operations and contact files belong outside this public worktree. If an ignored `internal/` path appears locally, do not inspect, copy, import, enumerate, bundle, archive, or publish it. Never build pages from names or LinkedIn links found outside the public specification.

## 3. First-rung implementation decision

Before scaffolding, inspect the repository again.

- If a site implementation now exists, preserve its framework and reuse its patterns when they satisfy this brief.
- If the repository is still documentation-only, prefer a statically generated **Astro + TypeScript + native CSS** implementation.
- Use client JavaScript only for the mobile menu, optional FAQ enhancement, form feedback if a real form exists, and the restrained hero diagram.
- Do not add React, a component library, Tailwind, an animation package, a CMS, a database, authentication, or a state-management library unless an existing implementation already depends on it and removal would create more work.
- Use Sammy, Discord, and a university-approved external form for their native responsibilities.

Do not pin this brief to a framework version. Use the current stable version at implementation time and document it in the generated project files.

### Build modes

`scaffold` mode is allowed while launch inputs are unset:

- use only the neutral copy approved in `CONTENT.md`;
- show no event, application, program, partnership, or recognition claim without approved data;
- disable submissions and analytics;
- add `noindex, nofollow` and prevent the preview from being mistaken for production;
- make missing launch inputs obvious to developers, not public visitors.

`production` mode is blocked until every required gate in `LAUNCH_INPUTS.md` passes. The production build must validate those gates and fail with a readable list of missing/invalid values. Do not “temporarily” fill them with invented data.

## 4. Required routes

- `/` — homepage with Join and Contribute sections;
- `/join` — stable flyer/QR destination that resolves to the state-aware Join section without duplicating content;
- `/privacy` — truthful in both no-collection and collection states;
- custom `404` with the correct HTTP status.

An optional `/contribute` alias may resolve to the homepage Contribute section. Do not build full standalone Join/Contribute pages until real content exceeds the homepage. Do not build `/events`, `/work`, `/people`, `/alumni`, `/consulting`, `/resources`, or account routes at launch.

Redirect/alias behavior depends on the chosen static host. It must work with the approved origin and base path; do not assume root-domain hosting.

## 5. Required central content model

All approved facts, time-sensitive content, and destinations must flow from one typed configuration source populated from `LAUNCH_INPUTS.md`. No duplicated dates or CTA states across templates.

Conceptual contract:

```ts
type RecognitionState = "unknown" | "pending" | "recognized" | "inactive";

type ProjectApplications =
  | { state: "unavailable" }
  | { state: "planned"; target: string }
  | {
      state: "open";
      deadline: string; // ISO 8601 with UTC offset
      href: string;
      criteriaHref: string;
      responseBy: string; // ISO 8601 with UTC offset
    }
  | { state: "closed"; interestHref?: string };

type Event = {
  id: string;
  title: string;
  shortTitle: string;
  startsAt: string; // ISO 8601 with offset
  endsAt: string;   // ISO 8601 with offset
  location: string;
  audience: string;
  outcome: string;
  bring?: string;
  href: string;
  status: "scheduled" | "full" | "cancelled"; // "past" is derived from endsAt
  waitlistHref?: string;
  accessibilityNote: string;
  publicContact: string;
  contentOwnerRole: string;
  lastVerifiedAt: string; // ISO 8601 with offset
};

type Program = {
  name: string;
  description: string;
  state: "active" | "planned";
  ownerRole: string;
  timeline: string;
  nextOccurrence?: string; // required for active programs; ISO 8601 with offset
  href?: string;
};

type BaseSiteConfig = {
  displayName: string;
  expandedName?: string;
  descriptor: string;
  disclosure: string;
  recognitionState: RecognitionState;
  events: Event[];
  featuredEventId?: string; // reference events[]; never duplicate an Event
  projectApplications: ProjectApplications;
  programs: Program[]; // zero to three, in the approved order
};

type ScaffoldSiteConfig = BaseSiteConfig & {
  mode: "scaffold";
  publicEmail?: string;
  sammyUrl?: string;
  discordUrl?: string;
  joinFormUrl?: string;
  contributeFormUrl?: string;
};

type ProductionSiteConfig = BaseSiteConfig & {
  mode: "production";
  affiliationLanguageApproved: true;
  publicEmail: string;
  sammyUrl: string;
  discordUrl?: string;
  joinFormUrl?: string;
  contributeFormUrl?: string;
  origin: string;
  basePath: string;
};

type SiteConfig = ScaffoldSiteConfig | ProductionSiteConfig;
```

Names are illustrative, not an instruction to create layers of wrappers. One readable config file, one production validator, and a few small rendering helpers are enough.

### CTA derivation

Derive CTA state; do not store it separately:

1. A featured `scheduled` event starting within 14 days is primary.
2. A `full` featured event is primary only when a waitlist URL exists; otherwise show status text, not a dead CTA.
3. An open SMC Lab application is primary when no eligible near-term event takes precedence.
4. Otherwise the primary action is the approved community/Student path.
5. When both a near-term event and project applications are open, event is primary and the project application may be secondary.
6. `cancelled` and derived `past` events never drive the announcement, hero, or final CTA.

## 6. Safe missing-data behavior

Missing data is expected at the early stage.

- Missing event: hide date-specific UI and use the approved empty state.
- Missing Sammy link: omit the public control in scaffold mode and produce a developer-facing warning; production validation fails.
- Missing Discord link: omit Discord.
- Missing public email: production validation fails.
- No active programs: render zero programs. Planned programs render only after their planned-state gate passes.
- No photos: keep the intended text/SVG composition; never load stock placeholders.
- No projects, contributors, quotes, logos, or metrics: omit their evidence sections.
- Recognition `unknown`, `pending`, `recognized`, or `inactive`: use only the matching approved descriptor/disclosure/FAQ/metadata set.
- Missing approved affiliation language, production origin, base path, student action, or contributor contact path: production validation fails.

No public element may use a placeholder `href="#"`, `javascript:void(0)`, sample domain, or developer's personal address. Valid fragment links such as `/#join` and `/#contribute` are allowed when their targets exist and focus/scroll behavior is accessible.

## 7. Page composition

### Homepage

Use this order, omitting conditional modules that fail their gates and merging adjacent modules when clearer:

1. optional verified announcement;
2. site header;
3. hero and deterministic pathway/network SVG;
4. optional factual truth strip;
5. Why SMC editorial section;
6. optional value loop;
7. zero to three confirmed/planned-gated programs;
8. focus-area matrix;
9. optional approved early-stage invitation;
10. next-event section or honest empty state;
11. culture principles;
12. Join action;
13. contributor invitation;
14. FAQ;
15. final CTA and footer.

### Join section or minimal `/join` view

Render:

1. `Start by showing up` hero;
2. current recruitment/event state;
3. attend, Sammy/Discord, and project-role paths;
4. session expectations;
5. responsibility path;
6. project-selection explanation;
7. FAQ/contact.

General membership must not be presented as résumé-selected. A limited project role is not the same thing as RSO membership.

Officer elections/appointments follow the approved constitution; never imply that a website scoring process awards an office.

### Contribute section or later `/contribute` view

Render:

1. `A useful hour can change a student's trajectory` hero;
2. contribution options;
3. example time commitments;
4. what SMC handles;
5. representation/endorsement clarification;
6. verified contact or form.

### Privacy

Describe only actual behavior. Include:

- what is collected;
- why;
- service receiving it;
- who can access it;
- retention/deletion route;
- analytics behavior;
- public contact.

Use the exact no-collection scaffold copy or the approved collection-state copy in `CONTENT.md`. Do not paste a generic legal-policy generator output.

## 8. Component budget

Create a component only when it has reuse, nontrivial behavior, or a meaningful content boundary. Expected maximum set:

- `SiteHeader`
- `MobileMenu`
- `HeroPathways`
- `SectionIntro`
- `EvidenceStrip`
- `ValueLoop`
- `ProgramList` or `ProgramCard`
- `FocusMatrix`
- `EventCard`
- `FaqList`
- `FinalCta`
- `SiteFooter`

Do not turn every heading, paragraph, icon, or button into a component. A native `<a>` with a class is preferable to a polymorphic design-system abstraction at this stage.

## 9. Visual implementation

Follow the tokens and layout in `DESIGN.md`.

### CSS

- Define color, type, spacing, width, radius, transition, and focus tokens as custom properties.
- Use CSS Grid/Flexbox and fluid functions such as `clamp()`.
- Keep selectors shallow and class names readable.
- Prefer normal document flow over absolute positioning.
- No CSS framework is required.
- Dark and light surfaces must use explicit foreground tokens.
- Validate actual contrast; token names are not evidence.

### Type

- Use `Manrope` and `IBM Plex Mono` only if the fonts are legally and efficiently self-hosted or provided through an approved mechanism.
- Otherwise use the declared fallbacks without delaying launch.
- If SJSU directs the organization to use its official stack, follow that instruction instead.
- Prevent layout shift by supplying real font metrics/fallback behavior where practical.

### Hero diagram

- Inline deterministic SVG.
- A small fixed set of nodes and connections, including `BUILD`, `ANALYZE`, and `CONNECT`.
- It is decorative and cannot encode required information.
- One short entrance sequence is acceptable.
- No particle system, canvas framework, WebGL, generated random positions, or continuous CPU-heavy loop.
- Static under reduced motion and on compact/touch layouts.

### Imagery

- Ship without imagery if real, consented SMC photos are unavailable.
- When assets arrive, use responsive `srcset`/picture handling, AVIF or WebP where sensible, explicit dimensions, and correct alt behavior.
- Do not use scraped LinkedIn photos, company logos, generic handshakes, fake student images, or generated “team” photography.

## 10. Interaction behavior

### Header and mobile navigation

- Header remains readable at page top and after scroll.
- Unenhanced HTML exposes usable navigation with JavaScript disabled; JavaScript may progressively enhance it into the compact menu.
- Enhanced mobile menu uses a real button with accessible name and expanded state plus a visible close control.
- Menu opens into a predictable modal sheet/dialog, receives focus, makes the background inert, traps focus while modal, closes on Escape and backdrop activation, prevents background scroll, and returns focus to the trigger.
- Navigation works without the animated treatment.

### FAQ

Native `<details>/<summary>` is acceptable if styled accessibly and browser behavior is sufficient. Do not write a JavaScript accordion merely for abstraction.

### Forms

Prefer links to a real external form. If an on-site form is explicitly authorized:

- use visible labels;
- validate at the trust boundary/server or provider, not only in the browser;
- preserve values after errors;
- show field errors and a summary;
- prevent duplicate submissions;
- expose loading, success, and failure states;
- announce status accessibly;
- show an exact response window;
- never log submitted personal content to analytics or the console.

Do not ship a form until end-to-end delivery is tested with the receiving officers.

## 11. Accessibility contract

Target WCAG 2.2 AA and implement every accessibility requirement in `DESIGN.md`.

Minimum verification:

- automated audit with no serious/critical violations;
- complete keyboard-only path through every page and interaction;
- visible focus at all times;
- 200% browser zoom check;
- 320 CSS-pixel viewport check;
- reduced-motion check;
- screen-reader spot check for landmarks, navigation, hero, event, FAQ, and any form;
- contrast validation for each text/control state, not just default colors.

Test widths at minimum: `320`, `390`, `768`, `1024`, and `1440` CSS pixels. Support the current and previous major versions of Chrome, Edge, Firefox, and Safari, plus current iOS Safari and Android Chrome where available. Screen-reader spot checks should include NVDA with Chrome or Firefox on Windows and VoiceOver with Safari on an available Apple device; document any unavailable pair rather than claiming it passed.

A high automated score does not replace the manual checks.

## 12. Performance contract

- Static HTML for core content.
- Minimal client bundle and no site-wide hydration.
- No autoplay/background video.
- No animation dependency for basic transitions.
- No third-party embeds above the fold.
- No analytics until the privacy choice is explicit.
- Explicit media dimensions.
- No console errors or hydration warnings.
- Prelaunch lab check: production build, Lighthouse mobile preset/default throttling, three runs, median performance 90+ and applicable accessibility/best-practices/SEO scores 95+.
- Post-launch field goals after enough traffic exists: 75th-percentile LCP ≤ 2.5s, CLS ≤ 0.1, and INP ≤ 200ms.

If an effect threatens the budget, remove the effect.

## 13. Metadata and structured data

- unique title and description per route;
- production canonical URLs;
- Open Graph/Twitter-compatible metadata;
- approved social share image without unapproved university marks;
- favicon that does not misuse an SJSU mark;
- sitemap and robots behavior;
- no indexing for previews;
- origin and base path taken from validated production config, including GitHub Pages repository subpaths when applicable;
- `Organization` structured data only for verified facts;
- `Event` structured data only for confirmed public events and kept in sync with visible content.

## 14. Content truth checks

Before shipping, search case-insensitively for these terms and manually inspect every result:

```text
partner
client
rapidly growing
premier
elite
selective
consulting
guarantee
placement
```

No named employer from private source notes belongs on the launch site. In addition to the term search, manually audit every organization and logo. “Partner” and “client” require evidence and publication permission. “Selective” may describe a limited program only when accompanied by transparent criteria.

Also scan the built output for:

- personal names not deliberately approved for publication;
- LinkedIn URLs;
- personal email addresses;
- placeholder URLs;
- `TODO`, `TBD`, `lorem`, `example.com`, and literal placeholder `href="#"` links;
- unresolved bracket tokens matching a rule such as `\[[A-Z][A-Z0-9 _./:+-]*\]` in public application content;
- content from `internal/`.

Exclude the design documentation itself from the bracket-token scan; the scan applies to source that enters the public bundle and the built output.

## 15. Required checks before handoff

Use the project's smallest native commands. At minimum:

1. dependency/install integrity check;
2. typecheck;
3. production build;
4. lint/format check if configured;
5. internal-link and missing-asset check;
6. automated accessibility scan;
7. keyboard/reduced-motion/zoom manual checks;
8. mobile and desktop visual review;
9. form delivery test if a form exists;
10. truth-term and privacy scan from section 14.

Leave one runnable smoke test that covers the core conversion path:

> homepage loads → derived primary CTA has a real destination → Join content uses the approved governance state → Contribute content exposes a valid contact path → no forbidden proof section renders without data

Do not add a large testing framework only to satisfy this line if the chosen stack has a smaller native check.

## 16. Launch acceptance checklist

### Trust

- [ ] Three people unfamiliar with the project can state what SMC is, who it is for, and the next action after a five-second hero view; record misunderstandings and the approving officer's decision.
- [ ] Recognition language matches written current status.
- [ ] No fabricated metric, outcome, quote, partner, client, placement, or employer logo appears.
- [ ] Every event field and application state is confirmed.
- [ ] Planned programs are labeled or omitted.
- [ ] Public wording distinguishes open membership from limited project roles.
- [ ] No personal/internal data appears in source control or the built output.

### Functionality

- [ ] Every CTA reaches a valid, monitored destination.
- [ ] One central config derives announcement, header CTA, hero CTA, Join content, and final CTA without duplicating event or application data.
- [ ] Missing content creates a deliberate empty state or hides its section.
- [ ] Mobile navigation is complete and accessible.
- [ ] Forms, if any, deliver end to end and never fail silently.
- [ ] No dead links, placeholders, or console errors remain.

### Visual quality

- [ ] The named visual approver reviews desktop/mobile captures against `WIREFRAMES.md` and signs off that the result reads as an editorial technical institution rather than a generic template.
- [ ] Type, spacing, rules, and composition do most of the visual work.
- [ ] The hero SVG is restrained, deterministic, and nonessential.
- [ ] No fake imagery, random particles, gratuitous cards, or glow-heavy effects appear.
- [ ] Layouts at 320, 390, 768, 1024, and 1440 CSS pixels have been visually checked.

### Accessibility and performance

- [ ] Keyboard, focus, zoom, reduced-motion, and screen-reader spot checks pass.
- [ ] Automated accessibility results have no serious or critical issues.
- [ ] Text and control contrast has been measured.
- [ ] Core content works without nonessential JavaScript.
- [ ] Performance targets are met or any miss is documented with the exact cause.

### Operations

- [ ] Officers know where to change events and project-application state and how CTA precedence is derived.
- [ ] Public email and external links have named owners.
- [ ] Discord invite expiry/moderation behavior is known.
- [ ] Privacy text matches actual forms and analytics.
- [ ] A short update procedure is documented in the eventual site README.

## 17. Explicitly out of scope

- authentication or profiles;
- member directory;
- referral exchange;
- job board;
- private resources;
- custom calendar or RSVP system;
- internal officer dashboard;
- outreach CRM;
- consulting client intake/delivery system;
- payment, dues, sponsorship, or donation handling;
- blog/CMS;
- unapproved SJSU or employer branding;
- speculative program pages.

## 18. Handoff report format

When the implementation is complete, report:

1. what was built;
2. the exact routes and central content file;
3. the real URLs still required from officers;
4. verification commands and results;
5. accessibility/performance results and any limitations;
6. every remaining claim or brand-permission gate;
7. whether the finished public bundle contains any personal/internal data;
8. the commit created, without pushing unless separately authorized for that implementation session.
