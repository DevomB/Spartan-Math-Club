import { Tex } from "@/components/math/tex";
import { ProblemCard, problemNumber } from "@/components/problems/problem-card";
import { SolvedBadge } from "@/components/problems/answer-check";
import { PageHero } from "@/components/ui/page-hero";
import { difficultyLabel, difficultyName, problems } from "@/content/problems";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Problem Archive",
  description:
    "Probability, number theory, combinatorics, and analysis problems from the Spartan Math Club. Check your answer instantly, take a hint, or read the full solution.",
  path: "/problems",
});

export default function ProblemsPage() {
  return (
    <main id="content" tabIndex={-1}>
      <PageHero
        eyebrow="Problem archive"
        title={
          <>
            Being stuck is <em>the job.</em>
          </>
        }
        aside={
          <div className="difficulty-legend">
            <p className="difficulty-legend-title">Difficulty, asymptotically</p>
            <dl>
              {([1, 2, 3, 4] as const).map((level) => (
                <div key={level}>
                  <dt className={`difficulty difficulty--${level}`}>{difficultyLabel[level]}</dt>
                  <dd>{difficultyName[level]}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      >
        <p className="hero-body">
          {problems.length} problems in the style of our problem sessions — the classics every quant interview and
          olympiad has borrowed, and a few with 2026 in them. Answers accept expressions like{" "}
          <code>17/4</code>, <code>pi^2/6</code>, or <code>sqrt(2)</code>, and are checked in your browser.
        </p>
      </PageHero>

      <section className="section surface-paper" aria-label="Problems">
        <div className="container problems-layout">
          {/* Collapsed on phones, where nine rows of contents pushed the first problem off
              the screen; CSS forces it open from 560px up, so desktop keeps the full list. */}
          <details className="problem-index">
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
            <Tex className="problem-index-note">{String.raw`\text{Solved} \subseteq \text{Attempted} \subseteq \text{Problems}`}</Tex>
          </details>

          <div className="problem-stack">
            {problems.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
            <p className="problem-end">
              End of archive — for now. {problemNumber(problems[problems.length - 1])} won&apos;t be the last.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
