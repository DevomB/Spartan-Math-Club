import { LorenzField } from "@/components/home/lorenz";
import { Tex } from "@/components/math/tex";
import { SectionHead } from "@/components/ui/section-head";

const lorenzSystem = String.raw`\begin{aligned}
\dot{x} &= \sigma(y - x)\\
\dot{y} &= x(\rho - z) - y\\
\dot{z} &= xy - \beta z
\end{aligned}`;

/** Figure: the Lorenz system, live. Two trajectories that start 10⁻⁵ apart. */
export function ChaosFigure() {
  return (
    <section className="section surface-ink" id="chaos" aria-labelledby="chaos-title">
      <div className="container chaos-layout">
        <SectionHead
          index="4"
          kicker="Figure 1"
          id="chaos-title"
          title={
            <>
              Small differences, <span className="y">big consequences.</span>
            </>
          }
        >
          <p className="lede">
            Two points on the Lorenz attractor, started one hundred-thousandth apart. For a while they agree. Then they
            don&apos;t. Drag ρ below 24.06 and watch the chaos settle into a fixed point. This is the kind of thing we
            stay after the meeting to argue about.
          </p>
        </SectionHead>
        <LorenzField>
          <Tex display>{lorenzSystem}</Tex>
          <Tex className="lorenz-params">{String.raw`\sigma = 10,\ \beta = 8/3`}</Tex>
        </LorenzField>
      </div>
    </section>
  );
}
