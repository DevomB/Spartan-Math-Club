import { Reveal } from "@/components/ui/reveal";
import { events, weeklyMeetings } from "@/content/events";
import {
  fmt,
  meetingOccurrences,
  requestTime,
  upcomingEvents,
  upcomingSkips,
} from "@/lib/dates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Events",
  description: "Weekly meetings and upcoming mathematics events from the Spartan Mathematics Club at SJSU.",
  path: "/events",
});

export const revalidate = 3600;

type TimelineEntry = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  summary: string;
  kind: string;
  cancelled?: boolean;
  calendarHref?: string;
};

export default function EventsPage() {
  const now = requestTime();
  const meeting = weeklyMeetings[0];
  const recurring: TimelineEntry[] = meeting
    ? meetingOccurrences(meeting, now, 8).map((occurrence) => ({
        id: `${meeting.id}-${occurrence.date}`,
        title: meeting.title,
        startsAt: occurrence.startsAt,
        endsAt: occurrence.endsAt,
        location: meeting.location,
        summary: meeting.summary,
        kind: meeting.kind,
        calendarHref: `/events/${meeting.id}/event.ics`,
      }))
    : [];
  const special: TimelineEntry[] = upcomingEvents(events, now).map((event) => ({
    ...event,
    calendarHref: `/events/${event.id}/event.ics`,
  }));
  const cancellations: TimelineEntry[] = meeting
    ? upcomingSkips(meeting, events, now)
        .filter((skip) => !skip.replacedBy)
        .map((skip) => ({
          id: `cancelled-${skip.date}`,
          title: "No weekly meeting",
          startsAt: `${skip.date}T15:00:00-07:00`,
          endsAt: `${skip.date}T16:00:00-07:00`,
          location: "No meeting",
          summary: "The Spartan Mathematics Club will not meet on this date.",
          kind: "Schedule notice",
          cancelled: true,
        }))
    : [];
  const timeline = [...cancellations, ...special, ...recurring]
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .slice(0, 12);

  return (
    <main id="content" tabIndex={-1}>
      <section className="page-intro">
        <div className="container page-intro-layout">
          <p className="eyebrow">Events</p>
          <h1>Weekly meetings and mathematical events at SJSU.</h1>
          <p className="page-lede">
            General meetings are Mondays from 3:00 to 4:00 PM in SCI 321A. Special events and schedule changes are
            listed below.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="section" aria-labelledby="weekly-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">General meetings</p>
              <h2 id="weekly-title">Work through problems with other students.</h2>
            </header>
            <div className="meeting-details">
              <dl>
                <div><dt>When</dt><dd>Mondays, 3:00 to 4:00 PM</dd></div>
                <div><dt>Where</dt><dd>SCI 321A</dd></div>
                <div><dt>Format</dt><dd>Two or three collaborative problems, announcements, and time to connect</dd></div>
              </dl>
              <p>No meeting will be held on September 21. The September 28 meeting will include a special announcement.</p>
              {meeting ? <a className="text-link" href={`/events/${meeting.id}/event.ics`} download={`${meeting.id}.ics`}>Add general meetings to your calendar</a> : null}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--muted" aria-labelledby="calendar-title">
          <div className="container">
            <header className="section-intro section-intro--wide">
              <p className="section-label">Calendar</p>
              <h2 id="calendar-title">Upcoming schedule.</h2>
            </header>
            <ol className="timeline">
              {timeline.map((entry) => {
                const isCompetition = entry.kind === "Competition";
                const className = [
                  "timeline-item",
                  entry.cancelled ? "is-cancelled" : "",
                  isCompetition ? "is-featured" : "",
                ].filter(Boolean).join(" ");

                return (
                  <li id={entry.id} key={entry.id} className={className}>
                    <time dateTime={entry.startsAt} className="timeline-date">
                      <span>{fmt.month(entry.startsAt)}</span>
                      <strong>{fmt.day(entry.startsAt)}</strong>
                    </time>
                    <div className="timeline-main">
                      <p className="timeline-kind">{isCompetition ? "Featured competition" : entry.kind}</p>
                      <h3>{entry.title}</h3>
                      <p>{entry.summary}</p>
                    </div>
                    <div className="timeline-meta">
                      <p>{fmt.weekday(entry.startsAt)}</p>
                      <p>{entry.cancelled ? "Cancelled" : fmt.timeRange(entry.startsAt, entry.endsAt)}</p>
                      <p>{entry.location}</p>
                      {entry.calendarHref ? <a className="text-link" href={entry.calendarHref} download>Add to calendar</a> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
