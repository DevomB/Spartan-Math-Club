import { BOARD_MODE_SCRIPT } from "@/components/board/board-track";
import { ChalkDefs } from "@/components/brand/chalk-defs";
import { ConsoleHello } from "@/components/layout/console-hello";
import { FloatingPrompt } from "@/components/layout/floating-prompt";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Glyph } from "@/components/math/tex";
import { SkipLink } from "@/components/layout/skip-link";
import { StructuredData } from "@/components/seo/structured-data";
import { events, weeklyMeetings } from "@/content/events";
import { promptCandidates, requestTime, structuredEvents } from "@/lib/dates";
import { caveat, computerModern, fredericka, plexMono, plexSans } from "@/lib/fonts";
import { rootMetadata } from "@/lib/seo";
import "katex/dist/katex.min.css";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = rootMetadata();

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#121311",
  colorScheme: "dark",
};

/** Event-dependent chrome (prompt candidates, JSON-LD) refreshes hourly. */
export const revalidate = 3600;

const fontVariables = [computerModern, plexSans, plexMono, fredericka, caveat].map((font) => font.variable).join(" ");

export default function RootLayout({ children }: { children: ReactNode }) {
  const now = requestTime();

  return (
    <html lang="en" className={fontVariables}>
      <body>
        {/* First thing in the body: decides the board's layout before anything paints,
            so the panels never move once the page is interactive. See BOARD_MODE_SCRIPT. */}
        <script dangerouslySetInnerHTML={{ __html: BOARD_MODE_SCRIPT }} />
        <ChalkDefs />
        <StructuredData upcoming={structuredEvents(events, weeklyMeetings, now)} />
        <SkipLink />
        <SiteHeader
          glyphs={{
            "/events": <Glyph tex={String.raw`\exists`} />,
            "/problems": <Glyph tex={String.raw`\vdash`} />,
            "/consulting": <Glyph tex={String.raw`\Sigma`} />,
            "/join": <Glyph tex={String.raw`\forall`} />,
          }}
        />
        {children}
        <SiteFooter />
        <FloatingPrompt candidates={promptCandidates(events, weeklyMeetings, now)} />
        <ConsoleHello />
      </body>
    </html>
  );
}
