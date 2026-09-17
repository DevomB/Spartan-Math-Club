import { EmptyEvents } from "@/components/events/empty-events";
import { EventCard } from "@/components/events/event-card";
import { MeetingCard } from "@/components/events/meeting-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHead } from "@/components/ui/section-head";
import { events, weeklyMeetings } from "@/content/events";
import { meetingOccurrences, pastEvents, requestTime, upcomingEvents } from "@/lib/dates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Events",
  description:
    "The weekly meeting, problem sessions, talks, and competitions from the Spartan Math Club at San José State. Add any event to your calendar.",
  path: "/events",
});

export const revalidate = 3600;

export default function EventsPage() {
  const now = requestTime();
  const upcoming = upcomingEvents(events, now);
  const past = pastEvents(events, now);
  const meetings = weeklyMeetings.filter((meeting) => meetingOccurrences(meeting, now, 1).length);

  return (
    <main id="content" tabIndex={-1}>
      <PageHero
        eyebrow="Events"
        title={
          <>
            Problems are better <em>in person.</em>
          </>
        }
      >
        <p className="hero-body">
          A standing weekly meeting, plus competitions, talks, and the occasional unreasonable challenge. Everything is
          open to SJSU students — no RSVP prerequisite, no math prerequisite. All times Pacific.
        </p>
      </PageHero>

      {meetings.length ? (
        <section className="section surface-paper section--tight" aria-labelledby="weekly-heading">
          <div className="container">
            <SectionHead index="1" kicker="Every week" id="weekly-heading" title="A periodic function with period seven days." />
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} events={events} now={now} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section surface-paper section--ruled" aria-labelledby="upcoming-heading">
        <div className="container">
          <SectionHead
            index={meetings.length ? "2" : "1"}
            kicker="Special events"
            id="upcoming-heading"
            title="On the calendar."
          />
          {upcoming.length ? (
            <div className="event-list">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : meetings.length ? (
            <p className="no-specials">
              No special events are scheduled right now — but the weekly meeting is always on. Come to that.
            </p>
          ) : (
            <EmptyEvents />
          )}
        </div>
      </section>

      {past.length ? (
        <section className="section surface-paper section--ruled" aria-labelledby="past-heading">
          <div className="container">
            <SectionHead
              index={meetings.length ? "3" : "2"}
              kicker="Archive"
              id="past-heading"
              title="Past events: a constructive proof that we exist."
            />
            <div className="event-list">
              {past.map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
