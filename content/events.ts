/**
 * Club calendar. The home page, /events, the announcement bar, structured
 * data, and the .ics downloads all read this file.
 *
 * One-off events: times MUST be ISO 8601 with an explicit offset, e.g.
 *   "2026-09-24T18:00:00-07:00"  (Pacific Daylight Time)
 *   "2026-12-03T18:00:00-08:00"  (Pacific Standard Time)
 *
 * Weekly meetings: dates are "YYYY-MM-DD" and times "HH:MM", both in
 * Pacific time; offsets are computed automatically across DST.
 *
 * Past one-off events stay listed on /events as the club's public record.
 */
export type EventKind =
  | "Weekly Meeting"
  | "Problem Session"
  | "Talk"
  | "Workshop"
  | "Competition"
  | "Quant Night"
  | "Social"
  | "Info Session"
  | "Consulting";

export type ClubEvent = {
  /** URL-safe, unique, stable. Used for anchors and calendar files. */
  id: string;
  title: string;
  kind: EventKind;
  startsAt: string;
  endsAt: string;
  location: string;
  summary: string;
  speaker?: string;
  /** Sammy, Luma, Google Form… any https URL. */
  rsvpHref?: string;
  cancelled?: boolean;
  /**
   * Optional one-line formal translation shown under the board headline
   * (KaTeX source, decorative). Use TeX commands, never raw Unicode math.
   */
  formal?: string;
};

export type Weekday = "SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA";

export type WeeklyMeeting = {
  /** URL-safe, unique, stable. Must not collide with a one-off event id. */
  id: string;
  title: string;
  kind: EventKind;
  weekday: Weekday;
  /** "HH:MM", 24-hour, Pacific time. */
  startTime: string;
  endTime: string;
  location: string;
  summary: string;
  /** First meeting, "YYYY-MM-DD". Should fall on `weekday`. */
  startsOn: string;
  /** Last possible meeting, "YYYY-MM-DD". Omit for open-ended. */
  endsOn?: string;
  /** Dates with no meeting, "YYYY-MM-DD" — breaks, or weeks a special event replaces it. */
  skipDates?: string[];
};

export const weeklyMeetings: WeeklyMeeting[] = [
  {
    id: "weekly-meeting",
    title: "Weekly Meeting",
    kind: "Weekly Meeting",
    weekday: "MO",
    startTime: "15:00",
    endTime: "16:00",
    location: "SCI 321A",
    summary:
      "The standing meeting: problems on the board, arguments about them, and whatever anyone brings. Drop in any Monday — no RSVP, no prerequisite.",
    // Fall 2026 instruction: first Monday Aug 24, last day of instruction Mon Dec 7.
    startsOn: "2026-08-24",
    endsOn: "2026-12-07",
    // Sep 7: Labor Day, campus closed. Oct 19: "Are You Smarter Than a Quarter?" replaces the meeting.
    skipDates: ["2026-09-07", "2026-10-19"],
  },
];

export const events: ClubEvent[] = [
  {
    id: "are-you-smarter-than-a-quarter-2026",
    title: "Are You Smarter Than a Quarter?",
    kind: "Competition",
    startsAt: "2026-10-19T15:00:00-07:00",
    endsAt: "2026-10-19T16:00:00-07:00",
    location: "Student Union, Room 5",
    summary: "A game-show-style math challenge. Open to all SJSU students — no math prerequisite.",
    formal: String.raw`\text{you} \models (\text{you} > \$0.25)\ ?`,
  },
];
