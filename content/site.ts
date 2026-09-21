/**
 * Single source of truth for club identity and public links.
 *
 * Leave a link `undefined` until it is real — every component hides
 * controls whose destination is unset. Never invent contacts, partners,
 * clients, member counts, or results.
 */
export type SiteLinks = {
  /** General club inbox (role-based, never a personal address). */
  email?: string;
  /** Consulting inquiries. Falls back to `email` when unset. */
  consultingEmail?: string;
  discord?: string;
  instagram?: string;
  linkedin?: string;
  /** SJSU Sammy organization page. */
  sammy?: string;
  github?: string;
};

export const site = {
  name: "Spartan Mathematics Club",
  shortName: "SMC",
  campus: "San José State University",
  tagline: "For all problems, there exists an SMC meeting.",
  description:
    "Spartan Mathematics Club is an SJSU student organization for weekly problem solving, mentorship, career readiness, mathematical events, and applied mathematics.",
  disclosure:
    "Spartan Mathematics Club is a student-led Recognized Student Organization at San José State University. Recognition does not imply university endorsement of every statement or activity on this site.",
  /**
   * Flip to `true` when the club is ready for search engines. While false,
   * every page is noindex and robots.txt disallows crawling.
   */
  indexable: false,
  /** Canonical production origin. `NEXT_PUBLIC_SITE_URL` overrides it. */
  origin: "https://spartan-math-club.vercel.app",
  links: {
    email: "spartanmathematics@gmail.com",
    consultingEmail: "spartanmathematics@gmail.com",
    discord: "https://discord.gg/Y7hpArMN6",
    github: "https://github.com/DevomB/Spartan-Math-Club",
  } satisfies SiteLinks as SiteLinks,
  privacyUpdatedOn: "September 19, 2026",
  /** Footer year. Do not derive from Date.now() during render. */
  year: 2026,
} as const;

export type Site = typeof site;
