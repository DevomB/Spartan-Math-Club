import { Reveal } from "@/components/ui/reveal";
import { appliedMath } from "@/content/applied-math";
import { consultingEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Applied Math",
  description: "The developing SMCG applied mathematics track for industry-facing projects in data science, machine learning, software engineering, and optimization.",
  path: "/applied-math",
});

export default function AppliedMathPage() {
  const email = consultingEmail();

  return (
    <main id="content" tabIndex={-1}>
      <section className="page-intro page-intro--applied">
        <div className="container page-intro-layout">
          <p className="eyebrow">Applied Math</p>
          <h1>Practical projects in the applied mathematical sciences.</h1>
          <p className="page-lede">{appliedMath.summary}</p>
          <p className="status-line">{appliedMath.status}</p>
        </div>
      </section>

      <Reveal>
        <section className="section" aria-labelledby="current-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">Current phase</p>
              <h2 id="current-title">Building relationships and preparing members.</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">{appliedMath.currentWork}</p>
              <p>
                The track is being developed from the Spartan Mathematical Consulting Group blueprint. Early work will
                emphasize educational value, reliable teamwork, clear communication, and responsible project scope.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--muted" aria-labelledby="disciplines-title">
          <div className="container">
            <header className="section-intro section-intro--wide">
              <p className="section-label">Areas of work</p>
              <h2 id="disciplines-title">Mathematics connected to data, systems, and decisions.</h2>
            </header>
            <dl className="discipline-list">
              {appliedMath.disciplines.map((discipline) => (
                <div key={discipline.title}>
                  <dt>{discipline.title}</dt>
                  <dd>{discipline.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="process-title">
          <div className="container split-layout split-layout--top">
            <header className="section-intro section-intro--sticky">
              <p className="section-label">Project process</p>
              <h2 id="process-title">A clear path from first conversation to final presentation.</h2>
            </header>
            <ol className="process-list">
              {appliedMath.process.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--dark" aria-labelledby="members-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">For members</p>
              <h2 id="members-title">Learn by contributing to a real team.</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">{appliedMath.opportunity}</p>
              <p>{appliedMath.memberCommitment}</p>
              <a className="button button--light" href={appliedMath.interestForm} target="_blank" rel="noopener noreferrer">
                Applied Math interest form
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="partners-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">For organizations</p>
              <h2 id="partners-title">Educational projects with a responsible scope.</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">{appliedMath.partnerScope}</p>
              <p>
                The current semester is dedicated to outreach and relationship building. Public partner names and
                project claims will only be added after the organization has approved them.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section section--muted" aria-labelledby="interest-title">
          <div className="container split-layout">
            <header className="section-intro">
              <p className="section-label">Express interest</p>
              <h2 id="interest-title">Help build the first SMCG project teams.</h2>
            </header>
            <div className="section-copy">
              <p className="large-copy">
                Tell us what you want to work on, or contact the club if you have questions about membership,
                project ideas, or potential partnerships!
              </p>
              <div className="actions">
                <a className="button button--primary" href={appliedMath.interestForm} target="_blank" rel="noopener noreferrer">
                  Complete the interest form
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                {email ? (
                  <a className="button button--secondary" href={`mailto:${email}?subject=SMCG%20Interest`}>Email SMC</a>
                ) : null}
              </div>
              <p>
                Prefer an informal conversation?{" "}
                <a className="text-link" href="https://discord.gg/Y7hpArMN6" target="_blank" rel="noopener noreferrer">
                  Join the SMC Discord
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
