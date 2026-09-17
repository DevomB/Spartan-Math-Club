// Smoke test for lib/dates.ts. Run: node --experimental-strip-types --no-warnings scripts/check-dates.mjs
import assert from "node:assert/strict";
import { activePrompt, meetingCalendar, meetingIcs, meetingOccurrences, pacificIso, promptCandidates, upcomingSkips } from "../lib/dates.ts";

const meeting = {
  id: "weekly-meeting", title: "Weekly Meeting", kind: "Weekly Meeting", weekday: "MO",
  startTime: "15:00", endTime: "16:00", location: "SCI 321A", summary: "x",
  startsOn: "2026-09-21", skipDates: ["2026-10-19"],
};
const event = { id: "quarter", title: "Quarter", kind: "Competition", startsAt: "2026-10-19T15:00:00-07:00", endsAt: "2026-10-19T16:00:00-07:00", location: "SU", summary: "y" };

assert.equal(pacificIso("2026-09-21", "15:00"), "2026-09-21T15:00:00-07:00");
assert.equal(pacificIso("2026-11-09", "15:00"), "2026-11-09T15:00:00-08:00"); // after DST ends Nov 1

const wedSep16 = Date.parse("2026-09-16T12:00:00-07:00");
const dates = meetingOccurrences(meeting, wedSep16, 7).map((o) => o.date);
assert.deepEqual(dates, ["2026-09-21", "2026-09-28", "2026-10-05", "2026-10-12", "2026-10-26", "2026-11-02", "2026-11-09"]);

// Monday during the meeting still shows today; after it ends, next week.
assert.equal(meetingOccurrences(meeting, Date.parse("2026-09-28T15:30:00-07:00"), 1)[0].date, "2026-09-28");
assert.equal(meetingOccurrences(meeting, Date.parse("2026-09-28T16:01:00-07:00"), 1)[0].date, "2026-10-05");

const skips = upcomingSkips(meeting, [event], wedSep16);
assert.equal(skips[0].replacedBy.id, "quarter");
assert.equal(skips[0].label, "Oct 19");

// Prompt: only within 24h or while happening; a special event beats the meeting.
const at = (iso) => Date.parse(iso);
const pick = (now) => activePrompt(promptCandidates([event], [meeting], now), now);
assert.equal(pick(wedSep16), undefined);
assert.equal(pick(at("2026-09-20T16:00:00-07:00")).startsAt, "2026-09-21T15:00:00-07:00");
assert.equal(pick(at("2026-09-21T15:30:00-07:00")).id, "weekly-meeting");
assert.equal(pick(at("2026-09-21T16:30:00-07:00")), undefined);
assert.equal(pick(at("2026-10-18T18:00:00-07:00")).id, "quarter");

// Semester calendar tags.
const cal = meetingCalendar({ ...meeting, startsOn: "2026-08-24", endsOn: "2026-12-07", skipDates: ["2026-09-07", "2026-10-19"] }, wedSep16);
assert.equal(cal.length, 16);
assert.deepEqual(cal.slice(0, 5).map((d) => d.status), ["past", "past", "skip", "past", "next"]);
assert.equal(cal.find((d) => d.date === "2026-10-19").status, "skip");

const ics = meetingIcs(meeting, "https://example.test/events#weekly-meeting", 0);
assert.match(ics, /DTSTART;TZID=America\/Los_Angeles:20260921T150000/);
assert.match(ics, /RRULE:FREQ=WEEKLY;BYDAY=MO/);
assert.match(ics, /EXDATE;TZID=America\/Los_Angeles:20261019T150000/);
assert.ok(ics.split("\r\n").every((line) => line.length <= 75), "lines folded");
console.log("date checks passed");
