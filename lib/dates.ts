import type { ClubEvent, Weekday, WeeklyMeeting } from "@/content/events";

export const TIME_ZONE = "America/Los_Angeles";
const DAY_MS = 86_400_000;
const WEEKDAYS: Weekday[] = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const WEEKDAY_NAMES: Record<Weekday, string> = {
  SU: "Sunday",
  MO: "Monday",
  TU: "Tuesday",
  WE: "Wednesday",
  TH: "Thursday",
  FR: "Friday",
  SA: "Saturday",
};

/**
 * Request time for server components. Pages that call this set
 * `revalidate`, so "upcoming" is recomputed at most an hour late.
 */
export function requestTime(): number {
  return Date.now();
}

function format(iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, ...options }).format(new Date(iso));
}

export const fmt = {
  month: (iso: string) => format(iso, { month: "short" }),
  day: (iso: string) => format(iso, { day: "numeric" }),
  weekday: (iso: string) => format(iso, { weekday: "long" }),
  full: (iso: string) => format(iso, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  short: (iso: string) => format(iso, { weekday: "short", month: "short", day: "numeric" }),
  monthDay: (iso: string) => format(iso, { month: "short", day: "numeric" }),
  clock: (iso: string) => format(iso, { hour: "numeric", minute: "2-digit" }),
  timeRange: (start: string, end: string) => `${fmt.clock(start)} – ${fmt.clock(end)} PT`,
  weekdayName: (day: Weekday) => WEEKDAY_NAMES[day],
};

/* ---------- One-off events ---------- */

function byStart(a: { startsAt: string }, b: { startsAt: string }) {
  return Date.parse(a.startsAt) - Date.parse(b.startsAt);
}

export function upcomingEvents(list: ClubEvent[], now: number): ClubEvent[] {
  return list.filter((event) => Date.parse(event.endsAt) >= now).sort(byStart);
}

export function pastEvents(list: ClubEvent[], now: number): ClubEvent[] {
  return list.filter((event) => Date.parse(event.endsAt) < now).sort((a, b) => byStart(b, a));
}

/* ---------- Pacific calendar arithmetic ---------- */

/** "YYYY-MM-DD" for the Pacific calendar day containing `instant`. */
export function pacificDate(instant: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(instant));
}

function addDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d) + days * DAY_MS).toISOString().slice(0, 10);
}

function weekdayOf(ymd: string): Weekday {
  const [y, m, d] = ymd.split("-").map(Number);
  return WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

/** UTC offset ("-07:00") in effect in Pacific time at a local date and time. */
function pacificOffset(ymd: string, hhmm: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hhmm.split(":").map(Number);
  // Probe at the local wall time interpreted as PST; the named offset at that instant is correct
  // for every time outside the 1–3 a.m. transition window, which meetings never use.
  const probe = Date.UTC(y, m - 1, d, hh + 8, mm);
  const name = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, timeZoneName: "longOffset" })
    .formatToParts(new Date(probe))
    .find((part) => part.type === "timeZoneName")?.value;
  const match = /GMT([+-]\d{2}:\d{2})/.exec(name ?? "");
  return match ? match[1] : "-08:00";
}

export function pacificIso(ymd: string, hhmm: string): string {
  return `${ymd}T${hhmm}:00${pacificOffset(ymd, hhmm)}`;
}

/* ---------- Weekly meetings ---------- */

export type MeetingOccurrence = {
  meeting: WeeklyMeeting;
  date: string;
  startsAt: string;
  endsAt: string;
};

/** The next `count` meetings that have not ended, honoring startsOn, endsOn, and skipDates. */
export function meetingOccurrences(meeting: WeeklyMeeting, now: number, count: number): MeetingOccurrence[] {
  const skips = new Set(meeting.skipDates ?? []);
  const today = pacificDate(now);
  let date = today > meeting.startsOn ? today : meeting.startsOn;
  const target = WEEKDAYS.indexOf(meeting.weekday);
  const offset = (target - WEEKDAYS.indexOf(weekdayOf(date)) + 7) % 7;
  date = addDays(date, offset);

  const found: MeetingOccurrence[] = [];
  for (let guard = 0; found.length < count && guard < 520; guard += 1, date = addDays(date, 7)) {
    if (meeting.endsOn && date > meeting.endsOn) break;
    if (skips.has(date)) continue;
    const endsAt = pacificIso(date, meeting.endTime);
    if (Date.parse(endsAt) < now) continue;
    found.push({ meeting, date, startsAt: pacificIso(date, meeting.startTime), endsAt });
  }
  return found;
}

export type MeetingDay = { date: string; label: string; status: "past" | "next" | "upcoming" | "skip" };

/**
 * Every scheduled date from startsOn through endsOn (or the next 12 weeks when
 * open-ended), tagged for display: past, the next meeting, upcoming, or skipped.
 */
export function meetingCalendar(meeting: WeeklyMeeting, now: number): MeetingDay[] {
  const skips = new Set(meeting.skipDates ?? []);
  const next = meetingOccurrences(meeting, now, 1)[0]?.date;
  const last = meeting.endsOn ?? addDays(pacificDate(now), 84);
  const days: MeetingDay[] = [];
  for (let date = meeting.startsOn, guard = 0; date <= last && guard < 60; date = addDays(date, 7), guard += 1) {
    const endsAt = Date.parse(pacificIso(date, meeting.endTime));
    const status = skips.has(date) ? "skip" : date === next ? "next" : endsAt < now ? "past" : "upcoming";
    days.push({ date, label: fmt.monthDay(pacificIso(date, "12:00")), status });
  }
  return days;
}

/** Skipped dates still in the future, paired with the one-off event (if any) that replaces them. */
export function upcomingSkips(meeting: WeeklyMeeting, list: ClubEvent[], now: number) {
  const today = pacificDate(now);
  return (meeting.skipDates ?? [])
    .filter((date) => date >= today && (!meeting.endsOn || date <= meeting.endsOn))
    .sort()
    .map((date) => ({
      date,
      label: fmt.monthDay(pacificIso(date, "12:00")),
      replacedBy: list.find((event) => !event.cancelled && pacificDate(Date.parse(event.startsAt)) === date),
    }));
}

/** A meeting occurrence shaped like a one-off event, for shared UI and structured data. */
export function occurrenceAsEvent(occurrence: MeetingOccurrence): ClubEvent {
  const { meeting } = occurrence;
  return {
    id: meeting.id,
    title: meeting.title,
    kind: meeting.kind,
    startsAt: occurrence.startsAt,
    endsAt: occurrence.endsAt,
    location: meeting.location,
    summary: meeting.summary,
  };
}

export type PromptCandidate = {
  key: string;
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  special: boolean;
};

/**
 * What the floating prompt might show over the next revalidation window. The
 * server sends a generous list (8 days); the client applies the exact 24-hour
 * rule against its own clock.
 */
export function promptCandidates(list: ClubEvent[], meetings: WeeklyMeeting[], now: number): PromptCandidate[] {
  const horizon = now + 8 * DAY_MS;
  const specials = upcomingEvents(list, now)
    .filter((event) => !event.cancelled && Date.parse(event.startsAt) <= horizon)
    .map((event) => ({ ...event, special: true }));
  const recurring = meetings.flatMap((meeting) =>
    meetingOccurrences(meeting, now, 2).map((occurrence) => ({ ...occurrenceAsEvent(occurrence), special: false })),
  );
  return [...specials, ...recurring].map((item) => ({
    key: `${item.id}@${item.startsAt}`,
    id: item.id,
    title: item.title,
    startsAt: item.startsAt,
    endsAt: item.endsAt,
    location: item.location,
    special: item.special,
  }));
}

/** The 24-hour rule: in progress or starting within a day; special events win. */
export function activePrompt<T extends { startsAt: string; endsAt: string; special: boolean }>(
  candidates: T[],
  now: number,
): T | undefined {
  const soon = candidates
    .filter((item) => Date.parse(item.endsAt) >= now && Date.parse(item.startsAt) <= now + DAY_MS)
    .sort(byStart);
  return soon.find((item) => item.special) ?? soon[0];
}

/** Everything upcoming for JSON-LD: one-off events plus each meeting's next few occurrences. */
export function structuredEvents(list: ClubEvent[], meetings: WeeklyMeeting[], now: number): ClubEvent[] {
  const recurring = meetings.flatMap((meeting) =>
    meetingOccurrences(meeting, now, 4).map((occurrence) => ({
      ...occurrenceAsEvent(occurrence),
      id: `${meeting.id}-${occurrence.date}`,
    })),
  );
  return [...upcomingEvents(list, now), ...recurring].sort(byStart);
}

/* ---------- iCalendar ---------- */

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:America/Los_Angeles",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0800",
  "TZOFFSETTO:-0700",
  "TZNAME:PDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0700",
  "TZOFFSETTO:-0800",
  "TZNAME:PST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

function icsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/([,;])/g, "\\$1");
}

function utcStamp(instant: number): string {
  return new Date(instant).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** RFC 5545 line folding: continuation lines begin with a space. */
function fold(line: string): string {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 70) {
    parts.push(rest.slice(0, 70));
    rest = ` ${rest.slice(70)}`;
  }
  parts.push(rest);
  return parts.join("\r\n");
}

function calendar(lines: string[], withTimezone: boolean): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Spartan Math Club//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...(withTimezone ? VTIMEZONE : []),
    ...lines,
    "END:VCALENDAR",
    "",
  ]
    .map(fold)
    .join("\r\n");
}

export function eventIcs(event: ClubEvent, url: string, stamp: number): string {
  return calendar(
    [
      "BEGIN:VEVENT",
      `UID:${event.id}@spartan-math-club`,
      `DTSTAMP:${utcStamp(stamp)}`,
      `DTSTART:${utcStamp(Date.parse(event.startsAt))}`,
      `DTEND:${utcStamp(Date.parse(event.endsAt))}`,
      `SUMMARY:${icsText(event.title)}`,
      `LOCATION:${icsText(event.location)}`,
      `DESCRIPTION:${icsText(`${event.summary}\n\n${url}`)}`,
      `URL:${url}`,
      event.cancelled ? "STATUS:CANCELLED" : "STATUS:CONFIRMED",
      "END:VEVENT",
    ],
    false,
  );
}

export function meetingIcs(meeting: WeeklyMeeting, url: string, stamp: number): string {
  const local = (ymd: string, hhmm: string) => `${ymd.replace(/-/g, "")}T${hhmm.replace(":", "")}00`;
  const rule = [`FREQ=WEEKLY`, `BYDAY=${meeting.weekday}`];
  if (meeting.endsOn) {
    rule.push(`UNTIL=${utcStamp(Date.parse(pacificIso(meeting.endsOn, meeting.endTime)))}`);
  }
  const lines = [
    "BEGIN:VEVENT",
    `UID:${meeting.id}@spartan-math-club`,
    `DTSTAMP:${utcStamp(stamp)}`,
    `DTSTART;TZID=${TIME_ZONE}:${local(meeting.startsOn, meeting.startTime)}`,
    `DTEND;TZID=${TIME_ZONE}:${local(meeting.startsOn, meeting.endTime)}`,
    `RRULE:${rule.join(";")}`,
    ...(meeting.skipDates ?? []).map((date) => `EXDATE;TZID=${TIME_ZONE}:${local(date, meeting.startTime)}`),
    `SUMMARY:${icsText(`${meeting.title} — Spartan Math Club`)}`,
    `LOCATION:${icsText(meeting.location)}`,
    `DESCRIPTION:${icsText(`${meeting.summary}\n\n${url}`)}`,
    `URL:${url}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
  ];
  return calendar(lines, true);
}
