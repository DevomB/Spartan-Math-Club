import { primaryNav } from "@/components/layout/nav";
import { site } from "@/content/site";
import { clubEmail, socialLinks } from "@/lib/links";
import Link from "next/link";

export function SiteFooter() {
  const email = clubEmail();
  const communityLinks = socialLinks();

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-identity">
          <p className="footer-name">Spartan Mathematics Club</p>
          <p>{site.campus}</p>
          <p className="footer-tagline">{site.tagline}</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/problems">Problem archive</Link>
          <Link href="/privacy">Privacy</Link>
          {email ? <a href={`mailto:${email}`}>Email</a> : null}
          {communityLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>{site.disclosure}</p>
        <p>© {site.year} {site.name}</p>
      </div>
    </footer>
  );
}
