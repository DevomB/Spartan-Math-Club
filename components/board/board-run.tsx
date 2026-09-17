import { Crest } from "@/components/brand/crest";
import { BoardTrack, type PanelMeta } from "@/components/board/board-track";
import { MathText, Tex } from "@/components/math/tex";
import { proofOfTheWeek } from "@/content/board";
import { homeCopy } from "@/content/club";
import { consultingCopy } from "@/content/consulting";
import { events, weeklyMeetings } from "@/content/events";
import { cn } from "@/lib/cn";
import { fmt, meetingCalendar, pacificIso, upcomingEvents, upcomingSkips } from "@/lib/dates";
import { texText } from "@/lib/tex";
import Link from "next/link";
import type { ReactNode } from "react";
import "./board.css";

const tex = String.raw;

/** Circle the last two words of a title in red chalk. */
function circledTail(title: string): ReactNode {
  const words = title.split(" ");
  if (words.length < 3) return <span className="circle-r">{title}</span>;
  return (
    <>
      {words.slice(0, -2).join(" ")} <span className="circle-r">{words.slice(-2).join(" ")}</span>
    </>
  );
}

/** "3–4 PM" style range for a meeting. */
function shortRange(startsAt: string, endsAt: string): string {
  const start = fmt.clock(startsAt).replace(":00", "");
  const end = fmt.clock(endsAt).replace(":00", "");
  const [startTime, startPeriod] = start.split(" ");
  const [endTime, endPeriod] = end.split(" ");
  return startPeriod === endPeriod ? `${startTime}–${endTime} ${endPeriod}` : `${start}–${end}`;
}

/**
 * Ghost formulas drift at 35% of the panel speed, so a ghost at `left` sits at
 * (left − 35·i)% of the screen while panel i is in view. Each is placed in its
 * panel's empty right side (≈ 68–88%), above or below the text band.
 */
const GHOST_DRIFT = 35;
const GHOSTS: Array<{ tex: string; panel: number; x: number; top: string }> = [
  { tex: tex`e^{i\pi} + 1 = 0`, panel: 0, x: 72, top: "12%" },
  { tex: tex`\sum 1/n^2 = \pi^2/6`, panel: 0, x: 76, top: "78%" },
  { tex: tex`V - E + F = 2`, panel: 1, x: 74, top: "80%" },
  { tex: tex`a^p \equiv a \pmod p`, panel: 2, x: 70, top: "10%" },
  { tex: tex`\varphi = \tfrac{1+\sqrt5}{2}`, panel: 3, x: 78, top: "78%" },
  { tex: tex`|\mathbb{N}| < |\mathbb{R}|`, panel: 4, x: 80, top: "12%" },
  { tex: tex`\oint_{\partial\Omega} \omega = \int_\Omega d\omega`, panel: 5, x: 70, top: "78%" },
  { tex: tex`\mathbb{E}[X+Y] = \mathbb{E}[X] + \mathbb{E}[Y]`, panel: 6, x: 60, top: "80%" },
  { tex: tex`\sqrt2 \notin \mathbb{Q}`, panel: 6, x: 80, top: "12%" },
];

type Panel = { id: string; title: string; kind: string; node: (label: string) => ReactNode };

export function BoardRun({ now }: { now: number }) {
  const meeting = weeklyMeetings[0];
  const special = upcomingEvents(events, now).find((event) => !event.cancelled);
  const proof = proofOfTheWeek(now);
  const panels: Panel[] = [];

  panels.push({
    id: "top",
    title: "For all problems, there exists a Monday.",
    kind: "",
    node: () => (
      <>
        <p className="eyebrow-board">Spartan Math Club · student org at San José State</p>
        <h1 className="board-h chalky">
          For all problems, <span className="y">there exists a Monday.</span>
        </h1>
        <Tex hidden className="formal">{tex`\forall p \in \text{Problems},\ \exists m \in \text{Mondays} : m \vdash p`}</Tex>
        <div className="board-row">
          <Link className="btn btn--gold" href="/join">
            <span>Join the club</span>
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
          {meeting ? (
            <a className="u-b" href="#events">
              This Monday
            </a>
          ) : null}
        </div>
      </>
    ),
  });

  panels.push({
    id: "about",
    title: "A member is anyone who shows up.",
    kind: "Definition",
    node: (label) => (
      <>
        <p className="label d chalky">{label}.</p>
        <h2 className="board-h2 chalky">
          A member is <span className="u-y">anyone who shows up.</span>
        </h2>
        <Tex hidden className="formal">{tex`\text{Member}(x) :\iff \text{ShowsUp}(x)\quad\cdot\quad \neg\exists\ \text{prerequisite}`}</Tex>
        <p className="board-lede">
          No application. No prerequisite. No minimum GPA. Every major, every level. Nobody starts good at math. You
          get there by working problems with other people.
        </p>
        <ul className="board-pillars">
          {homeCopy.pillars.map((pillar) => (
            <li key={pillar.title}>
              <Tex className="sym">{pillar.symbol}</Tex>
              {pillar.href ? <Link href={pillar.href}>{pillar.title}</Link> : <span>{pillar.title}</span>}
            </li>
          ))}
        </ul>
      </>
    ),
  });

  if (meeting) {
    const calendar = meetingCalendar(meeting, now);
    const sample = pacificIso(meeting.startsOn, meeting.startTime);
    const sampleEnd = pacificIso(meeting.startsOn, meeting.endTime);
    const skips = upcomingSkips(meeting, events, Date.parse(pacificIso(meeting.startsOn, "00:00")));
    const day = fmt.weekdayName(meeting.weekday);
    panels.push({
      id: "events",
      title: `Every ${day}, ${shortRange(sample, sampleEnd)}, ${meeting.location}.`,
      kind: "Lemma",
      node: (label) => (
        <>
          <p className="label d chalky">
            {label} ({day}s).
          </p>
          <h2 className="board-h2 chalky">
            Every {day}, <span className="y nowrap">{shortRange(sample, sampleEnd)}</span>, {meeting.location}.
          </h2>
          <Tex hidden className="formal">
            {tex`\forall w \in \text{Weeks}` +
              (skips.length ? tex` \setminus \{` + skips.map((skip) => tex`\text{${texText(skip.label)}}`).join(", ") + tex`\}` : "") +
              tex` : \text{Meets}(\text{${texText(day.slice(0, 3))}}_w,\ \text{${texText(meeting.startTime)}},\ \text{${texText(meeting.location)}})`}
          </Tex>
          <div className="facts">
            <span>
              <b>Runs</b>
              {fmt.monthDay(sample)} → {meeting.endsOn ? fmt.monthDay(pacificIso(meeting.endsOn, "12:00")) : "ongoing"}
              {meeting.endsOn ? `, ${meeting.endsOn.slice(0, 4)}` : ""}
            </span>
            {skips.length ? (
              <span>
                <b>No meeting</b>
                {skips
                  .map((skip) => (skip.replacedBy && special && skip.replacedBy.id === special.id ? `${skip.label} (see the exercise)` : skip.label))
                  .join(" · ")}
              </span>
            ) : null}
          </div>
          <ol className="mondays" aria-label={`${day} meetings`}>
            {calendar.map((entry) => (
              <li key={entry.date} className={entry.status}>
                {entry.label}
                {entry.status === "next" ? <span className="visually-hidden"> (next meeting)</span> : null}
                {entry.status === "skip" ? <span className="visually-hidden"> (no meeting)</span> : null}
                {entry.status === "past" ? <span className="visually-hidden"> (past)</span> : null}
              </li>
            ))}
          </ol>
          <div className="board-row">
            <a className="u-b" href={`/events/${meeting.id}/event.ics`} download={`${meeting.id}.ics`}>
              Add every {day} to your calendar
            </a>
            <Link className="u-b" href="/events">
              All events
            </Link>
          </div>
        </>
      ),
    });
  }

  if (special) {
    panels.push({
      id: "special-event",
      title: special.title,
      kind: "Exercise",
      node: (label) => (
        <>
          <p className="label r chalky">
            {label}. <span className="d">(special event)</span>
          </p>
          <h2 className="board-h2 chalky">{circledTail(special.title)}</h2>
          <Tex hidden className="formal">
            {special.formal ?? tex`\exists\, e \in \text{Events} : \text{you} \in e\ ?`}
          </Tex>
          <div className="facts">
            <span>
              <b>When</b>
              {fmt.short(special.startsAt)} · {fmt.timeRange(special.startsAt, special.endsAt)}
            </span>
            <span>
              <b>Where</b>
              {special.location}
            </span>
          </div>
          <p className="board-lede">{special.summary}</p>
          <div className="board-row">
            <a className="u-b" href={`/events/${special.id}/event.ics`} download={`${special.id}.ics`}>
              Add to calendar
            </a>
            <Link className="u-b" href={`/events#${special.id}`}>
              Details
            </Link>
          </div>
        </>
      ),
    });
  }

  panels.push({
    id: "theorem",
    title: proof.statement,
    kind: "Theorem",
    node: (label) => (
      <>
        <p className="label d chalky">
          {label} ({proof.name}).
        </p>
        <h2 className="board-h2 chalky">{proof.statement}</h2>
        {proof.formal ? (
          <Tex hidden className="formal">
            {proof.formal}
          </Tex>
        ) : null}
        <div className="board-proof chalky">
          {proof.lines.map((line, index) => (
            <p key={line}>
              {index === 0 ? <span className="d">Proof. </span> : null}
              <MathText as="span">{line}</MathText>
              {index === proof.lines.length - 1 ? (
                <>
                  {" "}
                  <Tex className="board-qed">{tex`\blacksquare`}</Tex>
                </>
              ) : null}
            </p>
          ))}
        </div>
        <p className="placeholder-tag">Classic public-domain proof · rotates weekly</p>
      </>
    ),
  });

  panels.push({
    id: "consult",
    title: "Bring us yours.",
    kind: "Problem",
    node: (label) => (
      <>
        <p className="label b chalky">{label}.</p>
        <h2 className="board-h2 chalky">
          Bring us <span className="u-y">yours.</span>
        </h2>
        <Tex hidden className="formal">{tex`\forall q \in \text{YourQuestions},\ \exists a : a \vdash q`}</Tex>
        <p className="board-lede">
          Modeling, statistics, optimization, or a rigorous second look at your numbers. The consulting division takes
          real questions from real organizations. {consultingCopy.availability}
        </p>
        <div className="board-row">
          <Link className="u-b" href="/consulting#inquire">
            Start a consult →
          </Link>
          <Link className="u-b" href="/consulting">
            How it works
          </Link>
        </div>
      </>
    ),
  });

  panels.push({
    id: "join",
    title: "Q.E.D. Join us.",
    kind: "",
    node: () => (
      <>
        <Crest variant="full" className="board-crest chalky" title="Spartan Math Club crest" />
        <h2 className="board-h2 chalky">
          Q.E.D. <span className="y">Join us.</span>
        </h2>
        <span className="formal" aria-hidden="true">
          <Tex>{tex`\therefore\ \text{you} \in \text{SMC}`}</Tex> <Tex className="gr">{tex`\blacksquare`}</Tex>
        </span>
        <p className="board-lede">{homeCopy.closingBody}</p>
        <div className="board-row">
          <Link className="btn btn--gold" href="/join">
            <span>Join the club</span>
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
          {meeting ? (
            <a className="u-b" href="#events">
              When&apos;s the next meeting?
            </a>
          ) : null}
        </div>
      </>
    ),
  });

  let counter = 0;
  const meta: PanelMeta[] = panels.map((panel) => ({ id: panel.id, title: panel.title }));

  return (
    <BoardTrack
      panels={meta}
      hints={{
        pan: (
          <>
            scroll <Tex>{tex`\downarrow\ \implies\ \rightarrow`}</Tex>
          </>
        ),
        swipe: (
          <>
            swipe <Tex>{tex`\rightarrow`}</Tex>
          </>
        ),
      }}
      ghosts={GHOSTS.map((ghost) => (
        <span key={ghost.tex} style={{ left: `${ghost.panel * GHOST_DRIFT + ghost.x}%`, top: ghost.top }}>
          <Tex>{ghost.tex}</Tex>
        </span>
      ))}
    >
      {panels.map((panel, index) => {
        if (panel.kind) counter += 1;
        const label = panel.kind ? `${panel.kind} ${counter}` : "";
        return (
          <article key={panel.id} id={panel.id} className={cn("panel", `panel--${panel.id}`)}>
            <div className="pin" data-index={index}>
              {panel.node(label)}
            </div>
          </article>
        );
      })}
    </BoardTrack>
  );
}
