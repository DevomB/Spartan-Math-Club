import { Caveat, Fredericka_the_Great, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

/**
 * Computer Modern, via the KaTeX_Main files, so headings share a typeface
 * with the typeset math. Copied from katex/dist/fonts (MIT).
 */
export const computerModern = localFont({
  src: [
    { path: "./fonts/KaTeX_Main-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/KaTeX_Main-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/KaTeX_Main-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/KaTeX_Main-BoldItalic.woff2", weight: "700", style: "italic" },
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

/** Board face (brand v2.1). Display text only, never below 24px. */
export const fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  variable: "--font-fredericka",
  display: "swap",
  weight: "400",
  // Next has no fallback metrics for this face; skip the size-adjust shim.
  adjustFontFallback: false,
});

/** Handwritten labels: "Lemma 2.", "Tomorrow!". Labels things; never carries information alone. */
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "700"],
});
