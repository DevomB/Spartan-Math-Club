import { MathText, Tex } from "@/components/math/tex";
import { SectionHead } from "@/components/ui/section-head";

const tex = String.raw;

/** The club, defined the only way a math club should be. */
export function AboutDefinition() {
  return (
    <section className="section surface-paper" id="definition" aria-labelledby="about-title">
      <div className="container about-layout">
        <SectionHead index="2" kicker="Formally" id="about-title" title="Formally speaking.">
          <p className="lede">
            A community of San José State students who think mathematics is the most fun you can have with a pencil.
            We would state it more formally, but you asked.
          </p>
        </SectionHead>

        <div className="paper-sheet">
          <div className="theorem">
            <p className="theorem-head">
              <span className="theorem-label">Definition 1.1</span> <span className="theorem-name">(Spartan Math Club)</span>
            </p>
            <MathText>
              {tex`The Spartan Math Club is the set $$\mathcal{S} = \{\, s \in \mathrm{SJSU} \;:\; s \text{ finds hard problems fun} \,\},$$ equipped with problem sessions, talks, competitions, quant games, a consulting division, and a standing supply of whiteboard markers.`}
            </MathText>
          </div>

          <div className="theorem">
            <p className="theorem-head">
              <span className="theorem-label">Remark 1.2</span>
            </p>
            <MathText>
              {tex`Membership in $\mathcal{S}$ is independent of major. That is, for every major $m,$ $$\Pr(s \in \mathcal{S} \mid \text{major}(s) = m) = \Pr(s \in \mathcal{S}).$$`}
            </MathText>
          </div>

          <div className="theorem">
            <p className="theorem-head">
              <span className="theorem-label">Proposition 1.3</span>
            </p>
            <p>
              <em>You do not need to be good at math to join.</em>
            </p>
            <p className="proof">
              <span className="proof-label">Proof.</span> Suppose, for contradiction, that someone was born good at math.
              Every mathematician on record got good by working problems, usually with other people, usually while stuck.
              That is precisely what we do on a weeknight. The supposition contradicts the historical record.
              <Tex className="qed">{tex`\blacksquare`}</Tex>
            </p>
          </div>

          <div className="theorem theorem--corollary">
            <p className="theorem-head">
              <span className="theorem-label">Corollary 1.4</span>
            </p>
            <p>
              <em>You should come to the next event.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
