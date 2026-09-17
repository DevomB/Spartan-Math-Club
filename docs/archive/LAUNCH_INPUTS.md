# SMC Launch Inputs

This is the only public source for approved facts, current states, URLs, and deployment decisions. It intentionally contains no personal contact lists or private officer notes.

Current mode: **SCAFFOLD ONLY**  
Production status: **BLOCKED**  
Last reviewed: **September 1, 2026**

An implementation may render a neutral, noindexed preview while this file is incomplete. It must not deploy a public production site, accept submissions, advertise an event, or imply recognition from unset values.

## 1. Required identity and governance

| Input | Approved value | Status | Evidence/approver required |
|---|---|---|---|
| Public display name | `SMC` as a working preview mark | PROVISIONAL | Executive approval |
| Expanded public name | None | UNSET | Executive decision + Student Involvement naming review |
| Organization model | None | UNSET | Existing RSO, program, rename, or new RSO decision |
| Recognition state | `recognized` | CONFIRMED | Officer confirmation that SMC is an official RSO |
| Recognition valid through | None | UNSET | Recognition letter/record |
| Approved campus descriptor | `A student-led technical collective at San José State University` | SELECTED | CONTENT.md recognized descriptor |
| Approved affiliation disclaimer | `SMC is a student-led Recognized Student Organization at San José State University. Recognition does not imply university endorsement of every statement or activity on this site.` | SELECTED | CONTENT.md recognized disclosure |
| Open-membership/project-role model | Proposed only | UNSET | Constitution + Student Involvement confirmation |
| Officer-selection language | Constitution governs | UNSET | Approved current constitution |
| SJSU name/mark permission | None | UNSET | Written guidance/permission as applicable |
| Public wordmark approval | None | UNSET | Executive + campus review as applicable |

Recognition state must be one of:

- `unknown` — not checked or evidence unavailable;
- `pending` — application/re-recognition is actively under review;
- `recognized` — written recognition is current for the academic year;
- `inactive` — recognition is lapsed, denied, suspended, or otherwise not current.

The website may use only copy approved for the recorded state. Descriptor and affiliation disclaimer for `recognized` are selected above. Production remains blocked by remaining UNSET gates (email, Sammy, naming, hosting, and related items). Recognition does not grant university endorsement of projects or permission to use SJSU marks.

## 2. Required public destinations

| Input | Approved value | Status | Launch requirement |
|---|---|---|---|
| Role-based public email | None | UNSET | Required |
| Sammy organization URL | None | UNSET | Required |
| Stable public join URL | `/join` | RESERVED | Must resolve to a real join action/section |
| Discord invite | None | UNSET | Optional; owner and expiry behavior required if used |
| Student interest/application form | None | UNSET | Optional; data policy required if used |
| Contribution inquiry form | None | UNSET | Optional; public email may be the contact path |
| Public social accounts | None | UNSET | Optional; omit inactive accounts |

Production validation must require:

1. a role-based public email;
2. a valid Sammy organization URL;
3. at least one usable student action: upcoming-event RSVP, Sammy join, or approved interest form;
4. at least one usable alumni/practitioner action: public email or approved inquiry form.

Discord is useful but not a launch prerequisite. Never use a founder's personal email or phone number as a public fallback.

## 3. Recruitment and event state

### Community membership

Current public state: `unknown`  
Approved membership copy: none  
Reason: recognition and constitution language require confirmation.

### Project applications

Current state: `unavailable`

Allowed values:

- `unavailable` — no application CTA or implied cohort;
- `planned` — described only as planned, with no application CTA;
- `open` — verified deadline, form, criteria, capacity, response window, and reviewer exist;
- `closed` — describes project applications only, never general SMC membership.

No project application is approved at this time.

### Next event

No event is approved for publication.

Required event fields before activation:

```yaml
id: null
title: null
short_title: null
starts_at_iso_with_offset: null
ends_at_iso_with_offset: null
location: null
audience: null
outcome: null
what_to_bring: null
sammy_url: null
capacity_state: scheduled | full
waitlist_url: null
accessibility_note: null
public_contact: null
content_owner_role: null
last_verified_at_iso_with_offset: null
post_event_update_deadline_iso_with_offset: null
```

The legacy phrase `Monday 9/6` is invalid and forbidden: September 6, 2026 is Sunday, while Monday, September 7 is Labor Day and SJSU is closed.

## 4. Program publication gates

No program is approved as active at this time.

Programs may appear in this fixed order only after their gate is complete:

1. Sessions
2. SMC Lab
3. Career Circles

For an `active` program, record:

```yaml
name: null
state: active
owner_role: null
cadence: null
next_occurrence_iso_with_offset: null
public_description_approved: false
destination_url: null
verified_on: null
```

For a `planned` program, record an owner role, concrete target term/date, approved planned-state description, and decision date. A generic idea does not qualify. Render zero to three programs; hidden is the safe default.

## 5. Hosting, URL, and release decisions

| Input | Approved value | Status |
|---|---|---|
| Hosting provider | None | UNSET |
| Production origin | None | UNSET |
| Custom domain | None | UNSET |
| Repository/base path behavior | None | UNSET |
| Preview deployment policy | `noindex` required | APPROVED |
| Deployment owner role | None | UNSET |
| Content update owner role | None | UNSET |
| Event-expiry/redeploy procedure | None | UNSET |
| Rollback procedure | None | UNSET |

If GitHub Pages is selected without a custom domain, the implementation must account for the repository subpath rather than assuming `/` is the public base. Canonical URLs, assets, redirects, sitemap, and robots behavior must all use the approved production origin/base path.

## 6. Forms, privacy, and analytics

| Input | Approved value | Status |
|---|---|---|
| On-site data collection | Disabled | APPROVED FOR SCAFFOLD |
| External form provider | None | UNSET |
| Data collected | None | UNSET |
| Access roles | None | UNSET |
| Retention/deletion rule | None | UNSET |
| Deletion contact | None | UNSET |
| Analytics | Disabled | APPROVED DEFAULT |
| Cookie/cross-site tracking | Prohibited | APPROVED |

The scaffold privacy page must say that the preview itself collects no form submissions and uses no analytics. Replace that statement only when actual behavior and retention are approved.

## 7. Visual assets and review

| Input | Approved value | Status |
|---|---|---|
| Wordmark asset | None | UNSET |
| Favicon | Text-only neutral mark allowed in preview | PROVISIONAL |
| Social card | None | UNSET |
| Real SMC photography | None | UNSET |
| Photography consent records | None | UNSET |
| Primary visual approver role | None | UNSET |
| Copy/truth approver role | None | UNSET |
| Accessibility reviewer role | None | UNSET |

Until approved assets exist, use the text `SMC`, the specified editorial layout, and the code-native diagram. Do not create a Spartan helmet or use university/employer marks.

## 8. Production launch gate

Every item must pass:

- [ ] Identity, organization model, recognition state, descriptor, disclaimer, and naming are approved.
- [ ] Public email and Sammy URL are valid and monitored.
- [ ] At least one student action and one contributor action work end to end.
- [ ] Any event has complete verified fields and a post-event update owner/deadline.
- [ ] Every visible program satisfies its publication gate.
- [ ] Hosting provider, production origin, and base path are configured.
- [ ] Privacy copy matches real forms and analytics.
- [ ] Wordmark/favicon/social assets are approved or a neutral text-only launch treatment is approved.
- [ ] Public copy passes the truth ledger and placeholder scan.
- [ ] SJSU name/mark/affiliation use is confirmed.
- [ ] Visual, copy/truth, and accessibility reviewers approve the release.
- [ ] Build, link, accessibility, responsive, and performance checks pass.

Until every required box is checked, the release is a private/noindexed preview—not the public SMC website.
