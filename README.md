# Spartan Math Club

Website for the Spartan Math Club at San José State University, and its consulting division.
Next.js 16 (App Router, Turbopack), React 19, KaTeX. No database, no analytics, no cookies.

## Run

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint
pnpm run check    # answer parser, recurrence/.ics, and route wiring tests
```

## Where to edit

| What | File |
|---|---|
| Name, tagline, links (email, Discord, Instagram, Sammy), indexing | `content/site.ts` |
| One-off events and the weekly meeting | `content/events.ts` |
| Problem archive (statements, answers, hints, solutions) | `content/problems.ts` |
| Consulting services, process, FAQ | `content/consulting.ts` |
| Home and join page copy | `content/club.ts` |

Math in content strings uses `$inline$` and `$$display$$` and is typeset on the server with KaTeX.
Unset links are hidden automatically. The site stays `noindex` until `site.indexable` is `true`.

## Truth rules

Never publish a client, partner, testimonial, result, member count, or founding date that hasn't been verified.
Consulting work isn't legal, tax, investment, medical, or licensed engineering advice, and the site says so.

The previous strategy and design package for the earlier "SMC" preview lives in `docs/archive/` for reference only.
