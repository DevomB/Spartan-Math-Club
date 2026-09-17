import type { ClubEvent } from "@/content/events";
import { jsonLd } from "@/lib/seo";

export function StructuredData({ upcoming }: { upcoming: ClubEvent[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(upcoming)).replace(/</g, "\\u003c") }}
    />
  );
}
