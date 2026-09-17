# SMC Public Website Design Specification

Status: **scaffold-ready design; production launch blocked by `LAUNCH_INPUTS.md`**<br>
Audience: SMC officers, designers, writers, and the website implementation agent<br>
Last factual review: **September 1, 2026**

This document owns product strategy, information architecture, visual behavior, interaction, and accessibility. `CONTENT.md` owns exact public words, `LAUNCH_INPUTS.md` owns approved facts/states/URLs, and `IMPLEMENTATION.md` owns technical architecture and verification. Safety constraints apply across all files; do not guess through a conflict.

---

## 1. Executive direction

### 1.1 The real product

SMC is not valuable because it calls itself selective, intelligent, or connected. It becomes valuable when it repeatedly causes this loop:

> Attend → contribute → build proof → earn trust → encounter opportunities → help the next cohort

The website's job is to make that loop understandable and easy to enter. It should attract serious students, give alumni and practitioners a bounded way to help, and show faculty that the organization is educationally credible and responsibly operated.

### 1.2 Recommended positioning

**Category:** Student-led technical collective and career community<br>
**Domains:** Applied mathematics, software engineering, AI/ML, and quantitative finance<br>
**Mechanism:** Working sessions, project teams, peer mentorship, and focused practitioner involvement<br>
**Outcome:** Technical depth, visible work, better career navigation, and durable relationships

Positioning statement:

> SMC is a student-led technical collective at San José State where ambitious students solve hard problems, build work worth showing, and help one another pursue consequential careers.

Mission:

> Bring ambitious SJSU students together to develop technical depth, produce demonstrable work, and create a culture of mutual opportunity.

Vision:

> Make SJSU one of the best places for ambitious technical students to find collaborators, launch meaningful careers, and build relationships that endure beyond graduation.

### 1.3 The launch promise

Present SMC as an **early-stage community**, not a finished institution. The honest promise is access to the room, a clear standard, and a structure for producing real work. It is not guaranteed access to famous employers. Use “founding cohort” only if `LAUNCH_INPUTS.md` confirms SMC is genuinely new; otherwise use “help shape what SMC becomes” or name the first specific program cohort.

Public framing:

> SJSU already has ambitious, capable students. SMC helps them find one another, do serious work together, and keep opening doors for the people who follow.

### 1.4 Strategic principles

1. **Work before prestige.** Demonstrate standards through artifacts and behavior, not adjectives.
2. **Contribution before access.** Relationships grow from repeated usefulness and earned trust.
3. **Open door, earned responsibility.** SJSU students can join the community; limited roles are awarded through transparent, relevant criteria.
4. **Specific before expansive.** One recurring session and one excellent project lab beat six imaginary programs.
5. **Proof before promotion.** Do not publish a partner, result, testimonial, or statistic until evidence and permission exist.
6. **Durability before hype.** Build practices a new executive team can inherit.

---

## 2. Identity and naming

### 2.1 Working identity

Until the organization completes a naming decision, use:

- **Display name:** `SMC`
- **Neutral preview descriptor:** `A technical community being built by SJSU students`
- **Primary campaign line:** `Ambition compounds here.`
- **Supporting line:** `Solve hard problems. Build real work. Move forward together.`

Do not expand the acronym in the main navigation until the officers settle the official name. Do not ship even the neutral descriptor until an officer confirms it is factually true; state-specific approved descriptors live in `CONTENT.md` and the selected one belongs in `LAUNCH_INPUTS.md`.

### 2.2 Recommended long-term name

**Spartan Math Collective** is the strongest bridge from Spartan Math Club. It preserves SMC, stays honest about the organization's roots, and can house software, ML, and finance programs without claiming a consulting practice that does not yet exist.

Possible brand architecture:

- SMC — the umbrella community
- SMC Sessions — weekly open meetings and workshops
- SMC Lab — time-bounded project teams
- SMC Circles — peer career practice in software, AI/ML, and quant
- SMC Showcase — public demonstration of completed work
- SMC Studio — future partner work, only after real engagements exist

Avoid public names containing “Elite,” “Mensa,” “Top Talent,” or similar status claims. Avoid “Consulting” until SMC has actual external clients, scoped engagements, accountable delivery teams, and completed work.

### 2.3 Tagline decision

Use **“Ambition compounds here.”** It communicates shared momentum, subtly references mathematics and finance, and describes a mechanism rather than claiming superiority.

“Be the best around the best” may remain an internal rallying phrase, but it should not lead the public brand. It is generic, status-centered, and can repel capable students who value humility.

The `Best(x,S)` expression may appear only as a small visual Easter egg. It must never replace a plain-language explanation or carry essential meaning. A mathematics member must verify the notation before publication.

---

## 3. Organization model reflected by the site

### 3.1 Participation layers

The public experience must distinguish membership from limited-capacity responsibilities.

#### Layer 1 — Open community

Available to SJSU students:

- weekly sessions;
- public workshops and speaker events;
- Sammy membership;
- general Discord channels and shared resources;
- classroom announcements and campus outreach.

Public message:

> Curiosity gets you in the room. Contribution earns responsibility.

#### Layer 2 — Contribution

Earned through reliable participation:

- helping run sessions;
- publishing resources;
- peer mentorship;
- volunteering at events;
- participating in career circles.

#### Layer 3 — Limited project roles

SMC Lab teams may select for role readiness, relevant skills, capacity, and demonstrated follow-through. Criteria must be written in advance, applied consistently, and reviewed with Student Involvement. Referral or friendship must never bypass the criteria.

#### Layer 4 — Stewardship

Officer leadership is elected or appointed under the approved constitution and SJSU requirements. Contribution, reliability, judgment, and institutional care may inform lawful nominations or appointments, but they do not replace the constitution. Operational and key access follows role need and a documented handoff—not résumé prestige.

### 3.2 Initial program set

Only advertise a program after it passes the evidence gate in `LAUNCH_INPUTS.md`. Hidden is the default. Render zero to three programs in the fixed order below.

1. **Weekly Sessions** — technical workshops, collaborative problem-solving, career discussions, and project work.
2. **SMC Lab** — proposed six-to-eight-week project cycle ending in a public artifact and review.
3. **Career Circles** — recurring peer preparation for software, AI/ML, and quantitative careers.
4. **Alumni Sessions** — time-bounded talks, reviews, office hours, or mentorship.
5. **Showcase** — a demo night or online release for completed work.

No live program is assumed. Sessions may become the first active program after their owner, cadence, and next occurrence are confirmed. SMC Lab and Career Circles remain hidden unless their planned or active publication gates are complete.

---

## 4. Audiences and conversion goals

### 4.1 Prospective member — primary

Likely majors include mathematics, statistics, computer science, data science, engineering, economics, and finance, but participation cannot depend on major.

Questions the site must answer within 30 seconds:

- What is SMC?
- What do members actually do?
- Is this for someone like me?
- Do I need an impressive résumé?
- When and where is the next event?
- What happens after I join?

Primary conversion: **open the confirmed next-event or Sammy page**

Secondary conversion: **join Discord or the interest list**

### 4.2 Alumni or practitioner — secondary

They need evidence of seriousness and a respectful, bounded ask.

Useful contribution choices:

- lead one focused session;
- review a project or technical write-up;
- hold a small office-hours session;
- propose a real, non-confidential problem;
- mentor a project team for a defined period.

Primary conversion: **submit a short contribution/speaker interest form or email SMC**

### 4.3 Faculty or campus supporter

They need to see educational value, open membership, responsible governance, and accurate SJSU affiliation.

Primary conversion: **contact the officers or recommend a student/resource**

### 4.4 Companies — later-stage audience

Do not make companies a primary launch audience. Add a client-services path only after SMC can scope, staff, supervise, and deliver work reliably.

---

## 5. Launch scope and information architecture

### 5.1 Minimum launch routes

Build the smallest credible site:

- `/` — complete public landing experience with `About`, `Programs`, `Events`, `Culture`, `Join`, and `Contribute` anchors;
- `/join` — a stable flyer/QR destination that resolves to the homepage join section or a minimal state-aware join view without duplicating content;
- `/privacy` — a short truthful disclosure even when the site collects nothing;
- custom `404`.

An optional `/contribute` alias may resolve to the homepage contribution section for direct outreach. Do not create separate full Join or Contribute pages until the homepage version is too constrained by real content. Do not build a CMS, member portal, login system, internal directory, or custom event manager.

### 5.2 Routes withheld until proof exists

- `/work` — release with the first credible artifact or case study;
- `/people` — release only after member consent and consistent photography;
- `/alumni` — release when actual alumni involvement exists;
- `/consulting` — release only with a real delivery model and approved public relationships;
- a standalone `/contribute` page — release when recurring external participation needs more than the homepage section;
- `/resources` — release after curated resources exist and have an owner.

### 5.3 Navigation

Desktop order:

`SMC` | `About` | `Programs` | `Events` | `Culture` | `Contribute` | **`Join SMC`**

Mobile:

- logo/wordmark on the left;
- menu button on the right with visible “Menu” text or an accessible name;
- full-height sheet with the same order;
- primary CTA remains visually dominant but does not obscure content.

The unenhanced HTML must expose usable navigation even when JavaScript is unavailable—for example, a compact wrapped link list or a progressively enhanced disclosure. When JavaScript upgrades it to a modal sheet, provide a visible close control, correct dialog/modal semantics, background inertness, scroll locking, Escape-to-close, and focus return.

The header becomes a lightly blurred solid surface after the first 48–64 pixels of scrolling. It must not use an unreadable transparent state over variable content.

---

## 6. Homepage specification

The homepage must tell one coherent story: **the talent exists, SMC creates the environment, members do the work, and visitors can take a concrete next step.**

The subsections below are a module inventory, not an instruction to render every block. The minimum coherent page is header, hero, Why SMC, focus areas, culture, one Join action, the contributor invitation, FAQ, final CTA, and footer. Announcement, truth strip, value loop, programs, early-stage invitation, and event modules render only when their evidence/content gates add real information. Merge adjacent modules when that produces a shorter, clearer page.

### 6.1 Global announcement slot

Purpose: promote the next verified event or application window.

Format:

`Next: [event title] · [weekday, month day] · [time + timezone] · [location] →`

Rules:

- render only when every field and destination URL is confirmed;
- never infer a year or weekday from legacy notes;
- render only a scheduled event within the configured 14-day horizon;
- hide the bar after the event end time through a tiny client-side enhancement, then remove it from generated HTML on the next content rebuild;
- otherwise omit the slot completely; there is no generic/no-event announcement bar.

### 6.2 Hero

Eyebrow:

Use the approved descriptor for the current recognition state from `CONTENT.md` and `LAUNCH_INPUTS.md`. The neutral scaffold may use:

> A technical community being built by SJSU students

Headline:

> Ambition compounds here.

Body:

> SMC brings driven students together to solve hard problems, build work worth showing, and help one another pursue careers in software, machine learning, quantitative finance, and beyond.

Primary CTA priority:

1. `Attend the next session` when a scheduled, non-full event occurs within 14 days;
2. `Join the waitlist` when a full event has a verified waitlist URL;
3. project-application CTA when applications are open and no near-term event takes precedence;
4. otherwise `Join the community`.

Secondary CTA:

`How SMC works`

Supporting line:

> Rooted in mathematics. Open to serious builders across disciplines.

Hero visual:

- a restrained SVG “network field” built from a small number of points, paths, and labels;
- three labeled attractors: `BUILD`, `ANALYZE`, `CONNECT`;
- connections subtly form as the page loads or cursor enters the field;
- no WebGL, physics library, random particles, or ambient animation dependency;
- a static, visually complete fallback for `prefers-reduced-motion` and small screens;
- decorative SVG is hidden from assistive technology.

The visual is metaphor, not a data visualization. It must not imply actual member or company counts.

### 6.3 Truth strip

Use descriptive anchors instead of invented metrics:

- `Working sessions [confirmed cadence]`
- `Software · AI/ML · Quant`
- the approved campus-status phrase from `LAUNCH_INPUTS.md`

Once verified evidence exists, this strip may evolve into dated numbers. Until then, no animated counters.

### 6.4 Why SMC exists

Headline:

> Talent is already here. Density is missing.

Copy:

> At a university this large, ambitious students can spend years without finding one another. SMC makes those collisions deliberate—and grounds them in repeated work, useful feedback, and earned trust.

Visual treatment: a two-column editorial block with an oversized pull phrase, not three generic icon cards.

### 6.5 Value loop

Show the organizational mechanism as a connected sequence:

1. **Show up** — enter through a session or event.
2. **Contribute** — solve, teach, organize, or help.
3. **Build proof** — create work others can inspect.
4. **Earn trust** — become known for reliability and judgment.
5. **Compound** — share knowledge and opportunity with the next person.

Desktop: horizontal sequence with one continuous rule.<br>
Mobile: vertical list; no forced horizontal scrolling.

### 6.6 Programs

Render zero to three cards in this fixed order. Each visible card must satisfy its publication gate:

#### Weekly Sessions

> Work through hard problems, learn practical tools, and meet peers who take improvement seriously.

Status badge must be data-driven: `Active`, `Next date coming soon`, or hidden.

#### SMC Lab

> Small teams turn a scoped question into code, analysis, research, or a public technical artifact.

Label `In development` only when the planned-state gate is complete. Otherwise hide it. Never write as if active when it is merely proposed.

#### Career Circles

> Practice the technical and strategic skills behind software, AI/ML, and quantitative careers with peers who follow through.

Omit if there is no owner and cadence.

Do not add separate pages for thin programs. Each card can expand inline or link to a single shared program section later.

### 6.7 Discipline matrix

Present domains as overlapping lenses, not departments:

- **Software** — systems, algorithms, product engineering, and interview practice;
- **AI/ML** — modeling, experimentation, research literacy, and applied systems;
- **Quantitative Finance** — probability, markets, data, and disciplined decision-making;
- **Applied Mathematics** — the common language connecting the work.

Use a compact matrix or intersecting rules. Avoid four unrelated stock-photo cards.

### 6.8 Early-stage invitation

Headline:

> Help shape what SMC becomes.

Copy:

> SMC is building its next chapter. Students who contribute now can help establish the working rhythm, shape the first project cycle, and create systems future members inherit.

If `LAUNCH_INPUTS.md` proves the organization itself is genuinely new, `CONTENT.md` may supply a founding-community variant. If SMC continues an existing club, use the copy above or identify the first specific SMC Lab cohort. Use this section instead of empty testimonials, fake employer logos, or a self-congratulatory team grid.

### 6.9 Events

Sammy is the canonical campus event surface. The website should show at most the next three confirmed events and link to the SMC Sammy group or event page.

Each event needs:

- title;
- complete date with year;
- local time and timezone;
- campus building/room or virtual label;
- one-sentence outcome;
- RSVP/source link;
- optional accessibility/contact note.

Event states:

- `scheduled` — show RSVP CTA;
- `full` — show a verified waitlist CTA when one exists, otherwise show `Full` as text with no dead control;
- `cancelled` — show the cancellation prominently and remove recruitment CTAs;
- `past` — derive from `endsAt`, never feature in the announcement or hero, and remove from generated HTML on the next content update.

Because the preferred site is static, the event owner must publish/redeploy after a change and no later than the post-event deadline in `LAUNCH_INPUTS.md`. A small client enhancement may hide an expired announcement immediately, but it does not replace source maintenance.

If there are no confirmed events, show:

> The next session is being scheduled. Join SMC on Sammy or Discord to get the announcement first.

Never display the legacy text “Monday 9/6” without reconfirmation; September 6, 2026 is a Sunday.

### 6.10 Culture

Headline:

> High standards. Low ego.

Five principles:

- **Arrive curious.** You do not need a polished résumé to enter.
- **Follow through.** Reliability is the foundation of trust.
- **Make work visible.** Share code, reasoning, drafts, and lessons.
- **Give more than status.** Teach, introduce, review, and document.
- **Bring others forward.** A network compounds when its benefits circulate.

This section must feel invitational and demanding at the same time. It cannot describe intelligence as an identity.

### 6.11 Contributor invitation

Headline:

> Teach what you know. Review a project. Open one useful door.

Copy:

> Alumni and practitioners can contribute without signing up for an indefinite commitment. Lead a focused session, review a team's work, hold office hours, or bring us a well-scoped problem.

CTA: `Explore ways to contribute`

Do not display employer logos or describe an individual contact as an institutional relationship.

### 6.12 FAQ

Include at least:

- Who can join?
- Do I need to be a math major?
- Is SMC a consulting club?
- Do I need prior experience?
- How do project teams work?
- When does SMC meet?
- How can alumni or practitioners help?
- Is SMC officially affiliated with SJSU?

Answers are supplied in `CONTENT.md` and must be updated after the naming and recognition decisions.

### 6.13 Final conversion

Headline:

> Find your people. Raise the standard together.

Primary CTA: `Attend the next session` or `Join SMC`

Secondary CTA: `Contribute as an alum or practitioner`

### 6.14 Footer

Required:

- SMC display name and accurate descriptor;
- SJSU/Sammy link;
- Discord link only when active and stable;
- organization email;
- privacy link;
- current year;
- the approved state-specific affiliation/disclaimer copy from `CONTENT.md` and `LAUNCH_INPUTS.md`.

The exact disclaimer and use of the SJSU name must be confirmed with Student Involvement before launch.

---

## 7. Expanded Join view — optional

### 7.1 Goal

Turn interest into a clear first action without performing exclusivity.

### 7.2 Page sequence

1. **Hero:** `Start by showing up.`
2. **Choose a path:** attend a session, join on Sammy, join Discord, or express project interest.
3. **What to expect:** cadence, meeting format, preparation, code of conduct.
4. **How responsibility is earned:** participation, contribution, and project selection; officer selection remains governed by the constitution.
5. **Early-stage note:** what help is needed now, without an unverified founding claim.
6. **FAQ and contact.**

### 7.3 Form policy

Prefer an official Sammy flow or a short university-approved form over building a database. Collect only what has an immediate use:

- name;
- SJSU email;
- academic area/year, optional where policy permits;
- interests;
- preferred first action;
- optional link to work for project-role interest;
- consent to receive SMC communication.

Do not collect GPA, race, disability, immigration status, demographic data, private phone numbers, or prestige proxies for general membership. Do not request a résumé merely to join the open community.

After submission, show the actual next step and expected response time. Never leave a generic “Thanks, we'll be in touch.”

---

The launch homepage contains this material. Use a standalone `/join` view only when it improves a stable flyer/QR flow without duplicating state or copy.

## 8. Expanded Contribute view — optional

### 8.1 Goal

Convert vague networking ambition into narrow, credible collaboration asks.

### 8.2 Page sequence

1. **Hero:** `A useful hour can change a student's trajectory.`
2. **Ways to help:** session, office hours, review, mentorship, problem brief.
3. **Time expectations:** examples such as 45-minute talk + Q&A or one project review.
4. **What SMC handles:** scheduling, student preparation, facilitation, follow-up, consent.
5. **What SMC does not claim:** no employer endorsement, recruiting promise, or confidential work requirement.
6. **Interest form/contact.**

### 8.3 Future project-partner path

The launch homepage contains this material. Use a standalone `/contribute` view only when recurring external activity justifies it. Do not offer consulting services at launch. Once a supervised delivery process exists, add a separate project inquiry with:

- problem statement;
- intended users/outcome;
- data and confidentiality constraints;
- eight-week feasibility;
- required skills;
- partner point of contact;
- permission rules for publishing a case study.

---

## 9. Visual system

### 9.1 Creative direction

**Editorial precision meets Bay Area technical utility.**

The site should feel like a serious research collective crossed with a small, excellent product studio. It should not resemble a hedge-fund cosplay site, generic student-club template, neon AI startup, or luxury fashion brand.

Desired attributes:

- composed;
- intelligent;
- exact;
- human;
- quietly ambitious;
- visibly student-built, but not amateur.

### 9.2 Logo/wordmark

Launch with a typographic `SMC` wordmark and descriptor, subject to approval. Do not invent a Spartan helmet, recolor an SJSU mark, or combine university marks with the wordmark.

The wordmark can use a simple structural motif: three letters separated or joined by a single baseline/network rule. It must remain legible at 24 pixels and in one color.

Before public use, confirm permissions with Student Involvement and University Marketing and Communications.

### 9.3 Color tokens

Use a restrained palette anchored in SJSU colors while avoiding inaccessible combinations.

| Token | Value | Use |
|---|---:|---|
| `ink-950` | `#07111F` | Primary dark background and headings |
| `ink-800` | `#17263A` | Secondary dark surface |
| `paper-50` | `#F7F6F1` | Warm page background |
| `white` | `#FFFFFF` | Text on dark/blue and clean surfaces |
| `sjsu-blue` | `#0055A2` | Primary link and CTA on light surfaces |
| `blue-hover` | `#003F7A` | Darkened interactive blue |
| `focus-on-light` | `#0055A2` | Focus indicator on paper/white surfaces |
| `focus-on-dark` | `#8AC4FF` | Focus indicator on ink/blue surfaces |
| `sjsu-gold` | `#E5A823` | Decorative accent only |
| `slate-600` | `#586779` | Secondary text after contrast check |
| `line-200` | `#D9DEE5` | Rules and borders |
| `success` | `#167A5B` | Confirmed/active status with text label |

Rules:

- white text on blue and blue text on white are acceptable starting combinations;
- never use gold text on white or blue, white text on gold, or blue text on gold;
- gold cannot be the only signal for an interactive or status element;
- focus tokens must be selected by surface and retain at least 3:1 contrast against adjacent colors;
- every final token pairing must pass WCAG contrast checks in the implementation.

### 9.4 Typography

Recommended independent-site stack, pending brand approval:

- **Display and body:** `Manrope`, variable, locally optimized;
- **Technical labels and formula accents:** `IBM Plex Mono`;
- **Fallback:** `Arial`, `Helvetica`, `sans-serif`.

If SJSU requires its official web stack, switch body type to `Nunito Sans, Verdana, sans-serif` and use the SJSU Spartan typeface only where permission and licensing allow.

Typography scale at desktop:

- display: `clamp(3.25rem, 8vw, 7.5rem)`, tight but non-overlapping line height;
- H1 on internal pages: `clamp(2.75rem, 6vw, 5.5rem)`;
- H2: `clamp(2rem, 4vw, 3.75rem)`;
- H3: `clamp(1.25rem, 2vw, 1.75rem)`;
- body large: `clamp(1.125rem, 1.6vw, 1.375rem)`;
- body: `1rem–1.0625rem`;
- label: `0.75rem–0.8125rem`, never smaller than `12px`.

Keep paragraphs around 55–72 characters. Do not set long passages in centered text or all caps.

### 9.5 Layout

- maximum content width: `1280px`;
- reading width: `720px`;
- desktop grid: 12 columns;
- tablet: 8 columns;
- mobile: 4 columns;
- outer gutter: `clamp(20px, 4vw, 64px)`;
- section spacing: `clamp(72px, 10vw, 144px)`;
- 8px base spacing rhythm with optical exceptions;
- borders and whitespace establish hierarchy before shadows.

Use occasional oversized section numbers (`01`, `02`, `03`) and hairline rules to create an editorial rhythm. Do not put every concept in a rounded card.

### 9.6 Surfaces and shape

- default corner radius: `8px`;
- large media radius: `12px`;
- pills only for short statuses or filters;
- one subtle shadow level, reserved for overlays;
- no glassmorphism stacks, glowing borders, or floating gradient blobs;
- use dark sections deliberately, not for the entire page.

### 9.7 Photography

The design must work without photography at first. When imagery is added:

- use real SMC sessions, whiteboards, code reviews, working tables, and speaker interactions;
- show people doing, teaching, or debating rather than posed suit-and-tie portraits;
- obtain consent/releases before publication;
- write useful alt text;
- avoid generic office stock photography and unauthorized company/campus imagery;
- keep a consistent natural-light, documentary treatment.

### 9.8 Iconography and diagrams

Use simple line icons only where they improve scanning. Prefer labels, rules, matrices, and small diagrams. Mathematical notation is texture, not a substitute for communication.

---

## 10. Motion and interaction

### 10.1 Motion principles

Motion should explain hierarchy or relationship. It must never delay access to content.

- entrance transitions: opacity + 8–16px transform, 180–360ms;
- stagger only small related groups, maximum 60ms between items;
- hover response: 120–180ms;
- no scroll hijacking, custom cursor, infinite marquee, or essential parallax;
- no element starts invisible if JavaScript fails;
- respect `prefers-reduced-motion: reduce` globally.

### 10.2 Network field

Implement as deterministic inline SVG, not random particles. Nodes should be keyboard-inert and decorative. Pointer movement may influence nearby lines by a few pixels on fine-pointer devices. Disable pointer effects on touch and reduced-motion modes.

### 10.3 Links and controls

- underlines or another persistent non-color cue for inline links;
- minimum 44×44px target size for primary controls;
- visible hover, active, focus-visible, disabled, and loading states;
- external destinations disclose with accessible text or icon labeling;
- accordions remain operable by keyboard; native `<details>/<summary>` or a real-button implementation is acceptable when styled and announced correctly.

---

## 11. Responsive behavior

### 11.1 Breakpoint philosophy

Break when the content needs it rather than targeting named devices. Expected working ranges:

- compact: below `640px`;
- medium: `640px–1023px`;
- wide: `1024px` and above;
- very wide layout stops growing at the content maximum.

### 11.2 Compact behavior

- hero becomes one column;
- network visual moves below copy or becomes a static background fragment;
- CTAs stack only when two buttons cannot retain comfortable widths;
- value loop becomes vertical;
- program cards become a simple list;
- discipline matrix becomes labeled rows;
- no horizontal-scrolling text or clipped display type;
- sticky header and any bottom CTA must not consume excessive viewport height.

### 11.3 Content resilience

Every layout must survive:

- a long event title;
- no upcoming event;
- one program instead of three;
- missing photography;
- a 200% text zoom;
- translated browser controls or longer names;
- disabled JavaScript.

---

## 12. Accessibility and inclusion

Target WCAG 2.2 AA.

Required:

- semantic landmarks and one logical H1;
- skip link;
- keyboard access to every interaction;
- strong visible focus treatment;
- AA contrast for text and interactive states;
- motion reduction;
- meaningful alt text and decorative-image null alternatives;
- form labels, instructions, errors, and success feedback;
- errors summarized and tied to fields;
- no information conveyed by color alone;
- sensible DOM order independent of visual layout;
- minimum 44×44px primary touch targets;
- no autoplay audio/video;
- captions/transcripts for recorded events;
- meeting accessibility/contact information where applicable.

Inclusive messaging requirements:

- do not equate capability with prior access, famous employers, or polished résumés;
- state that students from adjacent disciplines are welcome;
- explain any selective project process and publish its role-relevant criteria;
- never use “genius,” “Mensa,” “elite,” or similar identity labels;
- make expectations demanding but learnable.

---

## 13. Content and evidence system

### 13.1 Claim states

Every material claim must be classified before publication:

- **Proven** — public evidence and permission exist; publish.
- **Active** — currently happening with owner and cadence; describe precisely.
- **Scheduled** — date and resources are committed; label upcoming.
- **Aspirational** — keep in roadmap language, not present tense.

### 13.2 Forbidden launch claims

Until independently verified and approved, do not publish:

- “rapidly growing”;
- “premier,” “top,” “elite,” or “most selective”;
- any placement or membership number;
- “working with [company]” or a similar relationship claim drawn from outreach activity;
- logos for any employer or prospect from the private outreach list;
- an employee conversation as a company relationship;
- a guarantee of internships, referrals, recruiting access, or outcomes;
- testimonials written by founders about themselves;
- empty client, partner, or case-study sections.

### 13.3 Proof ledger

Before publishing future evidence, record privately:

- exact claim;
- source/documentation;
- date verified;
- owner;
- permission to publish;
- expiration/review date;
- approved logo/image asset, if applicable.

### 13.4 Voice

Voice is intelligent, assured, precise, warm, and understated.

Prefer: `build`, `solve`, `practice`, `publish`, `contribute`, `mentor`, `review`, `rigorous`, `curious`, `reliable`.<br>
Avoid: `elite`, `genius`, `gifted`, `clout`, `dominate`, `disruptive`, `world-class`, `guaranteed`, `pipeline`, `prestigious`.

Central copy rule:

> Show standards through the quality of the work, not through claims about the quality of the people.

---

## 14. Data, integrations, and privacy

### 14.1 Source of truth

- **Events and campus membership:** Sammy
- **Conversation:** Discord
- **Applications/interest:** university-approved form or minimal hosted form
- **Public site content:** small version-controlled data/config files
- **Private contacts and outreach:** private CRM or restricted document, never the web repository's deployable tree

Do not build internal event creation, member authentication, a custom CRM, or a public member directory.

### 14.2 Configurable launch fields

The implementation must fail visibly in development—but degrade safely in production—when these are missing:

- public organization name;
- descriptor;
- verified Sammy organization URL;
- verified Discord invite with owner/expiry policy;
- public organization email;
- next event or explicit empty state;
- contributor contact/form URL;
- recognition/disclaimer status.

Never ship `#`, fake URLs, lorem ipsum, a developer email, or a personal phone number.

### 14.3 Analytics

Analytics is optional. If used, prefer a privacy-respecting, cookieless setup and measure only decisions:

- next-event click;
- Sammy join click;
- Discord join click;
- project-interest click;
- contribute-interest click;
- form completion where consent and platform allow.

Do not add ad pixels, cross-site tracking, session replay, or fingerprinting. Document retention and privacy behavior.

---

## 15. Performance and quality budget

Prelaunch lab budget:

- production build tested with Lighthouse's mobile preset, default throttling, three runs, and the median recorded;
- Lighthouse performance: 90+; accessibility, best practices, and SEO: 95+ where the category applies;
- initial JavaScript kept minimal; the content must not depend on hydration;
- optimized, responsive images with explicit dimensions;
- fonts subset/preloaded carefully, with `font-display: swap`;
- no video background;
- no animation library solely for entrance effects;
- no third-party script without a written reason.

Post-launch field goals, evaluated after enough real traffic exists:

- LCP ≤ 2.5s at the 75th percentile;
- CLS ≤ 0.1 at the 75th percentile;
- INP ≤ 200ms at the 75th percentile.

Progressive enhancement is required: navigation, copy, links, event details, and forms must remain usable when nonessential JavaScript fails.

---

## 16. SEO and sharing

Each public route needs:

- unique title and description;
- canonical URL;
- Open Graph title, description, and image;
- sensible social card that does not use unapproved SJSU marks;
- organization JSON-LD only with facts that are genuinely established;
- no indexing of preview deployments;
- generated `sitemap.xml` and `robots.txt` for production.

Suggested homepage metadata:

- Title: `SMC — Ambition compounds at San José State`
- Description: `A student-led technical collective for SJSU students building skills, projects, and lasting relationships across software, AI/ML, quantitative finance, and applied mathematics.`

Revisit the title after the final organization name is chosen.

---

## 17. SJSU policy and brand guardrails

These are design constraints, not legal conclusions. Reconfirm them with Student Involvement before launch.

- SJSU's current recognition guidance requires at least five matriculated students, an eligible president and treasurer, a faculty/staff advisor, a constitution, an application, and completion of the RSO Canvas course.
- Recognized student-organization membership must be open to SJSU students and may not discriminate on protected grounds.
- Recognition runs by academic year and requires renewal.
- The university name and marks are controlled; recognized groups may use the university name in connection with sanctioned activities, but marks and merchandise have permission/licensing rules.
- SJSU web brand colors are blue `#0055A2`, gold `#E5A823`, and gray `#939597`; the university explicitly identifies several gold/blue/white text combinations as inaccessible.
- Official SJSU web properties have additional header, footer, type, and Web Ops requirements. Confirm whether the chosen domain and recognition arrangement put the site under those standards.

Primary references:

- [SJSU RSO recognition process](https://www.sjsu.edu/getinvolved/student-orgs/recognition-process.php)
- [SJSU new organization process and open-membership language](https://www.sjsu.edu/getinvolved/student-orgs/new-org.php)
- [SJSU RSO handbook and policies](https://www.sjsu.edu/getinvolved/student-orgs/handbook-and-policies.php)
- [SJSU policy for material containing its name or marks](https://www.sjsu.edu/getinvolved/docs/SJSU-SI-RSO-Policy-University-Logo.pdf)
- [SJSU brand guide](https://www.sjsu.edu/communications/brand/)
- [SJSU accessible web colors](https://www.sjsu.edu/communications/brand/visual-style/color/web.php)
- [SJSU typography guidance](https://www.sjsu.edu/communications/brand/visual-style/typography-and-fonts.php)
- [Sammy app overview](https://www.sjsu.edu/studentaffairs/sammy-app.php)

---

## 18. Decision gates before public production launch

### Required to launch

- [ ] Settle the public display name and whether SMC remains the Spartan Math Club RSO or becomes a renamed/new RSO.
- [ ] Confirm current recognition status and exact approved affiliation language.
- [ ] Confirm who is President, Treasurer, Vice President, and faculty/staff advisor.
- [ ] Obtain the real Sammy organization link.
- [ ] Create a stable Discord invite and moderation/onboarding flow.
- [ ] Create a role-based public email rather than using a founder's personal address.
- [ ] Confirm the next event with full date, year, time, room, and owner.
- [ ] Confirm which programs are active versus planned.
- [ ] Decide the public join mechanism.
- [ ] Choose hosting, production origin/domain, and base-path behavior.
- [ ] Name deployment and post-event content owners and document rollback/redeploy steps.
- [ ] Ask Student Involvement about the proposed open-membership/selective-project model and use of the SJSU name/marks.
- [ ] Approve public copy and disclaimer.

### Helpful but not launch-blocking

- [ ] Photograph one real working session with consent.
- [ ] Define the first SMC Lab brief.
- [ ] Recruit one bounded alumni/practitioner session.
- [ ] Draft a lightweight code of conduct.
- [ ] Prepare the first public resource or technical artifact.

### Explicitly not needed for launch

- custom member accounts;
- an internal social network;
- dozens of pages;
- a CMS;
- employer logo wall;
- animated impact counters;
- polished executive headshots;
- a consulting services catalog;
- a permanent name for every future program.

---

## 19. Definition of a successful launch

The site succeeds when a student can understand SMC and reach a real next step in under one minute; an alum can choose a bounded way to help; an officer can update the next event without rebuilding the interface; and no visitor can reasonably mistake an aspiration, contact, or outreach target for an established result or partnership.

The visual bar is high, but the institutional bar is higher: the website should make SMC look serious because SMC is specific, truthful, and ready to follow through.
