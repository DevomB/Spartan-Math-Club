import { ProblemCard } from "@/components/problems/problem-card";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-head";
import { featuredProblemSlug, getProblem, problems } from "@/content/problems";

export function FeaturedProblem() {
  const problem = getProblem(featuredProblemSlug) ?? problems[0];
  if (!problem) return null;

  return (
    <section className="section surface-ink section--problem" id="problem" aria-labelledby="problem-heading">
      <div className="hero-grid-bg hero-grid-bg--faint" aria-hidden="true" />
      <div className="container problem-feature">
        <SectionHead
          index="2"
          kicker="Featured problem"
          id="problem-heading"
          title={
            <>
              Think you&apos;re one of us? <em>Prove it.</em>
            </>
          }
        >
          <p className="lede">
            A problem from the archive, the kind we argue about at problem sessions. Answers are checked in your
            browser — nothing is sent anywhere. Hints are free. Dignity is optional.
          </p>
          <div className="actions">
            <Button href="/problems" label={`Browse all ${problems.length} problems`} variant="ghost-dark" />
          </div>
        </SectionHead>
        <ProblemCard problem={problem} headingLevel="h3" className="problem--featured" />
      </div>
    </section>
  );
}
