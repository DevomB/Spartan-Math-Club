import { Caveat, Fredericka_the_Great, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

/**
 * Computer Modern, via the KaTeX_Main files, so headings share a typeface
 * with the typeset math. Copied from katex/dist/fonts (MIT).
 */
export const computerModern = localFont({
  // Regular and italic only: no rule pairs var(--serif) with a bold weight, and the
  // bold files were 41KB of download nothing asked for.
  src: [
    { path: "./fonts/KaTeX_Main-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/KaTeX_Main-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-cm",
  display: "swap",
  fallback: ["Latin Modern Roman", "CMU Serif", "Georgia", "serif"],
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

/**
 * Board face (brand v2.1). Display text only, never below 24px.
 *
 * It is a 198KB sketch face — the outlines are the size, not the character set
 * (subsetting to Latin-1 saves 4%). It stays preloaded because the board headline is
 * the largest text on the page: dropping the preload pushed the swap, and with it LCP,
 * far later. The metric-matched "Fredericka Fallback" in globals.css covers the gap
 * until it arrives, so the swap no longer moves anything.
 */
export const fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  variable: "--font-fredericka",
  display: "swap",
  weight: "400",
  // Next has no metrics for this face; globals.css declares the fallback by hand.
  adjustFontFallback: false,
});

/** Handwritten labels: "Lemma 2.", "Tomorrow!". Labels things; never carries information alone. */
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "700"],
  // Decorative labels: let the metric-matched fallback show first (73KB off the critical path).
  preload: false,
});
