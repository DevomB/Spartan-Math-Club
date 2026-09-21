import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { StructuredData } from "@/components/seo/structured-data";
import { events, weeklyMeetings } from "@/content/events";
import { requestTime, structuredEvents } from "@/lib/dates";
import { computerModern, plexSans } from "@/lib/fonts";
import { rootMetadata } from "@/lib/seo";
import "katex/dist/katex.min.css";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = rootMetadata();

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#f8f7f3",
  colorScheme: "light",
};

/** Event metadata refreshes hourly. */
export const revalidate = 3600;

const fontVariables = [computerModern, plexSans].map((font) => font.variable).join(" ");

export default function RootLayout({ children }: { children: ReactNode }) {
  const now = requestTime();

  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <StructuredData upcoming={structuredEvents(events, weeklyMeetings, now)} />
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
