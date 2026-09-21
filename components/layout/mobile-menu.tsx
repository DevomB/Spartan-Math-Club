"use client";

import type { NavItem } from "@/components/layout/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function MobileMenu({ items }: { items: NavItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && el.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    const onToggle = () => {
      document.documentElement.classList.toggle("menu-open", el.open);
    };
    el.addEventListener("toggle", onToggle);
    document.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("toggle", onToggle);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, []);

  // Close after client-side navigation.
  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  const close = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  return (
    <details ref={detailsRef} className="mobile-nav">
      <summary aria-label="Menu">
        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </summary>
      <div className="mobile-nav-sheet">
        <nav aria-label="Mobile">
          <ol>
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mobile-foot">For all problems, there exists an SMC meeting.</p>
      </div>
    </details>
  );
}
