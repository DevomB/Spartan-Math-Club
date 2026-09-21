import { LeadershipList } from "@/components/leadership/leadership-list";
import { Tex } from "@/components/math/tex";
import { Reveal } from "@/components/ui/reveal";
import { appliedMath } from "@/content/applied-math";
import { events, weeklyMeetings } from "@/content/events";
import { fmt, meetingOccurrences, occurrenceAsEvent, requestTime, upcomingEvents } from "@/lib/dates";
import { site } from "@/content/site";
import { clubEmail } from "@/lib/links";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

const activities = [
  {
    title: "Weekly problem solving",
    body: "Members work together on two or three problems each Monday. The focus is on sharing approaches and learning how other people think.",
  },
  {
    title: "Mentorship and career readiness",
    body: "Students connect across majors and experience levels through peer support, practical workshops, and conversations about mathematical careers.",
  },
  {
    title: "Mathematical events",
    body: "Talks, challenges, and social events give members more ways to explore mathematics and meet other curious students.",
  },
  {
    title: "Applied mathematics",
    body: "A developing project track will help members apply data science, machine learning, software engineering, and optimization to real organizational questions.",
  },
];

export default function HomePage() {
  const now = requestTime();
  const email = clubEmail();
  const recurring = weeklyMeetings.flatMap((meeting) => meetingOccurrences(meeting, now, 3).map(occurrenceAsEvent));
  const schedule = [...upcomingEvents(events, now), ...recurring]
    .filter((event) => !event.cancelled)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const next = schedule[0];

  return (
    <main id="content" tabIndex={-1}>
      <section className="home-hero">
        <div className="home-hero-image" aria-hidden="true">
          <Image
            src="/campus/sjsu-landing.jpeg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 44rem) 100vw, 62vw"
          />
        </div>
        <div className="container home-hero-layout">
          <div className="home-hero-copy">
            <p className="eyebrow">San José State University</p>
            <h1>For all problems, there exists an SMC meeting.</h1>
            <Tex className="hero-formula" hidden>
              {String.raw`\forall p \in \text{Problems},\ \exists m \in \text{SMC meetings}: m \vdash p`}
            </Tex>
            <p className="hero-lede">
              A campus community for collaborative problem solving, mathematical events, mentorship, career readiness,
              and applied mathematics.
            </p>
            <div className="actions">
              <Link className="button button--primary" href="/join">Join the club</Link>
              <Link className="button button--secondary" href="/events">View events</Link>
            </div>
          </div>
          {next ? (
            <aside className="next-meeting" aria-labelledby="next-meeting-title">
              <p className="section-label">Next on the calendar</p>
              <p className="next-meeting-date">{fmt.full(next.startsAt)}</p>
              <h2 id="next-meeting-title">{next.title}</h2>
              <dl>
                <div><dt>Time</dt><dd>{fmt.timeRange(next.startsAt, next.endsAt)}</dd></div>
                <div><dt>Location</dt><dd>{next.location}</dd></div>
              </dl>
              <p>{next.summary}</p>
            </aside>
          ) : null}
        </div>
      </section>

      <Reveal>
        <section className="section" id="about" aria-labelledby="about-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">About SMC</p>
              <h2 id="about-title">A community built around analytical thinking and collaborative problem solving.</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">
                SMC gives curious students a consistent place to test ideas, compare approaches, and grow as
                mathematicians.
              </p>
              <p>
                Weekly problem solving, mentorship, and mathematical events help foster a thoughtful campus culture.
                Students from every major and experience level are welcome.
              </p>
              <Link className="text-link" href="/about">Learn about the club</Link>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--dark" aria-labelledby="leadership-title">
          <div className="container">
            <header className="section-intro section-intro--wide">
              <p className="section-label">Executive board</p>
              <h2 id="leadership-title">Meet the students leading the club.</h2>
            </header>
            <LeadershipList compact />
            <Link className="text-link text-link--light" href="/about#leadership">More about the club</Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--cta" aria-labelledby="interest-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">Get involved</p>
              <h2 id="interest-title">Interested in applied mathematics projects?</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">
                SMC is developing the Spartan Mathematical Consulting Group (SMCG), an applied mathematics track for
                future industry-facing work.
              </p>
              <p>
                Complete the interest form to tell us what you want to work on. Join Discord for club announcements,
                meeting updates, and conversation with other members.
              </p>
              <div className="actions">
                <a className="button button--primary" href={appliedMath.interestForm} target="_blank" rel="noopener noreferrer">
                  Complete the interest form
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                {site.links.discord ? (
                  <a className="button button--secondary" href={site.links.discord} target="_blank" rel="noopener noreferrer">
                    Join the Discord
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
              {email ? <p>Questions? <a className="text-link" href={`mailto:${email}`}>{email}</a></p> : null}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--muted" aria-labelledby="activities-title">
          <div className="container">
            <header className="section-intro section-intro--wide">
              <p className="section-label">What we do</p>
              <h2 id="activities-title">A mathematics club built around participation.</h2>
            </header>
            <ol className="editorial-list">
              {activities.map((activity, index) => (
                <li key={activity.title}>
                  <span className="list-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="applied-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">Applied mathematics</p>
              <h2 id="applied-title">Preparing students for work that uses mathematics.</h2>
            </header>
            <div className="section-copy">
              <p className="status-line">{appliedMath.status}</p>
              <p className="large-copy">{appliedMath.summary}</p>
              <p>{appliedMath.currentWork}</p>
              <Link className="text-link" href="/applied-math">Explore the Applied Math track</Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
