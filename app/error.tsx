"use client";

import Link from "next/link";

export default function ErrorState({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="content" tabIndex={-1} className="utility surface-ink">
      <div className="container utility-inner">
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden="true" />
          Runtime error
        </p>
        <h1 className="page-title">
          Something diverged. <em>Not the good kind.</em>
        </h1>
        <p className="hero-body">
          This page failed to render. Try again — if the error persists, it&apos;s a counterexample we&apos;d like to
          hear about.
        </p>
        <div className="actions">
          <button type="button" className="btn btn--gold" onClick={reset}>
            <span>Try again</span>
          </button>
          <Link href="/" className="btn btn--ghost-dark">
            <span>Return home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
