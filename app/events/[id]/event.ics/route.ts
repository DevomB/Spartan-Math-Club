import { events, weeklyMeetings } from "@/content/events";
import { eventIcs, meetingIcs } from "@/lib/dates";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...weeklyMeetings, ...events].map((item) => ({ id: item.id }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = absoluteUrl(`/events#${id}`);
  const stamp = Date.now();
  const meeting = weeklyMeetings.find((item) => item.id === id);
  const event = events.find((item) => item.id === id);
  const body = meeting ? meetingIcs(meeting, url, stamp) : event ? eventIcs(event, url, stamp) : undefined;
  if (!body) return new Response("Not found", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${id}.ics"`,
    },
  });
}
