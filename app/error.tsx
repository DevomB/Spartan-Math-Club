"use client";

import Link from "next/link";

export default function ErrorState({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="content" tabIndex={-1} className="utility surface-ink">
      <div className="container utility-inner">
        <p className="eyebrow">Runtime error</p>
        <h1 className="page-title">This page could not be loaded.</h1>
        <p className="hero-body">Try loading the page again. If the problem continues, return to the homepage.</p>
        <div className="actions">
          <button type="button" className="button button--light" onClick={reset}>Try again</button>
          <Link href="/" className="button button--secondary">Return home</Link>
        </div>
      </div>
    </main>
  );
}
