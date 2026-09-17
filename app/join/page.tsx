import { AboutDefinition } from "@/components/home/about-definition";
import { ShouldICome } from "@/components/join/should-i-come";
import { Tex } from "@/components/math/tex";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHead } from "@/components/ui/section-head";
import { joinCopy } from "@/content/club";
import { clubEmail, socialLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Join",
  description:
    "Join the Spartan Math Club at San José State. No application, no prerequisite, any major. Show up, pick up a problem, and you're one of us.",
  path: "/join",
});

export default function JoinPage() {
  const socials = socialLinks();
  const email = clubEmail();

  return (
    <main id="content" tabIndex={-1}>
      <PageHero
        eyebrow={joinCopy.eyebrow}
        title={
          <>
            There is <em>no prerequisite.</em>
          </>
        }
        aside={
          <div className="consult-aside">
            <Tex display>{String.raw`\text{Join} : \text{Curious} \hookrightarrow \mathcal{S}`}</Tex>
            <p>An injection. Every curious student maps to a distinct member.</p>
          </div>
        }
      >
        <Tex hidden className="formal-line">{String.raw`\neg\exists\ \text{prerequisite}`}</Tex>
        <p className="hero-body">{joinCopy.lede}</p>
      </PageHero>

      <section className="section surface-ink" id="should-i-come" aria-labelledby="come-heading">
        <div className="container truth-layout">
          <SectionHead index="1" kicker="Decision procedure" id="come-heading" title={<>Should I come? <em>Yes.</em></>}>
            <p className="lede">
              A truth table that&apos;s always true. Flip the toggles and find your row: there&apos;s no version of you
              that shouldn&apos;t come.
            </p>
          </SectionHead>
          <ShouldICome
            symbols={{
              top: <Tex>{String.raw`\top`}</Tex>,
              bot: <Tex>{String.raw`\bot`}</Tex>,
              c: <Tex>C</Tex>,
              g: <Tex>G</Tex>,
              cOrNotC: <Tex>{String.raw`C \lor \neg C`}</Tex>,
              gOrNotG: <Tex>{String.raw`G \lor \neg G`}</Tex>,
              formula: <Tex>{String.raw`\text{Come} \equiv (C \lor \neg C) \land (G \lor \neg G)`}</Tex>,
            }}
          />
        </div>
      </section>

      <AboutDefinition />

      <section className="section surface-paper section--ruled" aria-labelledby="steps-heading">
        <div className="container">
          <SectionHead index="3" kicker="How to join" id="steps-heading" title="An algorithm in four steps." />
          <ol className="join-steps">
            {joinCopy.steps.map((step, index) => (
              <li className="join-step" key={step.title}>
                <span className="join-step-number">
                  <span className="visually-hidden">Step </span>
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.cta ? <Button href={step.cta.href} label={step.cta.label} variant="link" /> : null}
                {index === 1 ? (
                  socials.length ? (
                    <ul className="inline-links">
                      {socials.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">Community links are coming soon.</p>
                  )
                ) : null}
              </li>
            ))}
          </ol>
          <Tex display className="join-return">{String.raw`\texttt{while}\ (\text{curious})\ \{\ \text{solve}();\ \}`}</Tex>
        </div>
      </section>

      <section className="section surface-ink" id="speakers" aria-labelledby="speakers-heading">
        <div className="hero-grid-bg hero-grid-bg--faint" aria-hidden="true" />
        <div className="container speakers-layout">
          <SectionHead index="4" kicker={joinCopy.speakersKicker} id="speakers-heading" title={joinCopy.speakersHeadline}>
            <p className="lede">{joinCopy.speakersBody}</p>
            <div className="actions">
              {email ? <Button href={`mailto:${email}`} label="Get in touch" /> : null}
              <Button href="/consulting" label="Bring a consulting project" variant={email ? "ghost-dark" : "gold"} />
            </div>
          </SectionHead>
        </div>
      </section>

      <section className="section surface-paper" aria-labelledby="join-faq-heading">
        <div className="container faq-layout">
          <SectionHead index="5" kicker="FAQ" id="join-faq-heading" title="Frequently asked, rigorously answered." />
          <div className="faq">
            {joinCopy.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
