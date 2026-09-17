import { cn } from "@/lib/cn";
import { useId } from "react";

export const CREST_RING_TEXT = "SPARTAN MATH CLUB ✶ FOR ALL PROBLEMS ✶";

type Props = {
  /**
   * "full" carries the ring text and "∃ MONDAY": use it at ≥ 96px.
   * "small" is the double ring and ∀ stroke: use it below 96px.
   */
  variant?: "full" | "small";
  className?: string;
  /** Accessible name. Omit when the crest sits next to visible club name text. */
  title?: string;
};

/**
 * The club crest, the primary logo (brand v2.1). Ring and text use
 * currentColor; the ∀ stroke uses --crest-accent (yellow by default).
 */
export function Crest({ variant = "small", className, title }: Props) {
  const ringId = `crest-ring-${useId().replace(/:/g, "")}`;
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };

  if (variant === "small") {
    return (
      <svg className={cn("crest crest--small", className)} viewBox="0 0 120 120" focusable="false" {...a11y}>
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="3" />
        <path
          d="M39 37 60 87 81 37M46.5 58h27"
          fill="none"
          stroke="var(--crest-accent, var(--yellow))"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={cn("crest crest--full", className)} viewBox="0 0 120 120" focusable="false" {...a11y}>
      <defs>
        <path id={ringId} d="M60 60 m-41 0 a41 41 0 1 1 82 0 a41 41 0 1 1 -82 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="51.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <text fontSize="7.4" letterSpacing="2.35" fill="currentColor" style={{ fontFamily: "var(--mono)" }}>
        <textPath href={`#${ringId}`} startOffset="0">
          {CREST_RING_TEXT}
        </textPath>
      </text>
      <path
        d="M48 44 60 72 72 44M53 54h14"
        fill="none"
        stroke="var(--crest-accent, var(--yellow))"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="60"
        y="83"
        textAnchor="middle"
        fontSize="5.2"
        letterSpacing="1.6"
        fill="currentColor"
        style={{ fontFamily: "var(--mono)" }}
      >
        <tspan style={{ fontFamily: "var(--serif)" }}>∃</tspan> MONDAY
      </text>
    </svg>
  );
}

/** Horizontal lockup: small crest + club name in the board face. */
export function CrestLockup({ className }: { className?: string }) {
  return (
    <span className={cn("lockup", className)}>
      <Crest variant="small" className="lockup-crest" />
      <span className="lockup-text">Spartan Math Club</span>
    </span>
  );
}
