import { IBM_Plex_Sans } from "next/font/google";
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
