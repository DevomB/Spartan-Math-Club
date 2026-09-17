import { EmptyEvents } from "@/components/events/empty-events";
import { EventCard } from "@/components/events/event-card";
import { MeetingCard } from "@/components/events/meeting-card";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-head";
import { events, weeklyMeetings } from "@/content/events";
import { meetingOccurrences, upcomingEvents } from "@/lib/dates";

export function EventsPreview({ now }: { now: number }) {
  const shown = upcomingEvents(events, now).slice(0, 3);
  const meetings = weeklyMeetings.filter((meeting) => meetingOccurrences(meeting, now, 1).length);

  return (
    <section className="section surface-paper" id="upcoming" aria-labelledby="events-heading">
      <div className="container">
        <div className="split-head">
          <SectionHead index="3" kicker="Upcoming" id="events-heading" title="Where to find us next." />
          <Button href="/events" label="All events" variant="ink" />
        </div>
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} events={events} now={now} />
        ))}
        {shown.length ? (
          <div className="event-list">
            {shown.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : meetings.length ? null : (
          <EmptyEvents compact />
        )}
      </div>
    </section>
  );
}
