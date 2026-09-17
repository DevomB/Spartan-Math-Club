import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Paper-style section heading: "§2  The work" with a serif title. */
export function SectionHead({
  index,
  kicker,
  title,
  children,
  className,
  id,
}: {
  index?: string;
  kicker: string;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <header className={cn("section-head", className)}>
      <p className="kicker">
        {index ? <span className="kicker-index">§{index}</span> : null}
        <span>{kicker}</span>
      </p>
      {title ? (
        <h2 className="section-title" id={id}>
          {title}
        </h2>
      ) : null}
      {children}
    </header>
  );
}
