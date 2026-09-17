import { Glyph } from "@/components/math/tex";
import type { ClubEvent } from "@/content/events";
import { cn } from "@/lib/cn";
import { fmt } from "@/lib/dates";
import { isHttpsUrl } from "@/lib/links";

export function EventCard({ event, past = false }: { event: ClubEvent; past?: boolean }) {
  const rsvp = !past && !event.cancelled && isHttpsUrl(event.rsvpHref) ? event.rsvpHref : undefined;

  return (
    <article
      className={cn("event", past && "event--past", event.cancelled && "event--cancelled")}
      id={event.id}
      aria-labelledby={`${event.id}-title`}
    >
      <time className="event-date" dateTime={event.startsAt}>
        <span className="event-month">{fmt.month(event.startsAt)}</span>
        <span className="event-day">{fmt.day(event.startsAt)}</span>
        <span className="event-weekday">{fmt.weekday(event.startsAt).slice(0, 3)}</span>
      </time>
      <div className="event-body">
        <p className="event-kind">
          {event.cancelled ? (
            <span className="event-status event-status--cancelled">
              <Glyph tex={String.raw`\bot`} />
              Cancelled
            </span>
          ) : past ? (
            <span className="event-status event-status--past">
              <Glyph tex={String.raw`\blacksquare`} />
              Happened
            </span>
          ) : (
            <span className="event-status event-status--special">
              <Glyph tex={String.raw`\exists`} />
              Special event
            </span>
          )}
          <span>{event.kind}</span>
        </p>
        <h3 className="event-title" id={`${event.id}-title`}>
          {event.title}
        </h3>
        {event.speaker ? <p className="event-speaker">with {event.speaker}</p> : null}
        <p className="event-summary">{event.summary}</p>
        <dl className="event-facts">
          <div>
            <dt>When</dt>
            <dd>
              {fmt.full(event.startsAt)} · {fmt.timeRange(event.startsAt, event.endsAt)}
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{event.location}</dd>
          </div>
        </dl>
        {!past && !event.cancelled ? (
          <div className="event-actions">
            {rsvp ? (
              <a className="btn btn--gold btn--sm" href={rsvp} target="_blank" rel="noopener noreferrer">
                <span>RSVP</span>
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
                <span className="visually-hidden"> for {event.title} (opens in a new tab)</span>
              </a>
            ) : null}
            <a className="text-link" href={`/events/${event.id}/event.ics`} download={`${event.id}.ics`}>
              Add to calendar<span className="visually-hidden">: {event.title}</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
