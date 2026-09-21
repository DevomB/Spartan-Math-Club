import { cn } from "@/lib/cn";
import Link from "next/link";

type Variant = "gold" | "ink" | "ghost" | "ghost-dark" | "link";

type Props = {
  href: string;
  label: string;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  className?: string;
};

export function Button({ href, label, variant = "gold", external, arrow = false, className }: Props) {
  const classes = cn("btn", `btn--${variant}`, className);
  const content = (
    <>
      <span>{label}</span>
      {arrow ? (
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );
  if (external || href.startsWith("mailto:") || /^https?:/.test(href)) {
    const newTab = /^https?:/.test(href);
    return (
      <a className={classes} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
        {newTab ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
