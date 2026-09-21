import { LeadershipList } from "@/components/leadership/leadership-list";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "About",
  description: "Learn about the Spartan Mathematics Club, its weekly problem-solving meetings, and its student leadership at SJSU.",
  path: "/about",
});

const meetingElements = [
  ["Problems", "Two or three problems selected to encourage multiple approaches and group discussion."],
  ["Collaboration", "Time to work in small groups, compare ideas, and explain reasoning at the board."],
  ["Community", "Announcements, mentorship, and space to meet students with related academic and career interests."],
  ["Events", "Occasional talks, competitions, workshops, and social activities centered on mathematics."],
];

export default function AboutPage() {
  return (
    <main id="content" tabIndex={-1}>
      <section className="page-intro">
        <div className="container page-intro-layout">
          <p className="eyebrow">About</p>
          <h1>A community for analytical thinking and collaborative problem solving.</h1>
          <p className="page-lede">
            Spartan Mathematics Club aims to grow and foster an appreciation for mathematics through weekly problem
            solving, mentorship, career readiness opportunities, and mathematical social events.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="section" aria-labelledby="mission-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">Our purpose</p>
              <h2 id="mission-title">Mathematics becomes more approachable when people work on it together.</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">
                SMC welcomes SJSU students who want to think carefully, learn from their peers, and encounter parts of
                mathematics they may not see in class.
              </p>
              <p>
                Membership is open across majors and experience levels. A willingness to participate matters more than
                prior coursework or competition experience.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--muted" aria-labelledby="meeting-title">
          <div className="container">
            <header className="section-intro section-intro--wide">
              <p className="section-label">Monday meetings</p>
              <h2 id="meeting-title">What happens at a typical meeting.</h2>
              <p>Meetings are held Mondays from 3:00 to 4:00 PM in SCI 321A unless the events calendar notes otherwise.</p>
            </header>
            <dl className="definition-list">
              {meetingElements.map(([term, description]) => (
                <div key={term}><dt>{term}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="leadership" aria-labelledby="leadership-title">
          <div className="container">
            <header className="section-intro section-intro--wide">
              <p className="section-label">Executive board</p>
            </header>
            <LeadershipList />
          </div>
        </section>
      </Reveal>

      <section className="section section--cta" aria-labelledby="about-cta-title">
        <div className="container cta-layout">
          <div>
            <p className="section-label">Visit a meeting</p>
            <h2 id="about-cta-title">The simplest way to understand the club is to attend.</h2>
          </div>
          <div className="actions">
            <Link className="button button--primary" href="/events">View the calendar</Link>
            <Link className="button button--secondary" href="/join">How to join</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
