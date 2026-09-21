import type { ReactNode } from "react";

/** Page introduction used by the archive and policy pages. */
export function PageHero({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="container page-hero-layout">
        <div className="page-hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="page-title" id="page-title">
            {title}
          </h1>
          {children}
        </div>
        {aside ? <div className="page-hero-aside">{aside}</div> : null}
      </div>
    </section>
  );
}
