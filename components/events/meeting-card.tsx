import { Glyph } from "@/components/math/tex";
import type { ClubEvent, WeeklyMeeting } from "@/content/events";
import { fmt, meetingOccurrences, pacificIso, upcomingSkips } from "@/lib/dates";

export function MeetingCard({ meeting, events, now }: { meeting: WeeklyMeeting; events: ClubEvent[]; now: number }) {
  const upcoming = meetingOccurrences(meeting, now, 4);
  const next = upcoming[0];
  const skips = upcomingSkips(meeting, events, now);
  const day = fmt.weekdayName(meeting.weekday);
  const sampleStart = next?.startsAt ?? pacificIso(meeting.startsOn, meeting.startTime);
  const sampleEnd = next?.endsAt ?? pacificIso(meeting.startsOn, meeting.endTime);

  return (
    <article className="meeting" id={meeting.id} aria-labelledby={`${meeting.id}-title`}>
      <div className="meeting-rhythm" aria-hidden="true">
        <span className="meeting-every">every</span>
        <span className="meeting-day">{day.slice(0, 3)}</span>
        <span className="meeting-period">T = 7 days</span>
      </div>
      <div className="meeting-body">
        <p className="event-kind">
          <span className="event-status event-status--weekly">
            <Glyph tex={String.raw`\Box`} />
            Every {day}
          </span>
          <span>Standing meeting</span>
        </p>
        <h3 className="event-title" id={`${meeting.id}-title`}>
          {meeting.title}
        </h3>
        <p className="meeting-when">
          Every {day} · {fmt.timeRange(sampleStart, sampleEnd)} · {meeting.location}
        </p>
        <p className="event-summary">{meeting.summary}</p>

        {upcoming.length ? (
          <div className="meeting-next">
            <p className="meeting-next-label">Next meetings</p>
            <ol className="meeting-dates">
              {upcoming.map((occurrence, index) => (
                <li key={occurrence.date} className={index === 0 ? "is-next" : undefined}>
                  <time dateTime={occurrence.startsAt}>{fmt.short(occurrence.startsAt)}</time>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="muted">No more meetings are scheduled this term.</p>
        )}

        {skips.length ? (
          <ul className="meeting-skips">
            {skips.map((skip) => (
              <li key={skip.date}>
                <strong>No meeting {skip.label}</strong>
                {skip.replacedBy ? (
                  <>
                    {" "}
                    — <a href={`#${skip.replacedBy.id}`}>{skip.replacedBy.title}</a> takes its place.
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="event-actions">
          <a className="text-link" href={`/events/${meeting.id}/event.ics`} download={`${meeting.id}.ics`}>
            Add to calendar (repeats weekly)<span className="visually-hidden">: {meeting.title}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
