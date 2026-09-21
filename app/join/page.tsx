import { Reveal } from "@/components/ui/reveal";
import { appliedMath } from "@/content/applied-math";
import { clubEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Join",
  description: "Join the Spartan Mathematics Club at SJSU and attend a weekly problem-solving meeting.",
  path: "/join",
});

const firstMeeting = [
  ["Arrive", "Come to SCI 321A a few minutes before 3:00 PM on a scheduled Monday."],
  ["Choose a problem", "Each meeting offers two or three problems. Start with the one that interests you."],
  ["Work with others", "Compare approaches, ask questions, and contribute whatever progress you make."],
  ["Stay involved", "Return for future meetings, events, mentorship, or the developing Applied Math track."],
];

const faq = [
  ["Do I need to be a mathematics major?", "No. SMC welcomes SJSU students from every major."],
  ["Do I need advanced coursework?", "No. Problems are selected to support different levels of experience, and collaboration is part of the meeting format."],
  ["Is there an application for general membership?", "No. Attend a scheduled meeting and participate."],
  ["Is the Applied Math track different?", "Yes. Project teams require a consistent weekly commitment because members will be responsible to their teammates and future organization partners."],
];

export default function JoinPage() {
  const email = clubEmail();

  return (
    <main id="content" tabIndex={-1}>
      <section className="page-intro">
        <div className="container page-intro-layout">
          <p className="eyebrow">Join</p>
          <h1>Attend a meeting and start solving.</h1>
          <p className="page-lede">
            General membership is open to SJSU students of every major and experience level. There is no application
            for attending weekly meetings.
          </p>
          <div className="actions">
            <Link className="button button--primary" href="/events">See upcoming meetings</Link>
            <Link className="button button--secondary" href="/problems">Browse club problems</Link>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="section" aria-labelledby="first-title">
          <div className="container split-layout split-layout--top">
            <header className="section-intro section-intro--sticky">
              <p className="section-label">Your first meeting</p>
              <h2 id="first-title">What to expect on Monday.</h2>
            </header>
            <ol className="process-list">
              {firstMeeting.map(([title, body], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--dark" aria-labelledby="applied-join-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">Applied Math track</p>
              <h2 id="applied-join-title">Interested in student consulting projects?</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">{appliedMath.memberCommitment}</p>
              <div className="actions">
                <a className="button button--light" href={appliedMath.interestForm} target="_blank" rel="noopener noreferrer">
                  Submit the interest form
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                <Link className="text-link text-link--light" href="/applied-math">Read about the track</Link>
              </div>
              <p>
                You can also{" "}
                <a className="text-link text-link--light" href="https://discord.gg/Y7hpArMN6" target="_blank" rel="noopener noreferrer">
                  join the Discord
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                {email ? <> or <a className="text-link text-link--light" href={`mailto:${email}`}>email the club</a></> : null}.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--muted" aria-labelledby="faq-title">
          <div className="container split-layout split-layout--top">
            <header className="section-intro">
              <p className="section-label">Frequently asked questions</p>
              <h2 id="faq-title">Before you attend.</h2>
            </header>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
