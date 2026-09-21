"use client";

import { LambdaLogo } from "@/components/brand/lambda-logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { primaryNav } from "@/components/layout/nav";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
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
        <Link className="wordmark" href="/" aria-label="Spartan Mathematics Club, home">
          <span className="wordmark-mark" aria-hidden="true">
            <LambdaLogo className="wordmark-logo" />
          </span>
          <span className="wordmark-copy">
            <strong>Spartan Mathematics Club</strong>
            <small>San José State University</small>
          </span>
        </Link>
        <nav aria-label="Primary" className="nav-desktop">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu items={primaryNav} />
      </div>
    </header>
  );
}
