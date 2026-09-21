import { ProblemCard, problemNumber } from "@/components/problems/problem-card";
import { SolvedBadge } from "@/components/problems/answer-check";
import { PageHero } from "@/components/ui/page-hero";
import { difficultyLabel, problems } from "@/content/problems";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Problem Archive",
  description:
    "Probability, number theory, combinatorics, and analysis problems from the Spartan Mathematics Club. Check an answer, take a hint, or read a solution.",
  path: "/problems",
});

const INDEX_ID = "problem-contents";

/**
 * Runs where it sits in the markup, before first paint, so the contents list is already
 * open on wide screens: no flash, no layout shift, and the element's real state always
 * matches what is on screen. Without JS the list stays collapsed behind its summary,
 * which still works.
 */
const INDEX_SCRIPT = `(function(){var d=document.getElementById(${JSON.stringify(INDEX_ID)});if(!d)return;var m=matchMedia("(min-width: 35em)");var s=function(){d.open=m.matches};s();m.addEventListener("change",s)})();`;

export default function ProblemsPage() {
  return (
    <main id="content" tabIndex={-1}>
      <PageHero
        eyebrow="Problem archive"
        title="Problems from our meetings."
      >
        <p className="hero-body">
          {problems.length} problems for individual practice or group discussion. Answers accept expressions like{" "}
          <code>17/4</code>, <code>pi^2/6</code>, or <code>sqrt(2)</code>, and are checked in your browser.
        </p>
      </PageHero>

      <section className="section surface-paper" aria-label="Problems">
        <div className="container problems-layout">
          {/* Collapsed on phones, where the contents would push the first problem down.
              From 35em up the script opens it before paint so its semantic state and
              visible state remain consistent. */}
          <details className="problem-index" id={INDEX_ID} suppressHydrationWarning>
            <summary aria-label={`Contents: ${problems.length} problems`}>
              <span className="kicker">
                <span className="kicker-index">§</span>
                <span>Contents</span>
              </span>
              <span className="problem-index-count">{problems.length}</span>
            </summary>
            <ol>
              {problems.map((problem) => (
                <li key={problem.slug}>
                  <a href={`#${problem.slug}`}>
                    <span className="problem-index-number">{String(problem.number).padStart(3, "0")}</span>
                    <span className="problem-index-title">{problem.title}</span>
                    <span className={`difficulty difficulty--${problem.difficulty}`}>
                      {difficultyLabel[problem.difficulty]}
                    </span>
                    <SolvedBadge slug={problem.slug} />
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <script dangerouslySetInnerHTML={{ __html: INDEX_SCRIPT }} />

          <div className="problem-stack">
            {problems.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
            <p className="problem-end">
              End of the current archive. {problemNumber(problems[problems.length - 1])} will not be the last.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
