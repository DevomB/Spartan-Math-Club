import type { ClubEvent } from "@/content/events";
import { site } from "@/content/site";
import { clubEmail, socialLinks } from "@/lib/links";
import type { Metadata, MetadataRoute } from "next";

export const PUBLIC_PATHS = ["/", "/events", "/problems", "/consulting", "/join", "/privacy"] as const;

/** Origin used for canonical URLs: env override, then Vercel production URL, then config. */
export function siteOrigin(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    site.origin,
  ];
  for (const raw of candidates) {
    if (!raw) continue;
    try {
      return new URL(raw.trim()).origin;
    } catch {
      // try the next candidate
    }
  }
  return site.origin;
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteOrigin()}/`).toString();
}

type PageSeo = { title: string; description: string; path: string };

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(`${siteOrigin()}/`),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: site.name,
      description: site.description,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: site.name, description: site.description },
  };
}

export function robotsSpec(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml") };
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return PUBLIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/privacy" ? "yearly" : "weekly",
    priority: path === "/" ? 1 : path === "/privacy" ? 0.2 : 0.8,
  }));
}

function organizationNode(): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#org`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    parentOrganization: { "@type": "CollegeOrUniversity", name: site.campus },
  };
  const email = clubEmail();
  if (email) node.email = email;
  const sameAs = [...socialLinks().map((link) => link.href), site.links.github].filter(Boolean);
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

function eventNode(event: ClubEvent): Record<string, unknown> {
  return {
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventStatus: event.cancelled ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.location, address: site.campus },
    organizer: { "@id": `${absoluteUrl("/")}#org` },
    url: event.rsvpHref ?? absoluteUrl(`/events#${event.id}`),
  };
}

export function jsonLd(upcoming: ClubEvent[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), ...upcoming.map(eventNode)],
  };
}
