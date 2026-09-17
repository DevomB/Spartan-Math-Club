import { site, type SiteLinks } from "@/content/site";

export function isHttpsUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function isEmail(value: string | undefined): value is string {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/@example\.(com|org)$/i.test(value));
}

export type SocialLink = { label: string; href: string };

/** Community links that are actually configured, in display order. */
export function socialLinks(links: SiteLinks = site.links): SocialLink[] {
  const candidates: Array<[string, string | undefined]> = [
    ["Discord", links.discord],
    ["Instagram", links.instagram],
    ["Sammy", links.sammy],
    ["LinkedIn", links.linkedin],
  ];
  return candidates
    .filter((entry): entry is [string, string] => isHttpsUrl(entry[1]))
    .map(([label, href]) => ({ label, href }));
}

export function clubEmail(links: SiteLinks = site.links): string | undefined {
  return isEmail(links.email) ? links.email : undefined;
}

export function consultingEmail(links: SiteLinks = site.links): string | undefined {
  if (isEmail(links.consultingEmail)) return links.consultingEmail;
  return clubEmail(links);
}
