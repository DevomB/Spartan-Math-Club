import { Tex } from "@/components/math/tex";
import { SectionHead } from "@/components/ui/section-head";
import { homeCopy } from "@/content/club";
import Link from "next/link";

export function Pillars() {
  return (
    <section className="section surface-paper section--ruled" id="what-we-do" aria-labelledby="pillars-title">
      <div className="container">
        <SectionHead index="1" kicker="What we do" id="pillars-title" title="Six ways to spend an evening being wrong, then right.">
          <p className="signature">
            <Tex hidden className="signature-expr">{String.raw`\exists!\, c \in \text{Clubs} : \text{Math}(c) \land \text{Spartan}(c)`}</Tex>
            <span className="signature-read">One club. Exactly one.</span>
          </p>
        </SectionHead>
        <ol className="pillars">
          {homeCopy.pillars.map((pillar, index) => {
            const body = (
              <>
                <div className="pillar-top">
                  <span className="pillar-index">1.{index + 1}</span>
                  <Tex className="pillar-symbol">{pillar.symbol}</Tex>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p>{pillar.body}</p>
                {"signature" in pillar && pillar.signature ? (
                  <p className="pillar-signature">
                    <Tex hidden>{pillar.signature.tex}</Tex>
                    <span>{pillar.signature.read}</span>
                  </p>
                ) : null}
                {pillar.href ? (
                  <span className="pillar-link">
                    Explore consulting <span aria-hidden="true">→</span>
                  </span>
                ) : null}
              </>
            );
            return (
              <li key={pillar.title} className={pillar.href ? "pillar pillar--link" : "pillar"}>
                {pillar.href ? (
                  <Link href={pillar.href} className="pillar-anchor">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
