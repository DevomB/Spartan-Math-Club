"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ResponsiveProblemIndexProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const DESKTOP_INDEX_QUERY = "(min-width: 35em)";

/** Opens the contents list on larger screens while leaving it collapsible on phones. */
export function ResponsiveProblemIndex({ children, className, id }: ResponsiveProblemIndexProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_INDEX_QUERY);
    const syncOpenState = () => {
      if (detailsRef.current) {
        detailsRef.current.open = mediaQuery.matches;
      }
    };

    syncOpenState();
    mediaQuery.addEventListener("change", syncOpenState);
    return () => mediaQuery.removeEventListener("change", syncOpenState);
  }, []);

  return (
    <details ref={detailsRef} className={className} id={id}>
      {children}
    </details>
  );
}
