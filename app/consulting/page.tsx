import { InquiryForm } from "@/components/consulting/inquiry-form";
import { Tex } from "@/components/math/tex";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHead } from "@/components/ui/section-head";
import { consultingCopy } from "@/content/consulting";
import { consultingEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Consulting",
  description:
    "SMC Consulting: statistical analysis, optimization, probability and risk, modeling, forecasting, and rigorous mathematical evaluation from Spartan Math Club students at San José State.",
  path: "/consulting",
});

const tex = String.raw;

export default function ConsultingPage() {
  const email = consultingEmail();

  return (
    <main id="content" tabIndex={-1}>
      <PageHero
        eyebrow={consultingCopy.eyebrow}
        title={
          <>
            Solving your problems with math, <em>one step at a time.</em>
          </>
        }
        aside={
          <div className="consult-aside">
            <Tex display>
              {tex`\underset{\text{decision}}{\arg\max}\ \mathbb{E}\big[\,\text{outcome} \mid \text{your data}\,\big]`}
            </Tex>
            <p>That&apos;s the whole job. The rest is doing it carefully.</p>
          </div>
        }
      >
        <p className="hero-body">{consultingCopy.lede}</p>
        <p className="availability">
          <span className="pulse" aria-hidden="true" />
          {consultingCopy.availability}
        </p>
        <div className="actions">
          <Button href="#inquire" label="Start a consult" />
          <Button href="#services" label="What we do" variant="ghost-dark" />
        </div>
      </PageHero>

      <section className="section surface-paper" id="services" aria-labelledby="services-heading">
        <div className="container">
          <SectionHead index="1" kicker="Services" id="services-heading" title="Mathematics, applied to your actual problem.">
            <p className="lede">
              Quantitative firms use mathematics to find the edge other people miss. We bring the same habits — precise
              definitions, honest uncertainty, relentless checking — to organizations that don&apos;t have a quant team.
            </p>
          </SectionHead>
          <ul className="services">
            {consultingCopy.services.map((service, index) => (
              <li className="service" key={service.title}>
                <span className="service-index">1.{index + 1}</span>
                <div className="service-formula">
                  <Tex>{service.formula}</Tex>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p>{service.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-ink" id="process" aria-labelledby="process-heading">
        <div className="hero-grid-bg hero-grid-bg--faint" aria-hidden="true" />
        <div className="container">
          <SectionHead
            index="2"
            kicker="Process"
            id="process-heading"
            title={
              <>
                Every engagement is structured <em>like a proof.</em>
              </>
            }
          />
          <ol className="proof-steps proof-steps--wide">
            {consultingCopy.process.map((step, index) => (
              <li key={step.title} className="proof-step">
                <span className="proof-step-label">
                  {"labelTex" in step ? (
                    <>
                      <Tex hidden>{step.labelTex}</Tex>
                      <span className="visually-hidden">{step.label}</span>
                    </>
                  ) : (
                    step.label
                  )}
                </span>
                <span className="proof-step-body">
                  <strong>
                    {index + 1}. {step.title}
                  </strong>
                  <span>{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section surface-paper" aria-labelledby="principles-heading">
        <div className="container principles-layout">
          <SectionHead index="3" kicker="Principles" id="principles-heading" title="Axioms we don't relax.">
            <p className="signature">
              <Tex hidden className="signature-expr">{String.raw`\models\quad\text{vs}\quad\vdash`}</Tex>
              <span className="signature-read">We don&apos;t just believe it. We prove it.</span>
            </p>
          </SectionHead>
          <ol className="axioms">
            {consultingCopy.principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="axiom-label">Axiom {index + 1}.</span>
                <strong>{principle.title}</strong> {principle.body}
              </li>
            ))}
          </ol>
          <div className="audiences">
            <p className="kicker">
              <span>Who we work with</span>
            </p>
            <ul className="chips">
              {consultingCopy.audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section surface-paper section--ruled" aria-labelledby="consult-faq-heading">
        <div className="container faq-layout">
          <SectionHead index="4" kicker="FAQ" id="consult-faq-heading" title="Questions, answered precisely." />
          <div className="faq">
            {consultingCopy.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-ink" id="inquire" aria-labelledby="inquire-heading">
        <div className="container inquire-layout">
          <SectionHead index="5" kicker="Start a consult" id="inquire-heading" title={consultingCopy.inquiryHeadline}>
            <p className="lede">{consultingCopy.inquiryBody}</p>
            <Tex display className="inquire-math">{tex`\text{Problem} \xrightarrow{\ \text{SMC}\ } \text{Answer} \pm \varepsilon`}</Tex>
          </SectionHead>
          <InquiryForm email={email} />
        </div>
      </section>
    </main>
  );
}
