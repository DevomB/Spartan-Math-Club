# SMC Annotated Wireframes

These wireframes own composition and review intent, not exact copy. Use `CONTENT.md` for words, `DESIGN.md` for tokens/behavior, and `LAUNCH_INPUTS.md` for what may appear. Modules marked `CONDITIONAL` disappear completely when their gate is not met.

## 1. Visual thesis

The page should read like a compact technical institution: editorial hierarchy, mathematical precision, and human warmth. Its premium signal comes from spacing, exact type, honest content, and a single memorable diagram—not a pile of cards or effects.

Primary contrast:

- near-black hero and closing field;
- warm paper editorial body;
- blue as the functional interactive color;
- gold as a tiny non-text signal;
- thin structural rules connecting sections;
- mono labels used sparingly for state and metadata.

## 2. Desktop homepage — 1440px review frame

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ OPTIONAL ANNOUNCEMENT · one verified event/application · one link          │
├──────────────────────────────────────────────────────────────────────────────┤
│ SMC          About  Focus  Programs*  Events*  Culture  Contribute  [Join] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  APPROVED CAMPUS-STATUS LABEL               ┌─────────────────────────────┐  │
│                                             │       BUILD ○               │  │
│  Ambition                                   │          ╲                  │  │
│  compounds                                  │    ○──────○ ANALYZE         │  │
│  here.                                      │      ╲  ╱                   │  │
│                                             │     CONNECT ○               │  │
│  One short explanatory paragraph.          │                             │  │
│                                             │ deterministic SVG; static   │  │
│  [Primary action]   [How SMC works]         │ in reduced-motion mode      │  │
│  Rooted in mathematics…                     └─────────────────────────────┘  │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ CONDITIONAL TRUTH STRIP: cadence | focus areas | approved campus phrase     │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  01 / WHY SMC                                                                │
│                                                                              │
│  Talent is already here.              At a university this large…           │
│  Density is missing.                  The network grows through work…        │
│  (oversized editorial statement)      (narrow reading column)                │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  02 / HOW IT COMPOUNDS — CONDITIONAL                                          │
│                                                                              │
│  SHOW UP ─── CONTRIBUTE ─── BUILD PROOF ─── EARN TRUST ─── COMPOUND          │
│  One connected rule, five short explanations; no floating icon cards         │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  03 / FOCUS AREAS                                                            │
│                                                                              │
│  SOFTWARE              AI / ML               QUANT              MATHEMATICS  │
│  systems               evaluation            uncertainty        common lens │
│  algorithms            data                  statistics         rigor        │
│                 Thin rules show overlap; these are not departments           │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  04 / PROGRAMS — CONDITIONAL, ZERO TO THREE                                  │
│                                                                              │
│  SESSIONS                 SMC LAB                  CAREER CIRCLES             │
│  [verified state]         [verified state]         [verified state]           │
│  concise outcome          concise outcome          concise outcome            │
│  exact cadence/date       exact timeline/date      exact timeline/date        │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  05 / NEXT SESSION                                                          │
│                                                                              │
│  Confirmed event title                     [View and RSVP on Sammy]          │
│  Complete date · time PT · room                                              │
│  What attendees will do                                                     │
│  Accessibility/contact note                                                 │
│                                                                              │
│  OR one deliberate empty state; never a fake card                           │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  06 / CULTURE                        07 / JOIN                               │
│                                                                              │
│  High standards. Low ego.            Start by showing up.                   │
│  Five concise principles             Current verified entry paths           │
│  Contribution earns responsibility   Membership/project distinction         │
│                                      [Real student action]                   │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  08 / CONTRIBUTE                                                             │
│                                                                              │
│  Teach what you know. Review a project. Open one useful door.                │
│  Session · Office hours · Review · Mentorship · Scoped problem               │
│                                                          [Start a conversation]│
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  09 / FAQ                                                                    │
│  Quiet full-width disclosure rows; native details is acceptable             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Find your people. Raise the standard together.         [Primary action]     │
│                                                                              │
│  SMC · approved descriptor · Sammy · Contact · Privacy · state disclosure   │
└──────────────────────────────────────────────────────────────────────────────┘
```

The final implementation may merge Why + value loop, focus + programs, or culture + Join when content is thin. The page should never preserve empty vertical space for a hidden module.

## 3. Mobile homepage — 390px review frame

```text
┌──────────────────────────────┐
│ optional verified notice     │
├──────────────────────────────┤
│ SMC                    Menu  │  unenhanced navigation remains usable
├──────────────────────────────┤
│ approved status label        │
│                              │
│ Ambition                     │
│ compounds                    │
│ here.                        │
│                              │
│ short explanatory copy       │
│                              │
│ [Primary action — full width]│
│ [How SMC works]              │
│                              │
│ simplified static pathway SVG│
├──────────────────────────────┤
│ conditional truth items      │
│ stack or wrap; never marquee │
├──────────────────────────────┤
│ 01 / WHY SMC                 │
│ oversized statement          │
│ narrow readable paragraph    │
├──────────────────────────────┤
│ 02 / FOCUS                   │
│ SOFTWARE                     │
│ AI / ML                      │
│ QUANT                        │
│ APPLIED MATHEMATICS          │
│ ruled rows, not mini-cards   │
├──────────────────────────────┤
│ conditional programs        │
├──────────────────────────────┤
│ next event or empty state    │
│ date/time/room remain full   │
├──────────────────────────────┤
│ CULTURE                      │
│ JOIN                         │
│ one real action              │
├──────────────────────────────┤
│ CONTRIBUTE                   │
│ bounded options              │
├──────────────────────────────┤
│ FAQ disclosure rows          │
├──────────────────────────────┤
│ final action                 │
│ footer + state disclosure    │
└──────────────────────────────┘
```

Mobile requirements:

- content order matches DOM order;
- hero copy precedes the SVG;
- no sideways scroll, clipped display type, or hover-only information;
- event metadata wraps without abbreviating the year, timezone, or location;
- touch targets remain at least 44×44 CSS pixels;
- menu never becomes the only no-JavaScript route to navigation;
- 200% zoom produces a usable single-column flow.

## 4. Join destination

`/join` is a stable acquisition URL, not automatically a full page.

Preferred launch behavior:

```text
/join
  → host-supported redirect to /#join, or
  → tiny state-aware page using the same Join component/config
```

The view shows only:

1. approved membership/governance copy;
2. next eligible event, Sammy action, or approved interest form;
3. project applications as a separate state;
4. what to expect and the conduct line;
5. exact next step/response window.

It must not duplicate event dates or maintain its own recruitment state.

## 5. Contribute destination

Launch as `/#contribute`; add a `/contribute` alias for direct outreach only if the host can implement it cleanly. A full page waits until recurring external contributions create enough content.

The compact composition is:

```text
headline
one-sentence purpose
five bounded contribution options
example time commitments
what SMC handles
non-endorsement/representation clarification
one public email or approved form
```

Avoid a logo wall, “Our Partners” label, or client-intake language.

## 6. Interaction frames

### Header states

- **Top/dark:** transparent or ink surface with fully legible text.
- **Scrolled:** solid paper/ink surface with a thin rule; no excessive blur.
- **Mobile open:** modal sheet with visible close control, background inert, focus contained.
- **No JavaScript:** compact wrapped navigation or an open native disclosure remains available.

### Event states

- **Scheduled:** event action says `View and RSVP on Sammy`.
- **Full with waitlist:** action says `Join the waitlist`.
- **Full without waitlist:** `Full` is text, not a disabled mystery button.
- **Cancelled:** cancellation precedes details; no recruitment CTA.
- **Past:** never featured; removed from generated output after the update deadline.
- **Missing:** one honest sentence in the Events section; no announcement bar.

### Form states

- external form link preferred;
- on-site form requires default, focus, invalid, submitting, success, and failure frames;
- failure preserves values and exposes the monitored email fallback;
- success names the response window and next confirmed action.

## 7. Visual review checklist

Review screenshots at 390×844, 768×1024, and 1440×1000 before approval.

- [ ] A single primary action dominates each major section.
- [ ] Headline wraps intentionally at every width.
- [ ] The SVG supports the message without resembling a random particle demo.
- [ ] Paper sections use rules and whitespace before cards/shadows.
- [ ] Gold is decorative and never low-contrast text.
- [ ] Focus indicators switch appropriately on light and dark surfaces.
- [ ] Hidden modules collapse completely.
- [ ] No stock photography or fake proof is needed for the composition to feel finished.
- [ ] The state disclosure is readable rather than buried in tiny legal text.
- [ ] The page feels credible with zero metrics, logos, testimonials, and case studies.

The named visual approver in `LAUNCH_INPUTS.md` signs off on these frames. “Looks premium” is not an acceptance result without that review.
