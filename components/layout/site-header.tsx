"use client";

import { CrestLockup } from "@/components/brand/crest";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { joinNav, primaryNav } from "@/components/layout/nav";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/** `glyphs` maps nav hrefs to pre-typeset decorative symbols (aria-hidden). */
export function SiteHeader({ glyphs = {} }: { glyphs?: Record<string, ReactNode> }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Spartan Math Club, home">
          <CrestLockup />
        </Link>
        <nav aria-label="Primary" className="nav-desktop">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn("nav-link", item.accent && "nav-link--accent")}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {glyphs[item.href] ? <span className="nav-glyph">{glyphs[item.href]}</span> : null}
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={joinNav.href}
                className="btn btn--gold btn--sm"
                aria-current={isActive(joinNav.href) ? "page" : undefined}
              >
                {glyphs[joinNav.href] ? <span className="nav-glyph">{glyphs[joinNav.href]}</span> : null}
                <span>{joinNav.label}</span>
              </Link>
            </li>
          </ul>
        </nav>
        <MobileMenu items={[...primaryNav, joinNav]} glyphs={glyphs} />
      </div>
    </header>
  );
}
