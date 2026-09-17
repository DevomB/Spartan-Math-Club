import { Crest } from "@/components/brand/crest";
import { Tex } from "@/components/math/tex";
import { site } from "@/content/site";
import { clubEmail, consultingEmail, socialLinks } from "@/lib/links";
import Link from "next/link";

/** Front-of-the-textbook key, so nobody is left out of the joke. */
const SYMBOLS: Array<[string, string]> = [
  [String.raw`\forall`, "for all"],
  [String.raw`\exists`, "there exists"],
  [String.raw`\exists!`, "exactly one"],
  [String.raw`\neg`, "not"],
  [String.raw`\land`, "and"],
  [String.raw`\lor`, "or"],
  [String.raw`\implies`, "implies"],
  [String.raw`\iff`, "if and only if"],
  [String.raw`\vdash`, "provable"],
  [String.raw`\models`, "true / satisfies"],
  [String.raw`\top`, "true"],
  [String.raw`\bot`, "contradiction"],
  [String.raw`\Box`, "necessarily"],
  [String.raw`\therefore`, "therefore"],
  [String.raw`\in`, "is in"],
  [String.raw`\blacksquare`, "end of proof"],
];

export function SiteFooter() {
  const socials = socialLinks();
  const email = clubEmail();
  const consulting = consultingEmail();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-crest-link" aria-label="Spartan Math Club, home">
              <Crest variant="full" className="footer-crest" />
            </Link>
            <p className="footer-name">Spartan Math Club</p>
            <p className="footer-tagline">{site.tagline}</p>
            <p className="footer-signature">
              <Tex hidden className="footer-qed">{String.raw`\exists!\, c \in \text{Clubs} : \text{Math}(c) \land \text{Spartan}(c)`}</Tex>
              <span className="footer-read">One club. Exactly one.</span>
            </p>
          </div>
          <nav className="footer-cols" aria-label="Footer">
            <div>
              <p className="footer-heading">Club</p>
              <ul>
                <li>
                  <Link href="/#about">About</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/problems">Problem archive</Link>
                </li>
                <li>
                  <Link href="/join">Join</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading">Consulting</p>
              <ul>
                <li>
                  <Link href="/consulting">Services</Link>
                </li>
                <li>
                  <Link href="/consulting#process">Process</Link>
                </li>
                <li>
                  <Link href="/consulting#inquire">Start a consult</Link>
                </li>
                {consulting ? (
                  <li>
                    <a href={`mailto:${consulting}`}>{consulting}</a>
                  </li>
                ) : null}
              </ul>
            </div>
            <div>
              <p className="footer-heading">Elsewhere</p>
              <ul>
                {socials.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
                {email ? (
                  <li>
                    <a href={`mailto:${email}`}>Email</a>
                  </li>
                ) : null}
                {site.links.github ? (
                  <li>
                    <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                      Source on GitHub
                    </a>
                  </li>
                ) : null}
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <details className="symbols">
          <summary>List of symbols</summary>
          <dl className="symbols-list">
            {SYMBOLS.map(([source, meaning]) => (
              <div key={source}>
                <dt>
                  <Tex hidden>{source}</Tex>
                </dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </details>
        <div className="footer-bottom">
          <p className="disclosure">{site.disclosure}</p>
          <p className="footer-meta">
            <span>
              © {site.year} {site.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              0 cookies · 0 trackers · <Tex hidden>{String.raw`\infty`}</Tex>
              <span className="visually-hidden">infinitely many</span> problems
            </span>
            <span aria-hidden="true">·</span>
            <span className="footer-signoff">
              <Tex hidden>{String.raw`\therefore\ \text{Spartan Math Club}`}</Tex>{" "}
              <Tex hidden className="gr">{String.raw`\blacksquare`}</Tex>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
