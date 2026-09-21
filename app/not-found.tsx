import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" tabIndex={-1} className="utility surface-ink">
      <div className="container utility-inner">
        <p className="eyebrow">Error 404</p>
        <h1 className="page-title">Page not found.</h1>
        <p className="hero-body">The requested page may have moved or may no longer exist.</p>
        <div className="actions">
          <Link href="/" className="button button--light">Return home</Link>
        </div>
      </div>
    </main>
  );
}
