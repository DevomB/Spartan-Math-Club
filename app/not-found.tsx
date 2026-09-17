import { Tex } from "@/components/math/tex";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found",
  robots: { index: false, follow: false },
};

const tex = String.raw;

export default function NotFound() {
  return (
    <main id="content" tabIndex={-1} className="utility surface-ink">
      <div className="container utility-inner">
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden="true" />
          Error 404
        </p>
        <Tex hidden className="contradiction">{tex`\bot`}</Tex>
        <h1 className="page-title">This page leads to a contradiction.</h1>
        <Tex hidden className="formal-line">{tex`\neg\exists\ \text{page} : \text{URL}(\text{page}) = \text{this URL}`}</Tex>
        <p className="hero-body">
          The page you asked for isn&apos;t on this site. It may have moved, or it never existed. Assume it does and you
          get a contradiction.
        </p>
        <div className="actions">
          <Button href="/" label="Return home" />
          <Button href="/problems" label="Solve a problem instead" variant="ghost-dark" />
        </div>
      </div>
    </main>
  );
}
